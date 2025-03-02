import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName, FilterSearchType, ResultFilterType, PageFormType } from './types';
import { AdvancePaymentType, PayType } from '@/types/payType';

export const getControlRegistrationChequeService = createAsyncThunk(
  `${sliceName}/getControlRegistrationChequeService`,
  ({ data }: { data: FilterSearchType }): ResultFilterType[] => {
    console.log('data Filter', data);
    // Mockup response
    const mockData: ResultFilterType[] = [
      //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์ T1
      {
        paymentNo: '01948574493821',
        accidentIssueCode: 'AIC20240201',
        citizenId: '1560100544000',
        receiverName: 'แพทย์หญิงเบ็ญจมาศ สลิลปราโมทย์',
        amount: 1200000,
        significantNo: '',
        significantHandNo: '0001670000001T1',
        employeeName: 'นายสมชาย ใจดี',
        chequeNo: 'CHQ123456789',
        chequeStampDate: '2024-02-10',
        status: 'จ่ายแล้ว',
        paymentType: 'T1', // จ่ายเงินทดแทน/ค่าตอบแทนแพทย์
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        hospitalNo: 'HOS20240217',
        ssoCode: 'SSO001234',
        accountNo: '123-4-56789-0',
        accountName: 'บริษัท เอ บี ซี จำกัด',
        incorrectPaymentReason: undefined,
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: '2024-02-17',
        identityNo: '3101700544001',
        taxAmount: 50,
      },
      // จ่ายโรงพยาบาล T13
      {
        paymentNo: '01948574493093',
        accidentIssueCode: 'AIC20240202',
        citizenId: '1670200555000',
        receiverName: 'โรงพยาบาลศิริราช',
        amount: 1300000,
        significantNo: '0001670000002T1',
        significantHandNo: '',
        employeeName: 'นางสาวกาญจนา มงคล',
        chequeNo: 'CHQ987654321',
        chequeStampDate: '2024-02-15',
        status: 'ยกเลิก',
        paymentType: 'T13', // จ่ายโรงพยาบาล
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: 'โรงพยาบาลศิริราช',
        hospitalNo: 'HOS20240218',
        ssoCode: 'SSO002345',
        accountNo: '987-6-54321-0',
        accountName: 'บริษัท ดี อี เอฟ จำกัด',
        incorrectPaymentReason: 'S', // ข้อมูลผิดพลาด
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: undefined,
        identityNo: '4101800666002',
        taxAmount: 100,
      },
      // จ่ายคืนเงินสมทบให้นายจ้าง S1
      {
        paymentNo: '01948574400100',
        accidentIssueCode: 'AIC20240203',
        citizenId: '1890300777000',
        receiverName: 'บริษัท จี เอช ไอ จำกัด',
        amount: 1400000,
        significantNo: '',
        significantHandNo: '0001670000003T1',
        employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
        chequeNo: 'CHQ555888777',
        chequeStampDate: '2024-02-12',
        status: 'จ่ายแล้ว',
        paymentType: 'S1', // จ่ายคืนเงินสมทบให้นายจ้าง
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: undefined,
        hospitalNo: undefined,
        ssoCode: 'SSO003456',
        accountNo: '555-8-88877-0',
        accountName: 'บริษัท จี เอช ไอ จำกัด',
        incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: undefined,
        identityNo: '5201900888003',
        taxAmount: 200,
      },
      // จ่ายเงินประเภทอื่นๆ E1
      {
        paymentNo: '01948574400200',
        accidentIssueCode: 'AIC20240203',
        citizenId: '1890300777000',
        receiverName: 'บริษัท จี เอช ไอ จำกัด',
        amount: 1400000,
        significantNo: '',
        significantHandNo: '0001670000003T1',
        employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
        chequeNo: 'CHQ555888777',
        chequeStampDate: '2024-02-12',
        status: 'จ่ายแล้ว',
        paymentType: 'E1', //จ่ายเงินประเภทอื่นๆ
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: undefined,
        hospitalNo: undefined,
        ssoCode: 'SSO003456',
        accountNo: '555-8-88877-0',
        accountName: 'บริษัท จี เอช ไอ จำกัด',
        incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: undefined,
        identityNo: '5201900888003',
        taxAmount: 200,
      },
      // จ่ายเงินกองทุนเพื่อบริหารสำนักงาน B2
      {
        paymentNo: '01948574400888',
        accidentIssueCode: 'AIC20240203',
        citizenId: '1890300777000',
        receiverName: 'บริษัท จี เอช ไอ จำกัด',
        amount: 1400000,
        significantNo: '',
        significantHandNo: '0001670000003T1',
        employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
        chequeNo: 'CHQ555888777',
        chequeStampDate: '2024-02-12',
        status: 'จ่ายแล้ว',
        paymentType: 'B2',
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: undefined,
        hospitalNo: undefined,
        ssoCode: 'SSO003456',
        accountNo: '555-8-88877-0',
        accountName: 'บริษัท จี เอช ไอ จำกัด',
        incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: undefined,
        identityNo: '5201900888003',
        taxAmount: 200,
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 FIN
      {
        paymentNo: '01948574493888',
        accidentIssueCode: 'AIC20240201',
        citizenId: '1560100544000',
        receiverName: 'แพทย์หญิงเบ็ญจมาศ สลิลปราโมทย์',
        amount: 1500000,
        significantNo: '',
        significantHandNo: '0001670000001T1',
        employeeName: 'นายสมชาย ใจดี',
        chequeNo: 'CHQ123456789',
        chequeStampDate: '2024-02-10',
        status: 'จ่ายแล้ว',
        paymentType: 'P1',
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        hospitalNo: 'HOS20240217',
        ssoCode: 'SSO001234',
        accountNo: '123-4-56789-0',
        accountName: 'บริษัท เอ บี ซี จำกัด',
        incorrectPaymentReason: undefined,
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: '2024-02-17',
        identityNo: '3101700544001',
        taxAmount: 50,
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 PAY
      {
        paymentNo: '01948574493999',
        accidentIssueCode: 'AIC20240201',
        citizenId: '1560100544000',
        receiverName: 'แพทย์หญิงเบ็ญจมาศ สลิลปราโมทย์',
        amount: 1600000,
        significantNo: '',
        significantHandNo: '0001670000001T1',
        employeeName: 'นายสมชาย ใจดี',
        chequeNo: 'CHQ123456789',
        chequeStampDate: '2024-02-10',
        status: 'จ่ายแล้ว',
        paymentType: 'P1', // จ่ายเงินทดแทน/ค่าตอบแทนแพทย์
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        hospitalNo: 'HOS20240217',
        ssoCode: 'SSO001234',
        accountNo: '123-4-56789-0',
        accountName: 'บริษัท เอ บี ซี จำกัด',
        incorrectPaymentReason: undefined,
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: '2024-02-17',
        identityNo: '3101700544001',
        taxAmount: 50,
      },
      // นำส่งภาษีฟัก ณ ที่จ่าย TX
      {
        paymentNo: '01948574492323',
        accidentIssueCode: 'AIC20240201',
        citizenId: '1560100544000',
        receiverName: 'แพทย์หญิงเบ็ญจมาศ สลิลปราโมทย์',
        amount: 1700000,
        significantNo: '',
        significantHandNo: '0001670000001T1',
        employeeName: 'นายสมชาย ใจดี',
        chequeNo: 'CHQ123456789',
        chequeStampDate: '2024-02-10',
        status: 'จ่ายแล้ว',
        paymentType: 'TX',
        banks: {
          code: '006',
          name: 'กรุงไทย จำกัด (มหาชน)',
        },
        bankAccountNo: '555-8-88877-0',
        bankAccountName: 'นพดล สุขใจดี',
        hospitalName: 'โรงพยาบาลกรุงเทพ',
        hospitalNo: 'HOS20240217',
        ssoCode: 'SSO001234',
        accountNo: '123-4-56789-0',
        accountName: 'บริษัท เอ บี ซี จำกัด',
        incorrectPaymentReason: undefined,
        paymentRequest: 'กองทุนกันสังคม ม.33/39',
        payDate: '2024-02-17',
        identityNo: '3101700544001',
        taxAmount: 50,
      },
    ];

    return mockData;
  },
);

export const getControlRegistrationChequeDetailService = createAsyncThunk(
  `${sliceName}/getControlRegistrationMedDetailService`,
  (id: string): PageFormType => {
    console.log('id', id);
    // Mockup response based on ID
    const mockDataMap: Record<string, PageFormType> = {
      //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์ T1
      '01948574493821': {
        paymentType: 'T1',
        address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
        cardConsider: {
          payDate: '2024-12-31',
          payer: 'กาญจนา พิเศษ',
          status: 'ยกเลิก', // Paid
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
            paymentNo: 'P20240217003',
            accidentIssueCode: 'AIC20240203',
            citizenId: '1890300777000',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
            significantNo: '',
            significantHandNo: '0001670000003T1',
            employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
            chequeNo: 'CHQ555888777',
            chequeStampDate: '2024-02-12',
            status: 'จ่ายแล้ว',
            paymentType: 'T1', // จ่ายคืนเงินสมทบให้นายจ้าง
            banks: {
              code: '006',
              name: 'กรุงไทย จำกัด (มหาชน)',
            },
            bankAccountNo: '555-8-88877-0',
            bankAccountName: 'นพดล สุขใจดี',
            hospitalName: 'โรงพยาบาลศิริราช',
            hospitalNo: 'HOS20240218',
            ssoCode: 'SSO003456',
            accountNo: '555-8-88877-0',
            accountName: 'บริษัท จี เอช ไอ จำกัด',
            incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            identityNo: '5201900888003',
            taxAmount: 200,
          },
        ],
        recipts: [
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
      // จ่ายโรงพยาบาล T13
      '01948574493093': {
        paymentType: 'T13',
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-09',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว', // Canceled
          receiveType: 'A',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '5601872201004',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
          referenceDocument: '1 : บัตรประชาชน',
          referenceNo: '1560100433000',
        },
        cardPreparePay: {
          documentNo: 'P000167000002T1',
          paymentAgent: 'Some Agent',
          transactionDate: '2023-11-09',
          payType: 'X' as PayType,
          advancePaymentType: undefined,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'J000167000001T1',
            accidentIssueCode: '100764/0128602/02',
            citizenId: '1890300777000',
            receiverName: 'นพดล สุขใจดี',
            amount: 2700000,
            significantNo: '0001670000002T1',
            significantHandNo: '',
            employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
            chequeNo: 'CHQ555888777',
            chequeStampDate: '2024-02-12',
            status: 'จ่ายแล้ว',
            paymentType: 'T13', // จ่ายคืนเงินสมทบให้นายจ้าง
            banks: {
              code: '006',
              name: 'กรุงไทย จำกัด (มหาชน)',
            },
            bankAccountNo: '555-8-88877-0',
            bankAccountName: 'นพดล สุขใจดี',
            hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
            hospitalNo: '120068/000001',
            ssoCode: 'SSO003456',
            accountNo: '555-8-88877-0',
            accountName: 'บริษัท จี เอช ไอ จำกัด',
            incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            identityNo: '5201900888003',
            taxAmount: 200,
          },
        ],
        recipts: [
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
        taxHospitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
        taxAmount: 2700000,
        taxVat: 1,
        taxTotalVat: 27000,
        taxTotalAmount: 2673000,
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
      '01948574400100': {
        paymentType: 'S1',
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-01',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว', // Returned
          receiveType: 'O',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '1920344522990',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000003T1',
          paymentAgent: 'Some Agent',
          transactionDate: '2023-11-01',
          payType: 'X' as PayType,
          advancePaymentType: undefined,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'P20240217003',
            accidentIssueCode: 'AIC20240203',
            citizenId: '1890300777000',
            receiverName: 'บริษัท จี เอช ไอ จำกัด',
            amount: 3000,
            significantNo: '',
            significantHandNo: '0001670000003T1',
            employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
            chequeNo: 'CHQ555888777',
            chequeStampDate: '2024-02-12',
            status: 'จ่ายแล้ว',
            paymentType: 'S1', // จ่ายคืนเงินสมทบให้นายจ้าง
            banks: {
              code: '006',
              name: 'กรุงไทย จำกัด (มหาชน)',
            },
            bankAccountNo: '555-8-88877-0',
            bankAccountName: 'นพดล สุขใจดี',
            hospitalName: 'โรงพยาบาลศิริราช',
            hospitalNo: 'HOS20240218',
            ssoCode: '1050',
            accountNo: '1003211224',
            accountName: '000009 : อรุณเซอร์วิส แอนด์ ซัพพลาย',
            incorrectPaymentReason: 'O', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            identityNo: '5201900888003',
            taxAmount: 200,
          },
        ],
        recipts: [
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
      },
      // จ่ายเงินประเภทอื่นๆ E1
      '01948574400200': {
        paymentType: 'E1',
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-01',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว', // Returned
          significantNo: '0001670000001E1', //เลขที่ใบสำคัญรับเงิน
          significantHandNo: '-', //เลขที่ใบสำคัญรับเงินชนิดเล่ม
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001E1',
          paymentNo: 'J0001670000001E1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2023-11-01',
          payType: 'X' as PayType,
          advancePaymentType: undefined,
          bookNo: 'รง1120067000013E1',
          receiverName: 'ทศพล มหาเทวัณ',
          paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบกองทุนประกันสังคม',
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
      },
      // จ่ายเงินกองทุนเพื่อบริหารสำนักงาน B2
      '01948574400888': {
        paymentType: 'B2',
        address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
        cardConsider: {
          payDate: '2023-11-01',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว', // Returned
          significantNo: '0001670000001E1', //เลขที่ใบสำคัญรับเงิน
          significantHandNo: '-', //เลขที่ใบสำคัญรับเงินชนิดเล่ม
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          documentNo: 'P000167000001E1',
          paymentNo: 'J0001670000001E1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2023-11-01',
          payType: undefined,
          advancePaymentType: undefined,
          bookNo: '',
          receiverName: '',
          paymentType: '',
        },
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
        noticeName: '1',
        noticeAmount: 2100000,
        creditBalance: 0,
        carddueInstallment: [
          {
            dueInstallment: '1', // งวดที่
            bookNo: '22222', // เลขที่หนังสือ รง.
            bookDate: '2024-12-31', // วันที่หนังสือ
            approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
            accountName_1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
            chequeNo_1: '123456', //เลขที่เช็ค : 1
            bank_1: {
              code: '006',
              name: 'ธนาคารกรุงไทย',
            },
            amount_1: 1200000, //จำนวนเงิน : 1
            accountName_2: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 2
            bank_2: {
              code: '006',
              name: 'ธนาคารกรุงไทย',
            },
            chequeNo_2: '123456', //เลขที่เช็ค : 2
            amount_2: 1500000, //จำนวนเงิน : 2
          },
          {
            dueInstallment: '2', // งวดที่
            bookNo: '333333', // เลขที่หนังสือ รง.
            bookDate: '2024-12-31', // วันที่หนังสือ
            approveName: 'กรกฎ ใจดี', // ผู้อนุมัติสั่งจ่าย
            accountName_1: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1', //   ชื่อบัญชีสั่งจ่าย : 1
            chequeNo_1: '123456', //เลขที่เช็ค : 1
            bank_1: {
              code: '006',
              name: 'ธนาคารกรุงไทย',
            },
            amount_1: 1200000, //จำนวนเงิน : 1
            accountName_2: '', //   ชื่อบัญชีสั่งจ่าย : 2
            bank_2: {
              code: '',
              name: '',
            },
            chequeNo_2: '', //เลขที่เช็ค : 2
            amount_2: 0, //จำนวนเงิน : 2
          },
        ],
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 PAY งานเงินจ่าย
      '01948574493888': {
        paymentType: 'P1',
        cardConsider: {
          payDate: '2023-11-09',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว',
          significantNo: '0001670000001E1', //เลขที่ใบสำคัญรับเงิน
          significantHandNo: '-', //เลขที่ใบสำคัญรับเงินชนิดเล่ม
          receiveType: 'O',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '5601872201004',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
          referenceDocument: '1 : บัตรประชาชน',
          referenceNo: '1560100433000',
        },
        cardPreparePay: {
          paymentNo: 'J000167000001P1',
          documentNo: 'P000167000001P1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'X' as PayType,
          advancePaymentType: 'PAY' as AdvancePaymentType,
          incorrectPaymentReason: 'J', // สาเหตุการจ่ายผิด
          employeeCitizenId: '',
          employeeName: '',
          accountNo: '',
          paymentRequest: 'กองทุนประกันสังคม', // จ่ายคืนให้
          amount: 2700000, // จำนวนเงิน
        },
        isCheque: true,
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
      },
      // จ่ายเงินผิดกองทุนเงินทดแทน P1 FIN งานการเงินรับ
      '01948574493999': {
        paymentType: 'P1',
        address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
        cardConsider: {
          payDate: '2023-11-09',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว', // Canceled
          significantNo: '',
          significantHandNo: '',
          receiveType: 'O',
          receiveName: 'ช่างศรินทร์ เมธมณี',
          identityDocument: 'บัตรประชาชน',
          identityNo: '5601872201004',
          address: '123 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
          referenceDocument: '1 : บัตรประชาชน',
          referenceNo: '1560100433000',
        },
        cardPreparePay: {
          paymentNo: '',
          documentNo: 'P000167000001P1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2023-11-09',
          payType: 'X' as PayType,
          advancePaymentType: 'FIN' as AdvancePaymentType,
          incorrectPaymentReason: undefined,
          paymentRequest: '',
          amount: 0,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'P20240217003',
            accidentIssueCode: 'AIC20240203',
            citizenId: '1890300777000',
            receiverName: 'นพดล สุขใจดี',
            amount: 2700000,
            significantNo: '',
            significantHandNo: '0001670000003T1',
            employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
            chequeNo: 'CHQ555888777',
            chequeStampDate: '2024-02-12',
            status: 'จ่ายแล้ว',
            paymentType: 'P1', // จ่ายคืนเงินสมทบให้นายจ้าง
            banks: {
              code: '006',
              name: 'กรุงไทย จำกัด (มหาชน)',
            },
            bankAccountNo: '555-8-88877-0',
            bankAccountName: 'นพดล สุขใจดี',
            hospitalName: 'โรงพยาบาลศิริราช',
            hospitalNo: 'HOS20240218',
            ssoCode: 'SSO003456',
            accountNo: '555-8-88877-0',
            accountName: 'บริษัท จี เอช ไอ จำกัด',
            incorrectPaymentReason: 'E', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            identityNo: '5201900888003',
            taxAmount: 200,
          },
        ],
        recipts: [
          {
            id: '1',
            receiptNo: 'REC123456',
            receiptDate: '2023-10-01',
            amount: 1200000,
            accountName: 'เรด ไดมอนด์ คอร์ปอเรชั่น',
          },
          {
            id: '2',
            receiptNo: 'REC123457',
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
      // นำส่งภาษีฟัก ณ ที่จ่าย TX
      '01948574492323': {
        paymentType: 'TX',
        cardConsider: {
          payDate: '2023-11-09',
          payer: 'Some Payer',
          status: 'จ่ายแล้ว',
          significantNo: '',
          significantHandNo: '',
          receiveType: undefined,
          receiveName: '',
          identityDocument: '',
          identityNo: '',
          address: '',
          referenceDocument: '',
          referenceNo: '',
        },
        cardPreparePay: {
          paymentNo: '',
          documentNo: 'P000167000001P1',
          paymentAgent: 'กาญจนา พิเศษ',
          transactionDate: '2024-12-31',
          payType: 'X' as PayType,
          advancePaymentType: undefined,
          incorrectPaymentReason: undefined,
          paymentRequest: '',
          amount: 0,
        },
        isCheque: true,
        tableList: [
          {
            paymentNo: 'P20240217003',
            accidentIssueCode: 'AIC20240203',
            citizenId: '1890300777000',
            receiverName: 'นพดล สุขใจดี',
            amount: 50000,
            significantNo: '',
            significantHandNo: '0120066123456TX',
            employeeName: 'นายวรพงษ์ ศรีสวัสดิ์',
            chequeNo: 'CHQ555888777',
            chequeStampDate: '2024-02-12',
            status: 'จ่ายแล้ว',
            paymentType: 'TX', // จ่ายคืนเงินสมทบให้นายจ้าง
            banks: {
              code: '006',
              name: 'กรุงไทย จำกัด (มหาชน)',
            },
            bankAccountNo: '555-8-88877-0',
            bankAccountName: 'นพดล สุขใจดี',
            hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
            hospitalNo: '120066/000192',
            ssoCode: 'SSO003456',
            accountNo: '555-8-88877-0',
            accountName: 'บริษัท จี เอช ไอ จำกัด',
            incorrectPaymentReason: 'E', // ข้อมูลผิดพลาด
            paymentRequest: 'กองทุนกันสังคม ม.33/39',
            payDate: '2024-02-10',
            identityNo: '1234567890123',
            taxtotal: 20000,
            taxAmount: 200,
          },
        ],
        taxHospitalName: 'โรงพยาบาลทั่วไปขนาดใหญ่ กล้วยน้ำไท',
        taxAmount: 2700000,
        taxVat: 1,
        taxTotalVat: 27000,
        taxTotalAmount: 2673000,
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
      noticeName: '',
      noticeAmount: 0,
      creditBalance: 0,
      carddueInstallment: [],
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
