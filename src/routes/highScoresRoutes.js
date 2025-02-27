import express from 'express';
import HighScoresController from '../controllers/highScoresController.js';

export default function setRoutes(app, supabase) {
    const router = express.Router();
    const highScoresController = new HighScoresController(supabase);
    
    router.get('/', highScoresController.getHighScores.bind(highScoresController));
    router.post('/', highScoresController.addHighScore.bind(highScoresController));
    
    app.use('/api/highscores', router);
    
    return router;
}