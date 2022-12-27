const Property = require("../models/property.model");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      mseesage: "Content cant be empty",
    });
  }

  console.log(req.body);

  const property = new Property({
    address: req.body.address,
    address: req.body.name,
  });

  Property.create(property, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    }
    console.log(result);
    res.end();
  });
};

exports.findAddressAll = (req, res) => {
  Property.getAllAddress((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    }
    res.send(result);
  });
};
