# LibraryCatalog
Library Inventory and Reservation System: Proof of Concept


# Running the Server locally

- `pipenv shell`
- `pipenv install`
- `cd circulation_desk`
- `./manage.py migrate`
- `./manage.py loaddata loaddata.json`
- `./manage.py runserver`

```
If any errors attempt to install these two packages as well:
- pip install django-filter
- pip install graphene_django_extras
```

# Running the React Client locally

- `cd circulation_desk/library_portal`
- `yarn install`
- `yarn start`
