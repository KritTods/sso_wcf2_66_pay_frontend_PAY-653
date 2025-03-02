import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { TableChequeType } from '@/components/common/tableCheque';
import { DataHistoryType } from '@/modules/test-component/popUpHistory';
import { CardTableBankType } from '@/components/common/cardTableBank';
import { MoneyOrderType } from '../../cancel-payment/common/moneyOrderType';

export const sliceName = 'TaxDeliverReadyToPay';

// FilterSearch
export interface FilterSearchType {
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  paymentType: PayType | undefined;
  pagination: Pagination;
}

export const initFilter: FilterSearchType = {
  paymentNo: '', // เลขที่ใบสั่งจ่าย
  paymentType: 'X',
  pagination,
};

export interface ReadyToPayDataType {
  paymentId: string; //เลขที่ใบสั่งจ่าย
  paymentNo: string; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; //เลขประสบอันตราย
  hospitalName: string; //โรงพยาบาล
  identityNo: string; //เลขประจำตัวผู้เสียภาษี  
  amount: number; // จำนวนเงิน
  taxAmount: number; // จำนวนเงิน
  paymentType: string; //ประเภทการจ่ายเงิน
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

export interface PageFormType {
  documentNo: string;
  payDate: string;
  paymentAgent: string;
  payTypeTabActive: PayType;
  isCheque: boolean;
  tableList: ReadyToPayDataType[];
  cheques: TableChequeType[];
  banks: CardTableBankType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
  historyPreparePay?: DataHistoryType[]; // ประวัติการแก้ไขเตรียมจ่าย
  historyOrderPayment?: DataHistoryType[]; // ประวัติการแก้ไขใบสั่งจ่าย
  historyCheques?: DataHistoryType[]; // ประวัติการแก้ไขเช็ค
  historyMoneys?: DataHistoryType[]; // ประวัติการแก้ไขธนาณัติ
  historyBanks?: DataHistoryType[]; // ประวัติการแก้ไขธนาคาร
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
}

export interface CardConsiderType {
  payDate: string; //วันที่ตัดจ่าย
  payer: string; //ผู้ตัดจ่าย
  status: string; //สถานะ
  significantNo?: string; //เลขที่ใบสำคัญรับเงิน
  significantHandNo?: string; //เลขที่ใบสำคัญรับเงินชนิดเล่ม
  referenceDocument?: string; //ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
  referenceNo?: string; //เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
}

export interface CardPrepareType {
  documentNo: string; // เลขที่เอกสาร   common
  paymentAgent: string; // ผู้ตเตรียมจ่าย   common
  transactionDate: string; // วันที่เตรียมจ่าย   common
  payType: PayType; // ประเภทการจ่าย   common
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  filterResult: ReadyToPayDataType[];
  totalElements: number;
  pageForm: PageFormType;
  pageDetail: PageFormType;
}

export const initialState: StateProps = {
  loading: false,
  filter: initFilter,
  filterResult: [],
  totalElements: 0,
  pageForm: {
    cardConsider: {
      payDate: dayjs().format('YYYY-MM-DD'), // วันที่ตัดจ่าย
      payer: '', // ผู้ตัดจ่าย
      status: '-', // สถานะ
    },
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    banks: [],
    cash: 0,
    address: '',
    moneys: [],
    documentNo: '',
    payDate: '',
    paymentAgent: '',
    payTypeTabActive: 'X'
  },
    pageDetail: {
      cardConsider: undefined,
      cardPreparePay: undefined,
      isCheque: false,
      tableList: [],
      cheques: [],
      banks: [],
      cash: 0,
      address: '',
      moneys: [],
      documentNo: '',
      payDate: '',
      paymentAgent: '',
      payTypeTabActive: 'P'
    },
};
