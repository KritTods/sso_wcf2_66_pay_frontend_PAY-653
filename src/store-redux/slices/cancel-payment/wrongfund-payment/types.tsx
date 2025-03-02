import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { AdvancePaymentType, IncorrectPaymentReasonType, PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import { WrongFundPaymentType } from '@/components/common/cardTableWrongFundPayment';
import { ReceiptType } from '@/components/common/cardTableReceipt';
export const sliceName = 'cancelpayment';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //หัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string[]; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  amount: number; //จำนวนเงิน
  advancePaymentType: AdvancePaymentType; // ประเภทเบิกเงินรองจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  ssoCode: '1050',
  documentNo: '',
  paymentNo: [],
  transactionDate: [],
  amount: 0,
  advancePaymentType: 'PAY',
  payType: undefined,
  pagination,
};

//Item
export interface WrongFundDataType {
  id: string;
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  paymentAgent: string; // ผู้เตรียมจ่าย
  payType: PayType; //วิธีการชำระเงิน
  advancePaymentType: string; // ประเภทเบิกเงินรองจ่าย/รับ
  incorrectPaymentReason: IncorrectPaymentReasonType; // สาเหตุการจ่ายเงินผิด
  accountNo: string; //เลขที่บัญชีนายจ้าง
  employeeCitizenId: string; //เลขที่บัตรประชาชน
  employeeName: string; //ชื่อ-สกุล
  amount: number; // จำนวนเงิน
  paymentRequest: string; // จ่ายคืนให้
}

export const initialWrongFundData: WrongFundDataType = {
  id: '',
  documentNo: '',
  paymentNo: '',
  transactionDate: '',
  paymentAgent: '',
  payType: 'X',
  advancePaymentType: 'PAY',
  incorrectPaymentReason: 'S',
  accountNo: '',
  employeeCitizenId: '',
  employeeName: '',
  amount: 0,
  paymentRequest: '',
};

export interface PageDetailType {
  cardHeader: WrongFundDataType;
  payments: WrongFundPaymentType[]; //การเงินรับ
  receipts: ReceiptType[]; //การเงินรับ
  transferInformation: {
    // ข้อมูลการโอน
    bankCode: string; // ธนาคาร
    bankName: string; // ธนาคาร
    bankAccountNo: string; // เลขที่บัญชี
    bankAccountName: string; // ชื่อบัญชี
  };
  isCheque: boolean;
  cheques: TableChequeType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
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
    cardHeader: initialWrongFundData,
    payments: [],
    receipts: [],
    transferInformation: {
      bankCode: '',
      bankName: '',
      bankAccountNo: '',
      bankAccountName: '',
    },
    isCheque: false,
    cheques: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
