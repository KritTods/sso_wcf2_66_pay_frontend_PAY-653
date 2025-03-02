import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, WrongFundDataType, FilterSearchType, PageDetailType } from './types';

export const getWrongFundService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): WrongFundDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: WrongFundDataType[] = [
      {
        id: '1',
        documentNo: 'DOC123456',
        paymentNo: 'PAY123456',
        transactionDate: '2023-10-01',
        paymentAgent: 'John Doe',
        payType: 'X',
        advancePaymentType: 'ADVANCE',
        incorrectPaymentReason: 'S',
        accountNo: '1234567890',
        employeeCitizenId: '1234567890123',
        employeeName: 'Jane Smith',
        amount: 1000.0,
        paymentRequest: 'John Doe',
      },
      {
        id: '2',
        documentNo: 'DOC123457',
        paymentNo: 'PAY123457',
        transactionDate: '2023-10-02',
        paymentAgent: 'Alice Johnson',
        payType: 'T',
        advancePaymentType: 'REGULAR',
        incorrectPaymentReason: 'O',
        accountNo: '1234567891',
        employeeCitizenId: '1234567890124',
        employeeName: 'Bob Brown',
        amount: 2000.0,
        paymentRequest: 'Alice Johnson',
      },
      {
        id: '3',
        documentNo: 'DOC123458',
        paymentNo: 'PAY123458',
        transactionDate: '2023-10-03',
        paymentAgent: 'Charlie Davis',
        payType: 'S',
        advancePaymentType: 'ADVANCE',
        incorrectPaymentReason: 'J',
        accountNo: '1234567892',
        employeeCitizenId: '1234567890125',
        employeeName: 'Carol White',
        amount: 3000.0,
        paymentRequest: 'Charlie Davis',
      },
      {
        id: '4',
        documentNo: 'DOC123459',
        paymentNo: 'PAY123459',
        transactionDate: '2023-10-04',
        paymentAgent: 'David Evans',
        payType: 'P',
        advancePaymentType: 'REGULAR',
        incorrectPaymentReason: 'J',
        accountNo: '1234567893',
        employeeCitizenId: '1234567890126',
        employeeName: 'Eve Black',
        amount: 4000.0,
        paymentRequest: 'David Evans',
      },
    ];

    return mockData;
  },
);

export const getWrongFundDetailService = createAsyncThunk(
  `${sliceName}/getWrongFundDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);

    const mockData: PageDetailType = {
      cardHeader: {
        id: '1',
        documentNo: 'DOC123456',
        paymentNo: 'PAY123456',
        transactionDate: '2024-10-01',
        paymentAgent: 'John Doe',
        payType: 'P',
        advancePaymentType: 'PAY',
        incorrectPaymentReason: 'O',
        accountNo: 'สุขสวัสดิ์การช่าง และออกแบบ โลหะภัณฑ์',
        employeeCitizenId: '1234567890123',
        employeeName: 'Jane Smith',
        amount: 1000.0,
        paymentRequest: 'John Doe',
      },
      payments: [
        {
          documentNo: 'DOC123456',
          paymentNo: 'PAY123456',
          paymentRequest: 'กองทุนกันสังคม ม.33/39',
          causesOfIncorrectPayment: 'S',
          amount: 3000.0,
          date: '2023-10-01',
        },
      ],
      receipts: [
        {
          id: '1',
          receiptNo: 'REC123456',
          receiptDate: '2023-10-01',
          amount: 1000.0,
          accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
        },
        {
          id: '2',
          receiptNo: 'REC123457',
          receiptDate: '2023-10-02',
          amount: 2000.0,
          accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
        },
      ],
      transferInformation: {
        bankCode: '006',
        bankName: 'กรุงไทย จำกัด (มหาชน)',
        bankAccountNo: '1234567890',
        bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรี บัญชีที่ 1',
      },
      isCheque: true,
      cheques: [
        {
          id: '1',
          chequeNo: '123456',
          amount: 1000,
          bankCode: '006',
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
