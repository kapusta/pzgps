class Location {}
Location.schema = {
  name: 'Location',
  properties: {
    lat: 'float',
    lon: 'float',
    alt: 'float',
    time: 'date',
  }
};

class Climb {}
Climb.schema = {
  name: 'Climb',
  properties: {
    name: 'string',
    pitches: 'number'
  }
};

module.exports = {
  Location,
  Climb
};
