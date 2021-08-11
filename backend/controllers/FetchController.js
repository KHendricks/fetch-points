var fetchModel = require("../models/FetchModel");

module.exports = class FetchController {
  constructor() {}

  addTransaction(payer, points, timestamp, res, next) {
    if (timestamp === undefined) {
      return res.send("Timestamp is undefined");
    } else if (payer === undefined) {
      return res.send("Payer is undefined");
    } else if (points === undefined) {
      return res.send("Points are undefined");
    } else {
      fetchModel
        .create({
          payer: payer,
          points: points,
          timestamp: timestamp,
        })
        .then(() => res.send(`Creating entry for ${payer}`))
        .catch((err) => console.log(err));
    }
  }

  spendPoints(points, res, next) {
    fetchModel
      .find()
      .then((data) => {
        let pointTotal = 0;
        for (var i = 0; i < data.length; i++) {
          pointTotal += data[i].points;
        }

        if (pointTotal < points) {
          res.json({ err: "Not enough points" });
        }
      })
      .catch((err) => console.log(err));
    fetchModel
      .find({})
      .sort({ timestamp: "asc" })
      .then((data) => {
        var returnData = {};
        var pointsToSpend = points;
        for (var i = 0; i < data.length; i++) {
          if (pointsToSpend <= 0) {
            break;
          }
          if (data[i].points > 0) {
            console.log(data[i]._id);
            if (pointsToSpend - data[i].points >= 0) {
              returnData[data[i].payer] = -1 * data[i].points;
              pointsToSpend = pointsToSpend - data[i].points;
              fetchModel
                .findByIdAndUpdate(data[i]._id, { points: 0 })
                .then(() => console.log(`Updating points for ${data[i]._id}`))
                .catch((err) => console.log(err));
            } else {
              let remainingPayerPoints = data[i].points - pointsToSpend;
              returnData[data[i].payer] = -1 * pointsToSpend;
              pointsToSpend = 0;
              fetchModel
                .findByIdAndUpdate(data[i]._id, {
                  points: remainingPayerPoints,
                })
                .then(() => console.log(`Updating points for ${data[i]._id}`))
                .catch((err) => console.log(err));
            }
          } else {
            pointsToSpend = pointsToSpend - data[i].points;
            returnData[data[i].payer] -= data[i].points;

            fetchModel
              .findByIdAndUpdate(data[i]._id, { points: 0 })
              .then(() => console.log(`Updating points for ${data[i]._id}`))
              .catch((err) => console.log(err));
          }
        }
        res.send(returnData);
      })
      .catch((err) => console.log(err));
  }

  getBalances(res, next) {
    fetchModel
      .find({}, "payer points")
      .then((data) => {
        var returnData = {};
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
          if (returnData[data[i].payer]) {
            returnData[data[i].payer] += data[i].points;
          } else {
            returnData[data[i].payer] = data[i].points;
          }
        }
        res.json(returnData);
      })
      .catch((err) => console.log(err));
  }

  clearCollection(res) {
    fetchModel
      .deleteMany({})
      .then(() => res.send("Dropped collection"))
      .catch((err) => console.log(err));
  }
};
