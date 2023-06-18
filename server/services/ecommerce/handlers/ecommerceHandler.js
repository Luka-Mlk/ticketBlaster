const user = require("../../../pkg/models/user/user");
const history = require("../../../pkg/models/pHistory/history");

const checkOut = async (req, res) => {
  try {
    if (!req.auth) {
      res.status(400).json({
        status: "failed",
        error: "Must be logged in to check out cart",
      });
    }
    const usr = await user.getUserById(req.auth.id);

    const userHistory = await history.getHistory(req.auth.id);

    let numTickets = userHistory.numTickets || 0;
    let numPurchasedEvents = !userHistory.purchasedEvents
      ? 0
      : userHistory.purchasedEvents.length;
    let purchasedEvents = userHistory.purchasedEvents || [];

    if (!userHistory.length) {
      usr.cart.forEach((obj) => {
        numTickets += obj.numTickets;
        purchasedEvents.push(obj.event);
      });
      const newHistory = {
        personId: req.auth.id,
        personName: req.auth.fullName,
        numPurchasedEvents: numPurchasedEvents++,
        numTickets: numTickets,
        purchasedEvents,
      };
      await history.create(newHistory);
      return res.status(200).json({
        status: "success",
        history: newHistory,
      });
    }

    usr.cart.forEach((obj) => {
      purchasedEvents.push(obj.event);
      numTickets += obj.numTickets;
    });
    numPurchasedEvents++;

    userHistory.numTickets = numTickets;
    userHistory.purchasedEvents = purchasedEvents;
    userHistory.numPurchasedEvents = numPurchasedEvents;

    const newHisto = await history.update(req.auth.id, userHistory);

    return res.status(200).json({
      status: "success",
      history: newHisto,
    });
    //
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

module.exports = {
  checkOut,
};
