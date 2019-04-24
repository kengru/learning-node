# Small Shop
### Creating an online shop with node.

#### Made with Node.js, Express and Pug as templating engine.

To test this, you need to:
- clone the repository
- use `npm install`
- create a `.env` file
- run `npm start`

The .env file must contain 4 variables:
PORT: which is the port it will run the app on localhost.
MONGO_URI: the mongodb connection uri.
SENDGRID_KEY: a [sendgrid](https://sendgrid.com/) key to send reset password emails to the user.
STRIPE_API_KEY: a [stripe](https://stripe.com/) key for payments.