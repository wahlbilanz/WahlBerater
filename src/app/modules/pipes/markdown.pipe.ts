import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'markdown',
  pure: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, inline: boolean = true): string {
    if (value && value.length > 0) {
      console.log(value);
      if (inline) {
        return marked.parseInline(value);
      } else {
        return DOMPurify.sanitize(marked.parse(value));
      }
    }
    return value;
  }
}
