import { deepMerge } from '../../../../utils/utils'
import { AnyProjection, GenericProjection, ModelProjection } from '../../projections/projections.types'
import { isProjectionIntersected } from '../../projections/projections.utils'
import { DAOMiddleware } from '../middlewares.types'
import { projectionDependency } from '../projectionDependency/projectionDependecy'
import { PartialDeep } from 'type-fest'
import { DAOGenerics } from '../../dao.types'

export function computedField<
  T extends DAOGenerics,
  P1 extends AnyProjection<T['projectionType']>,
  P2 extends AnyProjection<T['projectionType']>
>(args: {
  fieldsProjection: P2
  requiredProjection: P1
  compute: (record: ModelProjection<T['modelType'], T['projectionType'], P1>) => Promise<PartialDeep<T['modelType']>>
}): DAOMiddleware<T> {
  return {
    beforeFind: projectionDependency<T, P1, P2>(args).beforeFind,
    afterFind: async (findParams, records) => {
      const computedRecords = []
      for (const record of records) {
        if (
          record &&
          isProjectionIntersected(findParams.projection ? (findParams.projection as GenericProjection) : true, args.fieldsProjection ? (args.fieldsProjection as GenericProjection) : true)
        ) {
          computedRecords.push(deepMerge(record, await args.compute(record as ModelProjection<T['modelType'], T['projectionType'], P1>)))
        }
      }
      return computedRecords
    },
  }
}
