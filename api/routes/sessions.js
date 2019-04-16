const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Session = require('../models/session');

//Get all Sessions
router.get('/', (req, res, next) => {
    Session.find()
    .populate('member','name')
    .populate('group','name')
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});
router.post('/', (req, res, next) => {
    const session = new Session({
        _id: new mongoose.Types.ObjectId(),
        partner: req.body.partner,
        member: req.body.member,
        group: req.body.group,
        timeIn: req.body.timeIn,
        timeOut: req.body.timeOut,
    });
    const dif = session.timeIn.getTime() - session.timeOut.getTime();
    const duration = Math.abs(dif/1000);
    session.duration = duration/3600;

    session
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'handling post to Session',
            createdMember: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

//Get individual Session by ID
router.get('/:sId',(req, res, next) => {
   const id = req.params.sId;
   Session.findById(id)
   .populate('member','name')
   .populate('group','name')
   .exec()
   .then(doc => {
       console.log(doc);
       if(doc){
       res.status(200).json(doc)
       }else{
           res.status(404).json({message: 'Session not found. Invalid ID'})
       }

   })
   .catch(err => {console.log(err)
    res.status(500).json({error: err})
    });
});
//TODO can lead to sync issues if duration is changed
router.patch('/:sId',(req, res, next) => {
    const id = req.params.sId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
   

    Session.update({_id: id},
        {$set: updateOps      
    }).exec()
    .then(result =>{
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

router.delete('/:sId',(req, res, next) => {
    const id = req.params.sId;

    Session.findById(id).exec()
    .then(session =>{
        if(session){
            Member.findById(session.member).exec()
            .then(member => {
                if(member){
                    member.totalHours -= session.duration;
                    Session.remove({_id: id})
                    .exec()
                    .then(result => {
                        result.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
                    member.save();
                }
            });
        }
    });
});
module.exports = router;