const { Transaction } = require("../models/transactionModels");
const axios = require("axios");

// Fetch data from the third-party API and initialize the database
const fetchData = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data; // Assuming the JSON data is an array of transactions
    await Transaction.insertMany(transactions);
    res.status(200).send("Database initialized successfully");
    next();
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).send("Internal server error");
  }
};

const getData = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search;

  try {
    let query = {};

    if (search) {
      // Constructing the search query
      const searchRegex = new RegExp(search, "i");
      query = {
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { price: { $regex: searchRegex } },
        ],
      };
    }

    const totalCount = await Transaction.countDocuments(query);
    const startIndex = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      totalTransactions: totalCount,
      transactions: transactions,
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    next(error);
  }
};

// Function to calculate statistics
async function calculateStatistics(month, year) {
  try {
    const selectedMonthData = await Transaction.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfSale" }, month] },
          { $eq: [{ $year: "$dateOfSale" }, year] },
        ],
      },
    });

    const totalSaleAmount = selectedMonthData.reduce((acc, item) => {
      if (item.sold) {
        return acc + item.price;
      }
      return acc;
    }, 0);

    const totalSoldItems = selectedMonthData.filter((item) => item.sold).length;
    const totalNotSoldItems = selectedMonthData.filter(
      (item) => !item.sold
    ).length;

    return {
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    };
  } catch (error) {
    console.error("Error calculating statistics:", error);
    throw error;
  }
}

// GET API controller for statistics
const getStats = async (req, res, next) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res
      .status(400)
      .json({ error: "Month and year are required parameters." });
  }

  try {
    const statistics = await calculateStatistics(
      parseInt(month),
      parseInt(year)
    );
    res.status(200).json(statistics);

    next();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics." });
    next(error);
  }
};

// Function to determine the price range for a given price
function getPriceRange(price) {
  if (price <= 100) return "0 - 100";
  else if (price <= 200) return "101 - 200";
  else if (price <= 300) return "201 - 300";
  else if (price <= 400) return "301 - 400";
  else if (price <= 500) return "401 - 500";
  else if (price <= 600) return "501 - 600";
  else if (price <= 700) return "601 - 700";
  else if (price <= 800) return "701 - 800";
  else if (price <= 900) return "801 - 900";
  else return "901 - above";
}

// API controllers for generating bar chart data
const getBarChart = async (req, res, next) => {
  const { month } = req.params;

  try {
    // Parse month to integer
    const monthInt = parseInt(month);
    console.log(month);

    // Validate month
    if (isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
      return res.status(400).json({ error: "Invalid month" });
    }

    // Define price ranges
    const priceRanges = {
      "0 - 100": 0,
      "101 - 200": 0,
      "201 - 300": 0,
      "301 - 400": 0,
      "401 - 500": 0,
      "501 - 600": 0,
      "601 - 700": 0,
      "701 - 800": 0,
      "801 - 900": 0,
      "901 - above": 0,
    };

    // Get transactions for the selected month
    const transactions = await Transaction.find({}).lean(); // Ensure we're dealing with plain JavaScript objects

    // Count items in each price range for the selected month
    transactions.forEach((transaction) => {
      const date = new Date(transaction.dateOfSale);
      const transactionMonth = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
      if (transactionMonth === monthInt) {
        const price = parseFloat(transaction.price);
        if (!isNaN(price)) {
          const priceRange = getPriceRange(price);
          priceRanges[priceRange]++;
        }
      }
    });

    res.status(200).json(priceRanges);

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const getPieChart = async (req, res, next) => {
  const selectedMonth = parseInt(req.query.month);

  if (
    !selectedMonth ||
    isNaN(selectedMonth) ||
    selectedMonth < 1 ||
    selectedMonth > 12
  ) {
    return res.status(400).json({
      error:
        "Invalid month parameter. Please provide a valid integer between 1 and 12 for the month.",
    });
  }

  try {
    const categoryCount = {};

    const transactions = await Transaction.find({});

    transactions.forEach((transaction) => {
      const saleDate = new Date(transaction.dateOfSale);
      const saleMonth = saleDate.getMonth() + 1; // Month is zero-based, so adding 1
      if (saleMonth === selectedMonth) {
        const category = transaction.category;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    });

    res.json(categoryCount);
    next();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};

// const getCombinedData = async (req, res) => {
//   let responseSent = false; // Flag to track response status
//   try {
//     // Fetch data from all three endpoints
//     const data = await getData(req, res);
//     const stats = await getStats(req, res);
//     const barChart = await getBarChart(req, res);

//     // Combine responses into a single JSON object
//     const combinedData = {
//       data: res.locals.data,
//       statistics: res.locals.stats,
//       barChart: res.locals.barChart,
//     };

//     // Send the combined JSON response
//     res.json(combinedData);
//     responseSent = true;
//   } catch (error) {
//     console.error("Error fetching combined data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = {
  fetchData,
  getData,
  getStats,
  getBarChart,
  getPieChart,
  // getCombinedData,
};
