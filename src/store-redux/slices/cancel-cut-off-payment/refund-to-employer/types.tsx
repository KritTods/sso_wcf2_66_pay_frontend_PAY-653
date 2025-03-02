import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import dayjs from 'dayjs';
export const sliceName = 'cancelRefundToEmployer';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  payDate: string; // วันที่ตัดจ่าย
  accountNo: string; //เลขที่บัญชีนายจ้าง*****
  accountBranchCode: string; //ลำดับที่สาขา******
  accountName: string; //ชื่อสถานประกอบการ******
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  accountNo: '',
  accountBranchCode: '',
  accountName: '',
  payType: undefined,
  pagination,
};

//Item
export interface RefundToEmploerDataType {
  ssoCode: string;
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  accountNo: string; //เลขที่บัญชีนายจ้าง
  accountBranchCode: string;
  accountName: string; //ชื่อบัญชีนายจ้า
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
  payType: {
    //ประเภทการจ่ายเงิน
    code: PayType | undefined;
    name: string;
  };
  bank: {
    //ธนาคาร
    code: string;
    name: string;
  };
  bankAccountNo: string; //เลขที่บัญชี
  bankAccountName: string; //ชืื่อบัญชี
}

export interface PageDetailType {
  cardConsider?: CardConsiderType | undefined; //พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; //ข้อมูลเตรียมจ่าย
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: RefundToEmploerDataType[];
  chequeInfoList: TableChequeType[];
  cashAmount: number;
  postAddress: string;
  postalInfoList: MoneyOrderType[];
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: RefundToEmploerDataType[];
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
    isCheque: false,
    tableList: [],
    chequeInfoList: [],
    cashAmount: 0,
    postAddress: '',
    postalInfoList: [],
  },
};
