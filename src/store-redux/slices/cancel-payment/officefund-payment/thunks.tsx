import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, OfficeFundDataType, FilterSearchType } from './types';

export const getOfficeFundService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): OfficeFundDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: OfficeFundDataType[] = [
      {
        id: '1',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1200000, // จำนวนเงิน
        noticeName: '1', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
      {
        id: '2',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        noticeName: '1', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
      {
        id: '3',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1530000, // จำนวนเงิน
        noticeName: '1', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
    ];

    return mockData;
  },
);

export const getOfficeFundDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): OfficeFundDataType => {
    console.log('id', id);
    //mockup response
    const mockData: OfficeFundDataType = {
      id: '1',
      documentNo: 'P000167000001E1', //เลขที่เอกสาร
      paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      amount: 1200000, // จำนวนเงิน
      noticeName: '1', // จ่ายตามประกาศฉบับที่
      noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
      creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
      paymentAgent: 'กรกฎ ใจดี',
      details: [
        {
          dueInstallment: '1', // งวดที่
          bookNo: '123456', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
          accountName1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo1: '123456', //เลขที่เช็ค : 1
          chequeBankDigitCode1: '006 : กรุงไทย จำกัด(มหาชน)', //รหัสธนาคารเช็ค : 1
          amount1: 1200000, //จำนวนเงิน : 1
          accountName2: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 2
          chequeNo2: '123456', //เลขที่เช็ค : 2
          chequeBankDigitCode2: '006', //รหัสธนาคารเช็ค : 2
          amount2: 1500000, //จำนวนเงิน : 2
        },
        {
          dueInstallment: '2', // งวดที่
          bookNo: '123456', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
          accountName1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo1: '123456', //เลขที่เช็ค : 1
          chequeBankDigitCode1: '006 : กรุงไทย จำกัด(มหาชน)', //รหัสธนาคารเช็ค : 1
          amount1: 15000, //จำนวนเงิน : 1
          accountName2: '', //   ชื่อบัญชีสั่งจ่าย : 2
          chequeNo2: '', //เลขที่เช็ค : 2
          chequeBankDigitCode2: '', //รหัสธนาคารเช็ค : 2
          amount2: 0, //จำนวนเงิน : 2
        },
      ],
    };

    return mockData;
  },
);
