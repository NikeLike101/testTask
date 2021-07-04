import React, { useEffect, useState } from "react";

import { Table } from 'antd';



// Cur_Abbreviation: "AZN"
// Cur_Code: "944"
// Cur_DateEnd: "2050-01-01T00:00:00"
// Cur_DateStart: "2017-11-01T00:00:00"
// Cur_ID: 353
// Cur_Name: "Азербайджанский манат"
// Cur_NameMulti: "Азербайджанских манатов"
// Cur_Name_Bel: "Азербайджанскі манат"
// Cur_Name_BelMulti: "Азербайджанскіх манатаў"
// Cur_Name_Eng: "Azerbaijan Manat"
// Cur_Name_EngMulti: "Azerbaijan Manats"
// Cur_ParentID: 226
// Cur_Periodicity: 1
// Cur_QuotName: "1 Азербайджанский манат"
// Cur_QuotName_Bel: "1 Азербайджанскі манат"
// Cur_QuotName_Eng: "1 Azerbaijan Manat"
// Cur_Scale: 1

function CurList({ curs , cursRates }) {
    
  const [cursMaped, setCursMaped] = useState([]);
  const [cursRatesMaped, setCursRatesMaped] = useState([]);
  



  const columnsRates = [
    {
        title: 'Currency',
        dataIndex: 'Cur_Name',
        key: 'Cur_Name',
      },
    {
        title: 'Currency Abbreviation',
        dataIndex: 'Cur_Abbreviation',
        key: 'Cur_Abbreviation',
      },
      {
        title: 'Currency Official Rate in BYN now',
        dataIndex: 'Cur_OfficialRate' ,
        key: 'Cur_OfficialRate',
      },

]

        const columnsAll = [
        {
            title: 'Currency',
            dataIndex: 'Cur_Name',
            key: 'Cur_Name',
          },
        {
            title: 'Currency Abbreviation',
            dataIndex: 'Cur_Abbreviation' ,
            key: 'Cur_Abbreviation',
          },
      

    ]
      
  // console.log(curs)
  useEffect(() => {

    setCursRatesMaped (
        cursRates.map((curRate) => {
            // console.log(curRate.Cur_OfficialRate)

            return { Cur_Name: curRate.Cur_Name, Cur_Abbreviation: curRate.Cur_Abbreviation, Cur_OfficialRate: curRate.Cur_OfficialRate, key: curRate.Cur_ID}
            
        
        })
    )

    setCursMaped(
    //   curs.map((cur) => {
        
    //     return <CurItem curInfo={cur} key={cur?.Cur_ID} />;
    //   })
    curs.map((cur) => {
        
        // if (cur.Cur_OfficialRate) return false
        
        return {Cur_Name: cur.Cur_Name, Cur_Abbreviation: cur.Cur_Abbreviation, key: cur.Cur_ID}

        
    })
    );
  }, [curs, cursRates]);

//   useEffect(() => setData(cursMaped), [cursMaped])
  // console.log(cursMaped[0])
  return (
    <div>
      <Table dataSource={cursRatesMaped} columns={columnsRates} />;
      <Table dataSource={cursMaped} columns={columnsAll} />;
      
      {/* {cursMaped} */}
    </div>
  );
}

export default CurList;
