/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, TaxDeliverDataType, FilterSearchType, PageDetailType } from './types';
import { PayType } from '@/types/payType';

export const getcancelCutOffPayTaxDeliverService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayTaxDeliverService`,
  ({ data }: { data: FilterSearchType }): TaxDeliverDataType[] => {
    //mockup response
    const mockData: TaxDeliverDataType[] = [
      {
        id: '1',
        significantNo: '0120066123456TX',
        significantHandNo: '',
        payDate: '2024-12-31',
        totalAmount: 15000,
        status: 'จ่ายแล้ว',
        hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123',
        amount: 15000, //จำนวนเงิน
        taxAmount: 150,
      },
      {
        id: '2',
        significantNo: '',
        significantHandNo: '0120066123457TX',
        payDate: '2024-12-31',
        totalAmount: 20000,
        status: 'จ่ายแล้ว',
        hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123',
        amount: 20000, //จำนวนเงิน
        taxAmount: 200,
      },
      {
        id: '3',
        significantNo: '0120066123458TX',
        significantHandNo: '',
        payDate: '2024-12-31',
        totalAmount: 15000,
        status: 'จ่ายแล้ว',
        hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123',
        amount: 15000, //จำนวนเงิน
        taxAmount: 150,
      },
      {
        id: '4',
        significantNo: '',
        significantHandNo: '0120066123459TX',
        payDate: '2024-12-31',
        totalAmount: 20000,
        status: 'จ่ายแล้ว',
        hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
        hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
        identityNo: '1234567890123',
        amount: 20000, //จำนวนเงิน
        taxAmount: 200,
      },
    ];

    return mockData;
  },
);

export const getcancelCutOffPayTaxDeliverDetailService = createAsyncThunk(
  `${sliceName}/getcancelCutOffPayTaxDeliverDetailService`,
  (id: string): PageDetailType => {
    console.log('id', id);
    //mockup response
    const mockData: PageDetailType = {
      cardConsider: {
        payDate: '2024-12-31', // วันที่ตัดจ่าย
        payer: 'กาญจนา พิเศษ', // ผู้ตัดจ่าย
        status: 'จ่ายแล้ว', // สถานะ
      },
      cardPreparePay: {
        documentNo: 'P120066123456TX', // เลขที่เอกสาร
        paymentAgent: 'กาญจนา พิเศษ', // ผู้ตเตรียมจ่าย
        transactionDate: '2024-12-31', // วันที่เตรียมจ่าย
        payType: 'X' as PayType, // ประเภทการจ่าย
      },
      isCheque: false,
      tableList: [
        {
          id: '1',
          significantNo: '',
          significantHandNo: '0120066123459TX',
          payDate: '2024-12-31',
          totalAmount: 20000,
          status: 'จ่ายแล้ว',
          hospitalNo: '120066/000192', //เลขที่หนังสือรับรอง
          hospitalName: '10001 : โรงพยาบาลกรุงเทพ',
          identityNo: '1234567890123',
          amount: 20000, //จำนวนเงิน
          taxAmount: 200,
        },
      ],
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
      cashAmount: 20000,
      postAddress: '123 Main St, Bangkok, Thailand',
      banks: [
        {
          id: '1',
          bank: {
            code: '001',
            name: 'ธนาคารกรุงไทย',
          },
          bankAccountName: 'เงินกองทุนประกันสังคมจังหวัดนนทบุรีบัญชีที่ 1',
          bankAccountNo: '0192837465',
          totalAmount: 2700000,
        },
      ],
    };

    return mockData;
  },
);

export const cancelCutOffPayTaxDeliverDelectService = createAsyncThunk(
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
