import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
export const sliceName = 'cancelReservePayment';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string[]; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  advancePaymentType: undefined; // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  ssoCode: '1200',
  documentNo: '',
  paymentNo: [],
  transactionDate: [],
  advancePaymentType: undefined,
  pagination,
};

export interface ReservePaymentDataDetailType {
  id: string;
  bankCode: string; // ธนาคาร
  accountNo: string; // เลขบัญชีธนาคาร
  chequeNo: string; //เลขที่เช็ค
  chequeDate: string; // วันที่เช็ค
  recieveName: string; // ชื่อผู้รับเงิน
  amount: number; // จำนวนเงิน
  advancePaymentType: string; // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
}

//Item
export interface ReservePaymentDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  advancePaymentType: string; // ประเภทเบิกเงินรองจ่าย W = เบิกเงินรองจ่าย, B = ยืมเงินระหว่างวัน
  paymentAgent: string; // ผู้เตรียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  amount: number; // จำนวนเงิน
  bankCode: string; // ธนาคาร
  accountNo: string; // เลขบัญชีธนาคาร
  chequeNo: string; //เลขที่เช็ค
  chequeDate: string; // วันที่เช็ค
  recieveName: string; // ชื่อผู้รับเงิน
  beginningBalance: number; // ยอดยกมา 
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: ReservePaymentDataType[];
  totalElements: number;
  pageDetail: ReservePaymentDataType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    id: '',
    documentNo: '',
    paymentNo: '',
    advancePaymentType: '',
    bankCode: '',
    accountNo: '',
    chequeNo: '',
    chequeDate: '',
    recieveName: '',
    paymentAgent: '',
    transactionDate: '',
    amount: 0,
    beginningBalance: 0,
  },
};
