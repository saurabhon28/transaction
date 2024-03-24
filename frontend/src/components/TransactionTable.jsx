// import axios from "axios";
import { useEffect, useState } from "react";
import "./transactionTable.css";
import data from "../data.json";

const TransactionsComponent = () => {
  const [month, setMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, currentPage]);

  const sampleData = data;
  console.log(sampleData);

  const fetchTransactions = async () => {
    // Simulating API call with sample data
    setTransactions(sampleData);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    const filteredTransactions = sampleData.filter((transaction) =>
      transaction.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setTransactions(filteredTransactions);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="title">
        <h1>Transaction Dashboard</h1>
      </div>
      <div className="container">
        <input
          className="searchTransaction"
          type="text"
          placeholder="Search Transactions"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>

        <label className="selectMonth" htmlFor="monthSelect">
          Select Month:
        </label>
        <select
          className="monthsSelect"
          id="monthSelect"
          value={month}
          onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <table className="table">
          <thead className="tableHead">
            <tr className="tableRow">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Sold" : "Not Sold"}</td>
                <td>
                  <img src={transaction.image} alt={transaction.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="pagesBtn" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="pagesBtn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default TransactionsComponent;
