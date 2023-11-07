# ExpressShoppingList
In this exercise, we will work Routing &amp; Middleware using Express. Also, testing with Jest and Supertest.

Use this list of ***items*** in your routes and test files.

Your application should have the following routes:

1. ***GET /items*** - this should render a list of shopping items.

Here is what a response looks like:

**[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**

1. ***POST /items*** - this route should accept JSON data and add it to the shopping list.

Here is what a sample request/response looks like:

**{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**

1. ***GET /items/:name*** - this route should display a single item’s name and price.

Here is what a sample response looks like:

**{“name”: “popsicle”, “price”: 1.45}**

1. ***PATCH /items/:name***, this route should modify a single item’s name and/or price.

Here is what a sample request/response looks like:

**{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**

1. ***DELETE /items/:name*** - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

**{message: “Deleted”}**

Please make use of the [Express Router](https://expressjs.com/en/guide/routing.html#express.Router).
