const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");
mongoose.connect(
"mongodb://localhost:27017/recipe_db",
{useNewUrlParser: true}
);
mongoose.Promise = global.Promise;

Subscriber.create({
  name: "Jon",
  email: "jon@jonwexler.com",
  zipCode: "12345"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Jon"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });
Subscriber.create({
  name: "Jack",
  email: "jack@j.com",
  zipCode: "12345"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Jack"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });
Subscriber.create({
  name: "Paul",
  email: "Paul@p.com",
  zipCode: "121"
  })
  .then(subscriber => console.log(subscriber))
  .catch(error => console.log(error.message));
  var subscriber;
  Subscriber.findOne({
  name: "Paul"
  }).then(result => {
  subscriber = result;
  console.log(subscriber.getInfo());
  });