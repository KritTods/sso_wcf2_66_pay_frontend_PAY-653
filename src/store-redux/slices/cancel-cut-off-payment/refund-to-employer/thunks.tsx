import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, RefundToEmploerDataType, FilterSearchType, PageDetailType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType } from '@/types/payType';

export const getRefundToEmployerService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): RefundToEmploerDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: RefundToEmploerDataType[] = [
      {
        ssoCode: '22233221',
        significantNo: 'SF0001670001',
        significantHandNo: '',
        documentNo: 'P000167000001E1',
        paymentNo: 'จ13015600034',
        accountNo: '1003211224',
        accountBranchCode: '000009',
        accountName: 'หจก. สมชัย การค้า',
        payDate: '2024-12-31',
        totalAmount: 15000,
        payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '-',
        bankAccountName: '-',
      },
      {
        ssoCode: '22233221',
        significantNo: '',
        significantHandNo: 'H001670002',
        documentNo: 'P000167000002T2',
        paymentNo: 'จ13015600035',
        accountNo: '1003211224',
        accountBranchCode: '000009',
        accountName: 'หจก. สมชัย การค้า',
        payDate: '2024-11-25',
        totalAmount: 20000,
        payType: { code: 'T', name: 'โอนผ่านธนาคารโดยจังหวัด' },
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '123456789',
        bankAccountName: 'สมชาย ใจดี',
      },
      {
        ssoCode: '22233221',
        significantNo: 'SF0001670003',
        significantHandNo: '',
        documentNo: 'P000167000003S3',
        paymentNo: 'จ13015600036',
        accountNo: '1003211224',
        accountBranchCode: '000009',
        accountName: 'หจก. สมชัย การค้า',
        payDate: '2024-10-15',
        totalAmount: 12000,
        payType: { code: 'S', name: 'ส่งเช็คทางไปรษณีย์' },
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '-',
        bankAccountName: '-',
      },
      {
        ssoCode: '22233221',
        significantNo: '',
        significantHandNo: 'H001670004',
        documentNo: 'P000167000004P4',
        paymentNo: 'จ13015600037',
        accountNo: '1003211224',
        accountBranchCode: '000009',
        accountName: 'หจก. สมชัย การค้า',
        payDate: '2024-09-10',
        totalAmount: 18000,
        payType: { code: 'P', name: 'ธนาณัติ' },
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '-',
        bankAccountName: '-',
      },
    ];

    return mockData;
  },
);

export const getRefundToEmployerDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    const mockData: PageDetailType = {
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
        payType: 'P', // ประเภทการจ่าย   common
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
      isCheque: false,
      tableList: [
        {
          ssoCode: '22233221',
          significantNo: 'SF202401001',
          significantHandNo: '',
          documentNo: 'D202401001',
          paymentNo: 'P202401001',
          accountNo: '1003211224',
          accountBranchCode: '000009',
          accountName: 'หจก. สมชัย การค้า',
          payDate: '2024-12-01',
          totalAmount: 50000,
          payType: { code: 'X', name: 'รับเงิน ณ สำนักงาน' },
          bank: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountNo: '0192837465',
          bankAccountName: 'รัตติยากร บุญพิลาศ',
        },
      ],

      chequeInfoList: [
        {
          id: '',
          chequeNo: '81020094',
          bankCode: '006',
          bankBranchCode: '',
          amount: 50000,
          chequeStampDate: '2024-12-31',
        },
      ],
      cashAmount: 50000,
      postAddress: '123 Main St, Anytown, USA',
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
    };

    return mockData;
  },
);

export const cancelDoctorSalaryService = createAsyncThunk(
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
