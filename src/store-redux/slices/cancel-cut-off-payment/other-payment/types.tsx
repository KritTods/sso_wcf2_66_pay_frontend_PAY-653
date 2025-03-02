import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
export const sliceName = 'cancelCutOfPayOtherPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  significantNo: '',
  significantHandNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  payType: undefined,
  pagination,
};

//Item
export interface OtherPaymentDataType {
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
  payType: {
    //ประเภทการจ่ายเงิน
    code: PayType | undefined;
    name: string;
  };
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
  banks: BankType[]; //ธนาคาร
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  chequeInfoList: TableChequeType[];
  cashAmount: number;
  postAddress: string;
  postalInfoList: MoneyOrderType[];
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
    cardConsider: undefined,
    cardPreparePay: undefined,
    banks: [],
    isCheque: false,
    chequeInfoList: [],
    cashAmount: 0,
    postAddress: '',
    postalInfoList: [],
  },
};
