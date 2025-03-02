import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, RefundToEmploerDataType, FilterSearchType } from './types';

//for map data this response
export interface GetFilterListServiceType {
  content: RefundToEmploerDataType[];
  totalElements: number;
  number: number;
}

export interface BodyCreateRefundToEmploerServiceType {
  payType: string;
  payBy: string;
  paymentList: {
    paymentNo: string;
  }[];
  postAddress?: string | undefined;
  cashAmount?: number | undefined;
  chequeInfoList?:
    | {
        chequeNo: string;
        bankCode: string;
        chequeAmount: number;
        chequeDate: string;
      }[]
    | undefined;
  postalInfoList?:
    | {
        paymentNo: string;
        postalNo: string;
        postalCode: string;
        postalDestination: string;
        postalAmount: number;
      }[]
    | undefined;
}

export interface GetRefundToEmploerByIdServiceType {
  prepareToPayId: string;
  documentNo: string;
  // paymentNo: string;
  createdBy: string;
  createdDate: string;
  payType: {
    code: string;
    name: string;
  };
  bookNo: string;
  receiverName: string;
  paymentType: string;
  payBy: {
    code: string;
    name: string;
  };
  cashAmount: number;
  postAddress: string;
  paymentList: {
    paymentId: string;
    ssoCode: string; //รหัส สปส.
    paymentNo: string; // เลขที่ใบสั่งจ่าย
    employerAccountNumber: string; //เลขที่บัญชีนายจ้าง*****
    bankAccount: string;
    bankAccountName: string;
    bank: {
      code: string;
      name: string;
    };
    branchSequence: string; //ลำดับที่สาขา******
    amount: number; // จำนวนเงิน
    paymentType: string; //ประเภทการจ่ายเงิน
    receiverName: string; //จ่ายให้
  }[];
  chequeInfoList: {
    chequeInfoId: string;
    chequeNo: string;
    bank: {
      code: string;
      name: string;
    };
    chequeAmount: number;
    chequeDate: string;
  }[];
}

export interface ChequeInfoListType {
  chequeInfoId: string;
  chequeNo: string;
  bankCode: string;
  chequeAmount: number;
  chequeDate: string;
}

export interface PaymentListType {
  paymentNo: string;
}

export interface BodyUpdateRefundToEmploerServiceType {
  prepareToPayId: string;
  paymentList: PaymentListType[];
  postAddress?: string;
  cashAmount?: number;
  chequeInfoList?: ChequeInfoListType[];
}

//รายการสั่งจ่าย
export const getFilterListService = createAsyncThunk(
  `${sliceName}/get`,
  (data: FilterSearchType): GetFilterListServiceType => {
    console.log('data', data);
    //mockup response
    const mockData: RefundToEmploerDataType[] = [
      {
        paymentId: '1',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        employerAccountNumber: '1234567890', //เลขที่บัญชีนายจ้าง*****
        bank: {
          code: '001',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        bankAccount: '123456789',
        bankAccountName: 'มีนา สมหมาย',
        branchSequence: '1', //ลำดับที่สาขา******
        amount: 120000, // จำนวนเงิน
        paymentType: 'X', //ประเภทการจ่ายเงิน
        receiverName: 'บริษัท สมหมาย จำกัด', //จ่ายให้
      },
      {
        paymentId: '2',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        employerAccountNumber: '1234567890', //เลขที่บัญชีนายจ้าง*****
        bank: {
          code: '001',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        bankAccount: '123456789',
        bankAccountName: 'มีนา สมหมาย',
        branchSequence: '1', //ลำดับที่สาขา******
        receiverName: 'บริษัท สมหมาย จำกัด', //จ่ายให้
        amount: 1500000, // จำนวนเงิน
        paymentType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        paymentId: '3',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        employerAccountNumber: '1234567890', //เลขที่บัญชีนายจ้าง*****
        bank: {
          code: '001',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        bankAccountName: 'มีนา สมหมาย',
        bankAccount: '123456789',
        branchSequence: '1', //ลำดับที่สาขา******
        receiverName: 'บริษัท สมหมาย จำกัด', //จ่ายให้
        amount: 1000000, // จำนวนเงิน
        paymentType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        paymentId: '4',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        employerAccountNumber: '1234567890', //เลขที่บัญชีนายจ้าง*****
        bank: {
          code: '001',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        bankAccount: '123456789',
        bankAccountName: 'มีนา สมหมาย',
        branchSequence: '1', //ลำดับที่สาขา******
        receiverName: 'บริษัท สมหมาย จำกัด', //จ่ายให้
        amount: 1200000, // จำนวนเงิน
        paymentType: 'P', //ประเภทการจ่ายเงิน
      },
    ];

    return {
      content: mockData,
      totalElements: mockData.length,
      number: 1,
    };
  },
);

export const createRefundToEmploerService = createAsyncThunk(
  `${sliceName}/create`,
  (data: BodyCreateRefundToEmploerServiceType) => {
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

export const getRefundtoEmployerByIdService = createAsyncThunk(`${sliceName}/get/id`, (prepareToPayId: string) => {
  // const response = (await callApi({
  //   method: 'get',
  //   url: `prepare-to-pay/hospital/${prepareToPayId}`,
  //   instanceName: 'pay',
  // })) as GetHospitalByIdServiceType;

  // return response;
  const mockData: GetRefundToEmploerByIdServiceType = {
    prepareToPayId: prepareToPayId,
    documentNo: '0001',
    createdBy: 'admin',
    createdDate: '2021-09-01',
    payType: {
      code: 'X',
      name: 'รับเงิน ณ สำนักงาน',
    },
    bookNo: '0001',
    receiverName: 'บริษัท สมหมาย จำกัด',
    paymentType: 'P',
    payBy: {
      // code: 'C',
      // name: 'จ่ายโดยเช็ค',
      code: 'X',
      name: 'จ่ายโดยเงินสด',
    },
    cashAmount: 1200000,
    postAddress: '123 หมู่ 1 ต.ท่าศาลา อ.เมือง จ.นครราชสีมา 30000',
    paymentList: [
      {
        paymentId: '1',
        ssoCode: '1050', //รหัส สปส.
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        employerAccountNumber: '1234567890', //เลขที่บัญชีนายจ้าง*****
        bankAccount: '1234567890',
        bankAccountName: 'มีนา สมหมาย',
        bank: {
          code: '006',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        branchSequence: '1', //ลำดับที่สาขา******
        amount: 1200000, // จำนวนเงิน
        paymentType: 'X', //ประเภทการจ่ายเงิน
        receiverName: 'บริษัท สมหมาย จำกัด', //จ่ายให้
      },
    ],
    chequeInfoList: [
      {
        chequeInfoId: '1',
        chequeNo: '123456',
        bank: {
          code: '006',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        chequeAmount: 1200000,
        chequeDate: '2021-09-01',
      },
    ],
  };

  return mockData;
});

export const updateRefundtoEmployerService = createAsyncThunk(
  `${sliceName}/update`,
  (body: BodyUpdateRefundToEmploerServiceType) => {
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
