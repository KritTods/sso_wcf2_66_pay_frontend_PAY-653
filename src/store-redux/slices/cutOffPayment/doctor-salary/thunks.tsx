import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType } from '@/types/payType';

export const getDoctorSalaryService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: 'P000167000001T1', //เลขที่เอกสาร
        paymentNo: 'จ74016702615001', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '1764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '0194857449382', // เลขบัตรประชาชน
        amount: 10000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001T2', //เลขที่เอกสาร
        paymentNo: 'จ740167026160002', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '1764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '0194857449383', // เลขบัตรประชาชน
        amount: 10000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001T3', //เลขที่เอกสาร
        paymentNo: 'จ740167026170003', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '1764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '0194857449384', // เลขบัตรประชาชน
        amount: 10000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001T4', //เลขที่เอกสาร
        paymentNo: 'จ740167026200004', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        accidentIssueCode: '1764/0128602/02', // เลขประสบอันตราย
        employeeCitizenId: '0194857449385', // เลขบัตรประชาชน
        amount: 10000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
      // {
      //   documentNo: 'P000167000001E1', //เลขที่เอกสาร
      //   paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      //   transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      //   accidentIssueCode: '100764/0128602/02', // เลขประสบอันตราย
      //   employeeCitizenId: '01948574493821', // เลขบัตรประชาชน
      //   amount: 10000, // จำนวนเงิน
      //   payType: 'M', //ประเภทการจ่ายเงิน
      // },
    ];

    return mockData;
  },
);

export const getDoctorSalaryFormService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardPreparePay: {
      documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
      paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'John Doe', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X', // ประเภทการจ่าย   common
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
        documentNo: 'P000167000001E1',
        paymentNo: 'จ13015600034',
        transactionDate: '2024-12-31',
        accidentIssueCode: '100764/0128602/02',
        employeeCitizenId: '01948574493821',
        receiverName: 'Jane Smith',
        amount: 10000,
        payType: 'X',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        bankAccountNo: '1234567890',
        bankAccountName: 'Jane Smith',
        significantNo: 'SN123456789',
        significantHandNo: 'SHN987654321',
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
    moneys: [
      {
        id: '1',
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
  };

  return mockData;
});

export const getDoctorSalaryDetailService = createAsyncThunk(`${sliceName}/getDetail`, (id: string): PageFormType => {
  console.log('documentNo', id);
  //mockup response
  const mockData: PageFormType = {
    cardConsider: {
      payDate: '2024-12-31', // วันที่ตัดจ่าย
      payer: 'John Doe', // ผู้ตัดจ่าย
      status: 'จ่ายแล้ว', // สถานะ
      significantNo: 'SN123456789', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: 'SHN987654321', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      receiveType: 'O' as ReceiveType, // ประเภทผู้รับเงิน
      receiveName: 'Jane Smith', // ชื่อผู้รับเงิน
      identityDocument: 'Passport', // ประเภทบัตรอ้างอิง
      identityNo: 'P123456789', // เลขที่บัตรอ้างอิง
      address: '123 Main St, Anytown, USA', // ที่อยู่ผู้รับ
      referenceDocument: '1 : บัตรประชาชน', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
      referenceNo: '1560100433000', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
    },
    cardPreparePay: {
      documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
      paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'John Doe', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X', // ประเภทการจ่าย   common
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
        documentNo: 'P000167000001E1',
        paymentNo: 'จ13015600034',
        transactionDate: '2024-12-31',
        accidentIssueCode: '100764/0128602/02',
        employeeCitizenId: '01948574493821',
        receiverName: 'Jane Smith',
        amount: 10000,
        payType: 'X',
        bankCode: '006:กรุงไทย จำกัด(มหาชน)',
        bankAccountNo: '1234567890',
        bankAccountName: 'Jane Smith',
        significantNo: 'SN123456789',
        significantHandNo: 'SHN987654321',
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
    moneys: [
      {
        id: '1',
        amount: 2000,
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
        name: 'Update Salary',
        beforeValue: 9000,
        afterValue: 10000,
        updateBy: 'Admin',
        updateDate: '2024-12-30',
      },
    ],
  };

  return mockData;
});
