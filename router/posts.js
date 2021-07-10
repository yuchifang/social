const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

// create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update a post
router.put("/:id", async (req, res) => {
    const paramsId = req.params.id
    const bodyUserId = req.body.userId

    try {
        const post = await Post.findById(paramsId)
        if (post.userId === bodyUserId) {
            await post.updateOne({ $set: req.body })
            return res.status(200).json("the post has been update")
        }
        return res.status(403).json("you can update only you post")
    } catch (err) {
        return res.status(500).json(err)
    }

})

// delete a post 
router.delete("/:id", async (req, res) => {
    const paramsId = req.params.id
    const bodyUserId = req.body.userId

    try {
        const post = await Post.findById(paramsId)
        if (post.userId === bodyUserId) {
            await post.deleteOne()
            return res.status(200).json("the post has been deleted")
        }
        return res.status(403).json("you can deleted only you post")
    } catch (err) {
        return res.status(500).json(err)
    }

})

// like / dislike a post 
router.put("/:id/like", async (req, res) => {
    const paramsId = req.params.id
    const bodyUserId = req.body.userId

    try {
        const post = await Post.findById(paramsId)
        if (!post.likes.includes(bodyUserId)) {
            await post.updateOne({ $push: { likes: bodyUserId } })
            return res.status(200).json("post has been liked")
        }

        await post.updateOne({ $pull: { likes: bodyUserId } })
        return res.status(200).json("post has been disliked")
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get a post 
router.get("/:id", async (req, res) => {
    const paramsId = req.params.id
    try {
        const post = await Post.findById(paramsId)
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get timeline posts
router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({ userId: currentUser._id })

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )

        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router
