import "./App.css";
import BarChart from "./components/BarChart";
import Navigate from "./components/Navigate";
import TransactionStats from "./components/TransactionStats";
import TransactionsComponent from "./components/TransactionTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigate />
        <Routes>
          <Route path="/transaction" element={<TransactionsComponent />} />
          <Route path="/stats" element={<TransactionStats />} />
          <Route path="/barChart" element={<BarChart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
