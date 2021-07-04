import React, { useEffect, useState } from "react";
import { LineChart, XAxis, Tooltip, Line, CartesianGrid, Legend, YAxis } from "recharts";
import DinTable from "./dinTable";

export default function DinamicCur(dinCur ) {
    // console.log(dinCur)
    const dates = dinCur?.dates
    // console.log(dates)
    const [data, setData] = useState({} )
    const [curType, setCurType] = useState()
    const [info, setInfo] = useState(false)
    
// USD - 145
// EUR - 19
// RUB - 141
const getData = (cur ,dates) => {
    console.log(dates)
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${cur}?startDate=${dates?.firstDate}&endDate=${dates?.endDate}`, {
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
            if(cur === 298) {
                setData(result.map?.(({Cur_OfficialRate, Date}) => ({
                    Currency_Rate: Cur_OfficialRate/100,
                    Date: Date.slice(0,10)
                  }))
                  );
            } else {
                setData(result.map?.(({Cur_OfficialRate, Date}) => ({
                    Currency_Rate: Cur_OfficialRate,
                    Date: Date.slice(0,10)
                  }))
                  );
            }
          
        //   console.log(result)
        })
        .catch((error) => console.log("error", error));
        
    
}



console.log(dinCur.dinCur, data)  

    useEffect(() => {
        
    
switch (dinCur.dinCur) {
    case "USD" : setCurType('145'); break
    case "EUR" : setCurType('292'); break
    case "RUB" : setCurType('298'); break
    // default: setCurType('145')
}       
    }, [dinCur.dinCur])


    useEffect(() => {
        
        if (dates?.firstDate && dates?.endDate && curType) {
            getData(curType , dates)
      
        } 
     
    }, [dates?.firstDate, dates?.endDate, curType])
   
    useEffect (()=> {
        if(data[0]) setInfo(true)
    },[data])

    useEffect(() => {
        console.log(info)
    }, [info])
   
  return (
    <div className="f">
      <LineChart
        width={1000}
        height={600}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis  
        dataKey="Date"
        />
         <YAxis/> 
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <Line type="monotone" dataKey='Currency_Rate'  stroke="#387908" />
      </LineChart>
      <DinTable data = {data} cur ={dinCur.dinCur} info ={info}/>
    </div>
  );
}
