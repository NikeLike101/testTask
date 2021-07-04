import React, { useEffect } from "react";
import { Table } from "antd";
const { Column, ColumnGroup } = Table;

export default function DinTable({ data, cur, info }) {
  useEffect(() => {
    console.log(data, cur, info);
  }, [data]);
  if (info) {
    console.log(data, cur);
    return (
      <div>
        <Table  dataSource={data} rowKey={(record) => record.uid}>
          <ColumnGroup title={cur}>
            <Column title="Date" dataIndex="Date" key="Date" />
            <Column
              title="Currency_Rate"
              dataIndex="Currency_Rate"
              key="Currency_Rate"
            />
          </ColumnGroup>
        </Table>
      </div>
    );
  } else return <div>bye</div>;

  // return (<div></div>)
}
