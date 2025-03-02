import { TableBankType } from '@/components/common/tableBank';
import { TableMoneyType } from '@/components/common/tableMoney';
import { TableChequeType } from '@/components/common/tableCheque';

export const sliceName = 'otherPayment';

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

export interface CardHeaderDetailType {
  documentNo: string; // เลขที่เอกสาร
  paymentNo: string; // เลขที่คำสั่งจ่าย
  paymentAgent: string; // ผู้จเตียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: string; // วิธีการชำระเงิน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  bookNo: string; // เลขที่หนังสือ รง.
  paymentType: string; // ประเภทการจ่ายนอกระบบ
}

export const initialCardHeaderDetailType: CardHeaderDetailType = {
  documentNo: '',
  paymentNo: '',
  paymentAgent: '',
  transactionDate: '',
  payType: '',
  receiverName: '',
  bookNo: '',
  paymentType: '',
};

export interface StateProps {
  loading: boolean;
  pageOtherPaymentDetail: {
    isCheque: boolean;
    cheques: TableChequeType[];
    banks: TableBankType[];
    moneys: TableMoneyType[];
    cash: number;
    address: string;
    chequesEdit: TableChequeType[];
    banksEdit: TableBankType[];
    moneysEdit: TableMoneyType[];
  } & CardHeaderDetailType;
}

export const initialState: StateProps = {
  loading: false,
  pageOtherPaymentDetail: {
    ...initialCardHeaderDetailType,
    isCheque: false,
    cheques: [],
    banks: [],
    moneys: [],
    cash: 0,
    address: '',
    chequesEdit: [],
    banksEdit: [],
    moneysEdit: [],
  },
};
