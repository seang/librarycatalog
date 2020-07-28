from django.contrib.auth import get_user_model

import graphene
from graphene_django import DjangoObjectType


class MemberType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class CreateMember(graphene.Mutation):
    member = graphene.Field(MemberType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        member = get_user_model()(
            username=username,
            email=email
        )

        member.set_password(password)
        member.save()
        return CreateMember(member=member)


class Mutation(graphene.ObjectType):
    create_member = CreateMember.Field()
