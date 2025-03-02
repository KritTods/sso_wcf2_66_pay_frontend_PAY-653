/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, TaxDeliverDataType, FilterSearchType, PageDetailType } from './types';

export const getTaxDeliverService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): TaxDeliverDataType[] => {
    //mockup response
    const mockData: TaxDeliverDataType[] = [
      {
        id: '1',
        documentNo: 'P120066123456TX', //เลขที่เอกสาร
        hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
        transactionDate: '2024-12-31', //วันที่เตรียมจ่าย
        payType: 'X', //วิธีการชำระเงิน
        amount: 2700000, //จำนวนเงิน
        hospitalName: '',
        identityNo: '',
        taxAmount: 0,
      },
      {
        id: '2',
        documentNo: 'P120066123456TX', //เลขที่เอกสาร
        hospitalNo: '120066/000193', //เลขที่หนังสือรับรอง
        transactionDate: '2024-12-31', //วันที่เตรียมจ่าย
        payType: 'T', //วิธีการชำระเงิน
        amount: 150000, //จำนวนเงิน
        hospitalName: '',
        identityNo: '',
        taxAmount: 0,
      },
      {
        id: '3',
        documentNo: 'P120066123456TX',
        hospitalNo: '120066/000194',
        transactionDate: '2024-12-31',
        payType: 'S',
        amount: 100000,
        hospitalName: '',
        identityNo: '',
        taxAmount: 0,
      },
      {
        id: '4',
        documentNo: 'P120066123456TX',
        hospitalNo: '120066/000195',
        transactionDate: '2024-12-31',
        payType: 'P',
        amount: 50000,
        hospitalName: '',
        identityNo: '',
        taxAmount: 0,
      },
    ];

    return mockData;
  },
);

export const getTaxDeliverDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      documentNo: 'P000167000001E1',
      username: 'กาญจนา พิเศษ',
      transactionDate: '2024-12-31',
      payType: 'T',
      isCheque: false,
      tableList: [
        {
          id: '1',
          hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
          hospitalName: '10001 : โรงพยาบาลกรุงเทพ', //โรงพยาบาล
          identityNo: '1234567890123', //เลขประจำตัวผู้เเสียภาษี
          amount: 15000, // ค่ารักษา
          taxAmount: 150, //ภาษีหัก ณ ที่จ่าย
          payType: 'P',
          documentNo: 'P120066123456TX',
          transactionDate: '2024-12-31',
        },
        {
          id: '2',
          hospitalNo: '120066/000193', //เลขที่หนังสือรับรอง
          hospitalName: '10008 : โรงพยาบาลคามิลเลียน', //โรงพยาบาล
          identityNo: '6544567890123', //เลขประจำตัวผู้เเสียภาษี
          amount: 5000, // ค่ารักษา
          taxAmount: 50, //ภาษีหัก ณ ที่จ่าย
          payType: 'P',
          documentNo: 'P120066123456TX',
          transactionDate: '2024-12-31',
        },
        {
          id: '3',
          hospitalNo: '120066/000193', //เลขที่หนังสือรับรอง
          hospitalName: '10008 : โรงพยาบาลคามิลเลียน', //โรงพยาบาล
          identityNo: '6544567890123', //เลขประจำตัวผู้เเสียภาษี
          amount: 5000, // ค่ารักษา
          taxAmount: 50, //ภาษีหัก ณ ที่จ่าย
          payType: 'P',
          documentNo: 'P120066123456TX',
          transactionDate: '2024-12-31',
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
      banks: [
        {
          id: '1',
          bankCode: '006',
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          amount: 1000,
        },
        {
          id: '2',
          bankCode: '006',
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          amount: 15000,
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
