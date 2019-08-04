var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  product: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  note: {
    type: [{ 
      type: Schema.Types.ObjectId,
      ref: "Note" 
    }],
    review: String
  },
  saved: {
    type: Boolean,
    default: false
  }
});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;