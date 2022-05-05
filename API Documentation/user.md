# Show Current User

Get the details of the currently Authenticated User along with basic information.

**URL** : `/user/${id}`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 123456 on the local database where that User has saved an email address and name information.

```json
{
  "id": 123456,
  "name": "happysheep",
  "email": "diy@diy.com",
  "hashedPassword": "bcryptPassword"
}
```
