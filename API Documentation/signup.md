# Signup

**URL**: `/signup`

**Method**: `POST`

**Authentication**: No

**Data Constraints**

Provide name, email, and password for creation of account.

```json
{
  "name": "[Unicode 1120 chars max]",
  "email": "[valid email]",
  "password": "[unicode 1120 chars max]"
}
```

**Data Example** All the fields are required

```json
{
  "name": "diy",
  "email": "diy@sheep.com",
  "password": "happysheep"
}
```

## Success Response

**Condition** : If all fields are valid and no previous email used before

**Code** :`201 CREATED`

**Content Example**

```json
{
  "id": 132456,
  "name": "diy",
  "url": "/user/[id]"
}
```

## Error Response

**Conditions**: If account already exists for User

**Code** : `417 Failed Dependency`

**Content Example** :

```json
{
  "creation_error": "[Account already exists]"
}
```

### Or

**Conditions**: If fields are missings

**Code**: `404 BAD REQUEST`

**Conent Example**

```json
{
  "name": "[required]",
  "email": "[invalid email, required]",
  "password": "[required, too short]"
}
```
