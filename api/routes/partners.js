const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Partner = require('../models/partner');

//Get all Partners
router.get('/', (req, res, next) => {
    Partner.find()
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

//Create new Partner
router.post('/', (req, res, next) => {
    const partner = new Partner({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    partner
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handling post to Partner',
                createdMember: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Get individual Partner by ID
router.get('/:pId', (req, res, next) => {
    const id = req.params.pId;
    Partner.findById(id).exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'Partner not found. Invalid ID' })
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

    Partner.update({ _id: id },
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
    Partner.remove({ _id: id })
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