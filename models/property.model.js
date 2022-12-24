const sql = require("./db.js");

const Property = function (property) {
  this.address = property.address;
};

Property.create = (newProperty, result) => {
  console.log(newProperty);
  sql.query("INSERT INTO NFT_FAKE_DATA SET ?", newProperty, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, { ...newProperty });
  });
};

Property.getAllAddress = (result) => {
  sql.query("SELECT address FROM NFT_FAKE_DATA", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Property;
