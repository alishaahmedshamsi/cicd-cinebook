// Ticket pricing logic for the CineBook app.
// Works in the browser (window.Pricing) and in Node (module.exports) so Jest can test it.
(function (root) {
  const PRICES = { standard: 800, premium: 1200, recliner: 1800 }; // PKR per seat

  function seatPrice(type) {
    if (!Object.prototype.hasOwnProperty.call(PRICES, type)) {
      throw new Error('Unknown seat type: ' + type);
    }
    return PRICES[type];
  }

  function calculateTotal(type, seats, isStudent) {
    if (!Number.isInteger(seats) || seats < 1 || seats > 10) {
      throw new Error('Seats must be a whole number between 1 and 10');
    }
    let total = seatPrice(type) * seats;
    if (isStudent) total = total * 0.8; // 20% student discount
    return Math.round(total);
  }

  const api = { PRICES, seatPrice, calculateTotal };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Pricing = api;
})(this);
