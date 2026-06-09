const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Teacher = require("../models/teacher");

// @desc    Show login page
// @route   GET /login
router.get("/login", (req, res) => {
    // Renders the login.ejs file from the views folder
    res.render("login", { error: null });
});

// @desc    Handle signup
// @route   POST /signup
router.post("/signup", async (req, res) => {
    const { name, classId, email, phoneNo, password, userType } = req.body;

    try {
        let userExists;
        if (userType === "student") {
            userExists = await Student.findOne({ email });
        } else if (userType === "teacher") {
            userExists = await Teacher.findOne({ email });
        } else {
            return res.render("login", { error: "Please select a user type" });
        }

        if (userExists) {
            return res.render("login", { error: "An account with that email already exists." });
        }

        const newUserInfo = { name, classId, email, phoneNo, password };
        let newUser;
        if (userType === "student") {
            newUser = await Student.create(newUserInfo);
        } else {
            newUser = await Teacher.create(newUserInfo);
        }
        
        // Log the new user's name to the console
        console.log(`New user signed up: ${newUser.name}`);

        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            userType: userType
        };
        
        // --- FIX: Ensure the session is saved before redirecting ---
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.render("login", { error: "Something went wrong." });
            }
            res.redirect("/");
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.render("login", { error: "Something went wrong during signup." });
    }
});

// @desc    Handle login
// @route   POST /login
router.post("/login", async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        let user;
        if (userType === 'student') {
            user = await Student.findOne({ email });
        } else if (userType === 'teacher') {
            user = await Teacher.findOne({ email });
        } else {
            return res.render("login", { error: "Please select a user type." });
        }

        if (!user) {
            return res.render("login", { error: "Invalid email or password." });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.render("login", { error: "Invalid email or password." });
        }

        // Log the user's name to the console
        console.log(`User logged in: ${user.name}`);

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: userType,
        };

        // --- FIX: Ensure the session is saved before redirecting ---
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.render("login", { error: "Something went wrong." });
            }
            res.redirect("/");
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.render("login", { error: "Something went wrong during login." });
    }
});

// @desc    Handle logout
// @route   GET /logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/');
    });
});

module.exports = router;

