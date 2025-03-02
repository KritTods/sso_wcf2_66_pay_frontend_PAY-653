import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, ReservePaymentDataType, FilterSearchType, ReservePaymentDataDetailType } from './types';

export const getcancelCutOffPayReservePaymentService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayReservePaymentService`,
  ({ data }: { data: FilterSearchType }): ReservePaymentDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ReservePaymentDataType[] = [
      {
        documentNo: '101099006480012', //เลขที่เอกสาร
        paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
        advancePaymentType: 'W', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
        payDate: '2024-12-31',
        totalAmount: 20000,
      },
      {
        documentNo: '101099006480013', //เลขที่เอกสาร
        paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
        advancePaymentType: 'B', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
        payDate: '2024-12-31',
        totalAmount: 30000,
      },
      {
        documentNo: '101099006480014', //เลขที่เอกสาร
        paymentNo: 'J13015600034A1', // เลขที่ใบสั่งจ่าย
        advancePaymentType: 'W', // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
        payDate: '2024-12-31',
        totalAmount: 40000,
      },
    ];

    return mockData;
  },
);

export const getancelCutOffPayReservePaymentDetailService = createAsyncThunk(
  `${sliceName}/getancelCutOffPayReservePaymentDetailService`,
  (id: string): ReservePaymentDataDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: ReservePaymentDataDetailType = {
      paymentNo: 'J00006700000B1',
      documentNo: 'P000067000001B1',
      transactionDate: '2025-12-31',
      paymentAgent: 'กาญจนา พิเศษ',
      beginningBalance: 120000,
      bank: {
        //ธนาคาร
        code: '006',
        name: 'กรุงไทย จำกัด (มหาชน)',
      },
      accountNo: '914-3-918009-4',
      chequeNo: '10491800',
      chequeDate: '2025-12-31',
      recieveName: 'ฤทัย ใจคำ',
      amount: 120000,
      advancePaymentType: 'B',
      payDate: '2025-12-31',
      payer: 'กาญจนา พิเศษ',
    };

    return mockData;
  },
);

export const cancelCutOffPayReservePaymentDelectService = createAsyncThunk(
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
