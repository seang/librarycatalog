import graphene
from graphene import Connection, ConnectionField, Node, Int
from graphene_django import DjangoObjectType

from .models import Book


class Book_Node_Type(DjangoObjectType):
    class Meta:
        model = Book
        interfaces = (Node, )

class Book_Connection(Connection):
  class Meta:
    node = Book_Node_Type
  count = Int()

  def resolve_count(self,root,info):
    return len(root.edges)

class UpdateBook(graphene.Mutation):
    book = graphene.Field(Book_Node_Type)

    class Arguments:
        book_id = Int(required=True)

    def mutate(self, info, book_id):
        book = Book.objects.get(id=book_id)
        book.reserved = not book.reserved
        book.save()

        return UpdateBook(book=book)


class Query(graphene.ObjectType):
    books = ConnectionField(Book_Connection, search=graphene.String())
    def resolve_books(self, info, search=None,**kwargs):
        if search:
            return Book.objects.filter(title__contains=search)
        return Book.objects.all()


class Mutation(graphene.ObjectType):
    update_book = UpdateBook.Field()
