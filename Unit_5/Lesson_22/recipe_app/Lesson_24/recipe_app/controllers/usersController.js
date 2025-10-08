const User = require("../models/users");
const passport = require("passport");
const { body, validationResult } = require('express-validator');

//Listing 22.3
const getUserParams = body => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        zipCode: body.zipCode
    };
};

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

    //Listing 22.6
    indexView: (req, res) => {
        res.render("users/index", {
            flashMessages: {
                success: "Loaded all users!"
            }
        });
    },

    //Listing 19.2
    new: (req, res) => {
        res.render("users/new");
    },

    //Listing 24.4
    create: (req, res, next) => {
        if (req.skip) return next();
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.fullName}'s account created successfully!`);
                res.locals.redirect = "/users";
                next();
            } else {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    //Listing 19.7
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("users/show");
    },

    //Listing 20.6
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", {
                    user: user
                });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = {
                name: {
                    first: req.body.first,
                    last: req.body.last
                },
                email: req.body.email,
                password: req.body.password,
                zipCode: req.body.zipCode
            };
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    },

    // Listing 20.9
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndDelete(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },

    // Listing 23.3
    login: (req, res) => {
        res.render("users/login");
    },

    // Listing 24.5
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
        req.logout(err => {
            if (err) return next(err);
            req.flash("success", "You have successfully logged out!");
            res.locals.redirect = "/";
            next();
        });
    },

    //listing 23.7
    validate: [
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Email is invalid'),

        body('zipCode')
            .notEmpty()
            .withMessage('Zip code cannot be empty')
            .isInt()
            .withMessage('Zip code must be a number')
            .isLength({ min: 5, max: 5 })
            .withMessage('Zip code must be exactly 5 digits'),

        body('password')
            .notEmpty()
            .withMessage('Password cannot be empty'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const messages = errors.array().map(e => e.msg);
                req.skip = true;
                req.flash('error', messages.join(' and '));
                res.locals.redirect = '/users/new';
                return next();
            }
            next();
        }
    ]
};