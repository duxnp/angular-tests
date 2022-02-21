import { Injectable } from '@angular/core';
import { Quote, QuoteUtil } from '@hmi-doors/shared/domain';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

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
