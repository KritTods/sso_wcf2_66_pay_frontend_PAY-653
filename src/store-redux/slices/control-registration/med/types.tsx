import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { MoneyOrderType } from '@/components/common/cardTableThananat';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';

export const sliceName = 'controlRegistrationMed';
export interface FilterSearchType {
  receiptNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  status: string | undefined; // สถานะ
  doctorCode: string; // รหัสแพทย์
  fullName: string; // ชื่อ-นามสกุล
  citizenId: string; // เลขบัตรประชาชน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  receiptNo: '',
  significantHandNo: '',
  payDate: '',
  status: undefined,
  doctorCode: '',
  fullName: '',
  citizenId: '',
  pagination,
};

export interface ResultFilterType {
  doctorCode: string; // รหัสแพทย์
  citizenId: string | undefined; // เลขบัตรประชาชน
  fullName: string | undefined; // ชื่อ-นามสกุล
  documentNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  amount: number; // จำนวนเงิน
  taxAmount: number; // ภาษี ณ ที่จ่าย
  netAmount: number; // จำนวนเงินสุทธิ
  status: string; // สถานะ
}

export interface ControlRegistrationMedType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
}

export interface DoctorSalaryDataType {
  //มันคืออ ข้อมูลเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  bankCode: string; // ธนาคาร
  bankName: string; // ธนาคาร
  bankAccountNo: string; // เลขบัญชี
  bankAccountName: string; // ชื่อบัญชี
  totalAmount: number; // จำนวนเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  citizenId: string; // เลขบัตรประชาชน
  receiveDate: string; // วันที่เงินเข้าบัญชี
}

export interface PageFormType extends HistoryType {
  cardConsider?: CardConsiderType | undefined; // พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; // ข้อมูลเตรียมจ่าย
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: DoctorSalaryDataType[]; // รายการสั่งจ่าย
  cheques: TableChequeType[]; // เช็ค
  address: string; // ที่อยู่
  moneys: MoneyOrderType[]; // ธนาณัติ
}

export interface StateProps {
  loading: boolean;
  filter: FilterSearchType;
  tableList: ResultFilterType[];
  totalElements: number;
  pageForm: PageFormType;
  pageDetail: PageFormType;
}

export const initialState: StateProps = {
  loading: false,
  filter,
  tableList: [],
  totalElements: 0,
  pageForm: {
    address: '',
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    moneys: [],
  },
  pageDetail: {
    address: '',
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    moneys: [],
  },
};
