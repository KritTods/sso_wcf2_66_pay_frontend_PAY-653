import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, OtherPaymentDataType, FilterSearchType, PageDetailType } from './types';
import { PayType } from '@/types/payType';

export const getcancelCutOffPayOtherPaymentService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayOtherPaymentService`,
  ({ data }: { data: FilterSearchType }): OtherPaymentDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: OtherPaymentDataType[] = [
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E1', //เลขที่เอกสาร
        payDate: '2024-12-31',
        totalAmount: 15000,
        payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
      },
      {
        significantNo: 'SF0001670001',
        significantHandNo: '',
        documentNo: 'P000167000001E2', //เลขที่เอกสาร
        payDate: '2024-12-31',
        totalAmount: 20000,
        payType: { code: 'T', name: 'โอนผ่านธนาคารโดยจังหวัด' },
      },
      {
        significantNo: 'SF0001670001',
        significantHandNo: '',
        documentNo: 'P000167000001E3', //เลขที่เอกสาร
        payDate: '2024-12-31',
        totalAmount: 12000,
        payType: { code: 'S', name: 'ส่งเช็คทางไปรษณีย์' },
      },
      {
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000001E4', //เลขที่เอกสาร
        payDate: '2024-12-31',
        totalAmount: 18000,
        payType: { code: 'P', name: 'ธนาณัติ' },
      },
    ];

    return mockData;
  },
);

export const getcancelCutOffPayOtherPaymentDetailService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayOtherPaymentDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      cardConsider: {
        payDate: '2024-12-31', // วันที่ตัดจ่าย
        payer: 'John Doe', // ผู้ตัดจ่าย
        status: 'จ่ายแล้ว', // สถานะ
        significantNo: 'SN123456789', // เลขที่ใบสำคัญรับเงิน
        significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
        receiveType: undefined, // ประเภทผู้รับเงิน
        receiveName: '', // ชื่อผู้รับเงิน
        identityDocument: '', // ประเภทบัตรอ้างอิง
        identityNo: '', // เลขที่บัตรอ้างอิง
        address: '', // ที่อยู่ผู้รับ
        referenceDocument: '', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
        referenceNo: '', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
      },
      cardPreparePay: {
        documentNo: 'P000167000001E1', // เลขที่เอกสาร   common
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        paymentAgent: 'John Doe', // ผู้ตเตรียมจ่าย   common
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย   common
        payType: 'P' as PayType, // ประเภทการจ่าย   common
        bookNo: 'B123456789', // เลขที่หนังสือ รง.
        receiverName: 'Jane Smith', // ชื่อผู้มีสิทธิ์
        paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบกองทุนประกันสังคม', // ประเภทการจ่ายนอกระบบ***
        advancePaymentType: undefined, // ประเภทการจ่าย/รับ
        incorrectPaymentReason: undefined, // สาเหตุการจ่ายผิด
        employeeCitizenId: '', // หมายเลขบัตรประชาชน
        employeeName: '', // ชื่อ-นามสกุล
        accountNo: '', // ชื่อสถานประกอบการ
        paymentRequest: '', // จ่ายคืนให้
        amount: 1, // จำนวนเงิน
      },
      isCheque: true,

      chequeInfoList: [
        {
          id: '1',
          chequeNo: '123456',
          amount: 1000,
          bankCode: '006',
          chequeStampDate: '2024-12-31',
          bankBranchCode: '1234',
        },
      ],
      cashAmount: 5000,
      postAddress: '123 Main St, Bangkok, Thailand',
      postalInfoList: [
        {
          postalInfoId: '',
          postalNo: 'PN123456',
          postalCode: '10110',
          portalDestination: 'Bangkok Post Office',
          employeeName: 'นพดล สุขใจดี',
          postalAmount: 50000,
        },
      ],
      banks: [
        {
          id: '1',
          bank: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          totalAmount: 1000,
        },
        {
          id: '2',
          bank: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountName: 'นพดล สุขใจดี',
          bankAccountNo: '123456789',
          totalAmount: 15000,
        },
      ],
    };

    return mockData;
  },
);

export const cancelCutOffPayOtherPaymentDelectService = createAsyncThunk(
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
