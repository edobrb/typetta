import { LogicalOperators } from '..'
import { ElementOperators, EqualityOperators, QuantityOperators, StringOperators } from '../dal/dao/filters/filters.types'

type AbstractFilterFields = {
  [K in string]: Record<string, unknown> | null | EqualityOperators<unknown> | QuantityOperators<unknown> | ElementOperators | StringOperators
}
type Filter<FilterFields extends AbstractFilterFields> = LogicalOperators<FilterFields> & FilterFields

export const mock: { compare?: (l: unknown, r: unknown) => number | void | null | undefined } = {
  compare: undefined,
}

function compare(l: unknown, r: unknown): number {
  if (mock.compare) {
    const result = mock.compare(l, r)
    if(typeof result === 'number') {
      return result
    }
  }
  if ((typeof l === 'bigint' || typeof l === 'number') && (typeof r === 'bigint' || typeof r === 'number')) {
    return l > r ? 1 : l < r ? -1 : 0
  }
  if (typeof l === 'boolean' && typeof r === 'boolean') {
    return l === r ? 0 : 1
  }
  if (typeof l === 'string' && typeof r === 'string') {
    return l.localeCompare(r)
  }
  if (typeof l === 'symbol' && typeof r === 'symbol') {
    return l === r ? 0 : 1
  }
  if (l && typeof l === 'object' && typeof (l as any).equals === 'function') {
    return (l as any).equals(r) ? 0 : 1
  }
  return l === r ? 0 : 1
}

function equals(l: unknown, r: unknown): boolean {
  return compare(l, r) === 0
}

export function filterEntity<FilterFields extends AbstractFilterFields>(entity: unknown, filter: Filter<FilterFields> | undefined): boolean {
  if (!filter) {
    return true
  }
  return Object.entries(filter).every(([key, f]) => {
    const value = getByPath(entity, key)
    if (f && ('$and' in f || '$or' in f || '$not' in f || '$or' in f)) {
      const lo = f as LogicalOperators<FilterFields>
      const andResult = lo.$and ? lo.$and.map((f) => filterEntity(entity, f)).every((v) => v) : true
      const orResult = lo.$or ? lo.$or.map((f) => filterEntity(entity, f)).some((v) => v) : true
      const notResult = lo.$not ? !filterEntity(entity, lo.$not) : true
      const norResult = lo.$nor ? lo.$nor.map((f) => !filterEntity(entity, f)).some((v) => v) : true
      return andResult && orResult && notResult && norResult
    }
    if (f && ('$eq' in f || '$in' in f || '$ne' in f || '$nin' in f)) {
      const eo = f as EqualityOperators<unknown>
      const eqResult = eo.$eq ? equals(value, eo.$eq) : true
      const neResult = eo.$ne ? !equals(value, eo.$ne) : true
      const inResult = eo.$in ? eo.$in?.some((v) => equals(value, v)) : true
      const ninResult = eo.$nin ? eo.$nin?.every((v) => !equals(value, v)) : true
      return eqResult && neResult && inResult && ninResult
    }
    if (f && ('$gte' in f || '$gt' in f || '$lte' in f || '$lt' in f)) {
      const qo = f as QuantityOperators<unknown>
      const gteResult = qo.$gte ? compare(value, qo.$gte) >= 0 : true
      const gtResult = qo.$gt ? compare(value, qo.$gt) > 0 : true
      const lteResult = qo.$lte ? compare(value, qo.$lte) <= 0 : true
      const ltResult = qo.$lt ? compare(value, qo.$lt) < 0 : true
      return gteResult && gtResult && lteResult && ltResult
    }
    if (f && '$exists' in f) {
      const eo = f as ElementOperators
      return eo.$exists === true ? value !== undefined : value === undefined
    }
    if (f && ('$contains' in f || '$startsWith' in f || '$endsWith' in f)) {
      const so = f as StringOperators
      if (typeof value !== 'string') {
        throw new Error(`Can't use StringOperators to non-string field '${key}'`)
      }
      if ('$contains' in so) {
        return value.includes(so.$contains)
      }
      if ('$startsWith' in so) {
        return value.startsWith(so.$startsWith)
      }
      if ('$endsWith' in so) {
        return value.endsWith(so.$endsWith)
      }
    }
    return equals(value, f)
  })
}

function getByPath(object: unknown, path: string): unknown {
  const [key, ...tail] = path.split('.')
  if (object && typeof object === 'object') {
    const value = (object as { [K in string]: unknown })[key]
    if (tail.length > 0) {
      return getByPath(value, tail.join('.'))
    }
    return value
  }
  return undefined
}
