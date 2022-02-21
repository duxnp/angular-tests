import { Injectable } from '@angular/core';
import { Company, Unit, User } from '@hmi-doors/shared/domain';
import { EntityServicesBase, EntityServicesElements } from '@ngrx/data';
import { fromQuote, fromUnit } from './entities';

@Injectable()
export class AppEntityServices extends EntityServicesBase {
  constructor(
    elements: EntityServicesElements,

    // Inject custom services, register them with the EntityServices, and expose in API.
    readonly quotesService: fromQuote.QuotesService,
    readonly unitsService: fromUnit.UnitsService
  ) {
    super(elements);
    this.registerEntityCollectionServices([quotesService, unitsService]);
  }

  /** get the (default) services for which you haven't made a custom service */
  // get quotesService() {
  //   return this.getEntityCollectionService<Quote>('Quote');
  // }
  get companiesService() {
    return this.getEntityCollectionService<Company>('Company');
  }

  // get unitsService() {
  //   return this.getEntityCollectionService<Unit>('Unit');
  // }

  get usersService() {
    return this.getEntityCollectionService<User>('User');
  }
}
