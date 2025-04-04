import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: Number },
    location: { type: String },
    avatar: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const UserCollection = model('UserCollection', userSchema);
