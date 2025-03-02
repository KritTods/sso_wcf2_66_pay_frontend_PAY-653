import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, HospitalPaymentDataType, FilterSearchType, PageDetailType } from './types';

export const getHospitalPaymentService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): HospitalPaymentDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: HospitalPaymentDataType[] = [
      {
        id: '1',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        amount: 1200000, // จำนวนเงิน
        payType: 'X',
        employeeCitizenId: '01948574493821',
        receiverName: '',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
      },
      {
        id: '2',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '299764/0128611/03', // เลขประสบอันตราย
        hospitalName: '10008 : โรงพยาบาลคามิลเลียน',
        amount: 1000000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
        employeeCitizenId: '01948574493821',
        receiverName: '',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
      },
      {
        id: '3',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        amount: 1200000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
        employeeCitizenId: '01948574493821',
        receiverName: '',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
      },
      {
        id: '4',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '299764/0128611/03', // เลขประสบอันตราย
        hospitalName: '10008 : โรงพยาบาลคามิลเลียน',
        amount: 1500000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
        employeeCitizenId: '01948574493821',
        receiverName: '',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
      },
    ];

    return mockData;
  },
);

export const getHospitalPaymentDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      documentNo: 'P000167000001E1',
      username: 'กาญจนา พิเศษ',
      transactionDate: '2024-12-31',
      payType: 'P',
      isCheque: true,
      tableList: [
        {
          id: '1',
          bankCode: '006:กรุงไทย จำกัด(มหาชน)',
          documentNo: 'P000167000001E1',
          paymentNo: 'จ13015600034',
          transactionDate: '2024-12-31',
          accidentIssueCode: '100764/0128602/02',
          employeeCitizenId: '01948574493821',
          receiverName: 'นพดล สุขใจดี',
          amount: 10000,
          payType: 'P',
          hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
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
      hospitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
      amount: 2700000,
      vat: 1,
      totalVat: 27000,
      totalAmount: 2673000,
    };

    return mockData;
  },
);
