var db = require("../db.js")

let models = {

    userCreation(req, res) {
        let userEmail = req.body.email
        let mobileNumber = req.body.mobileNumber
        userEmail = userEmail.toLowerCase()
        db.User.find({}, (err, users) => {
            if (err) {
                res.send({ message: `unable to create user`, status: 400 })
            }
            else {
                let userlength = users.length
                let userrole = userlength == 0 ? "admin" : "user"
                db.User.find({ email: userEmail }, (err, user) => {
                    if (err) {
                        res.send({ message: `unable to find user`, status: 400 })
                    }
                    else {
                        if (user.length > 0) {
                            res.send({ message: `user exists`, status: 200 })
                        }
                        else {
                            let newUser = new db.User({ email: userEmail, mobileNumber: mobileNumber });
                            newUser.save((err, user) => {
                                if (err) {
                                    res.send({ message: `unable to create user`, status: 400 })
                                } else {
                                    let userId = user._id
                                    let newUserRole = new db.UserRoleSchema({ refeUserId: userId, role: userrole });
                                    newUserRole.save((err, userCreated) => {
                                        res.send({ message: `${userrole} created`, status: 200 })
                                    })
                                }
                            });
                        }
                    }
                })

            }
        })
    },
    listUsers(req, res) {
        db.User.find({}, { isDeleted: 0 }, (err, users) => {
            if (err) {
                res.send({ message: `unable to create user`, status: 400 })
            }
            else {
                res.send({ users: users, status: 200 })
            }
        })
    },
    listUserRoles(req, res) {
        db.UserRoleSchema.find({}, (err, users) => {
            if (err) {
                res.send({ message: `unable to create user`, status: 400 })
            }
            else {
                res.send({ users: users, status: 200 })
            }
        })
    },
    getUserRoleByEmail(req, res) {
        let userEmail = req.body.email
        db.User.find({ email: userEmail }, (err, user) => {
            if (err) {
                res.send({ message: `unable to find user`, status: 400 })
            }
            else {
                if (user) {
                    console.log("user",user)
                    let userId = user[0]._id
                    db.UserRoleSchema.find({ refeUserId: userId }, (err, userRole) => {
                        if (err) {
                            res.send({ message: `unable to find user`, status: 400 })
                        }
                        else {
                            let obj = {
                                "email": user[0].email,
                                "mobileNumber": user[0].mobileNumber,
                                "role": userRole[0].role,
                            }
                            res.send({ user: obj, status: 200 })
                        }
                    })
                }
                else {
                    res.send({ message: "No user is present with this email", status: 200 })
                }

            }
        })
    }
}

module.exports = models