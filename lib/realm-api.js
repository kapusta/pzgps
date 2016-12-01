let set = (realm, data) => {
  realm.write(() => {
    let loc = realm.create('Location', data);
    console.log('wrote', loc);
    return loc;
  });
};

let get = (realm, type, filter) => {
  let data = realm.objects(type);
  if (filter) {
    return data.filtered(filter);
  }
  return data;
};

module.exports = {
  set,
  get
};
