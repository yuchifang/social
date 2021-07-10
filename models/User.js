const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // type
        require: true,
        // 是否為必須
        min: 3,
        // 最小值
        max: 20,
        // 最大值
        unique: true
        // 是否為唯一值
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: { // 創建 followers 的 arr [followerId,followerId,followerId ]
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },

}
    // 當你創建 User 或 更新 將會自動更新 timestamps
    , {
        timestamps: true
    }
)

// 這個 Schema 將會給 auth 或 user 做使用
module.exports = mongoose.model("User", UserSchema)