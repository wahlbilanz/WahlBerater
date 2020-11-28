import debug from 'debug';
import { readdirSync, readFileSync, stat, statSync, mkdirSync, writeFileSync, mkdir } from 'fs';
import * as yaml from 'js-yaml';
import { join as joinPath, extname } from 'path';
import * as yargs from 'yargs';
import { v5 as uuidv5 } from 'uuid';
import * as sharp from 'sharp';

interface ClaimProvenance {
  claim: string;
  description: string;
}

interface Claim {
  id: string;
  title: string;
  category: string;
  description?: string;
  provenance?: ClaimProvenance[];
}

interface CandidatePosition {
  vote: -2 | -1 | 0 | 1 | 2;
  reason?: string;
}

interface Candidate {
  id: string;
  publishPersonalInfo?: boolean;
  name: string;
  party: string;
  picture: string;
  links?: {
    twitter?: string;
    blog?: string;
    facebook?: string;
    instagram?: string;
  };
  shortDescription: string;
  description: string;
  positions: { [claimId: string]: CandidatePosition };
}

interface Category {
  id: string;
  title: string;
  color: string;
}

interface Party {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface InputDocument {
  claims?: Array<Claim>;
  candidates?: Array<Candidate>;
  categories?: Array<Category>;
  parties?: Array<Party>;
}

interface DataDocument {
  claims?: Map<string, Claim>;
  candidates?: Map<string, Candidate>;
  categories?: Map<string, Category>;
  parties?: Map<string, Party>;
}

const UUID_NAMESPACE = 'b1c7c198-31bd-11eb-adc1-0242ac120002';
const IMAGE_DIMENSIONS = { width: 250, height: 250 };
const IMAGE_BACKGROUND = { r: 245, g: 245, b: 245 };
const IMAGE_QUALITY = 80;

debug.enable('*');
const log = debug('data-builder');

// TODO check basic data validity and types?
// // TODO check ID duplications
// // TODO impl function to anomyize IDs based on seed/salt and the orignal ID
// // TODO cross check IDs (if it really exists)
// // TODO check if all candidates have positions for all claims
// // TODO extract, shrink, and optimize pictures
// // TODO export 2 json

function readYaml(path: string): InputDocument[] {
  log('Read yaml file %s', path);
  const content = readFileSync(path);
  return yaml.safeLoadAll(content.toString());
}

function readAllYamlFiles(path: string): InputDocument[] {
  log('Scan dir for yaml files %s', path);
  const directoryContent = readdirSync(path);
  const docs = directoryContent
    .sort()
    .map((file) => joinPath(path, file))
    .filter((file) => statSync(file).isFile() && ['.yml', '.yaml'].includes(extname(file)))
    .map((file) => readYaml(file));
  return Array.prototype.concat(...docs);
}

function appendAndMerge<T extends { id: string }>(map: Map<string, T>, entries: Array<T>, merge: boolean): void {
  if (!entries) {
    return;
  }

  for (const entry of entries) {
    entry.id = !entry.id ? null : entry.id.trim();
    if (!entry.id) {
      throw Error('Missing ID');
    }

    if (map.has(entry.id)) {
      log('Found duplicated ID %s', entry.id);
      if (!merge) {
        throw Error(`Duplicated ID '${entry.id}' already exists.`);
      }

      // when merge is allowed, join both elements
      map.set(entry.id, {
        ...map.get(entry.id),
        ...entry,
      });
    } else {
      map.set(entry.id, entry);
    }
  }
}

function unifyDocs(docs: InputDocument[], merge: boolean = false): DataDocument {
  const claims = new Map<string, Claim>();
  const candidates = new Map<string, Candidate>();
  const categories = new Map<string, Category>();
  const parties = new Map<string, Party>();

  for (const doc of docs) {
    appendAndMerge(claims, doc.claims, merge);
    appendAndMerge(candidates, doc.candidates, merge);
    appendAndMerge(categories, doc.categories, merge);
    appendAndMerge(parties, doc.parties, merge);
  }

  return {
    claims,
    candidates,
    categories,
    parties,
  };
}

function validateIdRefs(data: DataDocument): boolean {
  log('Validate ID references');
  let valid = true;

  // check claim categories
  for (const claim of data.claims.values()) {
    if (!data.categories.has(claim.category)) {
      valid = false;
      log('Missing category %s for claim %s', claim.category, claim.id);
    }
  }

  // Check candidate party references and position list
  for (const candidate of data.candidates.values()) {
    if (!data.parties.has(candidate.party)) {
      valid = false;
      log('Missing party %s for candidate %s', candidate.party, candidate.id);
    }

    const answeredClaims = Object.getOwnPropertyNames(candidate.positions);
    const unknownClaims = answeredClaims.filter((value) => !data.claims.has(value));
    const unansweredClaims = Array.from(data.claims.keys()).filter((value) => !answeredClaims.includes(value));
    if (unknownClaims.length > 0) {
      valid = false;
      log('Candidate %s references unknown claims %s', candidate.id, unknownClaims.join(', '));
    }
    if (unansweredClaims.length > 0) {
      valid = false;
      log('Candidate %s has not answered following claims %s', candidate.id, unansweredClaims.join(', '));
    }
  }

  log(valid ? 'Document ok' : 'Invalid Document');
  return valid;
}

function shuffleIds(input: DataDocument, seed: string = ''): DataDocument {
  log('Shuffle IDs');

  seed = seed || '';
  const idTable = new Map<string, string>([
    ...Array.from(input.categories.keys()).map((id) => [`category:${id}`, uuidv5(`${seed}:category:${id}`, UUID_NAMESPACE)]),
    ...Array.from(input.claims.keys()).map((id) => [`claim:${id}`, uuidv5(`${seed}:claim:${id}`, UUID_NAMESPACE)]),
    ...Array.from(input.candidates.keys()).map((id) => [`candidate:${id}`, uuidv5(`${seed}:candidate:${id}`, UUID_NAMESPACE)]),
    ...Array.from(input.parties.keys()).map((id) => [`party:${id}`, uuidv5(`${seed}:party:${id}`, UUID_NAMESPACE)]),
  ] as [string, string][]);

  const claims = new Map<string, Claim>();
  const candidates = new Map<string, Candidate>();
  const categories = new Map<string, Category>();
  const parties = new Map<string, Party>();

  for (const entry of input.claims.values()) {
    entry.id = idTable.get(`claim:${entry.id}`);
    entry.category = idTable.get(`category:${entry.category}`);
    claims.set(entry.id, entry);
  }
  for (const entry of input.categories.values()) {
    entry.id = idTable.get(`category:${entry.id}`);
    categories.set(entry.id, entry);
  }
  for (const entry of input.candidates.values()) {
    entry.id = idTable.get(`candidate:${entry.id}`);
    entry.party = idTable.get(`party:${entry.party}`);
    const positions = {};
    for (const claim of Object.getOwnPropertyNames(entry.positions)) {
      positions[idTable.get(`claim:${claim}`)] = entry.positions[claim];
    }
    entry.positions = positions;
    candidates.set(entry.id, entry);
  }
  for (const entry of input.parties.values()) {
    entry.id = idTable.get(`party:${entry.id}`);
    parties.set(entry.id, entry);
  }

  return {
    claims,
    candidates,
    categories,
    parties,
  };
}

async function processPictures(data: DataDocument, input: string, output: string): Promise<DataDocument> {
  for (const candidate of data.candidates.values()) {
    if (candidate.publishPersonalInfo !== true) {
      log('Skip image processing for %s', candidate.id);
      continue;
    }
    if (!candidate.picture) {
      log('Candidate %s has no picture.');
      candidate.picture = null;
      continue;
    }

    try {
      const fileName = `${candidate.id}.jpg`;
      log('Transform picture for %s: %s', candidate.id, candidate.picture);
      await sharp(joinPath(input, candidate.picture))
        .flatten({ background: IMAGE_BACKGROUND })
        .resize({ ...IMAGE_DIMENSIONS, fit: 'cover', position: sharp.strategy.entropy, withoutEnlargement: true })
        .jpeg({ quality: IMAGE_QUALITY, progressive: true })
        .toFile(joinPath(output, fileName));
      candidate.picture = fileName;
    } catch (e) {
      log('Error while processing picture of %s', candidate.id);
      throw e;
    }
  }

  return data;
}

function generatePoliticalJson(data: DataDocument): { [key: string]: any } {
  return {
    categories: Array.from(data.categories.values()).reduce((obj, entry) => ({ ...obj, [entry.id]: { ...entry, id: undefined } }), {}),
    parties: Array.from(data.parties.values()).reduce((obj, entry) => ({ ...obj, [entry.id]: { ...entry, id: undefined } }), {}),
    claims: Array.from(data.claims.values()).reduce((obj, entry) => ({ ...obj, [entry.id]: { ...entry, id: undefined } }), {}),
    candidates: Array.from(data.candidates.values()).reduce(
      (obj, entry) => ({
        ...obj,
        [entry.id]: { party: entry.party, positions: entry.positions },
      }),
      {},
    ),
  };
}

function generatePersonalJson(data: DataDocument): { [key: string]: any } {
  const json = {};
  for (const candidate of data.candidates.values()) {
    if (candidate.publishPersonalInfo !== true) {
      log('Skip %s in personal.json', candidate.id);
      json[candidate.id] = null;
      continue;
    }

    json[candidate.id] = {
      name: candidate.name,
      picture: candidate.picture,
      shortDescription: candidate.shortDescription,
      description: candidate.description,
      links:
        candidate.links == null
          ? {}
          : {
              blog: candidate.links.blog || undefined,
              twitter: candidate.links.twitter || undefined,
              facebook: candidate.links.facebook || undefined,
              instagram: candidate.links.instagram || undefined,
            },
    };
  }

  return json;
}

async function main() {
  const argv = yargs
    .option('input', {
      alias: 'i',
      description: 'Directory containing input YAML documents',
      type: 'string',
    })
    .option('output', {
      alias: 'o',
      description: 'Directory where to store the resulting json, which can be served via a webserver',
      type: 'string',
    })
    .option('minify', {
      alias: 'm',
      description: 'Minify the output JSON',
      type: 'boolean',
    })
    .option('merge', {
      description: 'Allow to merge resources with the same IDs instead of throwing an error',
      type: 'boolean',
    })
    .option('anonymize-ids', {
      description: 'Replace IDs with anonymized UUID',
      type: 'boolean',
    })
    .option('seed', {
      description: 'Random seed for UUID generation',
      type: 'string',
    })
    .help()
    .alias('help', 'h')
    .parse(process.argv.slice(3));

  // TODO check if all inputs are there
  if (!argv.input || !argv.output) {
    log('Input and output options must be set. Run --help for more information.');
    return;
  }

  const docs = readAllYamlFiles(argv.input);
  let data = unifyDocs(docs, argv.merge);
  let isValid = validateIdRefs(data);

  if (argv['anonymize-ids'] === true) {
    data = shuffleIds(data, argv.seed);
    isValid = validateIdRefs(data);
  }

  mkdirSync(argv.output, { recursive: true });
  data = await processPictures(data, argv.input, argv.output);
  writeFileSync(
    joinPath(argv.output, 'political.json'),
    JSON.stringify(generatePoliticalJson(data), undefined, argv.minify === true ? 0 : 2),
  );
  writeFileSync(
    joinPath(argv.output, 'personal.json'),
    JSON.stringify(generatePersonalJson(data), undefined, argv.minify === true ? 0 : 2),
  );

  // console.log(data);
}

main();
