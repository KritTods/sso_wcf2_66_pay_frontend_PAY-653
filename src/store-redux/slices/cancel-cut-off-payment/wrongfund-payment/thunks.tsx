import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, WrongFundDataType, FilterSearchType, PageDetailType } from './types';
import { PayType } from '@/types/payType';

export const getcancelCutOffPayWrongFundService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayWrongFundService`,
  ({ data }: { data: FilterSearchType }): WrongFundDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: WrongFundDataType[] = [
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E1-PAY', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 15000,
        payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
      },
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E1-FIN', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 15500,
        payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
      },
      {
        significantNo: 'H001670004',
        significantHandNo: '',
        documentNo: 'P000167000001E2-PAY', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 20000,
        payType: { code: 'T', name: 'โอนผ่านธนาคารโดยจังหวัด' },
      },
      {
        significantNo: 'H001670004',
        significantHandNo: '',
        documentNo: 'P000167000001E2-FIN', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 25000,
        payType: { code: 'T', name: 'โอนผ่านธนาคารโดยจังหวัด' },
      },
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E3-PAY', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 12000,
        payType: { code: 'S', name: 'ส่งเช็คทางไปรษณีย์' },
      },
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E3-FIN', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 12000,
        payType: { code: 'S', name: 'ส่งเช็คทางไปรษณีย์' },
      },
      {
        significantNo: 'H001670004',
        significantHandNo: '',
        documentNo: 'P000167000001E4-PAY', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 18000,
        payType: { code: 'P', name: 'ธนาณัติ' },
      },
      {
        significantNo: 'H001670004',
        significantHandNo: '',
        documentNo: 'P000167000001E4-FIN', //เลขที่เอกสาร
        paymentNo: 'PAY123456',
        incorrectPaymentReason: 'O',
        paymentRequest: 'Alice Johnson',
        payDate: '2024-12-31',
        totalAmount: 18000,
        payType: { code: 'P', name: 'ธนาณัติ' },
      },
    ];

    return mockData;
  },
);

export const getcancelCutOffPayWrongFundDetailService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayWrongFundDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);

    const mockData: PageDetailType = {
      cardConsider: {
        payDate: '2024-12-31', // วันที่ตัดจ่าย
        payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
        status: 'จ่ายแล้ว', // สถานะ
        significantNo: '0001670000001P1', // เลขที่ใบสำคัญรับเงิน
        significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
        receiveType: undefined, // ประเภทผู้รับเงิน
        receiveName: '', // ชื่อผู้รับเงิน
        identityDocument: '', // ประเภทบัตรอ้างอิง
        identityNo: '', // เลขที่บัตรอ้างอิง
        address: '', // ที่อยู่ผู้รับ
        referenceDocument: '', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
        referenceNo: '', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)

        // receiveType: 'O' as ReceiveType, // ประเภทผู้รับเงิน
        // receiveName: 'มนัศนันท์ หิมพานต์', // ชื่อผู้รับเงิน
        // identityDocument: 'บัตรประชาชน', // ประเภทบัตรอ้างอิง
        // identityNo: '1560100433000', // เลขที่บัตรอ้างอิง
        // address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900', // ที่อยู่ผู้รับ
        // referenceDocument: '1 : บัตรประชาชน', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
        // referenceNo: '1560100433000', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
      },
      cardPreparePay: {
        documentNo: 'P000167000001P1', // เลขที่เอกสาร   common
        paymentNo: 'J000167000001P1', // เลขที่ใบสั่งจ่าย
        paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย   common
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
        payType: 'P' as PayType, // ประเภทการจ่าย   common
        bookNo: '', // เลขที่หนังสือ รง.
        receiverName: '', // ชื่อผู้มีสิทธิ์
        paymentType: '', // ประเภทการจ่ายนอกระบบ***
        advancePaymentType: 'PAY', // ประเภทการจ่าย/รับ
        incorrectPaymentReason: 'J', // สาเหตุการจ่ายผิด
        employeeCitizenId: '', // หมายเลขบัตรประชาชน
        employeeName: '', // ชื่อ-นามสกุล
        accountNo: '', // ชื่อสถานประกอบการ
        paymentRequest: 'เงินกองทุนประกันสังคมจังหวัดกำแพงเพชร บัญชี 1', // จ่ายคืนให้
        amount: 2700000, // จำนวนเงิน
      },
      tableList: [
        {
          significantNo: '0001670000001P1',
          significantHandNo: '',
          documentNo: 'D202401001',
          paymentNo: 'P202401001',
          causesOfIncorrectPayment: 'O',
          paymentRequest: 'กองทุนกันสังคม ม.33/39',
          date: '2024-12-01',
          amount: 2700000,
          payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
        },
      ],
      banks: [
        {
          id: '1',
          bank: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรีบัญชีที่ 1',
          bankAccountNo: '0192837465',
          totalAmount: 2700000,
        },
      ],
      receipts: [
        {
          id: '1',
          receiptNo: 'REC123456',
          receiptDate: '2023-10-01',
          amount: 2000000,
          accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
        },
        {
          id: '2',
          receiptNo: 'REC123457',
          receiptDate: '2023-10-02',
          amount: 700000,
          accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
        },
      ],
      isCheque: false,
      chequeInfoList: [
        {
          id: '1',
          chequeNo: '123456',
          amount: 2700000,
          bankCode: '006',
          chequeStampDate: '2024-12-31',
          bankBranchCode: '1234',
        },
      ],
      cashAmount: 2700000,
      postAddress: '123 Main St, Bangkok, Thailand',
      postalInfoList: [
        {
          postalInfoId: '',
          postalNo: 'PN123456',
          postalCode: '10110',
          portalDestination: 'นนทบุรี',
          employeeName: 'กองทุนประกันสังคม ม.40',
          postalAmount: 2700000,
        },
      ],
    };

    return mockData;
  },
);

export const cancelCutOffPayWrongFundDelectService = createAsyncThunk(
  `${sliceName}/cancel-cut-to-pay/cmp/patch`,
  async (prepareToPayId: string): Promise<{ prepareToPayId: string }> => {
    console.log('Delete', prepareToPayId);
    // เปิดใช้งาน API call จริง
    // const response = await callApi({
    //   method: 'patch',
    //   url: `cancel-cut-to-pay/cmp/id/${prepareToPayId}`,
    //   instanceName: 'pay',
    // });

    // สมมติว่าต้องการ return ค่าเดียวกับ request mock
    return await Promise.resolve({ prepareToPayId });
  },
);
