import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, OfficeFundDataType, FilterSearchType, OfficeFundDataDetailType } from './types';

export const getcancelCutOffPayOfficeFundService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayOfficeFundService`,
  ({ data }: { data: FilterSearchType }): OfficeFundDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: OfficeFundDataType[] = [
      {
        significantNo: '0001670000001B2', //เลขที่ใบสำคัญรับเงิน
        significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
        documentNo: 'P000167000001B2', //เลขที่เอกสาร
        paymentNo: 'J000167000001B2', // เลขที่ใบสั่งจ่าย
        payDate: '2024-12-31', // วันที่เตรียมจ่าย
        totalAmount: 1200000, // จำนวนเงิน
      },
      {
        significantNo: '', //เลขที่ใบสำคัญรับเงิน
        significantHandNo: '0001670000001B2', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
        documentNo: 'P000167000001B3', //เลขที่เอกสาร
        paymentNo: 'J000167000001B2', // เลขที่ใบสั่งจ่าย
        payDate: '2024-12-31', // วันที่เตรียมจ่าย
        totalAmount: 1300000, // จำนวนเงิน
      },
      {
        significantNo: '0001670000001B2', //เลขที่ใบสำคัญรับเงิน
        significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
        documentNo: 'P000167000001B4', //เลขที่เอกสาร
        paymentNo: 'J000167000001B2', // เลขที่ใบสั่งจ่าย
        payDate: '2024-12-31', // วันที่เตรียมจ่าย
        totalAmount: 1400000, // จำนวนเงิน
      },
    ];

    return mockData;
  },
);

export const getcancelCutOffPayOfficeFundDetailService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayOfficeFundDetailService`,
  (id: string): OfficeFundDataDetailType => {
    //mockup response
    console.log('id', id);
    const mockData: OfficeFundDataDetailType = {
      cardConsider: {
        payDate: '2024-12-31', // วันที่ตัดจ่าย
        payer: 'John Doe', // ผู้ตัดจ่าย
        status: 'จ่ายแล้ว', // สถานะ
        significantNo: 'SN123456789', // เลขที่ใบสำคัญรับเงิน
        significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      },
      cardPreparePay: {
        documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        paymentAgent: 'John Doe', // ผู้ตเตรียมจ่าย   common
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      },
      noticeName: '1',
      noticeAmount: 10000,
      creditBalance: 10000,
      carddueInstallment: [
        {
          dueInstallment: '1', // งวดที่
          bookNo: '22222', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
          accountName_1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo_1: '123456', //เลขที่เช็ค : 1
          bank_1: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          amount_1: 1200000, //จำนวนเงิน : 1
          accountName_2: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 2
          bank_2: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          chequeNo_2: '123456', //เลขที่เช็ค : 2
          amount_2: 1500000, //จำนวนเงิน : 2
        },
        {
          dueInstallment: '2', // งวดที่
          bookNo: '333333', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
          accountName_1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo_1: '123456', //เลขที่เช็ค : 1
          bank_1: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          amount_1: 1200000, //จำนวนเงิน : 1
          accountName_2: '', //   ชื่อบัญชีสั่งจ่าย : 2
          bank_2: {
            code: '',
            name: '',
          },
          chequeNo_2: '', //เลขที่เช็ค : 2
          amount_2: 0, //จำนวนเงิน : 2
        },
      ],
    };

    return mockData;
  },
);

export const cancelCutOffPayOfficeFundDelectService = createAsyncThunk(
  `${sliceName}/cancel-cut-to-pay/cmp/patch`,
  async (prepareToPayId: string): Promise<{ prepareToPayId: string }> => {
    console.log('Delete', prepareToPayId);
    // เปิดใช้งาน API call จริง
    // const response = await callApi({
    //   method: 'patch',
    //   url: `cancel-cut-to-pay/cmp/id/${prepareToPayId}`,
    //   instanceName: 'pay',
    // });

    // สมมติว่าต้องการ return ค่าเดียวกับ request mock
    return await Promise.resolve({ prepareToPayId });
  },
);
