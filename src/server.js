const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const highScoresRoutes = require('./routes/highScoresRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use('/api/high-scores', highScoresRoutes(supabase));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});