let set = (realm, data) => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let loc = realm.create('Location', data);
        console.log('wrote', loc);
        return resolve(loc);
      });
    } catch (err) {
      return reject(err);
    }
  }); // don't need a catch clause here because of the onerror above
};

let get = (realm, type) => {
  return new Promise((resolve, reject) => {
    try {
      let data = realm.objects(type);
      return resolve(data);
    } catch (err) {
      return reject(err);
    }
  }); // don't need a catch clause here because of the onerror above
};

module.exports = {
  set: set,
  get: get
};
