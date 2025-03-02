import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { AdvancePaymentType, PayType } from '@/types/payType';

export const getControlRegistrationPostalService = createAsyncThunk(
  `${sliceName}/getControlRegistrationPostalService`,
  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('Postal Filter', data);
    // Mockup response
    const mockData: ResultFilterType[] = [
      //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์ T1 10000000000200000001
      {
        postalNo: '10000000000200000001',
        payDate: '2024-02-10',
        accidentIssueCode: '100764/0128602/02',
        receiverName: 'นพดล สุขใจดี',
        portalDestination: 'นครปฐม',
        amount: 1200000,
        paymentNo: 'J000167000001T1',
        status: 'จ่ายแล้ว',
        citizenId: '',
        paymentType: 'T1',
        significantNo: 'CHQ123456789',
        significantHandNo: '2024-02-10',
      },
      // จ่ายคืนเงินสมทบให้นายจ้าง S1 10000000000200000002
      {
        postalNo: '10000000000200000002',
        payDate: '2024-02-10',
        accidentIssueCode: '100764/0128602/02',
        receiverName: 'นพดล สุขใจดี',
        portalDestination: 'นครปฐม',
        amount: 1200000,
        paymentNo: 'J000167000001T1',
        status: 'จ่ายแล้ว',
        citizenId: '',
        paymentType: 'S1',
        significantNo: 'CHQ123456789',
        significantHandNo: '2024-02-10',
      },
      // จ่ายเงินประเภทอื่นๆ E1 10000000000200000003
      {
        postalNo: '10000000000200000003',
        payDate: '2024-02-10',
        accidentIssueCode: '100764/0128602/02',
        receiverName: 'นพดล สุขใจดี',
        portalDestination: 'นครปฐม',
        amount: 1200000,
        paymentNo: 'J000167000001T1',
        status: 'จ่ายแล้ว',
        citizenId: '',
        paymentType: 'E1',
        significantNo: 'CHQ123456789',
        significantHandNo: '2024-02-10',
      },
      // จ่ายเงินกองทุนเพื่อบริหารสำนักงาน P1 FIN 10000000000200000004
      {
        postalNo: '10000000000200000004',
        payDate: '2024-02-10',
        accidentIssueCode: '100764/0128602/02',
        receiverName: 'นพดล สุขใจดี',
        portalDestination: 'นครปฐม',
        amount: 1200000,
        paymentNo: 'J000167000001T1',
        status: 'จ่ายแล้ว',
        citizenId: '',
        paymentType: 'P1',
        significantNo: 'CHQ123456789',
        significantHandNo: '2024-02-10',
      },

      // จ่ายเงินผิดกองทุนเงินทดแทน P1 PAY 10000000000200000005
      {
        postalNo: '10000000000200000005',
        payDate: '2024-02-10',
        accidentIssueCode: '100764/0128602/02',
        receiverName: 'นพดล สุขใจดี',
        portalDestination: 'นครปฐม',
        amount: 1200000,
        paymentNo: 'J000167000001T1',
        status: 'จ่ายแล้ว',
        citizenId: '',
        paymentType: 'P1',
        significantNo: 'CHQ123456789',
        significantHandNo: '2024-02-10',
      },
    ];

    return mockData;
  },
);

export const getControlRegistrationPostalDetailService = createAsyncThunk(
  `${sliceName}/getControlRegistrationPostalDetailService`,
  (id: string): PageFormType => {
    console.log('id', id);
    // Mockup response based on ID
    const mockDataMap: Record<string, PageFormType> = {
      //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์ T1
      '10000000000200000001': {
        paymentType: 'T1',
        postalNo: '10000000000200000001',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            citizenId: '01948574493821',
            receiverName: 'นพดล สุขใจดี',
            amount: 1200000,
            significantNo: 'CHQ123456789',
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
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyOrderPayment: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: '81020094',
            afterValue: '81020093',
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyMoneys: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: '20000000000000234323',
            afterValue: '20000000000000234333',
            updateBy: 'Admin Admin',
            updateDate: '2023-11-01',
          },
        ],
      },
      // จ่ายคืนเงินสมทบให้นายจ้าง S1
      '10000000000200000002': {
        paymentType: 'S1',
        postalNo: '10000000000200000002',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
          advancePaymentType: undefined,
        },
        isCheque: true,
        tableList: [
          {
            ssoCode: '1050',
            paymentNo: 'J000167000001T1',
            accountNo: '1003211224',
            accountName: '000009 : อรุณเซอร์วิส แอนด์ ซัพพลาย',
            amount: 1200000,
            significantNo: 'CHQ123456789',
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
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyOrderPayment: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: '81020094',
            afterValue: '81020093',
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyMoneys: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: '20000000000000234323',
            afterValue: '20000000000000234333',
            updateBy: 'Admin Admin',
            updateDate: '2023-11-01',
          },
        ],
      },
      // จ่ายเงินประเภทอื่นๆ E1
      '10000000000200000003': {
        paymentType: 'E1',
        postalNo: '10000000000200000003',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
          significantNo: '0001670000001E1',
          significantHandNo: '-',
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001T1',
          paymentNo: 'J000167000001T1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
          bookNo: '0000000000',
          receiverName: 'กาญจนา พิเศษ',
          paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบกองทุนประกันสังคม',
        },
        isCheque: true,
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
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: '81020094',
            afterValue: '81020093',
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyMoneys: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: '20000000000000234323',
            afterValue: '20000000000000234333',
            updateBy: 'Admin Admin',
            updateDate: '2023-11-01',
          },
        ],
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 PAY งานเงินจ่าย
      '10000000000200000004': {
        paymentType: 'P1',
        postalNo: '10000000000200000004',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
          significantNo: '0001670000001E1',
          significantHandNo: '-',
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          paymentNo: 'J000167000001P1',
          documentNo: 'P000167000001P1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
          incorrectPaymentReason: 'J', // สาเหตุการจ่ายผิด
          employeeCitizenId: '',
          employeeName: '',
          accountNo: '',
          paymentRequest: 'จิรายุส วรรณสกุล', // จ่ายคืนให้
          amount: 2700000, // จำนวนเงิน
        },
        isCheque: true,

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
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: '81020094',
            afterValue: '81020093',
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyMoneys: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: '20000000000000234323',
            afterValue: '20000000000000234333',
            updateBy: 'Admin Admin',
            updateDate: '2023-11-01',
          },
        ],
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 FIN งานการเงินรับ
      '10000000000200000005': {
        postalNo: '10000000000200000005',
        paymentType: 'P1',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'จ่ายแล้ว', // Paid
          significantNo: '0001670000001E1',
          significantHandNo: '-',
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001P1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'P' as PayType,
          advancePaymentType: 'FIN' as AdvancePaymentType,
          incorrectPaymentReason: undefined, // สาเหตุการจ่ายผิด
          employeeCitizenId: '',
          employeeName: '',
          accountNo: '',
          paymentRequest: '', // จ่ายคืนให้
          amount: 0, // จำนวนเงิน
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            incorrectPaymentReason: 'E', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            amount: 1200000,
            significantNo: 'CHQ123456789',
          },
        ],
        recipts: [
          {
            id: '1',
            receiptNo: '100365CSW000958',
            receiptDate: '2023-10-01',
            amount: 1200000,
            accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
          },
          {
            id: '2',
            receiptNo: '100365CSW000958',
            receiptDate: '2023-10-02',
            amount: 1500000,
            accountName: 'อรุณเซอร์วิส แอนด์ ซัพพลาย',
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
            amount: 2700000,
            chequeStampDate: '2024-12-31',
          },
        ],
        historyPreparePay: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyOrderPayment: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: 52000,
            afterValue: 50000,
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyCheques: [
          {
            id: '',
            name: 'เปลี่ยน จำนวนเงิน',
            beforeValue: '81020094',
            afterValue: '81020093',
            updateBy: 'Admin',
            updateDate: '2024-12-31',
          },
        ],
        historyMoneys: [
          {
            id: '',
            name: 'เปลี่ยน สถานะ',
            beforeValue: '20000000000000234323',
            afterValue: '20000000000000234333',
            updateBy: 'Admin Admin',
            updateDate: '2023-11-01',
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
        payType: undefined,
        advancePaymentType: undefined,
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
      prepareToPayId: '0193e942-23b2-7302-9f16-f1a3c9e7ea4f',
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
      prepareToPayId: '0193e942-23b2-7302-9f16-f1a3c9e7ea4f',
      success: true,
      message: 'บันทึกข้อมูลสำเร็จ',
    };
  },
);
