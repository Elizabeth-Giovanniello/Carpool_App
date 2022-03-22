import { GOOGLE_MAPS_API_KEY } from "./apiKeys";

const root = 'http://127.0.0.1:8000/';
const auth = root + 'api/auth/';
const trips = root + 'api/trips/';
const reviews = root + 'api/reviews/';
const check_ins = root + 'api/check-ins/';

export const loginPath = auth + 'login/',
refreshPath = loginPath + 'refresh/',
registerPath = auth + 'register/',
addRidePath = trips + 'create/',
bookRidePath = trips + 'book/',
submitReviewPath = reviews + 'submit/',
sendCheckInPath = check_ins + 'send/';

export const searchRidesPath = (departureCity, arrivalCity, departureDate) => `${trips}search/${departureCity}/${arrivalCity}/${departureDate}/`;
export const rideDetailsPath = tripID => `${trips}${tripID}/`;
export const editRidePath = tripID => `${trips}edit/${tripID}/`;
export const reviseBookingPath = bookingID => `${trips}revise-booking/${bookingID}/`;
export const getUserReviewsPath = userID => `${reviews}${userID}/`;
export const getCheckInsPath = tripID => `${check_ins}view/${tripID}/`;
export const editCheckInPath = checkInID => `${check_ins}edit/${checkInID}/`;


