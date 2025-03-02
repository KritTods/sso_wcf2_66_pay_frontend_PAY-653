import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'RefundtoEmployerPayment';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  employerAccountNumber: string; //เลขที่บัญชีนายจ้าง*****
  branchSequence: string; //ลำดับที่สาขา******
  companyName: string; //ชื่อสถานประกอบการ******
  bankCode: string | undefined; // ธนาคาร
  paymentType: PayType; //ประเภทการจ่ายเงิน
  pagination: Pagination;
}

export const initFilter: FilterSearchType = {
  ssoCode: '',
  paymentNo: '',
  employerAccountNumber: '',
  branchSequence: '',
  companyName: '',
  bankCode: undefined,
  paymentType: 'X',
  pagination,
};

//รายการสั่งจ่าย
export interface RefundToEmploerDataType {
  paymentId: string;
  ssoCode: string; //รหัส สปส.
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  employerAccountNumber: string; //เลขที่บัญชีนายจ้าง*****
  bankAccount: string;
  bankAccountName: string;
  bank: {
    code: string;
    name: string;
  };
  branchSequence: string; //ลำดับที่สาขา******
  amount: number; // จำนวนเงิน
  paymentType: string; //ประเภทการจ่ายเงิน
  receiverName: string; //จ่ายให้
}

export interface CardHeaderTabType {
  bookNo: string;
  receiverName: string;
  paymentType: string;
}

export const initialCardHeaderTabType: CardHeaderTabType = {
  bookNo: '',
  receiverName: '',
  paymentType: '',
};

export type DataCommonTypeType = {
  cheques: TableChequeType[];
  cash: number;
} & CardHeaderTabType;

export const initialDataCommonType: DataCommonTypeType = {
  cheques: [],
  cash: 0,
  ...initialCardHeaderTabType,
};

export interface PageFormType extends HistoryType {
  documentNo: string;
  payDate: string;
  paymentAgent: string;
  payTypeTabActive: PayType;
  tableList: RefundToEmploerDataType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  filterResult: RefundToEmploerDataType[];
  totalElements: number;
  pageForm: PageFormType;
}

export const initialState: StateProps = {
  loading: false,
  filter: initFilter,
  filterResult: [],
  totalElements: 0,
  pageForm: {
    documentNo: '',
    payDate: dayjs().format('YYYY-MM-DD'),
    paymentAgent: '',
    payTypeTabActive: 'X',
    tableList: [],
  },
};
