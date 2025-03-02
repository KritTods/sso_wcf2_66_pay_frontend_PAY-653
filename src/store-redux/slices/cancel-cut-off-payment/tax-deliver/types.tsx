import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { TableChequeType } from '@/components/common/tableCheque';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
export const sliceName = 'cancelCutOfPayTaxDeliver';

// FilterSearch
export interface FilterSearchType {
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDateStartM: string;
  payDateStartY: string;
  payDateEndM: string;
  payDateEndY: string;
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  significantNo: '',
  significantHandNo: '',
  payDateStartM: dayjs().format('MM'),
  payDateStartY: dayjs().format('YYYY'),
  payDateEndM: dayjs().format('MM'),
  payDateEndY: dayjs().format('YYYY'),

  pagination,
};

//Item
export interface TaxDeliverDataType {
  id: string;
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
  status: string; //สถานะ
  hospitalNo: string; //เลขที่หนังสือรับรอง
  hospitalName: string; // ชื่อโรงพยาบาล
  identityNo: string; //เลขผู้เสียภาษี
  amount: number; // ค่ารักษา
  taxAmount: number; //ภาษีหัก ณ ที่จ่าย
}

export interface BankType {
  id: string;
  bank: {
    //ธนาคาร
    code: string;
    name: string;
  };
  bankAccountName: string; //ชืื่อบัญชี
  bankAccountNo: string; //เลขที่บัญชี
  totalAmount: number; // จำนวนเงิน
}

export interface PageDetailType {
  cardConsider?: CardConsiderType | undefined; //พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; //ข้อมูลเตรียมจ่าย
  tableList: TaxDeliverDataType[]; //รายการสั่งจ่าย
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  chequeInfoList: TableChequeType[];
  cashAmount: number;
  postAddress: string;
  banks: BankType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: TaxDeliverDataType[];
  totalElements: number;
  pageDetail: PageDetailType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    tableList: [],
    isCheque: false,
    chequeInfoList: [],
    cashAmount: 0,
    postAddress: '',
    banks: [],
  },
};
