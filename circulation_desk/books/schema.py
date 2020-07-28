import graphene
from graphene_django import DjangoObjectType

from .models import Book


class BookType(DjangoObjectType):
    class Meta:
        model = Book


class UpdateBook(graphene.Mutation):
    book = graphene.Field(BookType)

    class Arguments:
        book_id = graphene.Int(required=True)

    def mutate(self, info, book_id):
        book = Book.objects.get(id=book_id)
        book.reserved = not book.reserved
        book.save()

        return UpdateBook(book=book)


class Query(graphene.ObjectType):
    books = graphene.List(BookType, search=graphene.String())

    def resolve_books(self, info, search=None):
        if search:
            return Book.objects.filter(title__contains=search)
        return Book.objects.all()


class Mutation(graphene.ObjectType):
    update_book = UpdateBook.Field()
