import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'markdown',
  pure: true
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value && value.length > 0) {
      return DOMPurify.sanitize(marked.parseInline(value));
    }
    return value;
  }

}
