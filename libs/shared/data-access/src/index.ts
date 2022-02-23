export * from './lib/shared-data-access.module';

import * as RootFeature from './lib/+state/root.reducer';
import * as RootSelectors from './lib/+state/root.selectors';

export { RootFeature, RootSelectors };

export * from './lib/+state/root.models';
