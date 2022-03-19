const root = 'http://127.0.0.1:8000/';
const auth = root + 'api/auth/';
const trips = root + 'api/trips/';
const reviews = root + 'api/reviews';
const check_ins = root + 'api/check_ins/';

export const loginPath = auth + 'login/',
refreshPath = loginPath + 'refresh/',
registerPath = auth + 'register/',
addRidePath = trips + 'create/';

export const searchRidesPath = (departureCity, arrivalCity, departureDate) => `${trips}search/${departureCity}/${arrivalCity}/${departureDate}/`;
export const rideDetailsPath = tripID => `${trips}${tripID}/`;
export const editRidePath = tripID => `${trips}edit/${tripID}/`;


