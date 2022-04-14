const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Password encryption
UserSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

// Check password match
UserSchema.methods.matchPassword = function (userPassword) {
	return bcrypt.compare(userPassword, this.password);
};

// Generate authentication token
UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		{
			id: this._id.toString(),
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRY,
		}
	);

	return token;
};

module.exports = mongoose.model('User', UserSchema);
