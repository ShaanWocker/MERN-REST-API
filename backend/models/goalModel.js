const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      reuired: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
