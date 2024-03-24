import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    // Sample data provided
    const sampleData = [
      {
        id: 1,
        title: "Fjallraven Foldsack No 1 Backpack Fits 15 Laptops",
        price: 329.85,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        sold: false,
        dateOfSale: "2021-11-27T20:29:54+05:30",
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit TShirts",
        price: 44.6,
        description:
          "Slimfitting style contrast raglan long sleeve threebutton henley placket light weight  soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a threebutton placket.",
        category: "men's clothing",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        sold: false,
        dateOfSale: "2021-10-27T20:29:54+05:30",
      },
      {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 615.89,
        description:
          "great outerwear jackets for SpringAutumnWinter suitable for many occasions such as working hiking camping mountainrock climbing cycling traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father husband or son in this thanksgiving or Christmas Day.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        sold: true,
        dateOfSale: "2022-07-27T20:29:54+05:30",
      },
      {
        id: 4,
        title: "Mens Casual Slim Fit",
        price: 31.98,
        description:
          "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person therefore detailed size information should be reviewed below on the product description.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        sold: false,
        dateOfSale: "2021-10-27T20:29:54+05:30",
      },
      {
        id: 5,
        title:
          "John Hardy Womens Legends Naga Gold Silver Dragon Station Chain Bracelet",
        price: 6950,
        description:
          "From our Legends Collection the Naga was inspired by the mythical water dragon that protects the oceans pearl. Wear facing inward to be bestowed with love and abundance or outward for protection.",
        category: "jewelery",
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        sold: false,
        dateOfSale: "2022-06-27T20:29:54+05:30",
      },
    ];
    setData(sampleData);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filterDataByMonth = (items, month) => {
    if (!month) return items;
    return items.filter(
      (item) =>
        new Date(item.dateOfSale).toLocaleString("en-us", { month: "long" }) ===
        month
    );
  };

  const calculatePriceRangeCounts = (items) => {
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
      "901-above": 0,
    };

    items.forEach((item) => {
      const price = item.price;
      if (price <= 100) priceRanges["0 - 100"]++;
      else if (price <= 200) priceRanges["101 - 200"]++;
      else if (price <= 300) priceRanges["201 - 300"]++;
      else if (price <= 400) priceRanges["301 - 400"]++;
      else if (price <= 500) priceRanges["401 - 500"]++;
      else if (price <= 600) priceRanges["501 - 600"]++;
      else if (price <= 700) priceRanges["601 - 700"]++;
      else if (price <= 800) priceRanges["701 - 800"]++;
      else if (price <= 900) priceRanges["801 - 900"]++;
      else priceRanges["901-above"]++;
    });

    return Object.values(priceRanges);
  };

  const filteredData = filterDataByMonth(data, selectedMonth);
  const chartData = {
    labels: [
      "0 - 100",
      "101 - 200",
      "201 - 300",
      "301 - 400",
      "401 - 500",
      "501 - 600",
      "601 - 700",
      "701 - 800",
      "801 - 900",
      "901-above",
    ],
    datasets: [
      {
        label: "Number of Items",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: calculatePriceRangeCounts(filteredData),
      },
    ],
  };

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">All Months</option>
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
      <div>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default BarChart;
