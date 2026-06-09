const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo'); // <-- Import connect-mongo
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const { sendEmail } = require('./services/emailService');



// Load Environment Variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Setup Section ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware Section (Correct Order) ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- UPDATED SESSION CONFIGURATION ---
// This now saves sessions to your MongoDB database.
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-default-secret-key',
    resave: false,
    saveUninitialized: false, // Set to false for a more secure setup
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI 
    }),
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Helps protect against XSS attacks
        maxAge: 1000 * 60 * 60 * 24 // Cookie expires in 1 day
    }
}));

// Custom middleware to pass user data to all templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// --- Routes Section ---
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('project'); 
});

// Other static page routes...
app.get('/alertprediction.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'alertprediction.html'));
});
app.get('/chatbot.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chatbot.html'));
});
app.get('/earthquake.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'earthquake.html'));
});
app.get('/fire.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'fire.html'));
});
app.get('/flood.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'flood.html'));
});
app.get('/realtimemonitoring.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'realtimemonitoring.html'));
});
app.get('/staffandsupport.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'staffandsupport.html'));
});
app.get('/disaster-tracker.html',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'disaster-tracker.html'));
});
app.get('/hospital.html',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'hospital.html'));
});
app.get('/emergencycontact.html',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'emergencycontact.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("Email is required");
        }

        // Send a confirmation email
        await sendEmail(
            email,
            "Subscription Confirmed ✅",
            "Thanks for subscribing to disaster alerts. Stay safe!"
        );

        // Optionally save the subscriber in MongoDB here
        // const subscriber = new Subscriber({ email });
        // await subscriber.save();

        res.send("Subscription successful! Check your inbox.");
    } catch (err) {
        console.error("Subscription error:", err);
        res.status(500).send("Something went wrong. Please try again later.");
    }
});

