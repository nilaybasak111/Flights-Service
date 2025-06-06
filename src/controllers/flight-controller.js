const { StatusCodes } = require("http-status-codes");

const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
 * POST : /api/v1/flights/
 * req.body = {
 *              flightNumber : "UK 898",
 *              airplaneId : "a380",
 *              departureAirportId : 8,
 *              arrivalAirportId : 3,
 *              arrivalTime : "2025-06-05T10:10:00", (The date format should be in ISO 8601 format)
 *              departureTime : "2025-06-05T09:10:00", (The date format should be in ISO 8601 format)
 *              price : 5000,
 *              boardingGate : "A1",
 *              totalSeats : 200
 *            }
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * GET : /api/v1/flights?trips=BOM-MAA/
 * req.body = {
 *
 *            }
 */
async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
 * Get an Flight
 * GET : /api/v1/flights/:id
 * req.body = {}
 */
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res) {
  try{
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch(error){
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createFlight, getAllFlights, getFlight, updateSeats };
