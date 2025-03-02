import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { MoneyOrderType } from '../../cancel-payment/common/moneyOrderType';
export const sliceName = 'RefundtoEmployerPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  employerAccountNumber: string; // เลขที่บัญชีนายจ้าง
  barnchCode: string; // ลำดับที่สาขา
  companyName: string; // ชื่อสถานประกอบการ
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  documentNo: '', //เลขที่เอกสาร
  paymentNo: '', // เลขที่ใบสั่งจ่าย
  transactionDate: '', // วันที่เตรียมจ่าย
  employerAccountNumber: '', // เลขที่บัญชีนายจ้าง
  barnchCode: '', // ลำดับที่สาขา
  companyName: '', // ชื่อสถานประกอบการ
  payType: undefined, //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination,
};

//รายการจากการค้นหา
export interface ResultFilterType {
  documentNo: string; //เลขที่เอกสาร
  employerAccountNumber: string; // เลขที่บัญชีนายจ้าง
  barnchCode: string; // ลำดับที่สาขา
  companyName: string; // ชื่อสถานประกอบการ
  transactionDate: string; // วันที่เตรียมจ่าย
  amount: number; //จำนวนเงิน
  payType: PayType; //วิธีการชำระเงิน
}

//รายการสั่งจ่าย
export interface RefundToEmployerDataType {
  //ไทป์ข้อมูลของ table รายการสั่งจ่าย ทั้งหมดทุกหน้า
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; // จำนวนเงิน
  payType: string; //ประเภทการจ่ายเงิน
  bankCode: string; //ธนคาร
  bankAccountNo: string; //เลขที่บัญชี
  bankAccountName: string; //ชืื่อบัญชี
  significantNo: string; //เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; //เลขที่ใบสำคัญรับเงินชนิดเล่ม
  ssoCode: string; // รหัสปสป.
  employerAccountNumber: string; // เลขที่บัญชีนายจ้าง
  barnchCode: string; // *จ่ายให้* ลำดับที่สาขา&ชื่อสถานประกอบการ
}

export interface PageFormType extends HistoryType {
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
  isCheque: boolean;
  tableList: RefundToEmployerDataType[];
  cheques: TableChequeType[];
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
    tableList: [],
    cheques: [],
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
    cash: 0,
    address: '',
    moneys: [],
  },
};
