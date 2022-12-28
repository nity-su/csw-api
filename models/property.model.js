const sql = require("./db.js");

const Property = function (property) {
  (this.address = property.address), (this.name = property.name);
};

Property.create = (newProperty, result) => {
  console.log(__filename.slice(__dirname.length + 1), newProperty);

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
