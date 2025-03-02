import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { AdvancePaymentType, IncorrectPaymentReasonType, PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import { ReceiptType } from '@/components/common/cardTableReceipt';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { WrongFundPaymentType } from '@/components/common/cardTableWrongFundPayment';
export const sliceName = 'cancelCutOfPayWrongFundPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  advancePaymentType: AdvancePaymentType; //ประเภทการจ่าย/รับ
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  significantNo: '',
  significantHandNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  advancePaymentType: 'PAY',
  payType: undefined,
  pagination,
};

//Item
export interface WrongFundDataType {
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  incorrectPaymentReason: IncorrectPaymentReasonType; // สาเหตุการจ่ายเงินผิด
  paymentRequest: string; // จ่ายคืนให้
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
  tableList: WrongFundPaymentType[]; //รายการสั่งจ่าย
  banks: BankType[]; //ธนาคาร
  receipts: ReceiptType[]; //รายการใบเสร็จรับเงิน
  isCheque: boolean;
  chequeInfoList: TableChequeType[];
  cashAmount: number;
  postAddress: string;
  postalInfoList: MoneyOrderType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: WrongFundDataType[];
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
    banks: [],
    receipts: [],
    isCheque: false,
    chequeInfoList: [],
    cashAmount: 0,
    postAddress: '',
    postalInfoList: [],
  },
};
