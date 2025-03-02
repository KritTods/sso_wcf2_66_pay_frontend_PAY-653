import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'hospitalPayment';

// FilterSearch
export interface FilterSearchType {
  paymentNo: {
    start: string;
    end: string;
  }; // เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  hospitalName: string | undefined; // ชื่อโรงพยาบาล*******
  bankCode: string | undefined; // ธนาคาร
  fullName: string; // ชื่อ - นามสกุล
  employeeCitizenId: string; // เลขบัตรประชาชน
  paymentType: PayType;
  pagination: Pagination;
}

export const initFilter: FilterSearchType = {
  paymentNo: {
    start: '',
    end: '',
  },
  accidentIssueCode: '',
  hospitalName: undefined,
  bankCode: undefined,
  fullName: '',
  employeeCitizenId: '',
  paymentType: 'X',
  pagination,
};

//รายการสั่งจ่าย
export interface ReadyToPayDataType {
  paymentId: number; //รหัสใบสั่งจ่าย
  paymentNo: string; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; //เลขประสบอันตราย
  employeeCitizenId: string; //เลขบัตรประชาชน
  fullName: string; //ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; //จำนวนเงิน
  hospital: string; //โรงพยาบาล
  bank: {
    code: string;
    name: string;
  };
  accountName?: string;
  accountNo?: string;
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

export interface CardHeaderDetailType {
  documentNo: string; // เลขที่เอกสาร
  paymentNo: string; // เลขที่คำสั่งจ่าย
  paymentAgent: string; // ผู้จเตียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: string; // วิธีการชำระเงิน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  bookNo: string; // เลขที่หนังสือ รง.
  paymentType: string; // ประเภทการจ่ายนอกระบบ
}

export const initialCardHeaderDetailType: CardHeaderDetailType = {
  documentNo: '',
  paymentNo: '',
  paymentAgent: '',
  transactionDate: '',
  payType: '',
  receiverName: '',
  bookNo: '',
  paymentType: '',
};

export interface PageFormType extends HistoryType {
  documentNo: string;
  payDate: string;
  paymentAgent: string;
  payTypeTabActive: PayType;
  tableList: ReadyToPayDataType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  filterResult: ReadyToPayDataType[];
  totalElements: number;
  pageForm: PageFormType;
}

export const initialState: StateProps = {
  loading: false,
  filter: initFilter,
  filterResult: [],
  totalElements: 0,
  pageForm: {
    documentNo: '-',
    payDate: dayjs().format('YYYY-MM-DD'),
    paymentAgent: '-',
    payTypeTabActive: 'X', // รับเงิน ณ สำนักงาน
    tableList: [],
  },
};
