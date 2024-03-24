import "./transactionStats.css"; // Import CSS file for styling
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

const SalesSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [salesData, setSalesData] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    if (selectedMonth !== "" && selectedYear !== "") {
      // Fetch data from API endpoint using Axios
      axios
        .get(
          `http://localhost:5000/api/stats?month=${selectedMonth}&year=${selectedYear}`
        )
        .then((response) => {
          setSalesData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="sales-summary-container">
      <h2>Sales Summary</h2>
      <div className="select-container">
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select</option>
          {/* Add options for months here */}
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label>Select Year: </label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select</option>

          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div className="summary-details">
        <h3>
          Summary for{" "}
          {selectedMonth !== "" && selectedYear !== ""
            ? `${selectedMonth}/${selectedYear}`
            : "Selected Month/Year"}
        </h3>
        <p>
          Total Amount of Sale: <span>${salesData.totalSaleAmount}</span>
        </p>
        <p>
          Total Sold Items: <span>{salesData.totalSoldItems}</span>
        </p>
        <p>
          Total Unsold Items: <span>{salesData.totalNotSoldItems}</span>
        </p>
      </div>
    </div>
  );
};

export default SalesSummary;
