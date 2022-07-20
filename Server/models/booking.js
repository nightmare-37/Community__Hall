const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  member: { type: String, required: true},
  name: { type: String, required: true },
  post: { type: String, required: true },
  id:  { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  purpose: { type: String, required: true },
  permanentHouse: { type: String},
  permanentStreet: { type: String },
  permanentCity: { type: String, required: true },
  permanentDistrict: { type: String, required: true },
  permanentState: { type: String, required: true },
  permanentPincode: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  floor: { type: String, required: true },
  personName: {type: String, required: true },
  personAge: {type: String, required: true },
  personId: {type: String, required: true },
  personRelation: {type: String, required: true }
});



module.exports = mongoose.model('Booking', bookingSchema);


