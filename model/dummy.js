const mongoose = require('mongoose')

const dummySchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        is_private: {
            type: Boolean,
            required:true,
            default :true
        },
        image: {
            type: String,
            required: true
        },
        image_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        date: {
            type: Date,
            default:Date.now()
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Dummy", dummySchema)

