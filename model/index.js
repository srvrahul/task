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
        })
    }
}

module.exports = models