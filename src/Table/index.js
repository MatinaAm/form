import React, { useRef } from 'react';
import { CheckCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { Flex, Table } from 'antd';

import { toPersianDigits } from "../utils/helper";
import { mockData } from "../utils/mock";
import strings from "../utils/localization";
import useColumnSearch from "./Search";
import { toast } from "react-toastify";
import cardLogo from '../styles/card.PNG';


const formattedData = mockData.map(item => {
  const formattedAge = item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return { ...item, amount: toPersianDigits(formattedAge) };
});


const App = () => {

  const {
    getColumnSearchProps,
  } = useColumnSearch();

  const columns = [
    {
      title: 'شماره تراکنش',
      dataIndex: 'trackId',
      key: 'trackId',
      width: '30%',
      ...getColumnSearchProps('trackId'),
      render: (text, record) => (

        <>
          <span className="englishFont font-weight-500 ">
                  {text}
              </span>
          <CopyOutlined
            onClick={() => toast.success(` شماره تراکنش ${text} کپی شد`)}
            className="mr-5" style={{ color: "#3a3adb", cursor: 'pointer' }}/>

        </>

      ),
    },

    {
      title: 'وضعیت تراکنش',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (text, record) => {
        if (text === 1) {
          return (
            <>
              <CheckCircleOutlined


                className="mr-5" style={{ color: "#017c0f", cursor: 'pointer' }}
              />
              <span className="mr-5">
                  {strings.successPay}
              </span>

            </>

          )

        } else if (text === 2) {
          return `${strings.errorPay}`;
        } else
          return `${strings.loadingPay}`;
      },
    },
    {
      title: 'تاریخ پرداخت',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'مبلغ',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        return ` ${text} ریال `; // just for decoration
      },
    },
    {
      title: 'شماره کارت',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      ...getColumnSearchProps('cardNumber'),

      render: (text, record) => (
        <>
          <Flex gap="10px" align="center" >
          <span className="englishFont font-weight-500">
                  {text}

              </span>
          <img src={cardLogo} height="38px"/>
          </Flex>
        </>
      ),
    },
  ];
  return (
    <>
    <Table
      // headerBg={'#3a3adb'}
    columns={columns} dataSource={formattedData} pagination={formattedData?.length > 10}/>
      <p style={{direction:'rtl'}}>
         تعداد نتایج
        <span> : { formattedData?.length }</span>
        </p>
    </>
  )


};

export default App;