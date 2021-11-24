import { DAOParams, FindParams, FindOneParams, FilterParams, InsertParams, UpdateParams, ReplaceParams, DeleteParams } from '../../../dao/dao.types'
import { PartialDeep } from 'type-fest'
import { AbstractDAOContext } from '../../../daoContext/daoContext'
import { AbstractDAO } from '../../../dao/dao'
import { AnyProjection, GenericProjection, Projection } from '../../../dao/projections/projections.types'
import { transformObject } from '../../../../generation/utils'
import { Schema } from '../../../dao/schemas/schemas.types'
import { Collection, Document, WithId, Filter, FindCursor } from 'mongodb'
import { MongoDBDAOParams } from './dao.mongodb.types'

export class AbstractMongoDBDAO<
  ModelType extends object,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDAutogenerated extends boolean,
  FilterType,
  ProjectionType extends Projection<ModelType>,
  SortType,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  OptionsType extends { mongoDB?: any },
  ScalarsType extends object,
  >
  extends AbstractDAO<
  ModelType,
  IDKey,
  IDAutogenerated,
  FilterType,
  ProjectionType,
  SortType,
  UpdateType,
  ExcludedFields,
  OptionsType,
  ScalarsType
  > {

  protected collection: Collection

  protected constructor({
    collection,
    ...params
  }:
    MongoDBDAOParams<
      ModelType,
      IDKey,
      IDAutogenerated,
      FilterType,
      ProjectionType,
      UpdateType,
      ExcludedFields,
      SortType,
      OptionsType,
      ScalarsType
    >) {
    super(params)
    this.collection = collection
  }

  // private dbToModel(objects: FindCursor<WithId<Document>>[]): PartialDeep<ModelType>[] {
  //   objects.
  //     return[]
  // }

  // private modelToDb<T>(object: T): T {
  // }

  // private buildSelect<P extends AnyProjection<ModelType, ProjectionType>>(projection?: P, qb?: Knex.QueryBuilder<any, any>): Knex.QueryBuilder<any, any> {
  // }

  // private buildFilter(filter?: FilterType): Filter<WithId<Document>> {
  //   // TODO
  //   return {}
  // }

  // private async getRecords<P extends AnyProjection<ModelType, ProjectionType>>(params: FindParams<FilterType, P, SortType, OptionsType>): Promise<PartialDeep<ModelType>[]> {
  // }

  protected async _find<P extends AnyProjection<ModelType, ProjectionType>>(params: FindParams<FilterType, P, SortType, OptionsType>): Promise<PartialDeep<ModelType>[]> {
    // TODO
    // return this.dbToModel(
    //   await this.collection.find(
    //     this.buildFilter(params.filter),
    //     {
    //       ...params.options?.mongoDB
    //     }
    //   ).toArray()
    // )
    return [];
  }

  protected async _findOne<P extends AnyProjection<ModelType, ProjectionType>>(params: FindOneParams<FilterType, P, OptionsType>): Promise<PartialDeep<ModelType> | null> {
    // TODO
    return null
  }

  protected async _findPage<P extends AnyProjection<ModelType, ProjectionType>>(params: FindParams<FilterType, P, SortType, OptionsType>): Promise<{ totalCount: number; records: PartialDeep<ModelType>[] }> {
    // TODO
    const totalCount = 0
    const records: any[] = []
    return { totalCount, records }
  }

  protected async _exists(params: FilterParams<FilterType, OptionsType>): Promise<boolean> {
    //
    return false
  }

  protected async _count(params: FilterParams<FilterType, OptionsType>): Promise<number> {
    // TODO
    return 0
  }

  protected async _insertOne(params: InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>): Promise<Omit<ModelType, ExcludedFields>> {
    // TODO
    return {} as any;
  }

  protected _updateOne(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void> {
    // TODO
    return new Promise(() => { });
  }

  protected async _updateMany(params: UpdateParams<FilterType, UpdateType, OptionsType>): Promise<void> {
    // TODO
    return new Promise(() => { });
  }

  protected _replaceOne(params: ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>): Promise<void> {
    return new Promise(() => { });
  }

  protected _deleteOne(params: DeleteParams<FilterType, OptionsType>): Promise<void> {
    // TODO
    return new Promise(() => { });
  }

  protected async _deleteMany(params: DeleteParams<FilterType, OptionsType>): Promise<void> {
    // TODO
    return new Promise(() => { });
  }
}
