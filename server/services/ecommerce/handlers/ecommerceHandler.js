const user = require("../../../pkg/models/user/user");
const history = require("../../../pkg/models/pHistory/history");

const checkOut = async (req, res) => {
  try {
    if (!req.auth) {
      // Check if user is logged in
      return res.status(400).json({
        status: "failed",
        error: "Must be logged in to check out cart",
      });
    }
    const usr = await user.getUserById(req.auth.id); // get user values

    if (!usr.cart.length) {
      return res.status(400).json({
        status: "failed",
        error: "Cart cannot be empty when checking out",
      });
    }
    const userHistory = await history.getHistory(req.auth.id); // get user history
    let newNumTickets = userHistory.numTickets || 0; // set num tickets to 1 if user has no prev purchases
    let newNumPurchasedEvents = !userHistory.length
      ? usr.cart.length
      : userHistory[0].purchasedEvents.length; // if user has prev purchased events set 0 if not set to num of events
    let purchasedEvents = userHistory.purchasedEvents || []; // if user has no prev purchased events set it to empty array

    if (!userHistory.length) {
      // if user doesnt have any prev history add from cart and push to purchased events
      usr.cart.forEach((obj) => {
        newNumTickets += obj.numTickets;
        purchasedEvents.push(obj.event);
      });
      const newHistory = {
        // create new history object
        personId: req.auth.id,
        personName: req.auth.fullName,
        numPurchasedEvents: newNumPurchasedEvents,
        numTickets: newNumTickets,
        purchasedEvents,
      };
      await history.create(newHistory);
      usr.cart = [];
      user.updateUser(req.auth.id, usr);
      return res.status(200).json({
        status: "success",
        history: newHistory,
      });
    }
    // use case if user has prev purchases
    usr.cart.forEach((obj) => {
      purchasedEvents.push(obj.event);
      newNumTickets += obj.numTickets;
    });
    newNumPurchasedEvents++;

    userHistory[0].numTickets += newNumTickets;
    userHistory[0].purchasedEvents.push(purchasedEvents);
    userHistory[0].numPurchasedEvents = newNumPurchasedEvents;
    const newHisto = await history.update(req.auth.id, userHistory[0]);
    usr.cart = [];
    user.updateUser(req.auth.id, usr);
    return res.status(200).json({
      status: "success",
      history: userHistory[0],
      newHisto,
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

const getHistory = async (req, res) => {
  try {
    if (!req.auth) {
      return res.status(400).json({
        status: "failed",
        error: "Must be logged in to view cart",
      });
    }
    const persHistory = await history.read(req.auth.id);

    const { purchasedEvents } = persHistory[0];

    return res.status(200).json({
      status: "success",
      history: purchasedEvents,
    });
  } catch (err) {
    console.log(err);
    return res.stauts(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

module.exports = {
  checkOut,
  getHistory,
};
