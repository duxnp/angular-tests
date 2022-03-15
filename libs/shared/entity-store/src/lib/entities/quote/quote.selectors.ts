import { EntitySelectorsFactory } from '@ngrx/data';

import { PagedSelectors, Quote } from '@ng-tests/shared/domain';

import { metadata } from './quote.metadata';

const selectors = new EntitySelectorsFactory().create<
  Quote,
  PagedSelectors<Quote>
>(metadata);
