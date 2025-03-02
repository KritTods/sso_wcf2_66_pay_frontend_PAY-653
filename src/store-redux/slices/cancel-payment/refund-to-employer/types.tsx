import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import { CardPageDetailHeaderType, initialCardPageDetailHeader } from '../common/cardPageDetailHeaderType';
export const sliceName = 'cancelRefundToEmployer';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string[]; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  employerAccountNumber: string; //เลขที่บัญชีนายจ้าง*****
  branchSequence: string; //ลำดับที่สาขา******
  companyName: string; //ชื่อสถานประกอบการ******
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  ssoCode: '1050',
  documentNo: '',
  paymentNo: [],
  transactionDate: [],
  employerAccountNumber: '',
  branchSequence: '',
  companyName: '',
  payType: undefined,
  pagination,
};

//Item
export interface RefundToEmploerDataType {
  id: string;
  ssoCode: string; //รหัส สปส.
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  receiverName: string; //จ่ายให้
  employerAccountNumber: string; //เลขที่บัญชีนายจ้าง*****
  bankCode: string; //ธนคาร
  branchSequence: string; //ลำดับที่สาขา******
  companyName: string; //ชื่อสถานประกอบการ******
  amount: number; // จำนวนเงิน
  payType: PayType | undefined; //ประเภทการจ่ายเงิน
}

export type PageDetailType = {
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: RefundToEmploerDataType[];
  cheques: TableChequeType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
} & CardPageDetailHeaderType;

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: RefundToEmploerDataType[];
  totalElements: number;
  pageDetail: PageDetailType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    isCheque: false,
    ...initialCardPageDetailHeader,
    tableList: [],
    cheques: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
