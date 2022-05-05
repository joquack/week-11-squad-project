# Login

Used to register an individual

**URL** : `/login`

**Method** : `POST`

**Authentication** : `No`

**Data Constraints**

```json
{
  "email": "[valid email addresss]",
  "password": "[password in plain text]"
}
```

**Data Example**

```json
{
  "username": "happysheep",
  "password": "happysheep"
}
```

## Success Response

**Code** : `200 OK`

**Content Example**

```json
{
  "session_id": "whateverisgenerated",
  "csrf": "anotherrandom"
}
```

## Error Response

**Conditions** : If either 'username' or 'password' is incorrect

**Content** :

```json
{
  "login_error": "Unable to login. Try again!"
}
```
