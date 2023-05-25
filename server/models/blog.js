const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  dateAdded: Date,
  blogPost: { header: String, paragraph: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

 
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)