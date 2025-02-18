class HighScoresController {
    constructor(supabase) {
        this.supabase = supabase;
    }

    async getHighScores(req, res) {
        try {
            const { data, error } = await this.supabase
                .from('high_scores')
                .select('*')
                .order('score', { ascending: false });

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async addHighScore(req, res) {
        const { playerName, score } = req.body;

        try {
            const { data, error } = await this.supabase
                .from('high_scores')
                .insert([{ player_name: playerName, score }]);

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(201).json(data);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

export default HighScoresController;