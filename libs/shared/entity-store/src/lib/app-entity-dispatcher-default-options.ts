import { Injectable } from '@angular/core';
import { EntityDispatcherDefaultOptions } from '@ngrx/data';

/**
 * Default options for EntityDispatcher behavior
 * such as whether `add()` is optimistic or pessimistic by default.
 * An optimistic save modifies the collection immediately and before saving to the server.
 * A pessimistic save modifies the collection after the server confirms the save was successful.
 * This class initializes the defaults to the safest values.
 * Provide an alternative to change the defaults for all entity collections.
 */
@Injectable()
export class AppEntityDispatcherDefaultOptions extends EntityDispatcherDefaultOptions {
  /** True if added entities are saved optimistically; false if saved pessimistically. */
  override optimisticAdd = false;
  /** True if deleted entities are saved optimistically; false if saved pessimistically. Default was true */
  override optimisticDelete = false;
  /** True if updated entities are saved optimistically; false if saved pessimistically. */
  override optimisticUpdate = false;
  /** True if upsert entities are saved optimistically; false if saved pessimistically. */
  override optimisticUpsert = false;
  /** True if entities in a cache saveEntities request are saved optimistically; false if saved pessimistically. */
  override optimisticSaveEntities = false;
}
