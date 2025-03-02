import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, RefundToEmploerDataType, FilterSearchType, PageDetailType } from './types';

export const getRefundToEmployerService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): RefundToEmploerDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: RefundToEmploerDataType[] = [
      {
        id: '1',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        receiverName: 'กรกฎ ใจดี', //จ่ายให้
        employerAccountNumber: '123456789', //เลขที่บัญชีนายจ้าง*****
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        branchSequence: '1', //ลำดับที่สาขา******
        companyName: 'บริษัท สมหมาย จำกัด', //ชื่อสถานประกอบการ******
        amount: 120000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        id: '2',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        employerAccountNumber: '123456789', //เลขที่บัญชีนายจ้าง*****
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        branchSequence: '1', //ลำดับที่สาขา******
        companyName: 'บริษัท สมหมาย จำกัด', //ชื่อสถานประกอบการ******
        receiverName: 'นฤมล พรมพัน', //จ่ายให้
        amount: 1500000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        id: '3',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        employerAccountNumber: '123456789', //เลขที่บัญชีนายจ้าง*****
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        branchSequence: '1', //ลำดับที่สาขา******
        companyName: 'บริษัท สมหมาย จำกัด', //ชื่อสถานประกอบการ******
        receiverName: 'กรกฎ ใจดี', //จ่ายให้
        amount: 1000000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        id: '4',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        employerAccountNumber: '123456789', //เลขที่บัญชีนายจ้าง*****
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        branchSequence: '1', //ลำดับที่สาขา******
        companyName: 'บริษัท สมหมาย จำกัด', //ชื่อสถานประกอบการ******
        receiverName: 'นฤมล พรมพัน', //จ่ายให้
        amount: 1200000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
    ];

    return mockData;
  },
);

export const getRefundToEmployerDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      documentNo: 'P000167000001E1',
      username: 'กาญจนา พิเศษ',
      transactionDate: '2024-12-31',
      payType: 'P',
      isCheque: false,
      tableList: [
        {
          id: '1',
          ssoCode: '1050', //รหัส สปส.
          paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
          transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
          receiverName: 'กรกฎ ใจดี', //จ่ายให้
          employerAccountNumber: '123456789', //เลขที่บัญชีนายจ้าง*****
          bankCode: '006:กรุงไทย จำกัด(มหาชน)',
          branchSequence: '1', //ลำดับที่สาขา******
          companyName: 'บริษัท สมหมาย จำกัด', //ชื่อสถานประกอบการ******
          amount: 120000, // จำนวนเงิน
          payType: 'P', //ประเภทการจ่ายเงิน
        },
      ],
      cheques: [
        {
          id: '1',
          chequeNo: '123456',
          amount: 1000,
          bankCode: '006:กรุงไทย จำกัด(มหาชน)',
          chequeStampDate: '2024-12-31',
          bankBranchCode: '1234',
        },
      ],
      cash: 5000,
      address: '123 Main St, Bangkok, Thailand',
      moneys: [
        {
          id: '1',
          amount: 2000,
          postalNo: 'PN123456',
          postalCode: '10110',
          portalDestination: 'Bangkok Post Office',
          receiverName: 'นพดล สุขใจดี',
        },
      ],
    };

    return mockData;
  },
);
