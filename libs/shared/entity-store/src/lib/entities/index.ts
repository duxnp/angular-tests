import * as fromQuote from './quote';
import * as fromUnit from './unit';

export const entityMetadata = { ...fromQuote.entityMetadata };

export const pluralNames = { ...fromQuote.pluralName };

// export * from './quote';
export { fromQuote, fromUnit };

export * from './selectors';
