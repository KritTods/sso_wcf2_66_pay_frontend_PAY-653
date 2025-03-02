import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, OfficeFundDataType, FilterSearchType } from './types';
import { AdvancePaymentType, IncorrectPaymentReasonType } from '@/types/payType';

export const getOfficeFundService = createAsyncThunk(
  `${sliceName}/get`,
  ({ data }: { data: FilterSearchType }): OfficeFundDataType[] => {
    console.log('data', data);
    //mockup response
    const mockData: OfficeFundDataType[] = [
      {
        id: '1',
        cardConsider: undefined,
        cardPreparePay: undefined,
        documentNo: 'P0001670000001B2', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 20000, // จำนวนเงิน
        noticeName: '1/2567', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
      {
        id: '2',
        cardConsider: undefined,
        cardPreparePay: undefined,
        documentNo: 'P0001670000002B2', //เลขที่เอกสาร
        paymentNo: 'จ13015600035', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 15000, // จำนวนเงิน
        noticeName: '1/2567', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
      {
        id: '3',
        cardConsider: undefined,
        cardPreparePay: undefined,
        documentNo: 'P0001670000003B2', //เลขที่เอกสาร
        paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        amount: 1000, // จำนวนเงิน
        noticeName: '1/2567', // จ่ายตามประกาศฉบับที่
        noticeAmount: 1200000, // จำนวนเงินจ่ายตามประกาศ (บาท)
        creditBalance: 1200000, // ยอดเงินคงเหลือ (บาท)
        paymentAgent: '',
        details: [],
      },
    ];

    return mockData;
  },
);

export const getOfficeFundDetailService = createAsyncThunk(
  `${sliceName}/getDoctorSalaryDetailService`,
  (id: string): OfficeFundDataType => {
    console.log('id', id);
    //mockup response
    const mockData: OfficeFundDataType = {
      id: '1',
      cardConsider: {
        payDate: '2024-12-31',
        payer: 'กาญจนา พิเศษ',
        status: 'จ่ายแล้ว',
        significantNo: '0001670000001E1',
        significantHandNo: '-',
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
      documentNo: 'P000167000001E1', //เลขที่เอกสาร
      paymentNo: 'จ13015600034', // เลขที่ใบสั่งจ่าย
      transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
      amount: 1200000, // จำนวนเงิน
      noticeName: '1', // จ่ายตามประกาศฉบับที่
      noticeAmount: 2100000, // จำนวนเงินจ่ายตามประกาศ (บาท)
      creditBalance: 0, // ยอดเงินคงเหลือ (บาท)
      paymentAgent: 'กรกฎ ใจดี',
      details: [
        {
          dueInstallment: '1', // งวดที่
          bookNo: '123456', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
          accountName1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo1: '123456', //เลขที่เช็ค : 1
          chequeBankDigitCode1: '006 - ธ.กรุงไทย จำกัด (มหาชน)', //รหัสธนาคารเช็ค : 1
          amount1: 1200000, //จำนวนเงิน : 1
          accountName2: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 2
          chequeNo2: '123456', //เลขที่เช็ค : 2
          chequeBankDigitCode2: '006', //รหัสธนาคารเช็ค : 2
          amount2: 1500000, //จำนวนเงิน : 2
        },
        {
          dueInstallment: '2', // งวดที่
          bookNo: '0000000000', // เลขที่หนังสือ รง.
          bookDate: '2024-12-31', // วันที่หนังสือ
          approveName: 'นพดล สุขมั่งมี', // ผู้อนุมัติสั่งจ่าย
          accountName1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
          chequeNo1: '12049109', //เลขที่เช็ค : 1
          chequeBankDigitCode1: '006 - ธ.กรุงไทย จำกัด (มหาชน)', //รหัสธนาคารเช็ค : 1
          amount1: 2000000, //จำนวนเงิน : 1
          accountName2: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 2
          chequeNo2: '12049109', //เลขที่เช็ค : 2
          chequeBankDigitCode2: '006 - ธ.กรุงไทย จำกัด (มหาชน)', //รหัสธนาคารเช็ค : 2
          amount2: 2000000, //จำนวนเงิน : 2
        },
      ],
    };

    return mockData;
  },
);
