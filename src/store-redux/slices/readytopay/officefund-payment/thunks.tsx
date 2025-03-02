import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from './types';

interface AccountListType {
  accountName: string;
  bankCode: string;
  chequeNumber: string;
  amount: number;
}

interface PeriodListsType {
  id: string;
  periodNumber: string;
  bookNo: string;
  bookDate: string;
  bookApprover: string;
  accountLists: AccountListType[];
}

export interface BodyCreateOfficefundPaymentServiceType {
  noticeNumber: string;
  noticeAmount: number;
  balanceAmount: number;
  periodLists: PeriodListsType[];
}

export interface GetOfficefundPaymentByIdServiceType extends BodyCreateOfficefundPaymentServiceType {
  prepareToPayId: string;
  documentNo: string;
  paymentNo: string;
  paymentAgent: string;
  transactionDate: string;
}

export interface BodyUpdateRefundtoEmployerServiceType extends BodyCreateOfficefundPaymentServiceType {
  prepareToPayId: string;
  documentNo: string;
  paymentNo: string;
  paymentAgent: string;
  transactionDate: string;
}

export const createOfficefundPaymentService = createAsyncThunk(
  `${sliceName}/create`,
  (data: BodyCreateOfficefundPaymentServiceType) => {
    console.log('data', data);
    //  const response = (await callApi({
    //     method: 'post',
    //     url: '/prepare-to-pay/hospital',
    //     body: body,
    //     instanceName: 'pay',
    //   })) as { prepareToPayId: string };

    return { prepareToPayId: 'test-test-test-0001' };
  },
);

export const getOfficefundPaymentByIdService = createAsyncThunk(`${sliceName}/get/id`, (prepareToPayId: string) => {
  // const response = (await callApi({
  //   method: 'get',
  //   url: `prepare-to-pay/hospital/${prepareToPayId}`,
  //   instanceName: 'pay',
  // })) as GetHospitalByIdServiceType;

  // return response;
  const mockData: GetOfficefundPaymentByIdServiceType = {
    prepareToPayId: prepareToPayId,
    documentNo: 'P000167000001E1',
    paymentNo: 'J13015600034',
    paymentAgent: 'กรกฎ ใจดี',
    transactionDate: '2025-09-01',
    noticeNumber: '0001',
    noticeAmount: 1200000,
    balanceAmount: 0,
    periodLists: [
      {
        id: '1',
        periodNumber: '1',
        bookNo: '0001',
        bookDate: '2025-09-01',
        bookApprover: 'admin',
        accountLists: [
          {
            accountName: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1',
            bankCode: '006',
            chequeNumber: '11111111',
            amount: 500000,
          },
        ],
      },
      {
        id: '2',
        periodNumber: '2',
        bookNo: '0001',
        bookDate: '2025-09-01',
        bookApprover: 'admin',
        accountLists: [
          {
            accountName: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1',
            bankCode: '006',
            chequeNumber: '11111111',
            amount: 500000,
          },
          {
            accountName: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1',
            bankCode: '006',
            chequeNumber: '22222222',
            amount: 200000,
          },
        ],
      },
    ],
  };

  return mockData;
});

export const updateRefundtoEmployerService = createAsyncThunk(
  `${sliceName}/update`,
  (body: BodyUpdateRefundtoEmployerServiceType) => {
    // const response = (await callApi({
    //   method: 'patch',
    //   url: '/prepare-to-pay/hospital',
    //   body: body,
    //   instanceName: 'pay',
    // })) as { prepareToPayId: string };

    // return response;
    console.log('body => ', body);

    return { prepareToPayId: 'test-test-test-0001' };
  },
);
