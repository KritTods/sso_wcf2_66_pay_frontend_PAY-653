import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { AdvancePaymentType } from '@/types/payType';
import dayjs from 'dayjs';
export const sliceName = 'cancelReservePayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  payDate: string; // วันที่ตัดจ่าย
  advancePaymentType: AdvancePaymentType; // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  advancePaymentType: 'W',
  pagination,
};

//Item
export interface ReservePaymentDataType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
  advancePaymentType: AdvancePaymentType;
}

export interface ReservePaymentDataDetailType {
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  documentNo: string; //เลขที่เอกสาร
  transactionDate: string; //วันที่เตรียมจ่าย
  paymentAgent: string; //ผู้เตรียมจ่าย
  beginningBalance: number; //ยอดยกมา
  bank: {
    //ธนาคาร
    code: string;
    name: string;
  };
  accountNo: string; // เลขบัญชีธนาคาร
  chequeNo: string; //เลขที่เช็ค
  chequeDate: string; // วันที่เช็ค
  recieveName: string; // ชื่อผู้รับเงิน
  amount: number; // จำนวนเงิน
  advancePaymentType: AdvancePaymentType;
  payDate: string; // วันที่ตัดจ่าย
  payer: string;
}
export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: ReservePaymentDataType[];
  totalElements: number;
  pageDetail: ReservePaymentDataDetailType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    paymentNo: '',
    documentNo: '',
    transactionDate: '',
    paymentAgent: '',
    beginningBalance: 0,
    bank: {
      //ธนาคาร
      code: '',
      name: '',
    },
    accountNo: '',
    chequeNo: '',
    chequeDate: '',
    recieveName: '',
    amount: 0,
    advancePaymentType: 'W',
    payDate: '',
    payer: '',
  },
};
