const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '997994',
    key: '0e394f1ae6051d158c42',
    secret: '5bc0497c7dbd56efaa7b',
    cluster: 'eu',
    encrypted: true
  });

router.get('/',(req, res) => {
    Vote.find().then(votes => res.json({
        success:true,
        votes:votes
    }));
});

router.post('/',(req, res) => {
    const newVote = {
        editor: req.body.editor,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('editor-survey', 'editor-vote', {
            points: parseInt(vote.points),
            editor: vote.editor
    });
    return res.json({success:true, message:`Thanks for voting No.1`});
    })
  
});


module.exports = router;