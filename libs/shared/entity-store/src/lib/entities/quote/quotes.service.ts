import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Quote, QuoteUtil } from '@ng-tests/shared/domain';

@Injectable({ providedIn: 'root' })
export class QuotesService extends EntityCollectionServiceBase<Quote> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Quote', elementsFactory);
  }

  /**
   * Convenience method to persist a quote conversion.
   * @param quote
   */
  convert(quote: Quote) {
    const quoteUtil = new QuoteUtil(quote);
    this.update(quoteUtil.getConverted());
  }
}
