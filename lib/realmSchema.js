class Location {}
Location.schema = {
  name: 'Location',
  properties: {
    lat:  'float',
    lon: 'float',
    alt: 'float',
    time: 'date'
  }
};

module.exports = {
  Location
};
