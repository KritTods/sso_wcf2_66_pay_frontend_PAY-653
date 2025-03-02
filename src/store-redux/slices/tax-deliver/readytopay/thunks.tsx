import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, ReadyToPayDataType, FilterSearchType } from './types';
import { DataHistoryType } from '@/modules/test-component/popUpHistory';

//for map data this response
export interface GetFilterListServiceType {
  content: ReadyToPayDataType[];
  totalElements: number;
  number: number;
}

export interface BodyCreateReadyToPayServiceType {
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

export interface GetReadyToPayByIdServiceType {
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
    paymentId: string; //เลขที่ใบสั่งจ่าย
    paymentNo: string; //เลขที่ใบสั่งจ่าย
    accidentIssueCode: string; //เลขประสบอันตราย
    hospitalName: string; //โรงพยาบาล
    identityNo: string; //เลขประจำตัวผู้เสียภาษี  
    amount: number; // จำนวนเงิน
    taxAmount: number; // จำนวนเงิน
    paymentType: string; //ประเภทการจ่ายเงิน
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
  historyPreparePay?: DataHistoryType[]; // ประวัติการแก้ไขเตรียมจ่าย
  historyOrderPayment?: DataHistoryType[]; // ประวัติการแก้ไขใบสั่งจ่าย
  historyCheques?: DataHistoryType[]; // ประวัติการแก้ไขเช็ค
  historyMoneys?: DataHistoryType[]; // ประวัติการแก้ไขธนาณัติ
  historyBanks?: DataHistoryType[]; // ประวัติการแก้ไขธนาคาร
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

export interface BodyUpdateReadyToPayServiceType {
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
    const mockData: ReadyToPayDataType[] = [
      {
        paymentId: '1',
        paymentNo: 'P120066123456TX', // เลขที่ใบสั่งจ่าย
        accidentIssueCode: '120066/000192', // เลขที่ใบสั่งจ่าย
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123', // เลขที่ใบสั่งจ่าย
        amount: 200, // จำนวนเงิน
        taxAmount: 20000, // จำนวนเงิน
        paymentType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        paymentId: '2',
        paymentNo: 'P120066123457TX', // เลขที่ใบสั่งจ่าย
        accidentIssueCode: '120066/000193', // เลขที่ใบสั่งจ่าย
        hospitalName: '10008 : โรงพยาบาลคามิลเลียน', // เลขที่ใบสั่งจ่าย
        identityNo: '6544567890123', // เลขที่ใบสั่งจ่าย
        amount: 34.40, // จำนวนเงิน
        taxAmount: 3440, // จำนวนเงิน
        paymentType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        paymentId: '3',
        paymentNo: 'P120066123458TX', // เลขที่ใบสั่งจ่าย
        accidentIssueCode: '120066/000194', // เลขที่ใบสั่งจ่าย
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ', // เลขที่ใบสั่งจ่าย
        identityNo: '9318567890123', // เลขที่ใบสั่งจ่าย
        amount: 17.18, // จำนวนเงิน
        taxAmount: 1718, // จำนวนเงิน
        paymentType: 'S', //ประเภทการจ่ายเงิน
      },
    ];

    return {
      content: mockData,
      totalElements: mockData.length,
      number: 1,
    };
  },
);

export const createReadyToPayService = createAsyncThunk(
  `${sliceName}/create`,
  (data: BodyCreateReadyToPayServiceType) => {
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

export const getReadyToPayByIdService = createAsyncThunk(`${sliceName}/get/id`, (prepareToPayId: string) => {
  // const response = (await callApi({
  //   method: 'get',
  //   url: `prepare-to-pay/hospital/${prepareToPayId}`,
  //   instanceName: 'pay',
  // })) as GetHospitalByIdServiceType;

  // return response;
  const mockData: GetReadyToPayByIdServiceType = {
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
        paymentNo: 'P120066123456TX', // เลขที่ใบสั่งจ่าย
        accidentIssueCode: '120066/000192', // เลขที่ใบสั่งจ่าย
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123', // เลขที่ใบสั่งจ่าย
        amount: 150, // จำนวนเงิน
        taxAmount: 15000, // จำนวนเงิน
        paymentType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        paymentId: '2',
        paymentNo: 'P120066123456TX', // เลขที่ใบสั่งจ่าย
        accidentIssueCode: '120066/000193', // เลขที่ใบสั่งจ่าย
        hospitalName: '10008 : โรงพยาบาลคามิลเลียน',
        identityNo: '6544567890123', // เลขที่ใบสั่งจ่าย
        amount: 50, // จำนวนเงิน
        taxAmount: 5000, // จำนวนเงิน
        paymentType: 'X', //ประเภทการจ่ายเงิน
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
    historyPreparePay: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyOrderPayment: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyCheques: [
      {
        id: '1',
        name: 'เปลี่ยน เลขที่เช็ค',
        beforeValue: '12901765',
        afterValue: '12901766',
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyMoneys: [
      {
        id: '1',
        name: 'Update Salary',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyBanks: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
  };

  return mockData;
});

export const updateReadyToPayService = createAsyncThunk(
  `${sliceName}/update`,
  (body: BodyUpdateReadyToPayServiceType) => {
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
