const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Remove default? otherwise it updates every time?
  updatedAt: { type: Date, default: Date.now },
  bookmarks: []
});

// pre-hook to hash password before storing it (NO ARROW FUNCTION BECAUSE USE OF 'THIS')
UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// check user's credentials while logging in (NO ARROW FUNCTION BECAUSE USE OF 'THIS')
UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

module.exports = mongoose.model('User', UserSchema);
