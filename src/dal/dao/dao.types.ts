import { DefaultModelScalars } from '../..'
import { AbstractDAOContext } from '../daoContext/daoContext'
import { DAOAssociation } from './associations/associations.types'
import { DAOMiddleware } from './middlewares/middlewares.types'
import { AnyProjection, ModelProjection } from './projections/projections.types'
import { Schema } from './schemas/schemas.types'
import { PartialDeep } from 'type-fest'

export type RequestArgs<Filter, Sort> = {
  start?: number
  limit?: number
  filter?: Filter
  sorts?: Sort[]
}

export type ReferenceChecksResponse<T> =
  | true
  | {
      association: DAOAssociation
      record: PartialDeep<T>
      failedReferences: any[]
    }[]

export type DAOResolver = {
  load: (parents: any[], projections: any) => Promise<any[]>
  match: (source: any, value: any) => boolean
}

export type FilterParams<T extends DAOGenerics> = {
  filter?: T['filter']
  metadata?: T['metadata']
  options?: T['driverFilterOptions']
}

export type FindOneParams<T extends DAOGenerics, P = T['projection']> = Omit<FilterParams<T>, 'options'> & {
  projection?: P
  options?: T['driverFindOptions']
}
export type FindParams<T extends DAOGenerics, P = T['projection']> = FindOneParams<T, P> & {
  start?: number
  limit?: number
  sorts?: T['sort'][]
}

export type InsertParams<T extends DAOGenerics> = {
  record: T['insert']
  metadata?: T['metadata']
  options?: T['driverInsertOptions']
}

export type UpdateParams<T extends DAOGenerics> = {
  filter: T['filter']
  changes: T['update']
  metadata?: T['metadata']
  options?: T['driverUpdateOptions']
}

export type ReplaceParams<T extends DAOGenerics> = {
  filter: T['filter']
  replace: T['insert']
  metadata?: T['metadata']
  options?: T['driverReplaceOptions']
}

export type DeleteParams<T extends DAOGenerics> = {
  filter: T['filter']
  metadata?: T['metadata']
  options?: T['driverDeleteOptions']
}

export type DAOParams<T extends DAOGenerics> = {
  idField: T['idKey']
  idScalar: T['idScalar']
  idGeneration: T['idGeneration']
  idGenerator?: () => T['idScalar'][T['idScalar']]
  daoContext: AbstractDAOContext<T['scalars'], T['metadata']>
  schema: Schema<T['scalars']>
  metadata?: T['metadata']
  driverContext: T['driverContext']
  pageSize?: number
  associations?: DAOAssociation[]
  middlewares?: DAOMiddleware<T>[]
}

export type MiddlewareContext<T extends DAOGenerics> = { schema: Schema<T['scalars']>; idField: T['idKey']; driver: T['driverContext'] } // TODO: add DAOContext? How?

export type IdGenerationStrategy = 'user' | 'db' | 'generator'

export interface DAO<T extends DAOGenerics> {
  findAll<P extends AnyProjection<T['projection']>>(params?: FindParams<T>): Promise<ModelProjection<T['model'], T['projection'], P>[]>
  findOne<P extends AnyProjection<T['projection']>>(params?: FindOneParams<T>): Promise<ModelProjection<T['model'], T['projection'], P> | null>
  findPage<P extends AnyProjection<T['projection']>>(params?: FindParams<T>): Promise<{ totalCount: number; records: ModelProjection<T['model'], T['projection'], P>[] }>
  exists(params: FilterParams<T>): Promise<boolean>
  count(params?: FilterParams<T>): Promise<number>
  checkReferences(records: PartialDeep<T['model']> | PartialDeep<T['model']>[], metadata?: T['metadata']): Promise<ReferenceChecksResponse<T['model']>>
  insertOne(params: InsertParams<T>): Promise<Omit<T['model'], T['exludedFields']>>
  updateOne(params: UpdateParams<T>): Promise<void>
  updateAll(params: UpdateParams<T>): Promise<void>
  replaceOne(params: ReplaceParams<T>): Promise<void>
  deleteOne(params: DeleteParams<T>): Promise<void>
  deleteAll(params: DeleteParams<T>): Promise<void>
}

export type DAOGenerics<
  ModelType extends object = any,
  IDKey extends keyof Omit<ModelType, ExcludedFields> = any,
  IDScalar extends keyof ScalarsType = any,
  IdGeneration extends IdGenerationStrategy = any,
  FilterType = any,
  ProjectionType extends object = any,
  SortType = any,
  InsertType extends object = any,
  UpdateType = any,
  ExcludedFields extends keyof ModelType = any,
  MetadataType = any,
  DriverContext = any,
  ScalarsType extends DefaultModelScalars = any,
  DriverFilterOptions = any,
  DriverFindOptions = any,
  DriverInsertOptions = any,
  DriverUpdateOptions = any,
  DriverReplaceOptions = any,
  DriverDeleteOptions = any
> = {
  model: ModelType
  idKey: IDKey
  idScalar: IDScalar
  idGeneration: IdGeneration
  filter: FilterType
  projection: ProjectionType
  sort: SortType
  insert: InsertType
  update: UpdateType
  exludedFields: ExcludedFields
  metadata: MetadataType
  driverContext: DriverContext
  scalars: ScalarsType

  driverFilterOptions: DriverFilterOptions
  driverFindOptions: DriverFindOptions
  driverInsertOptions: DriverInsertOptions
  driverUpdateOptions: DriverUpdateOptions
  driverReplaceOptions: DriverReplaceOptions
  driverDeleteOptions: DriverDeleteOptions
}
