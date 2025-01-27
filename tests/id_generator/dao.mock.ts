import { DAOMiddleware, Coordinates, UserInputDriverDataTypeAdapterMap, Schema, AbstractDAOContext, LogicalOperators, QuantityOperators, EqualityOperators, StringOperators, ElementOperators, OneKey, SortDirection, overrideRelations, userInputDataTypeAdapterToDataTypeAdapter, LogFunction, LogInput, logInputToLogger, ParamProjection, DAOGenerics, CRUDPermission, DAOContextSecurtyPolicy, createSecurityPolicyMiddlewares, SelectProjection, mergeProjections, AbstractInMemoryDAO, InMemoryDAOGenerics, InMemoryDAOParams } from '../../src'
import * as types from './models.mock'
import { KnexJsDAOGenerics, KnexJsDAOParams, AbstractKnexJsDAO } from '../../src'
import { Knex } from 'knex'
import { MongoDBDAOGenerics, MongoDBDAOParams, AbstractMongoDBDAO } from '../../src'
import { Collection, Db, Filter, Sort, UpdateFilter, Document } from 'mongodb'

//--------------------------------------------------------------------------------
//-------------------------------------- A ---------------------------------------
//--------------------------------------------------------------------------------

export type AExcludedFields = never
export type ARelationFields = never

export function aSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'MongoID', 
      required: true, 
      alias: '_id'
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type AFilterFields = {
  'id'?: types.Scalars['MongoID'] | null | EqualityOperators<types.Scalars['MongoID']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type AFilter = AFilterFields & LogicalOperators<AFilterFields | ARawFilter>
export type ARawFilter = () => Filter<Document>

export type ARelations = Record<never, string>

export type AProjection = {
  id?: boolean,
  value?: boolean,
}
export type AParam<P extends AProjection> = ParamProjection<types.A, AProjection, P>

export type ASortKeys = 'id' | 'value'
export type ASort = OneKey<ASortKeys, SortDirection>
export type ARawSort = () => Sort

export type AUpdate = {
  'id'?: types.Scalars['MongoID'],
  'value'?: types.Scalars['Int']
}
export type ARawUpdate = () => UpdateFilter<Document>

export type AInsert = {
  value: types.Scalars['Int'],
}

type ADAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.A, 'id', 'MongoID', AFilter, ARawFilter, ARelations, AProjection, ASort, ARawSort, AInsert, AUpdate, ARawUpdate, AExcludedFields, ARelationFields, MetadataType, OperationMetadataType, types.Scalars, 'a', DAOContext<MetadataType, OperationMetadataType>>
export type ADAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<ADAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryADAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<ADAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class ADAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<ADAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AProjection, P2 extends AProjection>(p1: P1, p2: P2): SelectProjection<AProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<AProjection, P1, P2>
  }
  
  public constructor(params: ADAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: aSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'MongoID' 
    })
  }
  }

export class InMemoryADAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<ADAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends AProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends AProjection, P2 extends AProjection>(p1: P1, p2: P2): SelectProjection<AProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<AProjection, P1, P2>
  }
  
  public constructor(params: InMemoryADAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: aSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'MongoID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//-------------------------------------- B ---------------------------------------
//--------------------------------------------------------------------------------

export type BExcludedFields = never
export type BRelationFields = never

export function bSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type BFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type BFilter = BFilterFields & LogicalOperators<BFilterFields | BRawFilter>
export type BRawFilter = () => Filter<Document>

export type BRelations = Record<never, string>

export type BProjection = {
  id?: boolean,
  value?: boolean,
}
export type BParam<P extends BProjection> = ParamProjection<types.B, BProjection, P>

export type BSortKeys = 'id' | 'value'
export type BSort = OneKey<BSortKeys, SortDirection>
export type BRawSort = () => Sort

export type BUpdate = {
  'id'?: types.Scalars['ID'],
  'value'?: types.Scalars['Int']
}
export type BRawUpdate = () => UpdateFilter<Document>

export type BInsert = {
  id?: null | types.Scalars['ID'],
  value: types.Scalars['Int'],
}

type BDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.B, 'id', 'ID', BFilter, BRawFilter, BRelations, BProjection, BSort, BRawSort, BInsert, BUpdate, BRawUpdate, BExcludedFields, BRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'b', DAOContext<MetadataType, OperationMetadataType>>
export type BDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<BDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryBDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<BDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class BDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<BDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends BProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends BProjection, P2 extends BProjection>(p1: P1, p2: P2): SelectProjection<BProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<BProjection, P1, P2>
  }
  
  public constructor(params: BDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: bSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryBDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<BDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends BProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends BProjection, P2 extends BProjection>(p1: P1, p2: P2): SelectProjection<BProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<BProjection, P1, P2>
  }
  
  public constructor(params: InMemoryBDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: bSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//-------------------------------------- C ---------------------------------------
//--------------------------------------------------------------------------------

export type CExcludedFields = never
export type CRelationFields = never

export function cSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type CFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type CFilter = CFilterFields & LogicalOperators<CFilterFields | CRawFilter>
export type CRawFilter = () => Filter<Document>

export type CRelations = Record<never, string>

export type CProjection = {
  id?: boolean,
  value?: boolean,
}
export type CParam<P extends CProjection> = ParamProjection<types.C, CProjection, P>

export type CSortKeys = 'id' | 'value'
export type CSort = OneKey<CSortKeys, SortDirection>
export type CRawSort = () => Sort

export type CUpdate = {
  'id'?: types.Scalars['ID'],
  'value'?: types.Scalars['Int']
}
export type CRawUpdate = () => UpdateFilter<Document>

export type CInsert = {
  id: types.Scalars['ID'],
  value: types.Scalars['Int'],
}

type CDAOGenerics<MetadataType, OperationMetadataType> = MongoDBDAOGenerics<types.C, 'id', 'ID', CFilter, CRawFilter, CRelations, CProjection, CSort, CRawSort, CInsert, CUpdate, CRawUpdate, CExcludedFields, CRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'c', DAOContext<MetadataType, OperationMetadataType>>
export type CDAOParams<MetadataType, OperationMetadataType> = Omit<MongoDBDAOParams<CDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryCDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<CDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class CDAO<MetadataType, OperationMetadataType> extends AbstractMongoDBDAO<CDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends CProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends CProjection, P2 extends CProjection>(p1: P1, p2: P2): SelectProjection<CProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<CProjection, P1, P2>
  }
  
  public constructor(params: CDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: cSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryCDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<CDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends CProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends CProjection, P2 extends CProjection>(p1: P1, p2: P2): SelectProjection<CProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<CProjection, P1, P2>
  }
  
  public constructor(params: InMemoryCDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: cSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//-------------------------------------- D ---------------------------------------
//--------------------------------------------------------------------------------

export type DExcludedFields = never
export type DRelationFields = never

export function dSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'IntAutoInc', 
      required: true
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type DFilterFields = {
  'id'?: types.Scalars['IntAutoInc'] | null | EqualityOperators<types.Scalars['IntAutoInc']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type DFilter = DFilterFields & LogicalOperators<DFilterFields | DRawFilter>
export type DRawFilter = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type DRelations = Record<never, string>

export type DProjection = {
  id?: boolean,
  value?: boolean,
}
export type DParam<P extends DProjection> = ParamProjection<types.D, DProjection, P>

export type DSortKeys = 'id' | 'value'
export type DSort = OneKey<DSortKeys, SortDirection>
export type DRawSort = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type DUpdate = {
  'id'?: types.Scalars['IntAutoInc'],
  'value'?: types.Scalars['Int']
}
export type DRawUpdate = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type DInsert = {
  value: types.Scalars['Int'],
}

type DDAOGenerics<MetadataType, OperationMetadataType> = KnexJsDAOGenerics<types.D, 'id', 'IntAutoInc', DFilter, DRawFilter, DRelations, DProjection, DSort, DRawSort, DInsert, DUpdate, DRawUpdate, DExcludedFields, DRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'd', DAOContext<MetadataType, OperationMetadataType>>
export type DDAOParams<MetadataType, OperationMetadataType> = Omit<KnexJsDAOParams<DDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryDDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<DDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class DDAO<MetadataType, OperationMetadataType> extends AbstractKnexJsDAO<DDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DProjection, P2 extends DProjection>(p1: P1, p2: P2): SelectProjection<DProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<DProjection, P1, P2>
  }
  
  public constructor(params: DDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: dSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'IntAutoInc' 
    })
  }
  }

export class InMemoryDDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<DDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends DProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends DProjection, P2 extends DProjection>(p1: P1, p2: P2): SelectProjection<DProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<DProjection, P1, P2>
  }
  
  public constructor(params: InMemoryDDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: dSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'IntAutoInc' 
    })
  }
  }



//--------------------------------------------------------------------------------
//-------------------------------------- E ---------------------------------------
//--------------------------------------------------------------------------------

export type EExcludedFields = never
export type ERelationFields = never

export function eSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type EFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type EFilter = EFilterFields & LogicalOperators<EFilterFields | ERawFilter>
export type ERawFilter = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type ERelations = Record<never, string>

export type EProjection = {
  id?: boolean,
  value?: boolean,
}
export type EParam<P extends EProjection> = ParamProjection<types.E, EProjection, P>

export type ESortKeys = 'id' | 'value'
export type ESort = OneKey<ESortKeys, SortDirection>
export type ERawSort = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type EUpdate = {
  'id'?: types.Scalars['ID'],
  'value'?: types.Scalars['Int']
}
export type ERawUpdate = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type EInsert = {
  id?: null | types.Scalars['ID'],
  value: types.Scalars['Int'],
}

type EDAOGenerics<MetadataType, OperationMetadataType> = KnexJsDAOGenerics<types.E, 'id', 'ID', EFilter, ERawFilter, ERelations, EProjection, ESort, ERawSort, EInsert, EUpdate, ERawUpdate, EExcludedFields, ERelationFields, MetadataType, OperationMetadataType, types.Scalars, 'e', DAOContext<MetadataType, OperationMetadataType>>
export type EDAOParams<MetadataType, OperationMetadataType> = Omit<KnexJsDAOParams<EDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryEDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<EDAOGenerics<MetadataType, OperationMetadataType>>, 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class EDAO<MetadataType, OperationMetadataType> extends AbstractKnexJsDAO<EDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends EProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends EProjection, P2 extends EProjection>(p1: P1, p2: P2): SelectProjection<EProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<EProjection, P1, P2>
  }
  
  public constructor(params: EDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: eSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryEDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<EDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends EProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends EProjection, P2 extends EProjection>(p1: P1, p2: P2): SelectProjection<EProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<EProjection, P1, P2>
  }
  
  public constructor(params: InMemoryEDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: eSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'generator', 
      idScalar: 'ID' 
    })
  }
  }



//--------------------------------------------------------------------------------
//-------------------------------------- F ---------------------------------------
//--------------------------------------------------------------------------------

export type FExcludedFields = never
export type FRelationFields = never

export function fSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'value': {
      scalar: 'Int', 
      required: true
    }
  }
}

type FFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'value'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type FFilter = FFilterFields & LogicalOperators<FFilterFields | FRawFilter>
export type FRawFilter = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type FRelations = Record<never, string>

export type FProjection = {
  id?: boolean,
  value?: boolean,
}
export type FParam<P extends FProjection> = ParamProjection<types.F, FProjection, P>

export type FSortKeys = 'id' | 'value'
export type FSort = OneKey<FSortKeys, SortDirection>
export type FRawSort = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type FUpdate = {
  'id'?: types.Scalars['ID'],
  'value'?: types.Scalars['Int']
}
export type FRawUpdate = (builder: Knex.QueryBuilder<any, any>) => Knex.QueryBuilder<any, any>

export type FInsert = {
  id: types.Scalars['ID'],
  value: types.Scalars['Int'],
}

type FDAOGenerics<MetadataType, OperationMetadataType> = KnexJsDAOGenerics<types.F, 'id', 'ID', FFilter, FRawFilter, FRelations, FProjection, FSort, FRawSort, FInsert, FUpdate, FRawUpdate, FExcludedFields, FRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'f', DAOContext<MetadataType, OperationMetadataType>>
export type FDAOParams<MetadataType, OperationMetadataType> = Omit<KnexJsDAOParams<FDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>
export type InMemoryFDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<FDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class FDAO<MetadataType, OperationMetadataType> extends AbstractKnexJsDAO<FDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends FProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends FProjection, P2 extends FProjection>(p1: P1, p2: P2): SelectProjection<FProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<FProjection, P1, P2>
  }
  
  public constructor(params: FDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: fSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }

export class InMemoryFDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<FDAOGenerics<MetadataType, OperationMetadataType>> {  
  
  public static projection<P extends FProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends FProjection, P2 extends FProjection>(p1: P1, p2: P2): SelectProjection<FProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<FProjection, P1, P2>
  }
  
  public constructor(params: InMemoryFDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: fSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'user', 
      idScalar: 'ID' 
    })
  }
  }


export type DAOContextParams<MetadataType, OperationMetadataType, Permissions extends string, SecurityDomain extends object> = {
  metadata?: MetadataType
  middlewares?: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  overrides?: { 
    a?: Pick<Partial<ADAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    b?: Pick<Partial<BDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    c?: Pick<Partial<CDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    d?: Pick<Partial<DDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    e?: Pick<Partial<EDAOParams<MetadataType, OperationMetadataType>>, 'idGenerator' | 'middlewares' | 'metadata'>,
    f?: Pick<Partial<FDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>
  },
  mongodb: Record<'a' | 'default', Db | 'mock'>,
  knex: Record<'default', Knex | 'mock'>,
  scalars?: UserInputDriverDataTypeAdapterMap<types.Scalars, 'both'>,
  log?: LogInput<'a' | 'b' | 'c' | 'd' | 'e' | 'f'>,
  security?: DAOContextSecurtyPolicy<DAOGenericsMap<MetadataType, OperationMetadataType>, OperationMetadataType, Permissions, SecurityDomain>
}

type DAOContextMiddleware<MetadataType = never, OperationMetadataType = never> = DAOMiddleware<DAOGenericsUnion<MetadataType, OperationMetadataType>>

export class DAOContext<MetadataType = never, OperationMetadataType = never, Permissions extends string = never, SecurityDomain extends object = never> extends AbstractDAOContext<types.Scalars, MetadataType>  {

  private _a: ADAO<MetadataType, OperationMetadataType> | undefined
  private _b: BDAO<MetadataType, OperationMetadataType> | undefined
  private _c: CDAO<MetadataType, OperationMetadataType> | undefined
  private _d: DDAO<MetadataType, OperationMetadataType> | undefined
  private _e: EDAO<MetadataType, OperationMetadataType> | undefined
  private _f: FDAO<MetadataType, OperationMetadataType> | undefined
  
  private overrides: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>['overrides']
  private mongodb: Record<'a' | 'default', Db | 'mock'>
  private knex: Record<'default', Knex | 'mock'>
  
  private middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  
  private logger?: LogFunction<'a' | 'b' | 'c' | 'd' | 'e' | 'f'>
  
  get a() : ADAO<MetadataType, OperationMetadataType> {
    if(!this._a) {
      const db = this.mongodb.a
      this._a = db === 'mock' ? (new InMemoryADAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.a, middlewares: [...(this.overrides?.a?.middlewares || []), ...selectMiddleware('a', this.middlewares) as DAOMiddleware<ADAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'a', logger: this.logger }) as unknown as ADAO<MetadataType, OperationMetadataType>) : new ADAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.a, collection: db.collection('as'), middlewares: [...(this.overrides?.a?.middlewares || []), ...selectMiddleware('a', this.middlewares) as DAOMiddleware<ADAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'a', logger: this.logger })
    }
    return this._a
  }
  get b() : BDAO<MetadataType, OperationMetadataType> {
    if(!this._b) {
      const db = this.mongodb.default
      this._b = db === 'mock' ? (new InMemoryBDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.b, middlewares: [...(this.overrides?.b?.middlewares || []), ...selectMiddleware('b', this.middlewares) as DAOMiddleware<BDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'b', logger: this.logger }) as unknown as BDAO<MetadataType, OperationMetadataType>) : new BDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.b, collection: db.collection('bs'), middlewares: [...(this.overrides?.b?.middlewares || []), ...selectMiddleware('b', this.middlewares) as DAOMiddleware<BDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'b', logger: this.logger })
    }
    return this._b
  }
  get c() : CDAO<MetadataType, OperationMetadataType> {
    if(!this._c) {
      const db = this.mongodb.default
      this._c = db === 'mock' ? (new InMemoryCDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.c, middlewares: [...(this.overrides?.c?.middlewares || []), ...selectMiddleware('c', this.middlewares) as DAOMiddleware<CDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'c', logger: this.logger }) as unknown as CDAO<MetadataType, OperationMetadataType>) : new CDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.c, collection: db.collection('cs'), middlewares: [...(this.overrides?.c?.middlewares || []), ...selectMiddleware('c', this.middlewares) as DAOMiddleware<CDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'c', logger: this.logger })
    }
    return this._c
  }
  get d() : DDAO<MetadataType, OperationMetadataType> {
    if(!this._d) {
      const db = this.knex.default
      this._d = db === 'mock' ? (new InMemoryDDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.d, middlewares: [...(this.overrides?.d?.middlewares || []), ...selectMiddleware('d', this.middlewares) as DAOMiddleware<DDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'd', logger: this.logger }) as unknown as DDAO<MetadataType, OperationMetadataType>) : new DDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.d, knex: db, tableName: 'ds', middlewares: [...(this.overrides?.d?.middlewares || []), ...selectMiddleware('d', this.middlewares) as DAOMiddleware<DDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'd', logger: this.logger })
    }
    return this._d
  }
  get e() : EDAO<MetadataType, OperationMetadataType> {
    if(!this._e) {
      const db = this.knex.default
      this._e = db === 'mock' ? (new InMemoryEDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.e, middlewares: [...(this.overrides?.e?.middlewares || []), ...selectMiddleware('e', this.middlewares) as DAOMiddleware<EDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'e', logger: this.logger }) as unknown as EDAO<MetadataType, OperationMetadataType>) : new EDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.e, knex: db, tableName: 'es', middlewares: [...(this.overrides?.e?.middlewares || []), ...selectMiddleware('e', this.middlewares) as DAOMiddleware<EDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'e', logger: this.logger })
    }
    return this._e
  }
  get f() : FDAO<MetadataType, OperationMetadataType> {
    if(!this._f) {
      const db = this.knex.default
      this._f = db === 'mock' ? (new InMemoryFDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.f, middlewares: [...(this.overrides?.f?.middlewares || []), ...selectMiddleware('f', this.middlewares) as DAOMiddleware<FDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'f', logger: this.logger }) as unknown as FDAO<MetadataType, OperationMetadataType>) : new FDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.f, knex: db, tableName: 'fs', middlewares: [...(this.overrides?.f?.middlewares || []), ...selectMiddleware('f', this.middlewares) as DAOMiddleware<FDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'f', logger: this.logger })
    }
    return this._f
  }
  
  constructor(params: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>) {
    super({
      ...params,
      scalars: params.scalars ? userInputDataTypeAdapterToDataTypeAdapter(params.scalars, ['Decimal', 'IntAutoInc', 'JSON', 'MongoID', 'ID', 'String', 'Boolean', 'Int', 'Float']) : undefined
    })
    this.overrides = params.overrides
    this.mongodb = params.mongodb
    this.knex = params.knex
    this.middlewares = params.middlewares || []
    this.logger = logInputToLogger(params.log)
    if(params.security && params.security.applySecurity !== false) {
      const securityMiddlewares = createSecurityPolicyMiddlewares(params.security)
      const defaultMiddleware = securityMiddlewares.others ? [groupMiddleware.excludes(Object.fromEntries(Object.keys(securityMiddlewares.middlewares).map(k => [k, true])) as any, securityMiddlewares.others as any)] : []
      this.middlewares = [...(params.middlewares ?? []), ...defaultMiddleware, ...Object.entries(securityMiddlewares.middlewares).map(([name, middleware]) => groupMiddleware.includes({[name]: true} as any, middleware as any))]
    }
  }
  
  public async execQuery<T>(run: (dbs: { mongodb: Record<'a' | 'default', Db | 'mock'>, knex: Record<'default', Knex | 'mock'> }, entities: { a: Collection<Document> | null, b: Collection<Document> | null, c: Collection<Document> | null, d: Knex.QueryBuilder<any, unknown[]> | null, e: Knex.QueryBuilder<any, unknown[]> | null, f: Knex.QueryBuilder<any, unknown[]> | null }) => Promise<T>): Promise<T> {
    return run({ mongodb: this.mongodb, knex: this.knex }, { a: this.mongodb.a === 'mock' ? null : this.mongodb.a.collection('as'), b: this.mongodb.default === 'mock' ? null : this.mongodb.default.collection('bs'), c: this.mongodb.default === 'mock' ? null : this.mongodb.default.collection('cs'), d: this.knex.default === 'mock' ? null : this.knex.default.table('ds'), e: this.knex.default === 'mock' ? null : this.knex.default.table('es'), f: this.knex.default === 'mock' ? null : this.knex.default.table('fs') })
  }
  
  public async createTables(args: { typeMap?: Partial<Record<keyof types.Scalars, { singleType: string, arrayType?: string }>>, defaultType: { singleType: string, arrayType?: string } }): Promise<void> {
    this.d.createTable(args.typeMap ?? {}, args.defaultType)
    this.e.createTable(args.typeMap ?? {}, args.defaultType)
    this.f.createTable(args.typeMap ?? {}, args.defaultType)
  }

}


//--------------------------------------------------------------------------------
//------------------------------------- UTILS ------------------------------------
//--------------------------------------------------------------------------------

type DAOName = keyof DAOGenericsMap<never, never>
type DAOGenericsMap<MetadataType, OperationMetadataType> = {
  a: ADAOGenerics<MetadataType, OperationMetadataType>
  b: BDAOGenerics<MetadataType, OperationMetadataType>
  c: CDAOGenerics<MetadataType, OperationMetadataType>
  d: DDAOGenerics<MetadataType, OperationMetadataType>
  e: EDAOGenerics<MetadataType, OperationMetadataType>
  f: FDAOGenerics<MetadataType, OperationMetadataType>
}
type DAOGenericsUnion<MetadataType, OperationMetadataType> = DAOGenericsMap<MetadataType, OperationMetadataType>[DAOName]
type GroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> =
  | IncludeGroupMiddleware<N, MetadataType, OperationMetadataType>
  | ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>
type IncludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  include: { [K in N]: true }
  middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>
}
type ExcludeGroupMiddleware<N extends DAOName, MetadataType, OperationMetadataType> = {
  exclude: { [K in N]: true }
  middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[Exclude<DAOName, N>]>
}
export const groupMiddleware = {
  includes<N extends DAOName, MetadataType, OperationMetadataType>(
    include: { [K in N]: true },
    middleware: DAOMiddleware<DAOGenericsMap<MetadataType, OperationMetadataType>[N]>,
  ): IncludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { include, middleware }
  },
  excludes<N extends DAOName, MetadataType, OperationMetadataType>(
    exclude: { [K in N]: true },
    middleware: ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType>['middleware'],
  ): ExcludeGroupMiddleware<N, MetadataType, OperationMetadataType> {
    return { exclude, middleware }
  },
}
function selectMiddleware<MetadataType, OperationMetadataType>(
  name: DAOName,
  middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<DAOName, MetadataType, OperationMetadataType>)[],
): DAOContextMiddleware<MetadataType, OperationMetadataType>[] {
  return middlewares.flatMap((m) =>
    'include' in m
      ? Object.keys(m.include).includes(name)
        ? [m.middleware]
        : []
      : 'exclude' in m
      ? !Object.keys(m.exclude).includes(name)
        ? [m.middleware as DAOContextMiddleware<MetadataType, OperationMetadataType>]
        : []
      : [m],
  )
}
