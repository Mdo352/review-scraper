var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
  {
    body: String,
    review: { type: Schema.Types.ObjectId, ref: "Review" },
  }
);

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;