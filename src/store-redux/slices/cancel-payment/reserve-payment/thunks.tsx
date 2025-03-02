import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, ReservePaymentDataType } from './types';

export const getReservePaymentService = createAsyncThunk(`${sliceName}/get`, (): ReservePaymentDataType[] => {
  //mockup response
  const mockData: ReservePaymentDataType[] = [
    {
      id: '1',
      documentNo: '101099006480012', //เลขที่เอกสาร
      paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
      bankCode: '006:กรุงไทย จำกัด(มหาชน)', // ธนาคาร
      accountNo: '914-3-918009-4', // เลขบัญชีธนาคาร
      chequeNo: '10491800', //เลขที่เช็ค
      chequeDate: '31/12/2567', // วันที่เช็ค
      recieveName: 'ฤทัย ใจคำ', // ชื่อผู้รับเงิน
      advancePaymentType: 'เบิกเงินรองจ่าย', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      amount: 1200000,
      paymentAgent: 'กาญจนา พิเศษ', // ผู้เตรียมจ่าย
      beginningBalance: 1200000, // ยอดยกมา
    },
    {
      id: '2',
      documentNo: '101099006480013', //เลขที่เอกสาร
      paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
      bankCode: '006:กรุงไทย จำกัด(มหาชน)', // ธนาคาร
      accountNo: '914-3-918009-4', // เลขบัญชีธนาคาร
      chequeNo: '10491800', //เลขที่เช็ค
      chequeDate: '31/12/2567', // วันที่เช็ค
      recieveName: 'ฤทัย ใจคำ', // ชื่อผู้รับเงิน
      advancePaymentType: 'เบิกเงินรองจ่าย', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      amount: 1500000,
      paymentAgent: 'กาญจนา พิเศษ', // ผู้เตรียมจ่าย
      beginningBalance: 1500000, // ยอดยกมา
    },
    {
      id: '3',
      documentNo: '101099006480014', //เลขที่เอกสาร
      paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
      bankCode: '006:กรุงไทย จำกัด(มหาชน)', // ธนาคาร
      accountNo: '914-3-918009-4', // เลขบัญชีธนาคาร
      chequeNo: '10491800', //เลขที่เช็ค
      chequeDate: '31/12/2567', // วันที่เช็ค
      recieveName: 'ฤทัย ใจคำ', // ชื่อผู้รับเงิน
      advancePaymentType: 'เบิกเงินรองจ่าย', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้เตรียมจ่าย
      beginningBalance: 1200000, // ยอดยกมา
      amount: 1200000,
    },
  ];

  return mockData;
});

export const getReservePaymentDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): ReservePaymentDataType => {
    console.log('id', id);
    //mockup response
    const mockData: ReservePaymentDataType = {
      id: '1',
      documentNo: '101099006480012', //เลขที่เอกสาร
      paymentNo: 'J00006700000B1', // เลขที่ใบสั่งจ่าย
      bankCode: '006:กรุงไทย จำกัด(มหาชน)', // ธนาคาร
      accountNo: '914-3-918009-4', // เลขบัญชีธนาคาร
      chequeNo: '10491800', //เลขที่เช็ค
      chequeDate: '31/12/2567', // วันที่เช็ค
      recieveName: 'ฤทัย ใจคำ', // ชื่อผู้รับเงิน
      advancePaymentType: 'เบิกเงินรองจ่าย', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      amount: 12000, // จำนวนเงิน
      paymentAgent: 'กาญจนา พิเศษ', // ผู้เตรียมจ่าย
      beginningBalance: 12000, // ยอดยกมา
    };

    return mockData;
  },
);
