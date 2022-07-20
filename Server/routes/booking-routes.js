const express = require('express');

const bookingControllers=require("../controllers/booking-controllers");
const router = express.Router();

router.post("/",bookingControllers.createBooking);

router.get("/bookingdetail",bookingControllers.getBookingDetail);

router.post("/bookingdetailByMember",bookingControllers.getBookingDetailByMember);

router.post("/getbookingById",bookingControllers.getBookingDetailById);

router.delete("/deletebooking",bookingControllers.deleteBookingById);

router.get("/get-events",bookingControllers.getEvents);

module.exports=router;