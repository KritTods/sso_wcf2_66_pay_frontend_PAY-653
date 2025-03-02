import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, OtherPaymentDataType, FilterSearchType, PageDetailType } from './types';

export const getOtherPaymentService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): OtherPaymentDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: OtherPaymentDataType[] = [
      {
        id: '1',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        pamentAgent: 'กรกฎ ใจดี', // ผู้จเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        bookNo: '123456789', // เลขที่หนังสือ รง.
        receiverName: 'นฤมล พรมพัน', // ลูกจ้าง/
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
        amount: 1200000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        id: '2',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        pamentAgent: 'กรกฎ ใจดี', // ผู้จเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        bookNo: '123456789', // เลขที่หนังสือ รง.
        receiverName: 'นฤมล พรมพัน', // ลูกจ้าง/ผู้มีสิทธิ์
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
        amount: 1600000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        id: '3',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        pamentAgent: 'กรกฎ ใจดี', // ผู้จเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        bookNo: '123456789', // เลขที่หนังสือ รง.
        receiverName: 'นฤมล พรมพัน', // ลูกจ้าง/ผู้มีสิทธิ์
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
        amount: 1350000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        id: '4',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        pamentAgent: 'กรกฎ ใจดี', // ผู้จเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        bookNo: '123456789', // เลขที่หนังสือ รง.
        receiverName: 'นฤมล พรมพัน', // ลูกจ้าง/ผู้มีสิทธิ์
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
        amount: 130000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
    ];

    return mockData;
  },
);

export const getOtherPaymentDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      isCheque: true,
      cardHeaderDetail: {
        id: '1',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        pamentAgent: 'กรกฎ ใจดี', // ผู้จเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        bookNo: '123456789', // เลขที่หนังสือ รง.
        receiverName: 'นฤมล พรมพัน', // ลูกจ้าง/
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
        amount: 1200000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
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
      banks: [
        {
          id: '1',
          bankCode: '006',
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          amount: 1000,
        },
        {
          id: '2',
          bankCode: '006',
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          amount: 15000,
        },
      ],
    };

    return mockData;
  },
);
