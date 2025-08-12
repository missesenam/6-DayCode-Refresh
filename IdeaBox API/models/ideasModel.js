// the combo of Mongoose Validation and express-validator is the best
const mongoose = require("mongoose");

const ideaboxSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

const ideaboxModel = mongoose.model("idea", ideaboxSchema);

module.exports = ideaboxModel;

// const mongoose = require("mongoose");

// const ideaboxSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       minlength: [3, "Title must be at least 3 characters long"],
//       maxlength: [100, "Title cannot exceed 100 characters"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       minlength: [10, "Description must be at least 10 characters long"],
//       trim: true,
//     },
//     tags: {
//       type: [String],
//       required: [true, "At least 2 tags are required"],
//       validate: {
//         validator: function (arr) {
//           return arr.length >= 2;
//         },
//         message: "Enter more than 2 tags",
//       },
//     },
//   },
//   { timestamps: true }
// );

// const ideaboxModel = mongoose.model("idea", ideaboxSchema);

// module.exports = ideaboxModel;
