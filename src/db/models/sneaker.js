import { model, Schema } from 'mongoose';

const sneakerSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: [Number], required: true },
    color: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const SneakerCollection = model('SneakerCollection', sneakerSchema);
