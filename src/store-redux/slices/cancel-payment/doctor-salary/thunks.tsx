import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, DoctorSalaryDataType, FilterSearchType, PageDetailType } from './types';

export const getDoctorSalaryService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): DoctorSalaryDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: DoctorSalaryDataType[] = [
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
        receiverName: 'นพดล สุขใจดี', // ลูกจ้าง/ผู้มีสิทธิ์
        amount: 10000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
        bankCode: '006:กรุงไทย จำกัด(มหาชน)', //ธนาคาร
        bankAccountNo: '123456789', //เลขที่บัญชี
        bankAccountName: 'นพดล สุขใจดี', //ชืื่อบัญชี
      },
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
        receiverName: 'นพดล สุขใจดี', // ลูกจ้าง/ผู้มีสิทธิ์
        amount: 10000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
        bankCode: '006:กรุงไทย จำกัด(มหาชน)', //ธนาคาร
        bankAccountNo: '123456789', //เลขที่บัญชี
        bankAccountName: 'นพดล สุขใจดี', //ชืื่อบัญชี
      },
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
        receiverName: 'นพดล สุขใจดี', // ลูกจ้าง/ผู้มีสิทธิ์
        amount: 10000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
        bankCode: '006:กรุงไทย จำกัด(มหาชน)', //ธนาคาร
        bankAccountNo: '123456789', //เลขที่บัญชี
        bankAccountName: 'นพดล สุขใจดี', //ชืื่อบัญชี
      },
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
        receiverName: 'นพดล สุขใจดี', // ลูกจ้าง/ผู้มีสิทธิ์
        amount: 10000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
        bankCode: '006:กรุงไทย จำกัด(มหาชน)', //ธนาคาร
        bankAccountNo: '123456789', //เลขที่บัญชี
        bankAccountName: 'นพดล สุขใจดี', //ชืื่อบัญชี
      },
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
        receiverName: 'นพดล สุขใจดี', // ลูกจ้าง/ผู้มีสิทธิ์
        amount: 10000, // จำนวนเงิน
        payType: 'M', //ประเภทการจ่ายเงิน
        bankCode: '006:กรุงไทย จำกัด(มหาชน)', //ธนาคาร
        bankAccountNo: '123456789', //เลขที่บัญชี
        bankAccountName: 'นพดล สุขใจดี', //ชืื่อบัญชี
      },
    ];

    return mockData;
  },
);

export const getDoctorSalaryDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      documentNo: 'P000167000001E1',
      username: 'กาญจนา พิเศษ',
      transactionDate: '2024-12-31',
      payType: 'X',
      isCheque: true,
      tableList: [
        {
          documentNo: 'P000167000001E1',
          paymentNo: 'จ13015600034',
          transactionDate: '2024-12-31',
          accidentIssueCode: '100764/0128602/02',
          employeeCitizenId: '01948574493821',
          receiverName: 'นพดล สุขใจดี',
          amount: 10000,
          payType: 'X',
          bankCode: '006:กรุงไทย จำกัด(มหาชน)',
          bankAccountNo: '123456789',
          bankAccountName: 'นพดล สุขใจดี',
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
