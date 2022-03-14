import { MockDAOContextParams, createMockedDAOContext, DAOMiddleware, Coordinates, LocalizedString, UserInputDriverDataTypeAdapterMap, Schema, AbstractDAOContext, LogicalOperators, QuantityOperators, EqualityOperators, StringOperators, ElementOperators, OneKey, SortDirection, overrideRelations, userInputDataTypeAdapterToDataTypeAdapter, LogFunction, LogInput, logInputToLogger, ParamProjection, DAOGenerics, CRUDPermission, DAOContextSecurtyPolicy, createSecurityPolicyMiddlewares, SelectProjection, mergeProjections, AbstractInMemoryDAO, InMemoryDAOGenerics, InMemoryDAOParams } from '../../src'
import * as types from './models.mock'

//--------------------------------------------------------------------------------
//--------------------------------- CREDENTIALS ----------------------------------
//--------------------------------------------------------------------------------

export function credentialsSchema(): Schema<types.Scalars> {
  return {
    'password': {
      scalar: 'Password'
    },
    'username': {
      scalar: 'String'
    }
  }
}

export type CredentialsProjection = {
  password?: boolean,
  username?: boolean,
}
export type CredentialsParam<P extends CredentialsProjection> = ParamProjection<types.Credentials, CredentialsProjection, P>



//--------------------------------------------------------------------------------
//------------------------------------- POST -------------------------------------
//--------------------------------------------------------------------------------

export type PostExcludedFields = never
export type PostRelationFields = 'author' | 'tags'

export function postSchema(): Schema<types.Scalars> {
  return {
    'authorId': {
      scalar: 'ID', 
      required: true, 
      alias: 'aId'
    },
    'body': {
      scalar: 'String'
    },
    'clicks': {
      scalar: 'Int'
    },
    'createdAt': {
      scalar: 'DateTime', 
      required: true
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'metadata': { embedded: postMetadataSchema() },
    'title': {
      scalar: 'String', 
      required: true
    },
    'views': {
      scalar: 'Int', 
      required: true
    }
  }
}

type PostFilterFields = {
  'authorId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'body'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'clicks'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>,
  'createdAt'?: types.Scalars['DateTime'] | null | EqualityOperators<types.Scalars['DateTime']> | ElementOperators | QuantityOperators<types.Scalars['DateTime']>,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'metadata.region'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'metadata.typeId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'metadata.visible'?: types.Scalars['Boolean'] | null | EqualityOperators<types.Scalars['Boolean']> | ElementOperators,
  'title'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'views'?: types.Scalars['Int'] | null | EqualityOperators<types.Scalars['Int']> | ElementOperators | QuantityOperators<types.Scalars['Int']>
}
export type PostFilter = PostFilterFields & LogicalOperators<PostFilterFields | PostRawFilter>
export type PostRawFilter = never

export type PostRelations = {
  tags?: {
    filter?: TagFilter
    sorts?: TagSort[] | TagRawSort
    skip?: number
    limit?: number
    relations?: TagRelations
  }
}

export type PostProjection = {
  author?: UserProjection | boolean,
  authorId?: boolean,
  body?: boolean,
  clicks?: boolean,
  createdAt?: boolean,
  id?: boolean,
  metadata?: {
    region?: boolean,
    type?: PostTypeProjection | boolean,
    typeId?: boolean,
    visible?: boolean,
  } | boolean,
  tags?: TagProjection | boolean,
  title?: boolean,
  views?: boolean,
}
export type PostParam<P extends PostProjection> = ParamProjection<types.Post, PostProjection, P>

export type PostSortKeys = 'authorId' | 'body' | 'clicks' | 'createdAt' | 'id' | 'metadata.region' | 'metadata.typeId' | 'metadata.visible' | 'title' | 'views'
export type PostSort = OneKey<PostSortKeys, SortDirection>
export type PostRawSort = never

export type PostUpdate = {
  'authorId'?: types.Scalars['ID'],
  'body'?: types.Scalars['String'] | null,
  'clicks'?: types.Scalars['Int'] | null,
  'createdAt'?: types.Scalars['DateTime'],
  'id'?: types.Scalars['ID'],
  'metadata'?: types.PostMetadata | null,
  'metadata.region'?: types.Scalars['String'],
  'metadata.typeId'?: types.Scalars['ID'],
  'metadata.visible'?: types.Scalars['Boolean'],
  'title'?: types.Scalars['String'],
  'views'?: types.Scalars['Int']
}
export type PostRawUpdate = never

export type PostInsert = {
  authorId: types.Scalars['ID'],
  body?: types.Scalars['String'],
  clicks?: types.Scalars['Int'],
  createdAt: types.Scalars['DateTime'],
  metadata?: types.PostMetadata,
  title: types.Scalars['String'],
  views: types.Scalars['Int'],
}

type PostDAOGenerics<MetadataType, OperationMetadataType> = InMemoryDAOGenerics<types.Post, 'id', 'ID', 'db', PostFilter, PostRawFilter, PostRelations, PostProjection, PostSort, PostRawSort, PostInsert, PostUpdate, PostRawUpdate, PostExcludedFields, PostRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'post', DAOContext<MetadataType, OperationMetadataType>>
export type PostDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<PostDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class PostDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<PostDAOGenerics<MetadataType, OperationMetadataType>> {
  
  
  public static projection<P extends PostProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostProjection, P2 extends PostProjection>(p1: P1, p2: P2): SelectProjection<PostProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<PostProjection, P1, P2>
  }
  
  public constructor(params: PostDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postSchema(), 
      relations: overrideRelations(
        [
          { type: '1-1', reference: 'inner', field: 'author', refFrom: 'authorId', refTo: 'id', dao: 'user', required: false },
          { type: '1-1', reference: 'inner', field: 'metadata.type', refFrom: 'metadata.typeId', refTo: 'id', dao: 'postType', required: false },
          { type: '1-n', reference: 'foreign', field: 'tags', refFrom: 'postId', refTo: 'id', dao: 'tag', required: false }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  
}



//--------------------------------------------------------------------------------
//--------------------------------- POSTMETADATA ---------------------------------
//--------------------------------------------------------------------------------

export function postMetadataSchema(): Schema<types.Scalars> {
  return {
    'region': {
      scalar: 'String', 
      required: true
    },
    'typeId': {
      scalar: 'ID', 
      required: true
    },
    'visible': {
      scalar: 'Boolean', 
      required: true
    }
  }
}

export type PostMetadataProjection = {
  region?: boolean,
  type?: PostTypeProjection | boolean,
  typeId?: boolean,
  visible?: boolean,
}
export type PostMetadataParam<P extends PostMetadataProjection> = ParamProjection<types.PostMetadata, PostMetadataProjection, P>



//--------------------------------------------------------------------------------
//----------------------------------- POSTTYPE -----------------------------------
//--------------------------------------------------------------------------------

export type PostTypeExcludedFields = never
export type PostTypeRelationFields = never

export function postTypeSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String', 
      required: true
    }
  }
}

type PostTypeFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'name'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators
}
export type PostTypeFilter = PostTypeFilterFields & LogicalOperators<PostTypeFilterFields | PostTypeRawFilter>
export type PostTypeRawFilter = never

export type PostTypeRelations = Record<never, string>

export type PostTypeProjection = {
  id?: boolean,
  name?: boolean,
}
export type PostTypeParam<P extends PostTypeProjection> = ParamProjection<types.PostType, PostTypeProjection, P>

export type PostTypeSortKeys = 'id' | 'name'
export type PostTypeSort = OneKey<PostTypeSortKeys, SortDirection>
export type PostTypeRawSort = never

export type PostTypeUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String']
}
export type PostTypeRawUpdate = never

export type PostTypeInsert = {
  id: types.Scalars['ID'],
  name: types.Scalars['String'],
}

type PostTypeDAOGenerics<MetadataType, OperationMetadataType> = InMemoryDAOGenerics<types.PostType, 'id', 'ID', 'user', PostTypeFilter, PostTypeRawFilter, PostTypeRelations, PostTypeProjection, PostTypeSort, PostTypeRawSort, PostTypeInsert, PostTypeUpdate, PostTypeRawUpdate, PostTypeExcludedFields, PostTypeRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'postType', DAOContext<MetadataType, OperationMetadataType>>
export type PostTypeDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<PostTypeDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class PostTypeDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<PostTypeDAOGenerics<MetadataType, OperationMetadataType>> {
  
  
  public static projection<P extends PostTypeProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends PostTypeProjection, P2 extends PostTypeProjection>(p1: P1, p2: P2): SelectProjection<PostTypeProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<PostTypeProjection, P1, P2>
  }
  
  public constructor(params: PostTypeDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: postTypeSchema(), 
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
//------------------------------------- TAG --------------------------------------
//--------------------------------------------------------------------------------

export type TagExcludedFields = never
export type TagRelationFields = never

export function tagSchema(): Schema<types.Scalars> {
  return {
    'id': {
      scalar: 'ID', 
      required: true
    },
    'name': {
      scalar: 'String'
    },
    'postId': {
      scalar: 'ID', 
      required: true
    }
  }
}

type TagFilterFields = {
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'name'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'postId'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators
}
export type TagFilter = TagFilterFields & LogicalOperators<TagFilterFields | TagRawFilter>
export type TagRawFilter = never

export type TagRelations = Record<never, string>

export type TagProjection = {
  id?: boolean,
  name?: boolean,
  postId?: boolean,
}
export type TagParam<P extends TagProjection> = ParamProjection<types.Tag, TagProjection, P>

export type TagSortKeys = 'id' | 'name' | 'postId'
export type TagSort = OneKey<TagSortKeys, SortDirection>
export type TagRawSort = never

export type TagUpdate = {
  'id'?: types.Scalars['ID'],
  'name'?: types.Scalars['String'] | null,
  'postId'?: types.Scalars['ID']
}
export type TagRawUpdate = never

export type TagInsert = {
  name?: types.Scalars['String'],
  postId: types.Scalars['ID'],
}

type TagDAOGenerics<MetadataType, OperationMetadataType> = InMemoryDAOGenerics<types.Tag, 'id', 'ID', 'db', TagFilter, TagRawFilter, TagRelations, TagProjection, TagSort, TagRawSort, TagInsert, TagUpdate, TagRawUpdate, TagExcludedFields, TagRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'tag', DAOContext<MetadataType, OperationMetadataType>>
export type TagDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<TagDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class TagDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<TagDAOGenerics<MetadataType, OperationMetadataType>> {
  
  
  public static projection<P extends TagProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends TagProjection, P2 extends TagProjection>(p1: P1, p2: P2): SelectProjection<TagProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<TagProjection, P1, P2>
  }
  
  public constructor(params: TagDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: tagSchema(), 
      relations: overrideRelations(
        [
          
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  
}



//--------------------------------------------------------------------------------
//------------------------------------- USER -------------------------------------
//--------------------------------------------------------------------------------

export type UserExcludedFields = 'averageViewsPerPost' | 'totalPostsViews'
export type UserRelationFields = 'posts'

export function userSchema(): Schema<types.Scalars> {
  return {
    'createdAt': {
      scalar: 'DateTime', 
      required: true
    },
    'credentials': { embedded: credentialsSchema() },
    'email': {
      scalar: 'String'
    },
    'firstName': {
      scalar: 'String'
    },
    'id': {
      scalar: 'ID', 
      required: true
    },
    'lastName': {
      scalar: 'String'
    }
  }
}

type UserFilterFields = {
  'createdAt'?: types.Scalars['DateTime'] | null | EqualityOperators<types.Scalars['DateTime']> | ElementOperators | QuantityOperators<types.Scalars['DateTime']>,
  'credentials.password'?: types.Scalars['Password'] | null | EqualityOperators<types.Scalars['Password']> | ElementOperators | StringOperators,
  'credentials.username'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'email'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'firstName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators,
  'id'?: types.Scalars['ID'] | null | EqualityOperators<types.Scalars['ID']> | ElementOperators,
  'lastName'?: types.Scalars['String'] | null | EqualityOperators<types.Scalars['String']> | ElementOperators | StringOperators
}
export type UserFilter = UserFilterFields & LogicalOperators<UserFilterFields | UserRawFilter>
export type UserRawFilter = never

export type UserRelations = {
  posts?: {
    filter?: PostFilter
    sorts?: PostSort[] | PostRawSort
    skip?: number
    limit?: number
    relations?: PostRelations
  }
}

export type UserProjection = {
  averageViewsPerPost?: boolean,
  createdAt?: boolean,
  credentials?: {
    password?: boolean,
    username?: boolean,
  } | boolean,
  email?: boolean,
  firstName?: boolean,
  id?: boolean,
  lastName?: boolean,
  posts?: PostProjection | boolean,
  totalPostsViews?: boolean,
}
export type UserParam<P extends UserProjection> = ParamProjection<types.User, UserProjection, P>

export type UserSortKeys = 'createdAt' | 'credentials.password' | 'credentials.username' | 'email' | 'firstName' | 'id' | 'lastName'
export type UserSort = OneKey<UserSortKeys, SortDirection>
export type UserRawSort = never

export type UserUpdate = {
  'createdAt'?: types.Scalars['DateTime'],
  'credentials'?: types.Credentials,
  'credentials.password'?: types.Scalars['Password'] | null,
  'credentials.username'?: types.Scalars['String'] | null,
  'email'?: types.Scalars['String'] | null,
  'firstName'?: types.Scalars['String'] | null,
  'id'?: types.Scalars['ID'],
  'lastName'?: types.Scalars['String'] | null
}
export type UserRawUpdate = never

export type UserInsert = {
  createdAt: types.Scalars['DateTime'],
  credentials: types.Credentials,
  email?: types.Scalars['String'],
  firstName?: types.Scalars['String'],
  lastName?: types.Scalars['String'],
}

type UserDAOGenerics<MetadataType, OperationMetadataType> = InMemoryDAOGenerics<types.User, 'id', 'ID', 'db', UserFilter, UserRawFilter, UserRelations, UserProjection, UserSort, UserRawSort, UserInsert, UserUpdate, UserRawUpdate, UserExcludedFields, UserRelationFields, MetadataType, OperationMetadataType, types.Scalars, 'user', DAOContext<MetadataType, OperationMetadataType>>
export type UserDAOParams<MetadataType, OperationMetadataType> = Omit<InMemoryDAOParams<UserDAOGenerics<MetadataType, OperationMetadataType>>, 'idGenerator' | 'idField' | 'schema' | 'idScalar' | 'idGeneration'>

export class UserDAO<MetadataType, OperationMetadataType> extends AbstractInMemoryDAO<UserDAOGenerics<MetadataType, OperationMetadataType>> {
  
  
  public static projection<P extends UserProjection>(p: P) {
    return p
  }
  public static mergeProjection<P1 extends UserProjection, P2 extends UserProjection>(p1: P1, p2: P2): SelectProjection<UserProjection, P1, P2> {
    return mergeProjections(p1, p2) as SelectProjection<UserProjection, P1, P2>
  }
  
  public constructor(params: UserDAOParams<MetadataType, OperationMetadataType>){
    super({   
      ...params, 
      idField: 'id', 
      schema: userSchema(), 
      relations: overrideRelations(
        [
          { type: '1-n', reference: 'foreign', field: 'posts', refFrom: 'authorId', refTo: 'id', dao: 'post', required: false }
        ]
      ), 
      idGeneration: 'db', 
      idScalar: 'ID' 
    })
  }
  
}


export type DAOContextParams<MetadataType, OperationMetadataType, Permissions extends string, SecurityDomain extends object> = {
  metadata?: MetadataType
  middlewares?: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  overrides?: { 
    post?: Pick<Partial<PostDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    postType?: Pick<Partial<PostTypeDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    tag?: Pick<Partial<TagDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>,
    user?: Pick<Partial<UserDAOParams<MetadataType, OperationMetadataType>>, 'middlewares' | 'metadata'>
  },
  scalars?: UserInputDriverDataTypeAdapterMap<types.Scalars, 'knex'>,
  log?: LogInput<'post' | 'postType' | 'tag' | 'user'>,
  security?: DAOContextSecurtyPolicy<DAOGenericsMap<MetadataType, OperationMetadataType>, OperationMetadataType, Permissions, SecurityDomain>
}

type DAOContextMiddleware<MetadataType = never, OperationMetadataType = never> = DAOMiddleware<DAOGenericsUnion<MetadataType, OperationMetadataType>>

export class DAOContext<MetadataType = never, OperationMetadataType = never, Permissions extends string = never, SecurityDomain extends object = never> extends AbstractDAOContext<types.Scalars, MetadataType>  {

  private _post: PostDAO<MetadataType, OperationMetadataType> | undefined
  private _postType: PostTypeDAO<MetadataType, OperationMetadataType> | undefined
  private _tag: TagDAO<MetadataType, OperationMetadataType> | undefined
  private _user: UserDAO<MetadataType, OperationMetadataType> | undefined
  
  private overrides: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>['overrides']
  
  private middlewares: (DAOContextMiddleware<MetadataType, OperationMetadataType> | GroupMiddleware<any, MetadataType, OperationMetadataType>)[]
  
  private logger?: LogFunction<'post' | 'postType' | 'tag' | 'user'>
  
  get post() : PostDAO<MetadataType, OperationMetadataType> {
    if(!this._post) {
      this._post = new PostDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.post, middlewares: [...(this.overrides?.post?.middlewares || []), ...selectMiddleware('post', this.middlewares) as DAOMiddleware<PostDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'post', logger: this.logger })
    }
    return this._post
  }
  get postType() : PostTypeDAO<MetadataType, OperationMetadataType> {
    if(!this._postType) {
      this._postType = new PostTypeDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.postType, middlewares: [...(this.overrides?.postType?.middlewares || []), ...selectMiddleware('postType', this.middlewares) as DAOMiddleware<PostTypeDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'postType', logger: this.logger })
    }
    return this._postType
  }
  get tag() : TagDAO<MetadataType, OperationMetadataType> {
    if(!this._tag) {
      this._tag = new TagDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.tag, middlewares: [...(this.overrides?.tag?.middlewares || []), ...selectMiddleware('tag', this.middlewares) as DAOMiddleware<TagDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'tag', logger: this.logger })
    }
    return this._tag
  }
  get user() : UserDAO<MetadataType, OperationMetadataType> {
    if(!this._user) {
      this._user = new UserDAO({ daoContext: this, metadata: this.metadata, ...this.overrides?.user, middlewares: [...(this.overrides?.user?.middlewares || []), ...selectMiddleware('user', this.middlewares) as DAOMiddleware<UserDAOGenerics<MetadataType, OperationMetadataType>>[]], name: 'user', logger: this.logger })
    }
    return this._user
  }
  
  constructor(params: DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>) {
    super({
      ...params,
      scalars: params.scalars ? userInputDataTypeAdapterToDataTypeAdapter(params.scalars, ['DateTime', 'Decimal', 'JSON', 'Password', 'ID', 'String', 'Boolean', 'Int', 'Float']) : undefined
    })
    this.overrides = params.overrides
    this.middlewares = params.middlewares || []
    this.logger = logInputToLogger(params.log)
    if(params.security && params.security.applySecurity !== false) {
      const securityMiddlewares = createSecurityPolicyMiddlewares(params.security)
      const defaultMiddleware = securityMiddlewares.others ? [groupMiddleware.excludes(Object.fromEntries(Object.keys(securityMiddlewares.middlewares).map(k => [k, true])) as any, securityMiddlewares.others as any)] : []
      this.middlewares = [...(params.middlewares ?? []), ...defaultMiddleware, ...Object.entries(securityMiddlewares.middlewares).map(([name, middleware]) => groupMiddleware.includes({[name]: true} as any, middleware as any))]
    }
  }
  
  public async execQuery<T>(run: (dbs: {  }, entities: {  }) => Promise<T>): Promise<T> {
    return run({  }, {  })
  }
  
  

}


//--------------------------------------------------------------------------------
//------------------------------------- UTILS ------------------------------------
//--------------------------------------------------------------------------------

type DAOName = keyof DAOGenericsMap<never, never>
type DAOGenericsMap<MetadataType, OperationMetadataType> = {
  post: PostDAOGenerics<MetadataType, OperationMetadataType>
  postType: PostTypeDAOGenerics<MetadataType, OperationMetadataType>
  tag: TagDAOGenerics<MetadataType, OperationMetadataType>
  user: UserDAOGenerics<MetadataType, OperationMetadataType>
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
export async function mockedDAOContext<MetadataType = never, OperationMetadataType = never, Permissions extends string = never, SecurityDomain extends object = never>(params: MockDAOContextParams<DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>>) {
  const newParams = await createMockedDAOContext<DAOContextParams<MetadataType, OperationMetadataType, Permissions, SecurityDomain>>(params, ['default'], [])
  return new DAOContext(newParams)
}