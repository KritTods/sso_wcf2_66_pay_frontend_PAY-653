import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType, PayType } from '@/types/payType';

export const getHospitalService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: 'P000167000001T1', //เลขที่เอกสาร
        accidentIssueCode: '100764/0128606/01', // เลขประสบอันตราย
        hospitalName: 'โรงพยาบาล เปาโลเกษตร',
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 2700000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000002T1', //เลขที่เอกสาร
        accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
        hospitalName: 'โรงพยาบาล เปาโลเกษตร',
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000003T1', //เลขที่เอกสาร
        accidentIssueCode: '100764/0128611/03', // เลขประสบอันตราย
        hospitalName: 'โรงพยาบาล เปาโลเกษตร',
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
    ];

    return mockData;
  },
);

export const getHospitalFormService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardPreparePay: {
      documentNo: 'P000167000001T1', // เลขที่เอกสาร   common
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X' as PayType, // ประเภทการจ่าย
    },
    isCheque: true,
    tableList: [
      {
        documentNo: 'P000167000001T1',
        paymentNo: 'จ13015600034',
        transactionDate: '2024-12-31',
        accidentIssueCode: '100764/0128602/02',
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        employeeCitizenId: '01948574493821',
        receiverName: 'นพดล สุขใจดี',
        amount: 2700000,
        payType: 'X',
        bankCode: '006',
        bankAccountNo: '1234567890',
        bankAccountName: 'Jane Smith',
        significantNo: 'SN123456789',
        significantHandNo: 'SHN987654321',
        hospitalNo: '120068/000001',
      },
    ],
    cheques: [
      {
        id: '1',
        chequeNo: '81020094',
        amount: 2700000,
        bankCode: '006',
        chequeStampDate: '2024-12-31',
        bankBranchCode: '1234',
      },
    ],
    cash: 125000,
    address: '123 Main St, Bangkok, Thailand',
    moneys: [
      {
        amount: 2000,
        postalNo: '00000000000000000001',
        postalCode: '10110',
        portalDestination: 'Bangkok Post Office',
        receiverName: 'นพดล สุขใจดี',
      },
      {
        amount: 3000,
        postalNo: '00000000000000000001',
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
    taxHotpitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
    taxAmount: 2700000,
    taxPercent: 5,
    taxAmountAfterCalTax: 27000,
    taxTotalAmountAfterCalTax: 2673000,
  };

  return mockData;
});

export const getHospitalDetailService = createAsyncThunk(`${sliceName}/getDetail`, (id: string): PageFormType => {
  console.log('documentNo', id);
  //mockup response
  const mockData: PageFormType = {
    cardConsider: {
      payDate: '2024-12-31', // วันที่ตัดจ่าย
      payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
      status: 'จ่ายแล้ว', // สถานะ
      significantNo: 'SN123456789', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: 'SHN987654321', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      receiveType: 'A' as ReceiveType, // ประเภทผู้รับเงิน
      receiveName: 'มนัศนันท์ หิมพานต์', // ชื่อผู้รับเงิน
      identityDocument: '1 : บัตรประชาชน', // ประเภทบัตรอ้างอิง
      identityNo: '1560100433000', // เลขที่บัตรอ้างอิง
      address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900', // ที่อยู่ผู้รับ
      referenceDocument: '1 : บัตรประชาชน', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
      referenceNo: '1560100433000', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
    },
    cardPreparePay: {
      documentNo: 'P000167000001T1', // เลขที่เอกสาร   common
      paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X' as PayType, // ประเภทการจ่าย
      bookNo: 'B123456789', // เลขที่หนังสือ รง.
      receiverName: 'Jane Smith', // ชื่อผู้มีสิทธิ์
      paymentType: 'External', // ประเภทการจ่ายนอกระบบ***
      advancePaymentType: 'PAY' as AdvancePaymentType, // ประเภทการจ่าย/รับ
      incorrectPaymentReason: 'Incorrect Amount' as IncorrectPaymentReasonType, // สาเหตุการจ่ายผิด
      employeeCitizenId: '01948574493821', // หมายเลขบัตรประชาชน
      employeeName: 'Jane Smith', // ชื่อ-นามสกุล
      accountNo: 'A123456789', // ชื่อสถานประกอบการ
      paymentRequest: 'Refund', // จ่ายคืนให้
      amount: 10000, // จำนวนเงิน
    },
    isCheque: true,
    tableList: [
      {
        documentNo: 'P000167000001E4',
        paymentNo: 'J000167000001T1',
        transactionDate: '2024-12-31',
        accidentIssueCode: '100764/0128602/02',
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        employeeCitizenId: '01948574493821',
        receiverName: 'นพดล สุขใจดี',
        amount: 2700000,
        payType: 'X',
        bankCode: '006',
        bankAccountNo: '1234567890',
        bankAccountName: 'Jane Smith',
        significantNo: 'SN123456789',
        significantHandNo: '0001670000001T1',
        hospitalNo: '120068/000001',
      },
    ],
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
    banks: [
      {
        id: '1',
        bankCode: '006',
        bankAccountName: 'Jane Smith',
        bankAccountNo: '1234567890',
        amount: 10000,
      },
    ],
    cash: 125000,
    address: '123 Main St, Bangkok, Thailand',
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
        name: 'Update Salary',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
    taxHotpitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
    taxAmount: 2700000,
    taxPercent: 1,
    taxAmountAfterCalTax: 27000,
    taxTotalAmountAfterCalTax: 2673000,
  };

  return mockData;
});
