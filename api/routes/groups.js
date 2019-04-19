const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Group = require('../models/group');
const Member = require('../models/member');

//Get all Groups
router.get('/', (req, res, next) => {
    Group.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Create new Group
router.post('/', (req, res, next) => {
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        members: req.body.members
    });
    group
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handling post to Group',
                createdMember: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Get individual Group by ID
router.get('/:pId', (req, res, next) => {
    const id = req.params.pId;
    Group.findById(id).exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'Group not found. Invalid ID' })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
});

router.patch('/:pId', (req, res, next) => {
    const id = req.params.pId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Group.update({ _id: id },
        {
            $set: updateOps
        }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:pId', (req, res, next) => {
    const id = req.params.pId;
    Group.remove({ _id: id })
        .exec()
        .then(result => {
            result.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
module.exports = router;