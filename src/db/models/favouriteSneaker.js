import { model, Schema } from 'mongoose';

const favouriteSneakerSchema = new Schema(
  {
    sneakerId: {
      type: Schema.Types.ObjectId,
      ref: 'SneakerCollection',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const favouriteSneakerCollection = model(
  'favouriteSneakerCollection',
  favouriteSneakerSchema,
);
