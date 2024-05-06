const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gender:{
    type: String,
    required: true,
    default : null,
  },
  phone:{
    type: Number,
    required: true,
    default : null
  },
  email:{
    type: String,
    required: true,
    default : null
  },
  lastUpdated: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    default : null
  },
  confirmPassword:{
    type: String,
    required: true,
    default : null
  },
  roles: {
    type: String, 
    enum: ['user', 'Superadmin']
  },
  rolePhase:{
     type: String,
  },
  userId: {
    type: String,
    default : null,
  }
});


userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
