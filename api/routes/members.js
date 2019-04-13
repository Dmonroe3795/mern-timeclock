const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Member = require('../models/member');
const Session = require('../models/session');
router.get('/', (req, res, next) => {
    Member.find()
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
    const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        totalHours: req.body.totalHours
    });
    member
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'handling post member',
            createdMember: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

    
});

router.get('/:pId',(req, res, next) => {
    const id = req.params.pId;
   Member.findById(id).exec()
   .then(doc => {
       console.log(doc);
       if(doc){
       res.status(200).json(doc)
       }else{
           res.status(404).json({message: "Member not found with that ID"})
       }

   })
   .catch(err => {console.log(err)
    res.status(500).json({error: err})
    });

});
router.patch('/:pId',(req, res, next) => {
    const id = req.params.pId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Member.update({_id: id},
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
router.delete('/:pId',(req, res, next) => {
    const id = req.params.pId;
    Member.remove({_id: id})
    .exec()
    .then(result => {
        result.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});
router.put('/:mId/:pId/clockin',(req,res,next) => {
    const mId = req.params.mId;
    const pId = req.params.pId;
    const date = Date.now();
    const session = new Session({
        _id: new mongoose.Types.ObjectId(),
        member: mId,
        timeIn: date
    });
    session.save()
    .then(result =>{ 
        Member.findOne({_id: mId}, function(error, member){
            if (error) {
                return handleError(error);
              }
              member.sessions.push(result._id);
              member.save();
        })
        console.log(result);
        res.status(201).json({
            message: 'handling post clockin',
            createdSession: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });


})
module.exports = router;