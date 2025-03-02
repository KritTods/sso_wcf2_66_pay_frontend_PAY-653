import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { HistoryType } from '@/types/keyTableHistory';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'cancelOfficeFundPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  noticeName: string; // จ่ายตามประกาศฉบับที่
  transactionDate: string[];
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  noticeName: '',
  transactionDate: [],
  pagination,
};

export interface OfficeFundDataDetailType {
  dueInstallment: string; // งวดที่
  bookNo: string; // เลขที่หนังสือ รง.
  bookDate: string; // วันที่หนังสือ
  approveName: string; // ผู้อนุมัติสั่งจ่าย
  accountName1: string; //   ชื่อบัญชีสั่งจ่าย : 1
  chequeNo1: string; //เลขที่เช็ค : 1
  chequeBankDigitCode1: string; //รหัสธนาคารเช็ค : 1
  amount1: number; //จำนวนเงิน : 1
  accountName2: string; //   ชื่อบัญชีสั่งจ่าย : 2
  chequeNo2: string; //เลขที่เช็ค : 2
  chequeBankDigitCode2: string; //รหัสธนาคารเช็ค : 2
  amount2: number; //จำนวนเงิน : 2
}

//Item
export interface OfficeFundDataType extends HistoryType {
  id: string;
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  paymentAgent: string; // ผู้เตรียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  amount: number; // จำนวนเงิน
  // payType: PayType;
  noticeName: string; // จ่ายตามประกาศฉบับที่
  noticeAmount: number; // จำนวนเงินจ่ายตามประกาศ (บาท)
  creditBalance: number; // ยอดเงินคงเหลือ (บาท)
  details: OfficeFundDataDetailType[]; //เก็บ array ง่วดที่
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: OfficeFundDataType[];
  totalElements: number;
  pageDetail: OfficeFundDataType;
  pageForm: OfficeFundDataType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageForm: {
    id: '',
    cardConsider: {
      payDate: dayjs().format('YYYY-MM-DD'),
      payer: '',
      status: '-',
      significantNo: '',
      significantHandNo: '',
    },
    cardPreparePay: undefined,
    documentNo: '',
    paymentNo: '',
    paymentAgent: '',
    transactionDate: dayjs().format('YYYY-MM-DD'),
    // payType: 'S',
    amount: 0,
    noticeName: '',
    noticeAmount: 0,
    creditBalance: 0,
    details: [],
  },
  pageDetail: {
    id: '',
    cardConsider: undefined,
    cardPreparePay: undefined,
    documentNo: '',
    paymentNo: '',
    paymentAgent: '',
    transactionDate: '',
    // payType: 'S',
    amount: 0,
    noticeName: '',
    noticeAmount: 0,
    creditBalance: 0,
    details: [],
  },
};
