import * as Color from 'color';
import debug from 'debug';
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { wrongSortOrder } from 'ng-zorro-antd/core/time';
import { extname, join as joinPath } from 'path';
import * as sharp from 'sharp';
import { URL } from 'url';
import { v5 as uuidv5 } from 'uuid';
import * as yargs from 'yargs';

interface ClaimProvenance {
  claim: string;
  description: string;
}

interface NamedLink {
  title: string;
  url: string;
}

interface Claim {
  id: string;
  order: number;
  title: string;
  category: string;
  description?: string;
  provenance?: ClaimProvenance[];
  links?: NamedLink[];
}

interface EntityLinks {
  twitter?: string;
  blog?: string;
  facebook?: string;
  instagram?: string;
}

interface VotePosition {
  vote: -2 | -1 | 0 | 1 | 2;
  reason?: string;
}

interface Candidate {
  id: string;
  publishPersonalInfo?: boolean;
  listOrder: number;
  name: string;
  party: string;
  picture: string;
  links?: EntityLinks;
  shortDescription: string;
  description: string;
  positions?: { [claimId: string]: VotePosition };
}

interface Category {
  id: string;
  order: number;
  title: string;
  color: string;
}

interface Party {
  id: string;
  name: string;
  color: string;
  picture: string;
  links?: EntityLinks;
  shortDescription: string;
  description?: string;
  positions?: { [claimId: string]: VotePosition };
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

interface PositionedEntities {
  partyHasPositions: boolean;
  candidateHasPositions: boolean;
}

const UUID_NAMESPACE = 'b1c7c198-31bd-11eb-adc1-0242ac120002';
const IMAGE_DIMENSIONS = { width: 250, height: 250 };
const IMAGE_BACKGROUND = { r: 255, g: 255, b: 255 };
const IMAGE_QUALITY = 85;

debug.enable('*');
const log = debug('data-builder');
const warning = (...args: any) => {}; // debug('data-builder-validation');

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

function cleanString(str: string): string {
  return !!str ? str.trim() : null;
}

function cleanId(id: string): string {
  return !!id ? id.trim().toLowerCase() : null;
}

function cleanColor(color: string): string {
  color = cleanString(color);
  if (!color) {
    return color;
  }
  try {
    return Color(color).hex();
  } catch (e) {
    warning("Color '%s' is malformed and cannot be parse", color);
    return null;
  }
}

function cleanUrl(link: string): string {
  link = cleanString(link);
  if (!link) {
    return null;
  }

  try {
    const url = new URL(link);
    if (!url.protocol.startsWith('https')) {
      warning("URL '%s' is a no HTTPS link", link);
    }
    return url.toString();
  } catch (e) {
    warning("URL '%s' is invalid or malformed.", link);
    return null;
  }
}

function cleanNamedLink(link: NamedLink): NamedLink {
  if (!link) {
    return null;
  }

  link = {
    title: cleanString(link.title),
    url: cleanUrl(link.url),
  };

  if (!link.url) {
    warning('Link is missing an URL');
  }
  if (!link.title) {
    warning('Link %s has no title.', link.url);
  }
  return link;
}

function cleanVote(vote: string | number): -2 | -1 | 0 | 1 | 2 {
  if (typeof vote === 'string') {
    try {
      vote = Number(vote);
    } catch (e) {
      throw Error(`Cannot cast vote '${vote}' as a number`);
    }
  }

  vote = Math.round(vote);
  if (vote < -2 || vote > 2) {
    throw Error(`Vote '${vote}' is out of bounds`);
  }
  return vote as -2 | -1 | 0 | 1 | 2;
}

function cleanClaim(claim: Claim): Claim {
  claim = {
    id: cleanId(claim.id),
    order: +claim.order,
    title: cleanString(claim.title),
    category: cleanId(claim.category),
    description: cleanString(claim.description),
    provenance:
      !claim.provenance || claim.provenance.length === 0
        ? []
        : claim.provenance.map((prov) => ({ claim: cleanString(prov.claim), description: cleanString(prov.description) })),
    links: !claim.links || claim.links.length === 0 ? [] : claim.links.map((link) => cleanNamedLink(link)).filter((link) => !!link),
  };

  if (!claim.id) {
    throw Error('Claim is missing an ID');
  }
  if (!claim.title) {
    throw Error(`Claim ${claim.id} has no title`);
  }
  if (!claim.category) {
    throw Error(`Claim ${claim.id} has no category`);
  }
  if (!claim.description) {
    warning('Claim %s has no description', claim.id);
  }
  if (!claim.provenance || claim.provenance.length === 0) {
    warning('Claim %s has no provenance', claim.id);
  } else if (claim.provenance.filter((prov) => !prov.claim).length > 0) {
    throw Error(`Claim ${claim.id} has incomplete provenance information.`);
  }

  return claim;
}

function cleanCategory(category: Category): Category {
  category = {
    id: cleanId(category.id),
    order: +category.order,
    title: cleanString(category.title),
    color: cleanColor(category.color),
  };

  if (!category.id) {
    throw Error(`Category is missing an ID`);
  }
  if (!category.title) {
    throw Error(`Category ${category.id} has no title`);
  }
  if (!category.color) {
    warning('Category %s has no color', category.id);
  }

  return category;
}

function cleanCandidate(candidate: Candidate, hasPositions: boolean): Candidate {
  candidate = {
    id: cleanId(candidate.id),
    publishPersonalInfo: candidate.publishPersonalInfo === true,
    listOrder: +candidate.listOrder,
    name: cleanString(candidate.name),
    party: cleanId(candidate.party),
    picture: cleanString(candidate.picture),
    links: !candidate.links
      ? {}
      : {
          blog: cleanUrl(candidate.links.blog) || undefined,
          twitter: cleanUrl(candidate.links.twitter) || undefined,
          facebook: cleanUrl(candidate.links.facebook) || undefined,
          instagram: cleanUrl(candidate.links.instagram) || undefined,
        },
    shortDescription: cleanString(candidate.shortDescription),
    description: cleanString(candidate.description),
    positions:
      !hasPositions || !candidate.positions || Object.getOwnPropertyNames(candidate.positions).length === 0
        ? {}
        : Object.getOwnPropertyNames(candidate.positions)
            .map((claim) => cleanId(claim))
            .filter((claim) => !!claim)
            .map((claim) => [claim, candidate.positions[claim]])
            .map(([claim, pos]: [string, VotePosition]) => [
              claim,
              {
                vote: cleanVote(pos.vote),
                reason: cleanString(pos.reason),
              } as VotePosition,
            ])
            .reduce((obj, [claim, pos]: [string, VotePosition]) => ({ ...obj, [claim]: pos }), {}),
  };

  if (!candidate.id) {
    throw Error(`Candidate is missing an ID`);
  }
  if (candidate.listOrder == null || isNaN(candidate.listOrder)) {
    // throw Error(`Candidate ${candidate.id} is missing a list order`);
    candidate.listOrder = 0;
  }
  if (!candidate.party) {
    throw Error(`Candidate ${candidate.id} has no party`);
  }
  if (hasPositions) {
    if (!candidate.positions || Object.getOwnPropertyNames(candidate.positions).length === 0) {
      throw Error(`Candidate ${candidate.id} has no position votes`);
    }
    for (const claim of Object.getOwnPropertyNames(candidate.positions)) {
      if (!candidate.positions[claim].reason) {
        warning('Candidate %s has no reason for vote of claim %s', candidate.id, claim);
      }
    }
  }

  if (candidate.publishPersonalInfo === true) {
    // some checks only make sense, when the candidate agreed to publish personal info
    if (!candidate.name) {
      throw Error(`Candidate ${candidate.id} has no name`);
    }
    if (!candidate.picture) {
      warning('Candidate %s has no picture', candidate.id);
    }
    if (!candidate.links || Object.getOwnPropertyNames(candidate.links).length === 0) {
      warning('Candidate %s has no links', candidate.id);
    }
    if (!candidate.shortDescription) {
      warning('Candidate %s has no short description', candidate.id);
    }
    if (!candidate.description) {
      warning('Candidate %s has no description', candidate.id);
    }
  }

  return candidate;
}

function cleanParty(party: Party, hasPositions: boolean): Party {
  party = {
    id: cleanId(party.id),
    name: cleanString(party.name),
    color: cleanColor(party.color),
    picture: cleanString(party.picture),
    links: !party.links
      ? {}
      : {
          blog: cleanUrl(party.links.blog) || undefined,
          twitter: cleanUrl(party.links.twitter) || undefined,
          facebook: cleanUrl(party.links.facebook) || undefined,
          instagram: cleanUrl(party.links.instagram) || undefined,
        },
    shortDescription: cleanString(party.shortDescription),
    description: cleanString(party.description),
    positions:
      !hasPositions || !party.positions || Object.getOwnPropertyNames(party.positions).length === 0
        ? {}
        : Object.getOwnPropertyNames(party.positions)
            .map((claim) => cleanId(claim))
            .filter((claim) => !!claim)
            .map((claim) => [claim, party.positions[claim]])
            .map(([claim, pos]: [string, VotePosition]) => [
              claim,
              {
                vote: cleanVote(pos.vote),
                reason: cleanString(pos.reason),
              } as VotePosition,
            ])
            .reduce((obj, [claim, pos]: [string, VotePosition]) => ({ ...obj, [claim]: pos }), {}),
  };

  if (!party.id) {
    throw Error(`Party is missing an ID`);
  }
  if (!party.name) {
    throw Error(`Party ${party.id} has no name`);
  }
  if (!party.color) {
    warning('Party %s has no color', party.id);
  }
  if (!party.picture) {
    warning('Party %s has no picture', party.id);
  }
  if (!party.links || Object.getOwnPropertyNames(party.links).length === 0) {
    warning('Party %s has no links', party.id);
  }
  if (!party.shortDescription) {
    warning('Party %s has no short description', party.description);
  }
  if (!party.description) {
    warning('Party %s has no description', party.description);
  }

  if (hasPositions) {
    if (!party.positions || Object.getOwnPropertyNames(party.positions).length === 0) {
      warning(`Party ${party.id} has no position votes`);
    }
    for (const claim of Object.getOwnPropertyNames(party.positions)) {
      if (!party.positions[claim].reason) {
        warning('Party %s has no reason for vote of claim %s', party.id, claim);
      }
    }
  }

  return party;
}

function compareDeep(features: [any, any][]): number {
  if (features.length === 0) {
    return 0;
  }

  const [a, b] = features[0];
  if (a === b || (a == null && b == null)) {
    // this feature is equal, so we need to go deeper
    return compareDeep(features.slice(1));
  } else if (a == null) {
    return -1;
  } else if (b == null) {
    return 1;
  } else {
    return a > b ? 1 : -1;
  }
}

function cleanData(data: DataDocument, positionedEntities: PositionedEntities): DataDocument {
  return {
    candidates: new Map<string, Candidate>(
      Array.from(data.candidates.values())
        .map((entry) => cleanCandidate(entry, positionedEntities.candidateHasPositions))
        .sort((a, b) =>
          compareDeep([
            [a.listOrder, b.listOrder],
            [a.id, b.id],
            [a.name, b.name],
          ]),
        )
        .map((entry) => [entry.id, entry]),
    ),
    categories: new Map<string, Category>(
      Array.from(data.categories.values())
        .map((entry) => cleanCategory(entry))
        .sort((a, b) =>
          compareDeep([
            [a.order, b.order],
            [a.id, b.id],
            [a.title, b.title],
          ]),
        )
        .map((entry) => [entry.id, entry]),
    ),
    claims: new Map<string, Claim>(
      Array.from(data.claims.values())
        .map((entry) => cleanClaim(entry))
        .sort((a, b) =>
          compareDeep([
            [a.order, b.order],
            [a.id, b.id],
            [a.title, b.title],
          ]),
        )
        .map((entry) => [entry.id, entry]),
    ),
    parties: new Map<string, Party>(
      Array.from(data.parties.values())
        .map((entry) => cleanParty(entry, positionedEntities.partyHasPositions))
        .map((entry) => [entry.id, entry]),
    ),
  };
}

function reWriteClaimOrderByCategory(data: DataDocument): Map<string, Claim> {
  log('Re-Write claim order numbers by category');
  const categoryCounter: { [key: string]: number } = {};

  return new Map<string, Claim>(
    Array.from(data.claims.values())
      .sort((a, b) =>
        compareDeep([
          [a.order, b.order],
          [a.id, b.id],
          [a.title, b.title],
        ]),
      )
      .map((entry) => {
        const order = categoryCounter[entry.category] || 0;
        categoryCounter[entry.category] = order + 1;
        return { ...entry, order };
      })
      .sort((a, b) =>
        compareDeep([
          [data.categories.get(a.category).order, data.categories.get(b.category).order],
          [a.order, b.order],
        ]),
      )
      .map((entry) => [entry.id, entry]),
  );
}

function validateClaimPositions(data: DataDocument, positions: { [claimId: string]: VotePosition }, entity: string): boolean {
  let valid = true;
  const answeredClaims = Object.getOwnPropertyNames(positions);
  const unknownClaims = answeredClaims.filter((value) => !data.claims.has(value));
  const unansweredClaims = Array.from(data.claims.keys()).filter((value) => !answeredClaims.includes(value));
  if (unknownClaims.length > 0) {
    valid = false;
    log('%s references unknown claims %s', entity, unknownClaims.join(', '));
  }
  if (unansweredClaims.length > 0) {
    valid = false;
    log('%s has not answered following claims %s', entity, unansweredClaims.join(', '));
  }
  return valid;
}

function validateIdRefs(data: DataDocument, positionedEntities: PositionedEntities): boolean {
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

    if (positionedEntities.candidateHasPositions) {
      if (!validateClaimPositions(data, candidate.positions, `Candidate ${candidate.id}`)) {
        valid = false;
      }
    }
  }

  // check party positions
  if (positionedEntities.partyHasPositions) {
    for (const party of data.parties.values()) {
      if (!validateClaimPositions(data, party.positions, `Party ${party.id}`)) {
        valid = false;
      }
    }
  }

  log(valid ? 'Document ok' : 'Invalid Document');
  return valid;
}

function shuffleIds(input: DataDocument, seed: string = '', positionedEntities: PositionedEntities): DataDocument {
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

    if (positionedEntities.candidateHasPositions) {
      const positions = {};
      for (const claim of Object.getOwnPropertyNames(entry.positions)) {
        positions[idTable.get(`claim:${claim}`)] = entry.positions[claim];
      }
      entry.positions = positions;
    }
    candidates.set(entry.id, entry);
  }
  for (const entry of input.parties.values()) {
    entry.id = idTable.get(`party:${entry.id}`);
    if (positionedEntities.partyHasPositions) {
      const positions = {};
      for (const claim of Object.getOwnPropertyNames(entry.positions)) {
        positions[idTable.get(`claim:${claim}`)] = entry.positions[claim];
      }
      entry.positions = positions;
    }
    parties.set(entry.id, entry);
  }

  return {
    claims,
    candidates,
    categories,
    parties,
  };
}

async function processPicture(inputPath: string, inputFile: string, outputPath: string, id: string): Promise<string> {
  try {
    const fileName = `${id}.jpg`;
    log('Transform picture: %s', inputFile);
    await sharp(joinPath(inputPath, inputFile))
      .flatten({ background: IMAGE_BACKGROUND })
      .resize({ ...IMAGE_DIMENSIONS, fit: 'cover', position: sharp.strategy.entropy, withoutEnlargement: true })
      .jpeg({ quality: IMAGE_QUALITY, progressive: true })
      .toFile(joinPath(outputPath, fileName));
    return fileName;
  } catch (e) {
    log('Error while processing picture of %s', id);
    throw e;
  }
}

async function processCandidatePictures(data: DataDocument, input: string, output: string): Promise<DataDocument> {
  for (const candidate of data.candidates.values()) {
    if (candidate.publishPersonalInfo !== true) {
      log('Skip image processing for %s', candidate.id);
      continue;
    }
    if (!candidate.picture) {
      log('Candidate %s has no picture.', candidate.id);
      candidate.picture = null;
      continue;
    }

    candidate.picture = await processPicture(input, candidate.picture, output, candidate.id);
  }

  return data;
}

async function processPartyPictures(data: DataDocument, input: string, output: string): Promise<DataDocument> {
  for (const party of data.parties.values()) {
    if (!party.picture) {
      log('Party %s has no picture.', party.id);
      party.picture = null;
      continue;
    }

    party.picture = await processPicture(input, party.picture, output, party.id);
  }

  return data;
}

function generatePoliticalJson(data: DataDocument, positionedEntities: PositionedEntities): { [key: string]: any } {
  return {
    categories: Array.from(data.categories.values()).reduce((obj, entry) => ({ ...obj, [entry.id]: { ...entry, id: undefined } }), {}),
    parties: Array.from(data.parties.values()).reduce(
      (obj, entry) => ({
        ...obj,
        [entry.id]: { ...entry, id: undefined, positions: positionedEntities.partyHasPositions ? entry.positions : undefined },
      }),
      {},
    ),
    claims: Array.from(data.claims.values()).reduce((obj, entry) => ({ ...obj, [entry.id]: { ...entry, id: undefined } }), {}),
    candidates: Array.from(data.candidates.values()).reduce(
      (obj, entry) => ({
        ...obj,
        [entry.id]: {
          party: entry.party,
          listOrder: entry.listOrder,
          positions: positionedEntities.candidateHasPositions ? entry.positions : undefined,
        },
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
    .option('rewrite-order', {
      description: 'Re-Writes order for claims, grouped by their category',
      type: 'boolean',
    })
    .option('positioned-entities', {
      alias: 'p',
      description: 'Which entities can provide positions',
      type: 'string',
      choices: ['parties', 'candidates', 'both'],
      default: 'parties',
    })
    .help()
    .alias('help', 'h')
    .parse(process.argv.slice(3));

  if (!argv.input || !argv.output) {
    log('Input and output options must be set. Run --help for more information.');
    return;
  }
  if (!argv['positioned-entities'] || ['parties', 'candidates', 'both'].includes(argv['positioned-entities']) === false) {
    log('"positioned-entities" must be one of parties, candidates, both.');
    return;
  }
  const positionedEntities: PositionedEntities = {
    partyHasPositions: argv['positioned-entities'] === 'parties' || argv['positioned-entities'] === 'both',
    candidateHasPositions: argv['positioned-entities'] === 'candidates' || argv['positioned-entities'] === 'both',
  };

  const docs = readAllYamlFiles(argv.input);
  let data = unifyDocs(docs, argv.merge);
  data = cleanData(data, positionedEntities);
  if (!validateIdRefs(data, positionedEntities)) {
    log('ID reference check failed.');
    // process.exit(1);
  }

  if (argv['anonymize-ids'] === true) {
    data = shuffleIds(data, argv.seed, positionedEntities);
    if (!validateIdRefs(data, positionedEntities)) {
      log('ID reference check failed.');
      // process.exit(1);
    }
  }

  if (argv['rewrite-order'] === true) {
    data.claims = reWriteClaimOrderByCategory(data);
  }

  mkdirSync(argv.output, { recursive: true });
  data = await processCandidatePictures(data, argv.input, argv.output);
  data = await processPartyPictures(data, argv.input, argv.output);
  writeFileSync(
    joinPath(argv.output, 'political.json'),
    JSON.stringify(generatePoliticalJson(data, positionedEntities), undefined, argv.minify === true ? 0 : 2),
  );
  writeFileSync(
    joinPath(argv.output, 'personal.json'),
    JSON.stringify(generatePersonalJson(data), undefined, argv.minify === true ? 0 : 2),
  );
}

main();
