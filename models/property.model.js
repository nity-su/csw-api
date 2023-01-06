const sql = require("./db.js");

const Property = function (property) {
  (this.owner = property.owner),
    (this.address = property.address),
    (this.name = property.name);
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

Property.getName = (name, result) => {
  console.log("name", name);
  sql.query(
    `SELECT address FROM NFT_FAKE_DATA WHERE name = "${name}"`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

Property.getAddressOfowner = (owner, result) => {
  sql.query(
    `SELECT address FROM NFT_FAKE_DATA WHERE owner = "${owner}"`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = Property;
