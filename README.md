# LibraryCatalog
Library Inventory and Reservation System: Proof of Concept

● List all books in inventory (by default on page load) <br/>
● Allow searching of books by title (matching substrings) <br/>
● Allow reservation of books (and reservation cancellation) <br/>
● View books currently reserved <br/>

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


# To Do List
- Install and Configure Relay to make use of the of the server side Relay Protocol
- Preset filters for all reserved and all available
- Expand Member model to be linked to reservations
- Display current Member's reservations during active sessions
- Trigger results refresh after each reservation request to the backend
