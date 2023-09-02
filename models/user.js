const { Schema, model, models } = require('mongoose')

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'First name is required']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    unique: [true, 'Username must be unique'],
    required: [true, 'Username is required']
  },
  image: {
    type: String
  },
  isOnline: {
    type: Boolean,
    default: false
  }
})

const User = models.User || model('User', UserSchema)

export default User
