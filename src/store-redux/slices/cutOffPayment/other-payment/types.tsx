import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { CardTableBankType } from '@/components/common/cardTableBank';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { MoneyOrderType } from '../../cancel-payment/common/moneyOrderType';
export const sliceName = 'cutOffPaymentOtherPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  transactionDate: '',
  payType: undefined,
  pagination,
};

//รายการจากการค้นหา
export interface ResultFilterType {
  documentNo: string; //เลขที่เอกสาร
  bookNo: string; //เลขที่หนังสือ รง
  transactionDate: string; //วันที่เตรียมจ่าย
  amount: number; //จำนวนเงิน
  payType: PayType; //วิธีการชำระเงิน
}

export interface PageFormType extends HistoryType {
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
  isCheque: boolean;
  cheques: TableChequeType[];
  banks: CardTableBankType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  resultFilter: ResultFilterType[];
  totalElements: number;
  pageForm: PageFormType;
  pageDetail: PageFormType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  resultFilter: [],
  totalElements: 0,
  pageForm: {
    cardConsider: {
      payDate: dayjs().format('YYYY-MM-DD'), // วันที่ตัดจ่าย
      payer: '', // ผู้ตัดจ่าย
      status: '-', // สถานะ
      significantNo: '', // เลขที่ใบสำคัญรับเงิน
      significantHandNo: '', // เลขที่ใบสำคัญรับเงินชนิดเล่ม
      receiveType: undefined, // ประเภทผู้รับเงิน
      receiveName: '', // ชื่อผู้รับเงิน
      identityDocument: '', // ประเภทบัตรอ้างอิง
      identityNo: '', // เลขที่บัตรอ้างอิง
      address: '', // ที่อยู่ผู้รับ
      referenceDocument: '', // ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
      referenceNo: '', // เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
    },
    cardPreparePay: undefined,
    isCheque: false,
    cheques: [],
    banks: [],
    cash: 0,
    address: '',
    moneys: [],
  },
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    cheques: [],
    banks: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
