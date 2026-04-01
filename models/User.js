const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // សម្រាប់បំលែង Password កុំឱ្យគេលួចមើលឃើញ

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true }); // timestamps នឹងបង្កើត createdAt និង updatedAt ឱ្យអូតូ

// កូដសម្រាប់ Hash password មុនពេល Save ចូល DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ដាក់ក្នុង models/User.js (មុន module.exports)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);