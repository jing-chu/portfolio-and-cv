const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const Pusher = require('pusher');

//pusher free API keys
var pusher = new Pusher({
    appId: '997994',
    key: '0e394f1ae6051d158c42',
    secret: '5bc0497c7dbd56efaa7b',
    cluster: 'eu',
    encrypted: true
});

//handle GET request to '/poll' path
router.get('/', (req, res) => {
    Vote.find().exec().then(votes => res.json({
        success: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {
    let question = req.body.question
    const newVote = {
        question: question,
        answer: req.body.answer,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('js-survey', 'js-vote', {
            points: parseInt(vote.points),
            answer: vote.answer,
            question: vote.question
        });
        return res.json({ success: true, message: `Thanks for voting ${question}` });
    })
});


module.exports = router;