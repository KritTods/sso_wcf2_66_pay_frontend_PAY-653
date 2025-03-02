import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, FilterSearchType, ResultFilterType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType } from '@/types/payType';

export const getWrongFundService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    //mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        paymentNo: 'P000167000001P1', // เลขที่ใบสั่งจ่าย
        incorrectPaymentReason: 'สถานประกอบการ', // สาเหตุการจ่ายผิด
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 2700000, // จำนวนเงิน
        payType: 'X', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001E2', //เลขที่เอกสาร
        paymentNo: 'P000167000001P1', // เลขที่ใบสั่งจ่าย
        incorrectPaymentReason: 'เจ้าหน้าที่', // สาเหตุการจ่ายผิด
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 150000, // จำนวนเงิน
        payType: 'T', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001E3', //เลขที่เอกสาร
        paymentNo: 'P000167000001P1', // เลขที่ใบสั่งจ่าย
        incorrectPaymentReason: 'เจ้าหน้าที่', // สาเหตุการจ่ายผิด
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 2700000, // จำนวนเงิน
        payType: 'S', //ประเภทการจ่ายเงิน
      },
      {
        documentNo: 'P000167000001E4', //เลขที่เอกสาร
        paymentNo: 'P000167000001P1', // เลขที่ใบสั่งจ่าย
        incorrectPaymentReason: 'เจ้าหน้าที่', // สาเหตุการจ่ายผิด
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1500000, // จำนวนเงิน
        payType: 'P', //ประเภทการจ่ายเงิน
      },
    ];

    return mockData;
  },
);

export const getWrongFundFormService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardPreparePay: {
      documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
      paymentNo: 'J0001670000001S1', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'P', // ประเภทการจ่าย   common
      bookNo: 'B123456789', // เลขที่หนังสือ รง.
      receiverName: 'Jane Smith', // ชื่อผู้มีสิทธิ์
      paymentType: 'External', // ประเภทการจ่ายนอกระบบ***
      advancePaymentType: 'PAY' as AdvancePaymentType, // ประเภทการจ่าย/รับ
      incorrectPaymentReason: 'J' as IncorrectPaymentReasonType, // สาเหตุการจ่ายผิด
      employeeCitizenId: '01948574493821', // หมายเลขบัตรประชาชน
      employeeName: 'Jane Smith', // ชื่อ-นามสกุล
      accountNo: 'A123456789', // ชื่อสถานประกอบการ
      paymentRequest: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1', // จ่ายคืนให้
      amount: 2700000, // จำนวนเงิน
    },
    isCheque: true,
    tableList: [
      {
        id: '1',
        paymentNo: 'PAY123456',
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        causesOfIncorrectPayment: 'จ่ายคืนผิดกองทุน',
        amount: 1000.0,
        date: '2023-10-01',
      },
      {
        id: '2',
        paymentNo: 'PAY123457',
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        causesOfIncorrectPayment: 'จ่ายคืนผิดกองทุน',
        amount: 2000.0,
        date: '2023-10-02',
      },
    ],
    receipts: [
      {
        id: '1',
        receiptNo: '100365CSW000958',
        receiptDate: '2023-12-31',
        amount: 1200000.0,
        accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
      },
      {
        id: '2',
        receiptNo: '100365CSW000959',
        receiptDate: '2023-12-31',
        amount: 1500000.0,
        accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
      },
    ],
    banks: [
      {
        id: '1',
        bankCode: '006',
        bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรีบัญชีที่ 1',
        bankAccountNo: '0192837465',
        amount: 2700000,
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
    address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
    moneys: [
      {
        id: '1',
        amount: 2700000,
        postalNo: '00000000000000000001',
        postalCode: '00000',
        portalDestination: 'นนทบุรี',
        receiverName: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1',
      },
      {
        id: '2',
        amount: 2700000,
        postalNo: '00000000000000000001',
        postalCode: '00000',
        portalDestination: 'นนทบุรี',
        receiverName: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1',
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

export const getWrongFundDetailService = createAsyncThunk(`${sliceName}/getDetail`, (id: string) => {
  console.log('documentNo', id);
  //mockup response
  const mockData = {
    cardConsider: {
      payDate: '2024-12-31', // วันที่ตัดจ่าย
      payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
      status: 'จ่ายแล้ว', // สถานะ
      significantNo: 'P000167000001E1', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: '-', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
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
      paymentNo: 'J0001670000001S1', // เลขที่ใบสั่งจ่าย
      paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
      payType: 'P', // ประเภทการจ่าย   common
      bookNo: 'B123456789', // เลขที่หนังสือ รง.
      receiverName: 'Jane Smith', // ชื่อผู้มีสิทธิ์
      paymentType: 'External', // ประเภทการจ่ายนอกระบบ***
      advancePaymentType: 'PAY' as AdvancePaymentType, // ประเภทการจ่าย/รับ
      incorrectPaymentReason: 'J' as IncorrectPaymentReasonType, // สาเหตุการจ่ายผิด
      employeeCitizenId: '01948574493821', // หมายเลขบัตรประชาชน
      employeeName: 'Jane Smith', // ชื่อ-นามสกุล
      accountNo: 'A123456789', // ชื่อสถานประกอบการ
      paymentRequest: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1', // จ่ายคืนให้
      amount: 2700000, // จำนวนเงิน
    },
    isCheque: true,
    tableList: [
      {
        id: '1',
        paymentNo: 'PAY123456',
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        causesOfIncorrectPayment: 'จ่ายคืนผิดกองทุน',
        amount: 1000.0,
        date: '2023-10-01',
        significantHandNo: 'SHN987654321',
      },
      {
        id: '2',
        paymentNo: 'PAY123457',
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        causesOfIncorrectPayment: 'จ่ายคืนผิดกองทุน',
        amount: 2000.0,
        date: '2023-10-02',
        significantHandNo: 'SHN987654321',
      },
    ],
    receipts: [
      {
        id: '1',
        receiptNo: '100365CSW000958',
        receiptDate: '2023-12-31',
        amount: 1200000.0,
        accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
      },
      {
        id: '2',
        receiptNo: '100365CSW000959',
        receiptDate: '2023-12-31',
        amount: 1500000.0,
        accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
      },
    ],
    banks: [
      {
        id: '1',
        bankCode: '006',
        bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรีบัญชีที่ 1',
        bankAccountNo: '0192837465',
        amount: 2700000,
      },
    ],
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
    cash: 125000,
    address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
    moneys: [
      {
        id: '1',
        amount: 2700000,
        postalNo: '00000000000000000001',
        postalCode: '00000',
        portalDestination: 'นนทบุรี',
        receiverName: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1',
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
