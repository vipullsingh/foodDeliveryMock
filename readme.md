## FOOD Delivery App Backend

**User Registration**
Endpoint: `POST /api/register`
Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zip": "12345"
  }
}
```

**User Login**
Endpoint: `POST /api/login`
Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Reset User Password**
Endpoint: `PUT /api/user/:id/reset`
Request Body:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Get All Restaurants**
Endpoint: `GET /api/restaurants`

**Get Restaurant Details**
Endpoint: `GET /api/restaurants/:id`
Replace `:id` with the ID of the specific restaurant you want to retrieve.

**Get Restaurant Menu**
Endpoint: `GET /api/restaurants/:id/menu`
Replace `:id` with the ID of the specific restaurant whose menu you want to retrieve.

**Add Item to Restaurant Menu**
Endpoint: `POST /api/restaurants/:id/menu`
Replace `:id` with the ID of the specific restaurant where you want to add the menu item.
Request Body:
```json
{
  "name": "New Item",
  "description": "Description of the new item",
  "price": 9.99,
  "image": "https://example.com/new-item.jpg"
}
```

**Delete Menu Item from Restaurant Menu**
Endpoint: `DELETE /api/restaurants/:id/menu/:itemId`
Replace `:id` with the ID of the specific restaurant and `:itemId` with the ID of the menu item you want to delete.

**Place an Order**
Endpoint: `POST /api/orders`
Request Body:
```json
{
  "user": "user_id",
  "restaurant": "restaurant_id",
  "items": [
    {
      "name": "Item 1",
      "price": 5.99,
      "quantity": 2
    },
    {
      "name": "Item 2",
      "price": 3.99,
      "quantity": 1
    }
  ],
  "totalPrice": 15.97,
  "deliveryAddress": {
    "street": "456 Main St",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zip": "54321"
  }
}
```
Replace `"user_id"` with the ID of the user and `"restaurant_id"` with the ID of the restaurant.

**Get Order Details**
Endpoint: `GET /api/orders/:id`
Replace `:id` with the ID of the specific order you want to retrieve.

**Update Order Status**
Endpoint: `PUT /api/orders/:id`
Replace `:id` with the ID of the specific order you want to update.
Request Body:
```json
{
  "status": "delivered"
}
```

Please note that you need to replace `"user_id"`, `"restaurant_id"`.

### User Details in Database: 

```json
{
  "_id": {
    "$oid": "64abaaecb9a9ae5d47f8722d"
  },
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "$2b$10$CrfRa9N9KIYrjsyNjuZQ2uIPEx/d97ysZ.W9on07AVCPBZnM6ntfy",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zip": "12345"
  },
  "__v": {
    "$numberInt": "0"
  }
}
```
### Restraunt Data

```json
{
  "_id": {
    "$oid": "64abade9412bcb8887ae0f3d"
  },
  "name": "Pizza Hut",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zip": "12345"
  },
  "menu": [
    {
      "name": "Margherita Pizza",
      "description": "Classic cheese pizza with tomato sauce",
      "price": {
        "$numberDouble": "9.99"
      },
      "image": "https://example.com/margherita-pizza.jpg"
    },
    {
      "name": "Pepperoni Pizza",
      "description": "Pizza topped with pepperoni and cheese",
      "price": {
        "$numberDouble": "11.99"
      },
      "image": "https://example.com/pepperoni-pizza.jpg"
    },
    {
      "name": "Vegetable Pizza",
      "description": "Pizza loaded with fresh vegetables",
      "price": {
        "$numberDouble": "10.99"
      },
      "image": "https://example.com/vegetable-pizza.jpg"
    }
  ]
}
```

