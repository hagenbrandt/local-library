const moment = require('moment')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, // ref to associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
})

// Virtual fpr bookinstance's URL
BookInstanceSchema.virtual('due_back_formatted').get(function() {
  return moment(this.due_back).format('MMMM Do, YYYY')
})

//Export models
module.exports = mongoose.model('BookInstance', BookInstanceSchema)
