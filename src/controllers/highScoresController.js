class HighScoresController {
    constructor(supabase) {
        this.supabase = supabase;
        if (!this.supabase) {
            console.error('Supabase client not initialized!');
        }
    }

    async getHighScores(req, res) {
        console.log('Getting high scores...');
        try {
            if (!this.supabase) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await this.supabase
                .from('high_scores')
                .select('*')
                .order('score', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            console.log('Retrieved scores:', data);
            return res.status(200).json(data);
        } catch (err) {
            console.error('Error in getHighScores:', err);
            return res.status(500).json({ error: err.message });
        }
    }

    async addHighScore(req, res) {
        console.log('Adding high score:', req.body);
        const { playerName, score } = req.body;

        if (!playerName || score === undefined) {
            return res.status(400).json({ error: 'playerName and score are required' });
        }

        try {
            if (!this.supabase) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await this.supabase
                .from('high_scores')
                .insert([{ username: playerName, score }]);

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            console.log('Added score:', data);
            return res.status(201).json(data);
        } catch (err) {
            console.error('Error in addHighScore:', err);
            return res.status(500).json({ error: err.message });
        }
    }
}

export default HighScoresController;