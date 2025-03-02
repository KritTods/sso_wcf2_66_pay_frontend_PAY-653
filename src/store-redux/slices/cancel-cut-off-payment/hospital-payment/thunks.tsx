import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, HospitalPaymentDataType, FilterSearchType, PageDetailType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType, ReceiveType } from '@/types/payType';

export const getHospitalService = createAsyncThunk(
  `${sliceName}/get`,

  ({ data }: { data: FilterSearchType }): HospitalPaymentDataType[] => {
    console.log('data Filter', data);
    //mockup response tableList
    const mockData: HospitalPaymentDataType[] = [
      {
        prepareToPayId: '1',
        significantNo: '12345678',
        significantHandNo: '',
        documentNo: 'DOC-2024-001',
        accidentIssueCode: 'ACC-1001',
        hospitalName: 'โรงพยาบาลศิริราช',
        payDate: '2024-01-30',
        totalAmount: 50000,
        payType: {
          code: 'X',
          name: 'รับเงิน ณ สำนักงาน',
        },
        employeeCitizenId: '1234567890123',
        receiverName: 'นาย สมชาย ใจดี',
        hospitalNo: '120068/000001',
        bank: {
          code: '001',
          name: 'กรุงไทย จำกัด(มหาชน)',
        },
        bankAccountNo: '123-456-7890',
        bankAccountName: 'สมชาย ใจดี',
      },
      {
        prepareToPayId: '2',
        significantNo: '',
        significantHandNo: '55443322',
        documentNo: 'DOC-2024-002',
        accidentIssueCode: 'ACC-1002',
        hospitalName: 'โรงพยาบาลจุฬาฯ',
        payDate: '2024-02-10',
        totalAmount: 30000,
        payType: {
          code: 'T',
          name: 'โอนผ่านธนาคารโดยจังหวัด',
        },
        employeeCitizenId: '2345678901234',
        receiverName: 'นาง สายสมร ดีใจ',
        hospitalNo: '120068/000002',
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '987-654-3210',
        bankAccountName: 'ประสิทธิ์ มั่นคง',
      },
      {
        prepareToPayId: '3',
        significantNo: '33445566',
        significantHandNo: '',
        documentNo: 'DOC-2024-003',
        accidentIssueCode: 'ACC-1003',
        hospitalName: 'โรงพยาบาลรามาธิบดี',
        payDate: '2024-03-15',
        totalAmount: 40000,
        payType: {
          code: 'S',
          name: 'ส่งเช็คทางไปรษณีย์',
        },
        employeeCitizenId: '3456789012345',
        receiverName: 'นาย ประสิทธิ์ มั่นคง',
        hospitalNo: '120068/000003',
        bank: {
          code: '006',
          name: 'ธนาคารกรุงไทย',
        },
        bankAccountNo: '987-654-3210',
        bankAccountName: 'ประสิทธิ์ มั่นคง',
      },
    ];

    return mockData;
  },
);

export const getHospitalDetailService = createAsyncThunk(
  `${sliceName}/getHospitalDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response pageDetail

    //รับเงิน ณ สำนักงาน
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
        payType: 'S', // ประเภทการจ่าย   common
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
      paymentList: [
        {
          prepareToPayId: '1',
          significantNo: '33445566',
          significantHandNo: '66554433',
          documentNo: 'DOC-2024-003',
          paymentNo: 'J000167000001T1',
          accidentIssueCode: '100764/0128602/02',
          hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
          payDate: '2024-03-15',
          totalAmount: 40000,
          payType: {
            code: 'X',
            name: 'รับเงิน ณ สำนักงาน',
          },
          employeeCitizenId: '3456789012345',
          receiverName: 'นาย ประสิทธิ์ มั่นคง',
          hospitalNo: '120068/000001',
          bank: {
            code: '006',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountNo: '987-654-3210',
          bankAccountName: 'ประสิทธิ์ มั่นคง',
        },
      ],
      postAddress: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
      cashAmount: 40000,
      chequeInfoList: [
        {
          id: '',
          chequeNo: '81020094',
          bankCode: '006',
          bankBranchCode: '',
          amount: 40000,
          chequeStampDate: '2024-12-31',
        },
      ],
      hospitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
      amount: 2700000,
      vat: 1,
      totalVat: 27000,
      totalAmount: 2673000,
    };

    //โอนผ่านธนาคารโดยจังหวัด

    //ส่งเช็คทางไปรษณีย์

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
