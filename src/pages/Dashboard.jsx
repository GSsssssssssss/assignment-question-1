import {  useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

// Adding debounce for search functionality
const debounce = (callback, delay) => {
  let timeoutId;
  return(...args) =>{
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [orderSubmittedVal, setorderSubmittedVal] = useState({});
  const [searchedRows, setSearchedRows] = useState([]);

  //Defining handleClick to populate the cards above the table
  const handleClick = (row) => {
      setSelectedOrderDetails(row.executionDetails)
      const matchingTimestamp = timestamps.results.find((stamp) => stamp.id === row.id);
      setSelectedOrderTimeStamps(matchingTimestamp.timestamps || {});
  }

  //Defining orderVolume to get the whole list of currency in orderVolume object
  const orderVolume = mockData.results[0].bestExecutionData.orderVolume;

  //This useEffect is defined to get the value of orderSubmitted from timestamp JSON
  // Split method is used to get the value of order Submitted date
  useEffect(()=> {
    const map = {};
    timestamps.results.forEach((order) => {
     map[order["&id"]] = order.timestamps.orderSubmitted.split("T")[0];
    });
    setorderSubmittedVal(map);
  }, []);


  //Search functionality
  useEffect(() => {
    const searchRows = () => {
      const searchValue = mockData.results.filter((row) => {
        const orderVolume = row.bestExecutionData.orderVolume[currency];
        
        return (
          //Possible search methods with id, buysellIndicator, orderStatus or using orderVolume also
          row["&id"].toLowerCase().includes(searchText.toLowerCase()) ||
          row.executionDetails.buySellIndicator.toLowerCase().includes(searchText.toLowerCase()) ||
          row.executionDetails.orderStatus.toLowerCase().includes(searchText.toLowerCase()) ||
          String(orderVolume).includes(searchText)
        );
      });
      setSearchedRows(searchValue);
    };

    const debounceSearchRows = debounce(searchRows, 200);
    debounceSearchRows();

    return() => clearTimeout(debounceSearchRows);
  }, [searchText,currency]);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${searchedRows.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            
          />
          <Dropdown
            options={Object.keys(orderVolume)}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={searchedRows} 
        onClick={handleClick} 
        currency={currency}
        orderSubmittedVal={orderSubmittedVal}
         />
      </div>
    </div>
  );
};

export default Dashboard;
