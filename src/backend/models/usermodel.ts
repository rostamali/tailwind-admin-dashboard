import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Must need user name'],
			trim: true,
			minLength: 2,
			maxLength: 30,
			unique: true,
		},
		slug: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'Must need user email'],
			unique: true,
			lowercase: true,
		},
		thumbnail: { type: String, default: 'user.png' },
		password: {
			type: String,
			minLength: 6,
			maxLength: 120,
			required: [true, 'Must need user password'],
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: {
				values: ['admin', 'user', 'editor'],
				message: 'User role is required',
			},
		},
		passwordChangeAt: {
			type: Date,
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ timestamps: true },
);

const User = models.User || model('User', userSchema);
export default User;
