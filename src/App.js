import "./App.css";
import { Select, DatePicker } from 'antd';
import DinamicCur from "./modules/dinamicCur";
import moment from "moment";
import CurList from "./modules/curList";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
const { Option } = Select;
const {RangePicker} = DatePicker
function App() {
 

  const [dinCur, setDinCur] = useState({});
  const [curs, setCurs] = useState([]);
  const [cursRates, setCursRates] = useState([]);
  const [dateState, setDateState] = useState({})
  const dateArr = {firstDate:'' , endDate:''}
  useEffect(() => {
    
    
    const getCur = () => {

      fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0", {
        method: "GET",
        headers: {
          // Host: 'www.nbrb.by',
          // Origin: 'localhost:3000',
          // Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          // "Content-Type": "application/json",
        },
        // redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          setCursRates(result);
        })
        .catch((error) => console.log("error", error));

      // https://viczem.dev/leLAGaOtrYjz/users
      // USD - 145
      fetch("https://www.nbrb.by/api/exrates/currencies", {
        method: "GET",
        headers: {
          // Host: 'www.nbrb.by',
          // Origin: 'localhost:3000',
          // Authorization: "Bearer " + getWithExpiry("token"),
          Accept: "application/json",
          // "Content-Type": "application/json",
        },
        // redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          setCurs(result);
        })
        .catch((error) => console.log("error", error));
    };

    getCur();
  }, []);

  // const btnClick = () => { 
  //   console.log(1)
  // }

  const onChangeSelect = (value) => {
    console.log(value)
    setDinCur(value)
    console.log(dinCur)
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  const onChangePicker = (value) => {
    
    if(value) {
    value.forEach((e,i) => {
      let date = e._d.toString()
      let month = date.slice(4,7)
      let dateFormated = []
      switch (month) {
        case('Jan'): {
         
          dateFormated[1] = '01'
          break
        }
          case('Feb'): {
       
            dateFormated[1] = '02'
            break
          }
          
          
        case('Mar'): {
       
          dateFormated[1] = '03'

          break
        }
        
        case('Apr'): {

          dateFormated[1] = '04'
          break
        } 
        case('May'): {
  
          dateFormated[1] = '05'
          break
        }
        case('Jun'): {

          dateFormated[1] = '06'
          break
        }
        case('Jul'): {
        
          dateFormated[1] = '07'
          break
        } 
        case('Aug'): {
       
          dateFormated[1] = '08'
          break
        } 
        case('Sep'): {
        
          dateFormated[1] = '09'
          break
        } 
        case('Oct'): {
          
          dateFormated[1] = '10'
          break
        } 
        case('Nov'): {
          
          dateFormated[1] = '11'
          break
        } 
        case('Dec'): {
          
          dateFormated[1] = '12'
          break
        } 
      }
      dateFormated[2] = date.slice(8,10)
      dateFormated[0]=date.slice(11,15) 
      dateFormated = dateFormated.join('-')
      
      // console.log(dateFormated)
      
      if(i === 0) {
        console.log(dateArr.firstDate)
        dateArr.firstDate = dateFormated
      } else {
        console.log(dateArr.firstDate)
        dateArr.endDate =dateFormated
      }
      console.log(dateArr)
      
      setDateState(dateArr)
      
      
      
      // e.slice()
    })
    console.log(value[0]._d, value[1]._d)
  }
    
  }
  useEffect(() => {
      console.log(dateState)
  }, [dateState])

  return (
    <div className="App">
      
      <Select
      onChange={onChangeSelect}
      placeholder="Select a currency"
      showSearch
      // defaultActiveFirstOption
      // defaultValue = "USD"
    style={{ width: 200 }}
      >
      <Option value="USD">USD</Option>
        <Option value="EUR">EUR since 07.01.2016</Option>
        <Option value="RUB">RUB since 07.01.2016</Option>
      </Select>
      <RangePicker
        format={"YYYY-MM-DD"}
        disabledDate={disabledDate}
        onChange={onChangePicker}
      />
      {/* <Button onClick={btnClick} type='primary'>Get currency rate</Button> */}
      <DinamicCur dinCur = {dinCur} dates = {dateState}/>

      <CurList curs={curs} cursRates={cursRates} />
    </div>
  );
}

export default App;
