import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import { CardPageDetailHeaderType, initialCardPageDetailHeader } from '../common/cardPageDetailHeaderType';
export const sliceName = 'cancelTaxDeliver';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  hospitalNo: string; // เลขที่หนังสือรับรอง
  transactionDate: string[]; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  ssoCode: '1050',
  documentNo: '',
  hospitalNo: '',
  transactionDate: [],
  payType: undefined,
  pagination,
};

//Item
export interface TaxDeliverDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  hospitalNo: string; //เลขที่หนังสือรับรอง
  hospitalName: string;
  transactionDate: string; // วันที่เตรียมจ่าย
  identityNo: string;
  amount: number; // จำนวนเงิน
  taxAmount: number;
  payType: PayType | undefined; //ประเภทการจ่ายเงิน
}

export interface CardTaxType {
  hospitalName: string; // ชื่อโรงพยาบาล
  amount: number; // จำนวนเงิน
  vat: number; // ภาษี หัก ณ ที่จ่าย
  totalVat: number; // ยอดรวม ภาษี หัก ณ ที่จ่าย
  totalAmount: number; // ยอดรวมเงินที่จ่าย
}

export const initialCardTax: CardTaxType = {
  hospitalName: '',
  amount: 0,
  vat: 0,
  totalVat: 0,
  totalAmount: 0,
};

export interface BankType {
  id: string;
  bankCode: string;
  bankAccountName: string;
  bankAccountNo: string;
  amount: number;
}

export type PageDetailType = {
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: TaxDeliverDataType[];
  cheques: TableChequeType[];
  cash: number;
  moneys: MoneyOrderType[];
  banks: BankType[];
} & CardPageDetailHeaderType &
  CardTaxType;

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
    isCheque: false,
    ...initialCardPageDetailHeader,
    ...initialCardTax,
    tableList: [],
    banks: [],
    cheques: [],
    cash: 0,
    moneys: [],
  },
};
