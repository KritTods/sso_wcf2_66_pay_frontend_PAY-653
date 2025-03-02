import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { CardPageDetailHeaderType, initialCardPageDetailHeader } from '../common/cardPageDetailHeaderType';
import { MoneyOrderType } from '../common/moneyOrderType';
export const sliceName = 'cancelPaymentHospitalPayment';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string[]; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  hospitalName: string; // ชื่อโรงพยาบาล*******
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  ssoCode: '1050',
  documentNo: '',
  paymentNo: [],
  transactionDate: [],
  accidentIssueCode: '',
  hospitalName: '',
  payType: undefined,
  pagination,
};

export interface HospitalPaymentDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  bankCode: string; //ธนคาร
  hospitalName: string; // ชื่อโรงพยาบาล*******
  amount: number; // จำนวนเงิน
  payType: string; //ประเภทการจ่ายเงิน
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

export type PageDetailType = {
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: HospitalPaymentDataType[];
  cheques: TableChequeType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
} & CardPageDetailHeaderType &
  CardTaxType;

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: HospitalPaymentDataType[];
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
    cheques: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
