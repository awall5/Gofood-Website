const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "HeythisisthekeytoSucess@#"

router.post("/createuser",
    body('email', 'enter a valid email').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                /*name: "Sham Dass",
                password: "123456",
                email: "shamdass12@gmail.com",
                location: "Eropling aadnsk ",
                */

                name: req.body.name,
                password: secPassword,            // isme hum thunder bird mai jake bs body mai saari chize dalke upload kr skte hai 
                email: req.body.email,                  //   ye b easy concept hai
                location: req.body.location,


            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;

router.post("/login", 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password should be at least 5 characters').isLength({ min: 5 }), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email});
            if (!userData) {
                return res.status(400).json({ errors: "User does not exist" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" });
            }

            const data = { user: { id: userData.id } }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: "Server error" });
        }
    }
);

module.exports = router;