import { PagedSelectors, Quote } from '@angular-tests/shared/domain';
import { EntitySelectorsFactory } from '@ngrx/data';
import { metadata } from './quote.metadata';

const selectors = new EntitySelectorsFactory().create<
  Quote,
  PagedSelectors<Quote>
>(metadata);
