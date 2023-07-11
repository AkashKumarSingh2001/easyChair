const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const axios = require('axios')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "GenocideIsGoodForPeople/ThanosAndErenAreRight"

// Register User

router.post("/createuser", [
    body('email').isEmail(),
    body('prefix').isLength(),
    body('Fname').isLength(),
    body('Mname').isLength(),
    body('Lname').isLength(),
    body('mobile').isNumeric(),
    body('password').isLength({ min: 8 })]
    , async (req, res) => {

        // for validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                prefix: req.body.prefix,
                Fname: req.body.Fname,
                Mname: req.body.Mname,
                Lname: req.body.Lname,
                password: secPassword,
                email: req.body.email,
                mobile: req.body.mobile
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


// Login User

router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })]
    , async (req, res) => {

        // for validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }

            const pwdcompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" })
            }
             
            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtsecret)
            return res.json({ success: true,authToken:authToken });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router; 