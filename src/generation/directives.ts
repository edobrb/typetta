export enum Directives {
  ID = 'id',
  ENTITY = 'entity',
  MONGO = 'mongodb',
  SQL = 'sql',
  EMBEDDED = 'embedded',
  INNER_REF = 'innerRef',
  FOREIGN_REF = 'foreignRef',
  RELATION_ENTITY_REF = 'relationEntityRef',
  EXCLUDE = 'exclude',
  ALIAS = 'alias',
  QUANTITY_SCALAR = 'quantitative',
  STRING_SCALAR = 'textual',
}

export const DIRECTIVES = `
  type RefPointer = { refFrom: String!, refTo: String }
  directive @${Directives.ID}(from: String) on FIELD_DEFINITION
  directive @${Directives.ENTITY} on OBJECT
  directive @${Directives.MONGO}(collection: String, source: String) on OBJECT
  directive @${Directives.SQL}(table: String, source: String) on OBJECT
  directive @${Directives.EMBEDDED} on FIELD_DEFINITION
  directive @${Directives.INNER_REF}(refFrom: String, refTo: String) on FIELD_DEFINITION
  directive @${Directives.FOREIGN_REF}(refFrom: String, refTo: String) on FIELD_DEFINITION
  directive @${Directives.RELATION_ENTITY_REF}(entity: String!, refThis: RefPointer, refOther: RefPointer) on FIELD_DEFINITION
  directive @${Directives.EXCLUDE} on OBJECT | FIELD_DEFINITION
  directive @${Directives.QUANTITY_SCALAR} on SCALAR
  directive @${Directives.STRING_SCALAR} on SCALAR
`