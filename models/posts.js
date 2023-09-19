import { ObjectId } from 'mongodb'

const { Schema, model, models } = require('mongoose')

const PostsSchema = new Schema(
  {
    content: {
      type: String
    },
    images: {
      type: [String]
    },
    authorId: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    }
  },
  {
    timestamps: true
  }
)

const Post = models.Post || model('Post', PostsSchema)

export default Post
