const express=require("express");

const HttpError = require('../models/http-error');

const Booking = require("../models/booking");


const getBookingDetailById = async (req, res, next) => {
  const id = req.body.id;

  let bookingDetailById;
  try {
    bookingDetailById = await Booking.find({id: id});
  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }

  if (!bookingDetailById) {
    const error = new HttpError(
      'Could not find booking for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ bookingDetailById: bookingDetailById.map(booking=>booking.toObject({ getters: true }))});
};


const getBookingDetail = async (req, res, next) => {
 
  let bookingDetail;
  try {
    bookingDetail = await Booking.find();
  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }

  if (!bookingDetail) {
    const error = new HttpError(
      'Could not find booking',
      404
    );
    return next(error);
  }

  res.json({ bookingDetail: bookingDetail.map(booking=> booking.toObject({ getters: true }))});
};

const getBookingDetailByMember = async (req, res, next) => {

  const member=req.body.member;
 
  let bookingDetail;
  try {
    bookingDetail = await Booking.find({member: member});
  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }

  if (!bookingDetail) {
    const error = new HttpError(
      'Could not find booking',
      404
    );
    return next(error);
  }

  res.json({ bookingDetail: bookingDetail.map(booking=> booking.toObject({ getters: true }))});
};


const createBooking = async (req, res, next) => {

  const { member,name,post,id,city,district,state,pincode,mobile,purpose, permanentHouse,permanentStreet,permanentCity,permanentDistrict,permanentState,permanentPincode,startDate,endDate,floor, personName,personAge,personId,personRelation} = req.body;


  const createdBooking = new Booking({
    member,
    name,
    post,
    id,
    city,
    district,state,pincode,mobile, purpose, permanentHouse,permanentStreet,permanentCity,permanentDistrict,permanentState,permanentPincode,startDate,endDate,floor,personName,personAge,personId,personRelation
  });

  
  let bookingDetail;

  try {
    bookingDetail =  await createdBooking.save(); 
  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }
  res.status(201).json({ bookingDetail: bookingDetail.toObject({ getters: true }) });
};

const deleteBookingById = async (req, res, next) => {
  const bookingId = req.body.id;

  let deletedBooking;
  try {
    deletedBooking = await Booking.deleteOne({id: bookingId});
  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }


  res.status(200).json({ message: 'Deleted place.' });
};

const getEvents= async (req,res,next)=> {
  let events;
  try{
    events=await Booking.find();
  }catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }
res.json({ events: events.map(event=> event.toObject({ getters: true }))});
}

exports.getBookingDetailById = getBookingDetailById;
exports.getBookingDetail=getBookingDetail;
exports.getBookingDetailByMember=getBookingDetailByMember;
exports.createBooking = createBooking;
exports.deleteBookingById = deleteBookingById;
exports.getEvents=getEvents;
