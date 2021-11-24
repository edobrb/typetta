import { PartialDeep } from 'type-fest';
import { DeleteParams, FindParams, InsertParams, ReplaceParams, UpdateParams } from '../dao.types';
import { AnyProjection, Projection } from '../projections/projections.types';

export type DAOMiddleware<
  ModelType,
  IDKey extends keyof Omit<ModelType, ExcludedFields>,
  IDAutogenerated extends boolean,
  FilterType,
  ProjectionType extends Projection<ModelType>,
  UpdateType,
  ExcludedFields extends keyof ModelType,
  SortType,
  OptionsType,
  > = {
    beforeFind?: <P extends AnyProjection<ModelType, ProjectionType>>(params: FindParams<FilterType, P, SortType, OptionsType>) => Promise<FindParams<FilterType, P, SortType, OptionsType>>
    afterFind?: <P extends AnyProjection<ModelType, ProjectionType>>(params: FindParams<FilterType, P, SortType, OptionsType>, result: PartialDeep<ModelType>) => Promise<PartialDeep<ModelType>>
    beforeInsert?: (params: InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>) => Promise<InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>>
    afterInsert?: (params: InsertParams<ModelType, IDKey, ExcludedFields, IDAutogenerated, OptionsType>, result: Omit<ModelType, ExcludedFields>) => Promise<Omit<ModelType, ExcludedFields>>
    beforeUpdate?: (params: UpdateParams<FilterType, UpdateType, OptionsType>) => Promise<UpdateParams<FilterType, UpdateType, OptionsType>>
    afterUpdate?: (params: UpdateParams<FilterType, UpdateType, OptionsType>) => Promise<void>
    beforeReplace?: (params: ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>) => Promise<ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>>
    afterReplace?: (params: ReplaceParams<FilterType, ModelType, ExcludedFields, OptionsType>) => Promise<void>
    beforeDelete?: (params: DeleteParams<FilterType, OptionsType>) => Promise<DeleteParams<FilterType, OptionsType>>
    afterDelete?: (params: DeleteParams<FilterType, OptionsType>) => Promise<void>
  }