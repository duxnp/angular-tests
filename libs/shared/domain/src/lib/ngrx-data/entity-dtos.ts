import { BaseEntity } from './base-entity';

export type CreateEntityDto<T> = Partial<T>;

export type UpdateEntityDto<T extends BaseEntity> = Required<Pick<T, 'id'>> &
  Partial<Omit<T, 'id'>>;

export type DeleteEntityDto = number;
