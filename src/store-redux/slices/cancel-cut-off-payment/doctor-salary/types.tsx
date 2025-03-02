import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import { MoneyOrderType } from '../common/moneyOrderType';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';

export const sliceName = 'cancelCutOfPayDoctorSalary';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  receiverName: string; // ชื่อ - นามสกุล
  employeeCitizenId: string; // เลขบัตรประชาชน
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const initialFilter: FilterSearchType = {
  //ค่าเริ่มต้น สำหรับ filterSearchType
  documentNo: '',
  paymentNo: '',
  significantNo: '',
  significantHandNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  accidentIssueCode: '',
  employeeCitizenId: '',
  receiverName: '',
  payType: undefined,
  pagination,
};

export interface DoctorSalaryDataType {
  //มันคืออ ข้อมูลเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
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
  tableList: DoctorSalaryDataType[]; //รายการสั่งจ่าย
  chequeInfoList: TableChequeType[]; //เช็ค
  cashAmount: number;
  postAddress: string;
  postalInfoList: MoneyOrderType[]; //ธนาณัติ
}

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
