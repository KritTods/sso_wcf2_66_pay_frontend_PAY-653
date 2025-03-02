import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType, PayToCodeType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { CardPageDetailHeaderType, initialCardPageDetailHeader } from '../common/cardPageDetailHeaderType';
import { MoneyOrderType } from '../common/moneyOrderType';
export const sliceName = 'cancelPaymentDoctorSalary';

// FilterSearch
export interface FilterSearchType {
  ssoCode: string; //รหัส สปส.
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string[]; // เลขที่ใบสั่งจ่าย
  transactionDate: string[]; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ชื่อ - นามสกุล
  payToCode: PayToCodeType | undefined; // ประเภทเบิกเงินรองจ่าย 1 = เงินทดแทน 8 = ค่าตอบแทนแพทย์
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const initialFilter: FilterSearchType = {
  //ค่าเริ่มต้น สำหรับ filterSearchType
  ssoCode: '1050',
  documentNo: '',
  paymentNo: [],
  transactionDate: [],
  accidentIssueCode: '',
  employeeCitizenId: '',
  receiverName: '',
  payToCode: '1',
  payType: undefined,
  pagination,
};

export interface DoctorSalaryDataType {
  //มันคืออ ข้อมูลเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
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
}

export type PageDetailType = {
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: DoctorSalaryDataType[];
  cheques: TableChequeType[];
  cash: number;
  address: string;
  moneys: MoneyOrderType[];
} & CardPageDetailHeaderType;

export interface StateProps {
  //มันคือ Type ของยกเลิกการเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์ ทุกหน้า ***
  filter: FilterSearchType;
  loading: boolean; // action loading หลังจากกดค้นหา
  tableList: DoctorSalaryDataType[];
  totalElements: number; //จำนวนรายการทั้งหมดที่ได้จาก Api ค้นหา
  pageDetail: PageDetailType;
}

export const initialState: StateProps = {
  //กำหนดค่าเริ่มต้นให้ slice ของ store
  filter: initialFilter,
  loading: false,
  tableList: [],
  totalElements: 0,
  pageDetail: {
    isCheque: false,
    ...initialCardPageDetailHeader,
    tableList: [],
    cheques: [],
    cash: 0,
    address: '',
    moneys: [],
  },
};
