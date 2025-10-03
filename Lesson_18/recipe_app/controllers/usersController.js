const User = require("../models/users");

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(users => {
                users.forEach(user => {
                    console.log(`User: ${user.fullName}, Email: ${user.email}, Zip: ${user.zipCode}`);
                });
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("users/index");
    }
};