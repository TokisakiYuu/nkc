const settings = require('../settings');
const mongoose = settings.database;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  kcb: {
    type: Number,
    default: 0
  },
  toc: {
    type: Date,
    required: true,
    default: Date.now
  },
  xsf: {
    type: Number,
    default: 0
  },
  tlv: {
    type: Number,
    default: Date.now,
    required: true
  },
  disabledPostCount: {
    type: Number,
    default: 0
  },
  disabledThreadCount: {
    type: Number,
    default: 0
  },
  postCount: {
    type: Number,
    default: 0
  },
  threadCount: {
    type: Number,
    default: 0
  },
  subs: {
    type: Number,
    default: 0
  },
  recCount: {
    type: Number,
    default: 0
  },
  toppedThreadCount: {
    type: Number,
    default: 0
  },
  digestThreadCount: {
    type: Number,
    default: 0,
  },
  score: {
    default: 0,
    type: Number
  },
  lastVisitSelf: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    unique: true
  },
  usernameLowerCase: {
    type: String,
    unique: true
  },
  uid: {
    type: String,
    unique: true,
    required: true
  },
  bday: String,
  cart: [String],
  email: {
    type: String,
    match: /.*@.*/
  },
  description: String,
  color: String,
  certs: {
    type: [String],
    index: 1
  },
  introText: String,
  postSign: String,
  regIP: String,
  regPort: String
});
userSchema.pre('save', function(next) {
  if(!this.usernameLowerCase)
    this.usernameLowerCase = this.username.toLowerCase();
  next()
});

module.exports = mongoose.model('users', userSchema);