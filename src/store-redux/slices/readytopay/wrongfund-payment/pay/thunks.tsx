import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from './types';
import {
  TableBankType,
  TableChequeType,
  TableMoneyType,
  // WrongFundPaymentType,
  // ReceiptType,
} from '@/components/common';
import { WrongFundDataType } from '@/components/wrongFundPayment/cardDetailWrongFundPayment';

export interface BodySearchCompanyServiceType {
  employerAccountNumber: string; // เลขที่บัญชีนายจ้าง
  branchSequence: string; // รหัสสาขา
}

export interface ResSearchCompanyServiceType {
  employerAccountNumber: string; // เลขที่บัญชีนายจ้าง
  branchSequence: string; // รหัสสาขา
  companyName: string; // ชื่อสถานประกอบการ
}

export const searchCompanyService = createAsyncThunk(
  `${sliceName}/searchCompany`,
  (body: BodySearchCompanyServiceType): ResSearchCompanyServiceType => {
    // const response = (await callApi({
    //   method: 'patch',
    //   url: '/prepare-to-pay/hospital',
    //   body: body,
    //   instanceName: 'pay',
    // })) as { prepareToPayId: string };

    // return response;
    console.log('body => ', body);

    const mockData = {
      employerAccountNumber: body.employerAccountNumber, // เลขที่บัญชีนายจ้าง
      branchSequence: body.branchSequence, // รหัสสาขา
      companyName: 'สุขสวัสดิ์การช่าง และออกแบบโลหะภัณฑ์', // ชื่อสถานประกอบการ
    };

    return mockData;
  },
);

export interface BodyCreateWrongFundPaymentServiceType {
  incorrectPaymentReasonType: string | undefined; // สาเหตุการจ่ายผิด
  employerAccountNumber?: string; // เลขที่บัญชีนายจ้าง
  branchSequence?: string; // รหัสสาขา
  companyName?: string; // ชื่อสถานประกอบการ
  employeeCitizenId?: string; // เลขบัตรประชาชน
  employeeCitizenName?: string; // ชื่อ-นามสกุล
  paymentRequest: string; // จ่ายคืนให้
  amount: number; // จำนวนเงิน
  cash?: number; // จำนวนเงินสด
  address?: string; // ที่อยู่
  cheques?: TableChequeType[]; // จำนวนเช็ค
  banks?: TableBankType[]; // จำนวนเงินโอน
  moneys?: TableMoneyType[]; // จำนวนเงินสด
}

export const createWrongFundPaymentService = createAsyncThunk(
  `${sliceName}/create`,
  (body: BodyCreateWrongFundPaymentServiceType) => {
    // const response = (await callApi({
    //   method: 'patch',
    //   url: '/prepare-to-pay/hospital',
    //   body: body,
    //   instanceName: 'pay',
    // })) as { prepareToPayId: string };

    console.log('BodyCreateWrongFundPaymentServiceType : ', body);

    // return response;
    return { prepareToPayId: 'P000167000001P1' };
  },
);

export interface ResGetWrongFundDetailServiceType {
  cardHeader: WrongFundDataType;
  // payments: WrongFundPaymentType[]; //การเงินรับ
  // receipts: ReceiptType[]; //การเงินรับ
  isCheque: boolean;
  cheques: TableChequeType[];
  cash: number;
  address: string;
  banks: TableBankType[];
  moneys: TableMoneyType[];
}

export const getWrongFundDetailService = createAsyncThunk(
  `${sliceName}/getWrongFundDetailService`,
  (id: string): ResGetWrongFundDetailServiceType => {
    console.log('id', id);

    const mockData: ResGetWrongFundDetailServiceType = {
      cardHeader: {
        id: 'P000167000001P1',
        documentNo: 'P000167000001P1',
        paymentNo: 'J000167000001P1',
        transactionDate: '2024-10-01',
        paymentAgent: 'กาญจนา พิเศษ',
        payType: 'P',
        advancePaymentType: 'PAY',
        incorrectPaymentReason: 'O',
        accountNo: 'สุขสวัสดิ์การช่าง และออกแบบ โลหะภัณฑ์',
        employeeCitizenId: '1234567890123',
        employeeName: 'Jane Smith',
        amount: 1000.0,
        paymentRequest: 'จิรายุส วรรณสกุล',
      },
      // payments: [
      //   {
      //     documentNo: 'P000167000001P1',
      //     paymentNo: 'J000167000001P1',
      //     paymentRequest: 'จิรายุส วรรณสกุล',
      //     causesOfIncorrectPayment: 'O',
      //     amount: 1000.0,
      //     date: '2024-10-01',
      //   },
      // ],
      // receipts: [
      //   {
      //     id: '1',
      //     receiptNo: 'REC123456',
      //     receiptDate: '2023-10-01',
      //     amount: 1000.0,
      //     accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
      //   },
      //   {
      //     id: '2',
      //     receiptNo: 'REC123457',
      //     receiptDate: '2023-10-02',
      //     amount: 2000.0,
      //     accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
      //   },
      // ],

      isCheque: false,
      cheques: [
        {
          id: '1',
          chequeNo: '12345678',
          amount: 1000,
          bankCode: '006',
          chequeStampDate: '2024-12-31',
          mode: 'view',
        },
      ],
      cash: 1000,
      address: '123 Main St, Bangkok, Thailand',
      banks: [
        {
          id: '1',
          bankCode: '006',
          bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรีบัญชีที่ 1',
          bankAccountNo: '0000000001',
          amount: 1000,
          mode: 'view',
        },
      ],
      moneys: [
        {
          id: '1',
          amount: 1000,
          postalNo: '10000000000000000001',
          postalCode: '10110',
          portalDestination: 'นนทบุรี',
          receiverName: 'นพดล สุขใจดี',
          mode: 'view',
        },
      ],
    };

    return mockData;
  },
);

export interface BodyUpdateWrongFundPaymentServiceType {
  prepareToPayId: string; // รหัสการเตรียมจ่าย
  cash?: number; // จำนวนเงินสด
  address?: string; // ที่อยู่
  cheques?: TableChequeType[]; // จำนวนเช็ค
  banks?: TableBankType[]; // จำนวนเงินโอน
  moneys?: TableMoneyType[]; // จำนวนเงินสด
}

export const updateWrongFundPaymentService = createAsyncThunk(
  `${sliceName}/update`,
  (body: BodyUpdateWrongFundPaymentServiceType) => {
    console.log('BodyCreateWrongFundPaymentServiceType : ', body);

    // return response;
    return { prepareToPayId: 'P000167000001P1' };
  },
);
