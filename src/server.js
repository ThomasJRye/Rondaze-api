import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

import setRoutes from './routes/highScoresRoutes.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize database
async function initializeDatabase() {
    try {
        // Test the table access
        const { data, error } = await supabase
            .from('high_scores')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Error accessing database:', error);
        } else {
            console.log('Database connection successful');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Set up routes
const router = setRoutes(app, supabase);

// Debug route to test API
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// List all registered routes
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Route: ${Object.keys(r.route.methods)} ${r.route.path}`);
    }
});

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});