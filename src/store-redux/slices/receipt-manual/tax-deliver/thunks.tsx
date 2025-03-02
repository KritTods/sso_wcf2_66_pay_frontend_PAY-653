import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';

export interface GetReceiptManualByIdServiceType {
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
  taxPercent: number;
  taxAmount: number;
  postAddress: string;
  paymentList: {
    paymentId: number;
    paymentNo: string;
    accidentIssueCode: string;
    employeeCitizenId: string;
    fullName: string;
    bank: {
      code: string;
      name: string;
    };
    accountName: string;
    accountNo: string;
    hospital: string;
    amount: number;
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

export interface BodyUpdateReceiptManualServiceType {
  prepareToPayId: string;
  taxPercent: number;
  taxAmount: number;
  paymentList: PaymentListType[];
  postAddress?: string;
  cashAmount?: number;
  chequeInfoList?: ChequeInfoListType[];
}

export const getReceiptManualTaxDeliverService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
        identityNo: '64800120003', // เลขประจำตัวผู้เสียภาษี
        transactionDate: '2024-07-14', // วันที่เตรียมจ่าย
        amount: 50000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
        identityNo: '64800130015', // เลขประจำตัวผู้เสียภาษี
        transactionDate: '2024-07-15', // วันที่เตรียมจ่าย
        amount: 12000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
        identityNo: '64800140022', // เลขประจำตัวผู้เสียภาษี
        transactionDate: '2024-07-18', // วันที่เตรียมจ่าย
        amount: 5000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      // {
      //   documentNo: 'P000167000001E1', //เลขที่เอกสาร
      //   paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      //   transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      //   accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
      //   employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
      //   amount: 200, // จำนวนเงิน
      //   payType: 'M', //ประเภทการจ่ายเงิน
      // },
    ];

    return mockData;
  },
);

export const getReceiptManualTaxDeliverFormService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardPreparePay: {
      documentNo: 'P120066123456TX', // เลขที่เอกสาร   common
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X', // ประเภทการจ่าย   common
    },
    isCheque: true,
    tableList: [
      {
        paymentNo: '120066/000192',
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123', // เลขประจำตัวผู้เสียภาษี
        amount: 20000,
        taxAmount: 200, //ภาษีหัก ณ ที่จ่าย
        significantHandNo: '0120066123456TX',   
      },
    ],
    cheques: [
      {
        id: '1',
        chequeNo: '81020094',
        amount: 200,
        bankCode: '006',
        chequeStampDate: '2024-12-31',
        bankBranchCode: '1234',
      },
    ],
    banks: [
      {
        id: '1',
        bankCode: '006',
        bankAccountName: 'รัตติยากร บุญพิลาศ',
        bankAccountNo: '0192837465',
        amount: 200,
      },
    ],
    cash: 125000,
    address: '123 Main St, Bangkok, Thailand',
    moneys: [
      {
        amount: 2000,
        postalNo: 'PN123456',
        postalCode: '10110',
        portalDestination: 'Bangkok Post Office',
        receiverName: 'นพดล สุขใจดี',
      },
      {
        amount: 3000,
        postalNo: 'PN123456',
        postalCode: '10110',
        portalDestination: 'Bangkok Post Office',
        receiverName: 'นพดล สุขใจดี',
      },
    ],
    historyPreparePay: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyOrderPayment: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 200,
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
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyBanks: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
  };

  return mockData;
});

export const getReceiptManualTaxDeliverDetailService = createAsyncThunk(`${sliceName}/getDetail`, (id: string): PageFormType => {
  console.log('documentNo', id);
  //mockup response
  const mockData: PageFormType = {
    cardConsider: {
      payDate: '2024-12-31', // วันที่ตัดจ่าย
      payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
      status: 'จ่ายแล้ว', // สถานะ
    },
    cardPreparePay: {
      documentNo: 'P120066123456TX', // เลขที่เอกสาร   common
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X', // ประเภทการจ่าย   common
    },
    isCheque: true,
    tableList: [
      {
        paymentNo: '120066/000192',
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123', // เลขประจำตัวผู้เสียภาษี
        amount: 20000,
        taxAmount: 200, //ภาษีหัก ณ ที่จ่าย
        significantHandNo: '0120066123456TX',     
      },
    ],
    cheques: [
      {
        id: '1',
        chequeNo: '81020094',
        amount: 200,
        bankCode: '006',
        chequeStampDate: '2024-12-31',
        bankBranchCode: '1234',
      },
    ],
    banks: [
      {
        id: '1',
        bankCode: '006',
        bankAccountName: 'รัตติยากร บุญพิลาศ',
        bankAccountNo: '0192837465',
        amount: 200,
      },
    ],
    cash: 125000,
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
    historyPreparePay: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyOrderPayment: [
      {
        id: '1',
        name: 'เปลี่ยน จำนวนเงิน',
        beforeValue: 9000,
        afterValue: 200,
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
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    historyBanks: [
      {
        id: '1',
        name: 'Update Salary',
        beforeValue: 9000,
        afterValue: 200,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
  };

  return mockData;
});

export const getReceiptManualByIdService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/hospital/id`,
  async (prepareToPayId: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/hospital/${prepareToPayId}`,
      instanceName: 'pay',
    })) as GetReceiptManualByIdServiceType;

    return response;
  },
);

export const updateReceiptManualService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/hospital/update`,
  async (body: BodyUpdateReceiptManualServiceType) => {
    const response = (await callApi({
      method: 'patch',
      url: '/prepare-to-pay/hospital',
      body: body,
      instanceName: 'pay',
    })) as { prepareToPayId: string };

    return response;
  },
);