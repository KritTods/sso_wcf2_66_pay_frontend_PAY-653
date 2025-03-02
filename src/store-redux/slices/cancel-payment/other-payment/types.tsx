import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
export const sliceName = 'cancelOtherPayment';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  ssoCode: '1050',
  documentNo: '',
  paymentNo: '',
  transactionDate: [],
  payType: undefined,
  pagination,
};

//Item
export interface OtherPaymentDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  pamentAgent: string; // ผู้จเตรียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  bookNo: string; // เลขที่หนังสือ รง.
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  payType: PayType | undefined; //ประเภทการจ่ายเงิน
  paymentType: string; // ประเภทการจ่ายนอกระบบ
  amount: number; // จำนวนเงิน
}

export interface BankType {
  id: string;
  bankCode: string;
  bankAccountName: string;
  bankAccountNo: string;
  amount: number;
}

export interface PageDetailType {
  cardHeaderDetail: OtherPaymentDataType;
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  cheques: TableChequeType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
  banks: BankType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: OtherPaymentDataType[];
  totalElements: number;
  pageDetail: PageDetailType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    cardHeaderDetail: {
      id: '',
      documentNo: '',
      paymentNo: '',
      pamentAgent: '',
      transactionDate: '',
      bookNo: '',
      receiverName: '',
      payType: undefined,
      paymentType: '',
      amount: 0,
    },
    banks: [],
    isCheque: false,
    cheques: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
