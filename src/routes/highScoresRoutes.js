import express from 'express';
import HighScoresController from '../controllers/highScoresController';

const router = express.Router();
const highScoresController = new HighScoresController();

export default function setRoutes(app) {
    app.use('/api/highscores', router);
    router.get('/', highScoresController.getHighScores.bind(highScoresController));
    router.post('/', highScoresController.addHighScore.bind(highScoresController));
}