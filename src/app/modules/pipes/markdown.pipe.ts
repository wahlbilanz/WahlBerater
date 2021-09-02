import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import DOMPurify from 'dompurify';

function setLinkTarget(html: string) {
  return html.replace('<a ', '<a target="_blank"');
}

@Pipe({
  name: 'markdown',
  pure: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, inline: boolean = true): string {
    if (value && value.length > 0) {
      if (inline) {
        return setLinkTarget(DOMPurify.sanitize(marked.parseInline(value)));
      } else {
        return setLinkTarget(DOMPurify.sanitize(marked.parse(value)));
      }
    }
    return value;
  }
}
