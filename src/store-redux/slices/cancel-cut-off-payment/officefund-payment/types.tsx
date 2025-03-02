import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
export const sliceName = 'cancelCutOfPayOfficeFundPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  noticeName: string; // จ่ายตามประกาศฉบับที่
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  paymentNo: '',
  noticeName: '',
  significantNo: '',
  significantHandNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  pagination,
};

//Item
export interface OfficeFundDataType {
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
}

export interface DueInstallmentType {
  dueInstallment: string; // งวดที่
  bookNo: string; // เลขที่หนังสือ รง.
  approveName: string; // ผู้อนุมัติสั่งจ่าย
  bookDate: string; // วันที่หนังสือ
  accountName_1: string; //   ชื่อบัญชีสั่งจ่าย
  chequeNo_1: string; //เลขที่เช็ค
  bank_1: {
    //ธนาคาร
    code: string;
    name: string;
  };
  amount_1: number; //จำนวนเงิน
  accountName_2: string; //   ชื่อบัญชีสั่งจ่าย
  chequeNo_2: string; //เลขที่เช็ค
  bank_2: {
    //ธนาคาร
    code: string;
    name: string;
  };
  amount_2: number; //จำนวนเงิน
}

export interface OfficeFundDataDetailType {
  cardConsider?: CardConsiderType | undefined; //พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; //ข้อมูลเตรียมจ่าย
  noticeName: string; // จ่ายตามประกาศฉบับที่
  noticeAmount: number; // จำนวนเงินจ่ายตามประกาศ (บาท)
  creditBalance: number; // ยอดเงินคงเหลือ (บาท)
  carddueInstallment: DueInstallmentType[]; //ข้อมูลงวด
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: OfficeFundDataType[];
  totalElements: number;
  pageDetail: OfficeFundDataDetailType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    noticeName: '',
    noticeAmount: 0,
    creditBalance: 0,
    carddueInstallment: [],
  },
};
