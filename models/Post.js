const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    }
)

// 這個 Schema 將會給 auth 或 user 做使用
module.exports = mongoose.model("Post", PostSchema)