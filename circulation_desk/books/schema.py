import graphene
from graphene import ObjectType
from graphene import Connection, Node, Int
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType
from graphene_django_extras.paginations import LimitOffsetGraphqlPagination

from .models import Book

class ExtendedConnection(Connection):
    class Meta:
        abstract = True

    total_count = Int()
    edge_count = Int()

    def resolve_total_count(self, root, info, **kwargs):
        return root.length
    def resolve_edge_count(self, root, info, **kwargs):
        return len(root.edges)


class Book_Node_Type(DjangoObjectType):
    class Meta:
        model = Book
        interfaces = (Node, )
        connection_class = ExtendedConnection
        filter_fields = []
        pagination = LimitOffsetGraphqlPagination()

class UpdateBook(graphene.Mutation):
    book = graphene.Field(Book_Node_Type)

    class Arguments:
        book_title = graphene.String(required=True)

    def mutate(self, info, book_title):
        book = Book.objects.get(title=book_title)
        book.reserved = not book.reserved
        book.save()

        return UpdateBook(book=book)


class Query(graphene.ObjectType):
    books = DjangoFilterConnectionField(Book_Node_Type,search=graphene.String())

    def resolve_books(self, info, search=None, **kwargs):
        if search:
            return Book.objects.filter(title__contains=search)
        return Book.objects.all()


class Mutation(graphene.ObjectType):
    update_book = UpdateBook.Field()