import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  normalizeRoot,
  Pluralizer,
} from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class AppHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(private pluralize: Pluralizer) {
    super(pluralize);
  }

  public override getResourceUrls(
    entityName: string,
    root: string
  ): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      // Normally the @ngrx/data package would remove leading and trailing slashes
      // I supposed to reduce bug reports, but I need the root to look like a relative URL to Angular
      // const nRoot = normalizeRoot(root);
      const nRoot = root;

      // Replace capital letters with themselves preceded by '-'
      // but skip the beginning of the string.
      // https://stackoverflow.com/a/47836484
      // https://stackoverflow.com/a/15669590
      const hyphenatedEntity = entityName.replace(
        /(?!^)[A-Z]/g,
        (m) => '-' + m
      );

      const hyphenatedCollection = this.pluralize
        .pluralize(entityName)
        .replace(/(?!^)[A-Z]/g, (m) => '-' + m);

      resourceUrls = {
        entityResourceUrl: `${nRoot}/${hyphenatedEntity}/`.toLowerCase(),
        collectionResourceUrl:
          `${nRoot}/${hyphenatedCollection}/`.toLowerCase(),
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
