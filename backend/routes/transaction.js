const {
  fetchData,
  getData,
  getStats,
  getBarChart,
  getPieChart,
  // getCombinedData,
} = require("../controllers/tranctionControllers");

// set-up router endpoint

const router = require("express").Router();

router.get("/fetch-data", fetchData);
router.get("/transaction", getData);
router.get("/stats", getStats);
router.get("/pie-chart/", getPieChart);
router.get("/bar-chart/:month", getBarChart);
// router.get("/combinedData/", getCombinedData);

module.exports = router;
