const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Course = require("./models/course");

var testCourse, testSubscriber;

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/recipe_db", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Remove all subscribers to start fresh
Subscriber.deleteMany({})
  .then((items) => console.log(`Removed ${items.n} subscriber records!`))
  // Remove all courses to start fresh
  .then(() => {
    return Course.deleteMany({});
  })
  .then((items) => console.log(`Removed ${items.n} course records!`))
  // Create a new subscriber
  .then(() => {
    return Subscriber.create({
      name: "Paul",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  // Find the newly created subscriber and store it
  .then(() => {
    return Subscriber.findOne({ name: "Paul" });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  // Create a new course
  .then(() => {
    return Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "Grapes"]
    });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  // Add the course to the subscriber's courses array and save
  .then(() => {
    testSubscriber.courses.push(testCourse);
    return testSubscriber.save();
  })
  // Populate the subscriber's courses with full course documents
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  // Log the subscriber with full course details
  .then(subscriber => console.log(subscriber))
  // Find and log all subscribers enrolled in the created course
  .then(() => {
    return Subscriber.find({ courses: mongoose.Types.ObjectId(testCourse._id) });
  })
  .then(subscribers => console.log(subscribers));
