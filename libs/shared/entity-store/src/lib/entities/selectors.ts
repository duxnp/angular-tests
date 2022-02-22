import {
  Company,
  PagedSelectors,
  Quote,
  Unit,
  User,
} from '@angular-tests/shared/domain';
import { EntitySelectorsFactory } from '@ngrx/data';
import { metadata as quoteMetadata } from './quote/quote.metadata';

export const companySelectors = new EntitySelectorsFactory().create<Company>(
  'Company'
);

export const quoteSelectors = new EntitySelectorsFactory().create<
  Quote,
  PagedSelectors<Quote>
>(quoteMetadata);

export const unitSelectors = new EntitySelectorsFactory().create<Unit>('Unit');

export const userSelectors = new EntitySelectorsFactory().create<User>('User');
