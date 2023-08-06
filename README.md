# Instructions

- clone this repo and open with your favorite code editor

- make sure you are checked out to `master` branch

- to run the app `npm install` then `npm start`

- Find the site here [Assignment-1](https://gagan-assignment-1.netlify.app/)

## Please fix the following issues

1.  In the title of the header, it displays `5 orders` but there are `6 orders` in the table. We want to display the `total` number of `orders` in the header title

![image](https://github.com/GSsssssssssss/assignment-question-1/assets/93574391/5a9b07fc-35bb-4494-9440-87ad943020b0)
![image](https://github.com/GSsssssssssss/assignment-question-1/assets/93574391/cc3c4124-6315-47f1-a6ae-e73de7fbfa53)

```
<HeaderTitle primaryTitle="Orders" secondaryTitle={`${searchedRows.length} orders`} />
```
To get the correct number of rows, here I use length method to get the length of array of result object in data.json

2.  In the table order submitted date is missing, we have timestamp data included in the `src\assets\timeStamps.json` with the corresponding ids, please combine that with the order data and make sure the order submitted date is being displayed in the table
```
  const [orderSubmittedVal, setorderSubmittedVal] = useState({});
   useEffect(()=> {
    const map = {};
    timestamps.results.forEach((order) => {
     map[order["&id"]] = order.timestamps.orderSubmitted.split("T")[0];
    });
    setorderSubmittedVal(map);
  }, []);
<List rows={searchedRows} 
        onClick={handleClick} 
        currency={currency}
        orderSubmittedVal={orderSubmittedVal}
         />
```
First, I am creating a state orderSubmittedval to create a map having ordersubmitted val Then passing it as prop in List component, in List component it is getting match with order id in data.json as 
## orderSubmittedVal[row["&id"]]}

3.  Order Volume cell is displaying USD values, can you please make it display the currency value selected on the dropdown located in the header of the dashboard
## To display currency we need to just pass currency as prop to List component and a state is already defined in currency so when option is selected in dropdown the value is set to that currency and we can acess it like 
```
<ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
```
4.  Can you please add search feature on the order IDs with the search bar given in the header
![image](https://github.com/GSsssssssssss/assignment-question-1/assets/93574391/a46433b2-2584-4a51-ba85-817bf70a721b)

```
const [searchText, setSearchText] = useState("");
const [searchedRows, setSearchedRows] = useState([]);
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
```


6.  Please clear the console errors and warnings.
![image](https://github.com/GSsssssssssss/assignment-question-1/assets/93574391/a6491046-3d4a-4f48-a4b5-2989f90bd400)


7.  When user selects an order, can you populate the Card on top of the listing component as shown in the image
```
const handleClick = (row) => {
      setSelectedOrderDetails(row.executionDetails)
      const matchingTimestamp = timestamps.results.find((stamp) => stamp.id === row.id);
      setSelectedOrderTimeStamps(matchingTimestamp.timestamps || {});
  }
```
After creating handleClick function I pass it as a 'onClick' prop to List component. In list component, give that onClick as a prop to ListRow
![alt text](dashboard.JPG)

## Bonus

- run storybook `npm run storybook`



1. Please add storybook to one of the components
![image](https://github.com/GSsssssssssss/assignment-question-1/assets/93574391/26e9bc91-d2c2-420a-a88d-f2d01f412ae1)
added Dashboard component as a storybook
