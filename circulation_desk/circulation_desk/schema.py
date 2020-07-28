import graphene
import books.schema
import members.schema

class Query(books.schema.Query, graphene.ObjectType):
  pass

class Mutation(members.schema.Mutation, books.schema.Mutation, graphene.ObjectType):
  pass

schema = graphene.Schema(query=Query,mutation=Mutation)