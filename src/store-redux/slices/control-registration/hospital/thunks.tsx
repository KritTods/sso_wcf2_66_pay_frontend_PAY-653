import { AdvancePaymentType, PayType } from '@/types/payType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterSearchType, PageFormType, ResultFilterType, sliceName } from '@/store-redux/slices/control-registration/hospital/types';

export const getControlRegistrationHospitalService = createAsyncThunk(
  `${sliceName}/getControlRegistrationHospitalService`,
  ({ data }: { data: FilterSearchType }) => {
    console.log(data);

    // Mockup response
    const mockData: ResultFilterType[] = [
      {
        documentNo: '01948574493821',
        hospitalCode: '10001',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        identityNo: '01948574493821',
        significantNo: '3000660000003T1',
        significantHandNo: '1234567890',
        payDate: '2023-12-30',
        amount: 500,
        vat: 5,
        totalAmount: 1100,
        status: 'จ่ายแล้ว',
      },
      {
        documentNo: '01948574493093',
        hospitalCode: '10008',
        hospitalName: 'สถานพยาบาลสมบูรณ์',
        identityNo: '01948574493093',
        significantNo: '3000660000006T1',
        significantHandNo: '1234567890',
        payDate: '2023-11-09',
        amount: 1000,
        vat: 0,
        totalAmount: 1100,
        status: 'ยกเลิก',
      },
      {
        documentNo: '01948574400100',
        hospitalCode: '10001',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        identityNo: '019485744192831',
        significantNo: '3000660000009T1',
        significantHandNo: '1234567890',
        payDate: '2023-11-01',
        amount: 2000,
        vat: 0,
        totalAmount: 1100,
        status: 'โอนกลับ',
      },
    ];

    return mockData;
  },
);

export const getControlRegistrationHospitalDetailService = createAsyncThunk(
  `${sliceName}/getControlRegistrationHospitalDetailService`,
  (id: string): PageFormType => {
    console.log(id);

    // Mockup response
    const mockData: PageFormType = {
      address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
      cardConsider: {
        payDate: '2024-12-31',
        payer: 'กาญจนา พิเศษ',
        status: 'จ่ายแล้ว', // Paid
        receiveType: 'O',
        receiveName: 'มนัศนันท์ หิมพานต์',
        identityDocument: 'บัตรประชาชน',
        identityNo: '1560100433000',
        address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
      },
      cardPreparePay: {
        documentNo: 'P000167000001T1',
        paymentAgent: 'กาญจนา พิเศษ',
        transactionDate: '2024-12-31',
        payType: 'X' as PayType,
        advancePaymentType: 'PAY' as AdvancePaymentType,
      },
      cardTax: {
        dataTestId: '',
        data: {
          taxHotpitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
          taxAmount: 2700000,
          taxPercent: 1,
          taxAmountAfterCalTax: 27000,
          taxTotalAmountAfterCalTax: 2673000,
        },
        mode: 'view',
      },
      isCheque: true,
      tableList: [
        {
          hospitalCode: '10001',
          hospitalName: 'โรงพยาบาลกรุงเทพ',
          paymentNo: 'J000167000001T1',
          accidentIssueCode: '100764/0128602/02',
          employeeCitizenId: '01948574493821',
          receiverName: 'นพดล สุขใจดี',
          totalAmount: 1200000,
          significantHandNo: '000167000001T1',
          significantNo: '',
          bankCode: '006',
          bankName: 'ธนาคารกสิกรไทย',
          bankAccountNo: '1234567890',
          bankAccountName: 'นพดล สุขใจดี',
          citizenId: '1560100433000',
          receiveDate: '2024-12-31',
          hospitalNo: '120068/000001',
        },
      ],
      cheques: [
        {
          id: '',
          chequeNo: '81020094',
          bankCode: '006',
          bankBranchCode: '',
          amount: 50000,
          chequeStampDate: '2024-12-31',
        },
      ],
      historyPreparePay: [
        {
          id: '',
          name: 'เปลี่ยน สถานะ',
          beforeValue: 'จ่ายแล้ว',
          afterValue: 'ยกเลิก',
          updateBy: 'Admin',
          updateDate: '2023-11-10',
        },
      ],
      historyOrderPayment: [
        {
          id: '',
          name: 'เปลี่ยน จำนวนเงิน',
          beforeValue: 50000,
          afterValue: 50000,
          updateBy: 'Admin',
          updateDate: '2024-12-31',
        },
      ],
      historyCheques: [
        {
          id: '',
          name: 'เปลี่ยน จำนวนเงิน',
          beforeValue: 50000,
          afterValue: 50000,
          updateBy: 'Admin',
          updateDate: '2024-12-31',
        },
      ],
    };

    return mockData;
  },
);

// แก้ไขเช็ค
export const updateControlRegistrationChequeService = createAsyncThunk(
  `${sliceName}/updateControlRegistrationChequeService`,
  async (data: { id: string; chequeNo: string }) => {
    await new Promise((resolve) => {
      console.log('data', data);
      setTimeout(resolve, 1000);
    });
    // Mockup response

    return {
      success: true,
      message: 'บันทึกข้อมูลสำเร็จ',
    };
  },
);
