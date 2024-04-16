const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST = mongoose.model("POST")

// Error handling middleware
const errorHandler = (res, err) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  };
  

//Route for allposts
router.get("/allposts"  ,requirelogin, (req , res)=>{
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

//Route for create post
router.post("/createPost",requirelogin ,   (req, res) => {
    const {body , pic} = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

//Route for myposts
router.get("/myposts" ,requirelogin ,  (req , res)=>{
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})

//Route for like
router.put("/like" , requirelogin , (req,res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "_id name Photo")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

//Route for unlike
router.put("/unlike", requirelogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "_id name Photo")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

//Route for comment
router.put("/comment", requirelogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name Photo")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

// API for delete post
router.delete("/deletePost/:postId", requirelogin, (req, res) => {
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id name Photo")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }

            if (post.postedBy._id.toString() == req.user._id.toString()) {

                post.remove()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
})

//To show following post
router.get("/myfollwingpost", requirelogin,  (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})

module.exports=router

