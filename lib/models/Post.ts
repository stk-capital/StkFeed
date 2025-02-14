import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [280, "Title cannot be more than 280 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      maxlength: [5000, "Content cannot be more than 5000 characters"],
    },
    source: {
      type: String,
      required: [true, "Please provide a source"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Post || mongoose.model("Post", PostSchema)

