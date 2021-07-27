const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar : {
        type : String
    }
}, {
    timestamps: true
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); // The fieldname overhere is the avatar
    }
})

//Static methods
//Now the above properties of the storage have to be assigned to multer
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); // This says that only one file will be uploaded in the name of avatar
userSchema.statics.avatarPath = AVATAR_PATH; // The AVATAR_PATH is now publically available

const User = mongoose.model('User', userSchema);

module.exports = User;