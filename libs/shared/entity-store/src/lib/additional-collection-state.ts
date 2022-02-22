/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { EntityPage } from '@angular-tests/shared/domain';
import {
  DefaultPersistenceResultHandler,
  EntityAction,
  EntityCollection,
  EntityCollectionReducerMethodMap,
  EntityCollectionReducerMethods,
  EntityDefinition,
  EntityDefinitionService,
} from '@ngrx/data';
import { Action } from '@ngrx/store';

@Injectable()
export class AdditionalPersistenceResultHandler extends DefaultPersistenceResultHandler {
  override handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    // return a factory to get a data handler to
    // parse data from DataService and save to action.payload
    return (data: any) => {
      /** Default success action */
      const action = actionHandler.call(this, data);

      /** Get the extra properties I need first */
      if (action && data && data.current_page) {
        const page: EntityPage = {
          currentPage: data.current_page,
          nextPageUrl: data.next_page_url,
          pageIds: data.data?.map((entity: any) => entity?.id),
        };
        // (action as any).payload.currentPage = data.current_page;
        // (action as any).payload.nextPageUrl = data.next_page_url;
        (action as any).payload.page = page;
      }

      /** Finally, set the action.payload.data property */
      if (action && data && data.data) {
        (action as any).payload.data = data.data;
      }

      return action;
    };
  }
}

export class AdditionalEntityCollectionReducerMethods<
  T
> extends EntityCollectionReducerMethods<T> {
  constructor(
    public override entityName: string,
    public override definition: EntityDefinition<T>
  ) {
    super(entityName, definition);
  }

  protected override queryAllSuccess(
    collection: EntityCollection<T>,
    action: EntityAction<T[]>
  ): EntityCollection<T> {
    const ec = super.queryAllSuccess(collection, action);

    /** Save properties from action.payload to entityCollection instance */
    if ((action.payload as any).page) {
      (ec as any).page = (action.payload as any).page;
    }

    return ec;
  }

  protected override queryManySuccess(
    collection: EntityCollection<T>,
    action: EntityAction<T[]>
  ): EntityCollection<T> {
    const ec = super.queryManySuccess(collection, action);

    /** Save properties from action.payload to entityCollection instance */
    if ((action.payload as any).page) {
      // (ec as any).currentPage = (action.payload as any).currentPage;
      // (ec as any).nextPageUrl = (action.payload as any).nextPageUrl;
      // (ec as any).pageIds = action.payload.data?.map(
      //   (entity: any) => entity?.id
      // );

      (ec as any).page = (action.payload as any).page;
    }

    return ec;
  }
}

@Injectable()
export class AdditionalEntityCollectionReducerMethodsFactory {
  constructor(private entityDefinitionService: EntityDefinitionService) {}
  /** Create the  {EntityCollectionReducerMethods} for the named entity type */
  create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
    const definition =
      this.entityDefinitionService.getDefinition<T>(entityName);
    const methodsClass = new AdditionalEntityCollectionReducerMethods(
      entityName,
      definition
    );
    return methodsClass.methods;
  }
}
