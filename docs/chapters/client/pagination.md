# Pagination

Pagination of results can generally be done in two ways:

  - [Offset Pagination](#offset-pagination)
  - [Cursor pagination *[coming soon]*](#cursor-pagination-coming-soon)

## Offset Pagination

Offset pagination uses two `skip` and `limit` parameters to define which record to start from and limit the total number of results. The following reading allows you to retrieve 10 users starting from the third (thus skipping the first two).

```typescript
const users = await daoContext.user.findAll({
  skip: 2,
  limit: 10
})
```

## Cursor pagination *[coming soon]*

This feature is not yet available and is currently being designed.