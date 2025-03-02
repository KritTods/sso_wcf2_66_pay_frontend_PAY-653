import { CardTableBankType } from '@/components/common/cardTableBank';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { MoneyOrderType } from '../../cancel-payment/common/moneyOrderType';
// import { CardConsiderType } from '@/components/common/cardConsider';

export const sliceName = 'cutOffPaymentTaxDeliver';

// FilterSearch
export interface FilterSearchType {
  identityNo: string; //เลขประจำตัวผู้เสียภาษี
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  identityNo: '',
  transactionDate: '',
  payType: undefined,
  pagination,
};

//รายการจากการค้นหา
export interface ResultFilterType {
  documentNo: string; //เลขที่เอกสาร
  identityNo: string; //เลขประจำตัวผู้เสียภาษี
  transactionDate: string; //วันที่เตรียมจ่าย
  amount: number; //จำนวนเงิน
  payType: PayType; //วิธีการชำระเงิน
}


export interface PageFormType extends HistoryType {
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
  isCheque: boolean;
  tableList: TaxDeliverDataType[];
  cheques: TableChequeType[];
  banks: CardTableBankType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
  
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

//รายการสั่งจ่ายของ
export interface TaxDeliverDataType {
  //มันคืออ ข้อมูลเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  hospitalName: string; //โรงพยาบาล
  identityNo: string; //เลขประจำตัวผู้เสียภาษี
  amount: number; // จำนวนเงิน
  taxAmount: number;
  significantHandNo: string; //เลขที่ใบสำคัญรับเงินชนิดเล่ม
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
    },
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
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
    tableList: [],
    cheques: [],
    banks: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
