const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const { sendEmail } = require('./services/emailService');

// Load Environment Variables
dotenv.config();

// Validate required environment variables before starting the application
const requiredEnv = ['MONGO_URI', 'SESSION_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}
// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Setup Section ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware Section (Correct Order) ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- UPDATED SESSION CONFIGURATION ---
// This now saves sessions to your MongoDB database.
// Required when deployed behind a reverse proxy (Render/Railway/etc.)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 60 * 24
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24
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

// --- Server-side API proxy routes ---
// Keep third-party API credentials on the server instead of exposing them in browser JavaScript.
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat and lon are required' });
    if (!process.env.OPENWEATHER_API_KEY) return res.status(503).json({ error: 'Weather service is not configured' });

    try {
        const url = new URL('https://api.openweathermap.org/data/2.5/weather');
        url.search = new URLSearchParams({ lat, lon, units: 'metric', appid: process.env.OPENWEATHER_API_KEY });
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) return res.status(response.status).json({ error: data.message || 'Weather API error' });
        res.json(data);
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(502).json({ error: 'Could not reach weather service' });
    }
});

app.get('/api/forecast', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'lat and lon are required' });
    if (!process.env.OPENWEATHER_API_KEY) return res.status(503).json({ error: 'Weather service is not configured' });

    try {
        const url = new URL('https://api.openweathermap.org/data/2.5/forecast');
        url.search = new URLSearchParams({ lat, lon, units: 'metric', appid: process.env.OPENWEATHER_API_KEY });
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) return res.status(response.status).json({ error: data.message || 'Forecast API error' });
        res.json(data);
    } catch (error) {
        console.error('Forecast API error:', error);
        res.status(502).json({ error: 'Could not reach forecast service' });
    }
});

app.post('/api/analyze-image', async (req, res) => {
    const { image_base64 } = req.body;
    if (!image_base64) return res.status(400).json({ error: 'image_base64 is required' });
    if (!process.env.IMAGGA_API_KEY || !process.env.IMAGGA_API_SECRET) {
        return res.status(503).json({ error: 'Image analysis service is not configured' });
    }

    try {
        const formData = new FormData();
        formData.append('image_base64', image_base64);
        const credentials = Buffer.from(`${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`).toString('base64');

        const response = await fetch('https://api.imagga.com/v2/tags', {
            method: 'POST',
            headers: { Authorization: `Basic ${credentials}` },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) return res.status(response.status).json({ error: data?.status?.text || 'Image analysis API error' });
        res.json(data);
    } catch (error) {
        console.error('Image analysis error:', error);
        res.status(502).json({ error: 'Could not reach image analysis service' });
    }
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