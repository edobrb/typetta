import { PartialDeep, Primitive } from 'type-fest'

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type AnyProjection<ModelType> = true | StaticProjection<ModelType> | undefined | Projection<ModelType>

/**
 * Generic definition of projection.
 */
export type GenericProjection = { [key: string]: GenericProjection } | true | false

/**
 * Projection of a model.
 */
export type Projection<T> = true | RecursiveProjection<T>
type RecursiveProjection<T> = T extends (infer U)[]
  ? boolean | RecursiveProjection<U>
  : T extends object
  ? {
      [P in keyof T]?: boolean | RecursiveProjection<T[P]>
    }
  : boolean

/**
 * Generic definition of projection with only true values.
 */
export type StaticGenericProjection = { [key: string]: StaticGenericProjection } | true

/**
 * Projection of a model. Keys can only be true or sub-projection
 */
export type StaticProjection<T> = T extends (infer U)[] ? true | StaticProjection<U> : T extends object ? { [P in keyof T]?: true | StaticProjection<T[P]> } : true

/**
 * Given two GenericProjection with an explicit type (eg. const p1: {a: true} = ...) defined at compilation time,
 * this merge the two giving an explicit type at compilation time.
 */
export type MergeGenericProjection<T1 extends GenericProjection, T2 extends GenericProjection> = T1 extends true
  ? T1
  : T2 extends true
  ? T2
  : T1 extends false
  ? T2
  : T2 extends false
  ? T1
  : Expand<{
      [K in keyof T1 | keyof T2]: T1 extends Record<K, any> ? (T2 extends Record<K, any> ? MergeGenericProjection<T1[K], T2[K]> : T1[K]) : T2 extends Record<K, any> ? T2[K] : never
    }>

/**
 * Given a model M and a projection P returns the mapepd model to the projection.
 * If a StaticProjection was given the projection information is carried at compilation time by this type.
 * It is used as return type in all the finds operations.
 */
export type ModelProjection<M, P extends StaticProjection<M> | Projection<M> | true | undefined> = P extends true
  ? M & { __projection: 'all' }
  : P extends undefined
  ? M & { __projection: 'all' }
  : P extends StaticProjection<M>
  ? Expand<StaticModelProjection<M, P>>
  : PartialDeep<M> & { __projection: 'unknown' }

/**
 * Given a model M and a StaticProjection P returns the mapepd model to the projection.
 * It should be used as projector in function parameters.
 */
export type ParamProjection<M, P extends StaticProjection<M>> = Expand<StaticModelProjectionParam<M, P>>

/**
 * Given a model M and a StaticProjection with an explicit type (eg. const p1: {a: true} = ...)
 * returns the mapped model to the projection. This carry the information about the projection at compilation time.
 */
type StaticModelProjection<M, P extends StaticProjection<M>> = M extends null
  ? null
  : M extends undefined
  ? undefined
  : M extends Primitive
  ? never
  : M extends (infer U)[]
  ? P extends StaticProjection<U>
    ? StaticModelProjection<U, P>[]
    : never
  : M extends object
  ? Expand<
      OmitUndefinedAndNeverKeys<{
        [K in keyof M]: P extends Record<K, true> ? M[K] : P extends Record<K, StaticProjection<M[K]>> ? StaticModelProjection<M[K], P[K]> : never
      }>
    > & { __projection: P }
  : never

/**
 * Given a model M and a StaticProjection with an explicit type (eg. const p1: {a: true} = ...)
 * returns the mapped model to the projection. This carry the information about the potentially required projection at compilation time.
 */
type StaticModelProjectionParam<M, P extends StaticProjection<M>> = M extends null
  ? null
  : M extends undefined
  ? undefined
  : M extends Primitive
  ? never
  : M extends (infer U)[]
  ? P extends StaticProjection<U>
    ? StaticModelProjectionParam<U, P>[]
    : never
  : M extends object
  ? Expand<
      OmitUndefinedAndNeverKeys<{
        [K in keyof M]: P extends Record<K, true> ? M[K] : P extends Record<K, StaticProjection<M[K]>> ? StaticModelProjectionParam<M[K], P[K]> : never
      }>
    > & { __projection?: P }
  : never

type Truetizer<P> = P extends true
  ? true
  : P extends object
  ? {
      [K in keyof P]: P[K] extends object ? Truetizer<P[K]> : never | P[K] | true
    }
  : never /* | true*/

/**
 * Expands object types recursively.
 */
export type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T

/**
 * Expands object types one level deep
 * https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type KeyOfType<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? never : K
}[keyof T]

export type KeyOfTypeStrict<T extends object, V> = {
  [K in keyof T]: V extends T[K] ? never : K
}[keyof T]

export type OmitUndefinedAndNeverKeys<T> = T extends object ? Pick<T, KeyOfType<T, undefined>> : never

/*export type RemoveUndefined<A> = A extends object ? {
  [K in keyof A]-?: Exclude<A[K], undefined> extends object | null ? RemoveUndefined<Exclude<A[K], undefined>> : Exclude<A[K], undefined>
} : A*/