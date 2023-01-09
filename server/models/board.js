const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: string,
  username: string,
  email: string,
  avatarUrl: string,
})

const MemberSchema = new Schema({
  userId: string,
  roles: []
})

const OrgSchema = new Schema({
  name: string,
  members: [MemberSchema],
  boards: [BoardSchema],
})


const CommentSchema = newSchema({
  user: string,
  comment: string,
})

const CardSchema = newSchema({
  label: string,
  description: string,
  comments: [CommentSchema],
  user: [UserSchema],
})

const ListSchema = newSchema({
  description: string,
  cards: [CardSchema]
})

const BoardSchema = ({
  title: string,
  lists: [ListSchema]
})

module.exports = mongoose.model("Board", BoardSchema)