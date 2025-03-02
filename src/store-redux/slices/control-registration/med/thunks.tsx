import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from '@/store-redux/slices/control-registration/med/types';
import { AdvancePaymentType, PayType } from '@/types/payType';

export const getControlRegistrationMedService = createAsyncThunk(
  `${sliceName}/getControlRegistrationMedService`,
  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data', data);
    // Mockup response
    const mockData: ResultFilterType[] = [
      {
        doctorCode: '6303033',
        citizenId: '1560100544000',
        fullName: 'แพทย์หญิงเบ็ญจมาศ สลิลปราโมทย์',
        documentNo: '01948574493821',
        significantHandNo: '0001670000001T1',
        payDate: '2023-11-30',
        amount: 500,
        taxAmount: 50,
        netAmount: 450,
        status: 'จ่ายแล้ว', // Paid
      },
      {
        doctorCode: '5116069',
        citizenId: '5601872201004',
        fullName: 'แพทย์หญิงฉุลีรัตน์ สุกุลราษฎรษ์',
        documentNo: '01948574493093',
        significantHandNo: '0001670000002T1',
        payDate: '2023-11-09',
        amount: 1000,
        taxAmount: 0,
        netAmount: 1000,
        status: 'ยกเลิก', // Canceled
      },
      {
        doctorCode: '6910080',
        citizenId: '1920344522990',
        fullName: 'นายแพทย์จิรายุส มโนธรรม',
        documentNo: '01948574400100',
        significantHandNo: '0001670000003T1',
        payDate: '2023-11-01',
        amount: 2000,
        taxAmount: 0,
        netAmount: 2000,
        status: 'โอนกลับ', // Returned
      },
      {
        doctorCode: '6303033',
        citizenId: '1560100544000',
        fullName: 'แพทย์หญิงA A',
        documentNo: '11223344556677',
        significantHandNo: '0001670000001T1',
        payDate: '2023-11-30',
        amount: 500,
        taxAmount: 50,
        netAmount: 450,
        status: 'จ่ายแล้ว', // Paid
      },
      {
        doctorCode: '5116069',
        citizenId: '5601872201004',
        fullName: 'แพทย์หญิงB B',
        documentNo: '22334455667788',
        significantHandNo: '0001670000002T1',
        payDate: '2023-11-09',
        amount: 1000,
        taxAmount: 0,
        netAmount: 1000,
        status: 'ยกเลิก', // Canceled
      },
      {
        doctorCode: '6910080',
        citizenId: '1920344522990',
        fullName: 'นายแพทย์C C',
        documentNo: '33445566778899',
        significantHandNo: '0001670000003T1',
        payDate: '2023-11-01',
        amount: 2000,
        taxAmount: 0,
        netAmount: 2000,
        status: 'โอนกลับ', // Returned
      },
      {
        doctorCode: '6303033',
        citizenId: '1560100544000',
        fullName: 'แพทย์หญิงD D',
        documentNo: '44556677889900',
        significantHandNo: '0001670000001T1',
        payDate: '2023-11-30',
        amount: 500,
        taxAmount: 50,
        netAmount: 450,
        status: 'จ่ายแล้ว', // Paid
      },
    ];

    return mockData;
  },
);

export const getControlRegistrationMedDetailService = createAsyncThunk(
  `${sliceName}/getControlRegistrationMedDetailService`,
  (id: string): PageFormType => {
    console.log('id', id);
    // Mockup response based on ID
    const mockDataMap: Record<string, PageFormType> = {
      '01948574493821': {
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
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            totalAmount: 2700000,
            significantHandNo: '000167000001T1',
            significantNo: '000167000001T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'นพดล สุขใจดี',
            citizenId: '1560100433000',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 50000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
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
      },
      '01948574493093': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-09',
          payer: 'Some Payer',
          status: 'ยกเลิก', // Canceled
          receiveType: 'O',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '5601872201004',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        },
        cardPreparePay: {
          documentNo: 'P000167000002T1',
          paymentAgent: 'Some Agent',
          transactionDate: '2023-11-09',
          payType: 'X' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000002T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '5601872201004',
            receiverName: 'ช่างศรินทร์ เมธมณี',
            totalAmount: 1000000,
            significantHandNo: '000167000002T1',
            significantNo: '000167000002T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'ช่างศรินทร์ เมธมณี',
            citizenId: '5601872201004',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
      },
      '01948574400100': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-01',
          payer: 'Some Payer',
          status: 'โอนกลับ', // Returned
          receiveType: 'O',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '1920344522990',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        },
        cardPreparePay: {
          documentNo: 'P000167000003T1',
          paymentAgent: 'Some Agent',
          transactionDate: '2023-11-01',
          payType: 'X' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000003T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '1920344522990',
            receiverName: 'ช่างศรินทร์ เมธมณี',
            totalAmount: 2000000,
            significantHandNo: '000167000003T1',
            significantNo: '000167000003T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'ช่างศรินทร์ เมธมณี',
            citizenId: '1920344522990',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
            beforeValue: 'โอนกลับ',
            afterValue: 'โอนกลับ',
            updateBy: 'Admin',
            updateDate: '2023-11-01',
          },
        ],
        historyOrderPayment: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: 'โอนกลับ',
            afterValue: 'โอนกลับ',
            updateBy: 'Admin',
            updateDate: '2023-11-01',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: 'โอนกลับ',
            afterValue: 'โอนกลับ',
            updateBy: 'Admin',
            updateDate: '2023-11-01',
          },
        ],
      },

      '11223344556677': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'B' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            totalAmount: 2700000,
            significantHandNo: '000167000001T1',
            significantNo: '000167000001T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'นพดล สุขใจดี',
            citizenId: '1560100433000',
            receiveDate: '2024-12-31',
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
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
          },
        ],
        historyPreparePay: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 50000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
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
      },

      '22334455667788': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'S' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            totalAmount: 2700000,
            significantHandNo: '000167000001T1',
            significantNo: '000167000001T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'นพดล สุขใจดี',
            citizenId: '1560100433000',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 50000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
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
      },

      '33445566778899': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'โอนกลับ', // Paid
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            totalAmount: 2700000,
            significantHandNo: '000167000001T1',
            significantNo: '000167000001T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'นพดล สุขใจดี',
            citizenId: '1560100433000',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 50000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
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
        historyMoneys: [
          {
            id: '1',
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
      },

      '44556677889900': {
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'M' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
        },
        isCheque: false,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            employeeCitizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            totalAmount: 2700000,
            significantHandNo: '000167000001T1',
            significantNo: '000167000001T1',
            bankCode: '006',
            bankName: 'ธนาคารกสิกรไทย',
            bankAccountNo: '1234567890',
            bankAccountName: 'นพดล สุขใจดี',
            citizenId: '1560100433000',
            receiveDate: '2024-12-31',
          },
        ],
        moneys: [
          {
            postalNo: '00000000000000000001',
            postalCode: '000',
            portalDestination: 'ธนาคารกสิกรไทย',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
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
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 50000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
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
      },
    };

    const mockData: PageFormType = mockDataMap[id] || {
      cardConsider: {
        payDate: '',
        payer: '',
        status: 'Unknown',
        receiveType: '',
        receiveName: '',
        identityDocument: '',
        identityNo: '',
        address: '',
      },
      cardPreparePay: {
        documentNo: '',
        paymentAgent: '',
        transactionDate: '',
        payType: 'X' as PayType,
        advancePaymentType: 'PAY' as AdvancePaymentType,
      },
      isCheque: false,
      tableList: [],
      cheques: [],
      moneys: [],
      historyPreparePay: [],
      historyOrderPayment: [],
      historyCheques: [],
      historyMoneys: [],
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

// แก้ไขธนาณัติ
export const updateControlRegistrationMoneysService = createAsyncThunk(
  `${sliceName}/updateControlRegistrationMoneysService`,
  async (data: { id: string; postalNo: string }) => {
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
