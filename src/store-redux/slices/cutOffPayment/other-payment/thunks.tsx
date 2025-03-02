import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType } from '@/types/payType';

export const getOtherService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        bookNo: '01948574493821', // เลขที่หนังสือ รง
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 2700000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000002E1', //เลขที่เอกสาร
        bookNo: '01948574493893', // เลขที่หนังสือ รง
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 150000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000003E1', //เลขที่เอกสาร
        bookNo: '01948574493821', // เลขที่หนังสือ รง
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000004E1', //เลขที่เอกสาร
        bookNo: '01948574493893', // เลขที่หนังสือ รง
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
    ];

    return mockData;
  },
);

export const getOtherFormService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardPreparePay: {
      documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
      paymentNo: 'J0001670000001E1', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'X', // ประเภทการจ่าย   common
      bookNo: '0000000000', // เลขที่หนังสือ รง.
      receiverName: 'กาญจนา พิเศษ', // ชื่อผู้มีสิทธิ์
      paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ\nกองทุนประกันสังคม', // ประเภทการจ่ายนอกระบบ***
      advancePaymentType: 'PAY' as AdvancePaymentType, // ประเภทการจ่าย/รับ
      incorrectPaymentReason: 'Incorrect Amount' as IncorrectPaymentReasonType, // สาเหตุการจ่ายผิด
      employeeCitizenId: '01948574493821', // หมายเลขบัตรประชาชน
      employeeName: 'Jane Smith', // ชื่อ-นามสกุล
      accountNo: 'A123456789', // ชื่อสถานประกอบการ
      paymentRequest: 'Refund', // จ่ายคืนให้
      amount: 10000, // จำนวนเงิน
    },
    isCheque: true,
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
    address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
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

export const getOtherDetailService = createAsyncThunk(`${sliceName}/getDetail`, (id: string): PageFormType => {
  console.log('documentNo', id);
  //mockup response
  const mockData: PageFormType = {
    cardConsider: {
      payDate: '2024-12-31', // วันที่ตัดจ่าย
      payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
      status: 'จ่ายแล้ว', // สถานะ
      significantNo: '0001670000001E1', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: '-', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      receiveType: 'O' as ReceiveType, // ประเภทผู้รับเงิน
      receiveName: 'Jane Smith', // ชื่อผู้รับเงิน
      identityDocument: 'Passport', // ประเภทบัตรอ้างอิง
      identityNo: 'P123456789', // เลขที่บัตรอ้างอิง
      address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900', // ที่อยู่ผู้รับ
      referenceDocument: '1 : บัตรประชาชน', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
      referenceNo: '1560100433000', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
    },
    cardPreparePay: {
      documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
      paymentNo: 'J0001670000001E1', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'S', // ประเภทการจ่าย   common
      bookNo: '0000000000', // เลขที่หนังสือ รง.
      receiverName: 'กาญจนา พิเศษ', // ชื่อผู้มีสิทธิ์
      paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ\nกองทุนประกันสังคม', // ประเภทการจ่ายนอกระบบ***
      advancePaymentType: 'PAY' as AdvancePaymentType, // ประเภทการจ่าย/รับ
      incorrectPaymentReason: 'Incorrect Amount' as IncorrectPaymentReasonType, // สาเหตุการจ่ายผิด
      employeeCitizenId: '01948574493821', // หมายเลขบัตรประชาชน
      employeeName: 'Jane Smith', // ชื่อ-นามสกุล
      accountNo: 'A123456789', // ชื่อสถานประกอบการ
      paymentRequest: 'Refund', // จ่ายคืนให้
      amount: 10000, // จำนวนเงิน
    },
    isCheque: true,
    cheques: [
      {
        id: '1',
        chequeNo: '81020094',
        amount: 2700000,
        bankCode: '006 : กรุงไทย จำกัด(มหาชน)',
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
    address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
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
        id: '2',
        amount: 3000,
        postalNo: '00000000000000000001',
        postalCode: '10110',
        portalDestination: 'Bangkok Post Office',
        receiverName: 'นพดล สุขใจดี',
      },
    ],
  };

  return mockData;
});
