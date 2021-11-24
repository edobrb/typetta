import { PartialDeep, Primitive } from 'type-fest'

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type Truetizer<P> = P extends true
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