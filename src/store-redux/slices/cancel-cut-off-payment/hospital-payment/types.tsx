import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType } from '@/types/payType';
import { TableChequeType } from '@/components/common/tableCheque';
import dayjs from 'dayjs';
import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';

export const sliceName = 'cancelCutOfPayHospital';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  hospitalNo: string; // เลขที่หนังสือรับรอง
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  hospitalName: string | undefined; //ชื่อโรงพยาบาล
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  pagination: Pagination;
}

export const initialFilter: FilterSearchType = {
  //ค่าเริ่มต้น สำหรับ filterSearchType
  documentNo: '',
  hospitalNo: '',
  significantNo: '',
  significantHandNo: '',
  payDate: dayjs().format('YYYY-MM-DD'),
  accidentIssueCode: '',
  hospitalName: undefined,
  payType: undefined,
  pagination,
};

export interface HospitalPaymentDataType {
  //มันคืออ ข้อมูลเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
  prepareToPayId: string;
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  documentNo: string; //เลขที่เอกสาร
  paymentNo?: string; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  hospitalName: string; // ชื่อโรงพยาบาล*******
  payDate: string; // วันที่ตัดจ่าย
  totalAmount: number; // จำนวนเงิน
  payType: {
    //ประเภทการจ่ายเงิน
    code: PayType | undefined;
    name: string;
  };
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  hospitalNo: string; // เลขที่หนังสือรับรอง
  bank: {
    //ธนาคาร
    code: string;
    name: string;
  };
  bankAccountNo: string; //เลขที่บัญชี
  bankAccountName: string; //ชืื่อบัญชี
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
  cardConsider?: CardConsiderType | undefined; //พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; //ข้อมูลเตรียมจ่าย
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  paymentList: HospitalPaymentDataType[]; //รายการสั่งจ่าย
  chequeInfoList: TableChequeType[]; //เช็ค
  cashAmount: number;
  postAddress: string;
} & CardTaxType;

export interface StateProps {
  //มันคือ Type ของยกเลิกการเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์ ทุกหน้า ***
  filter: FilterSearchType;
  loading: boolean; // action loading หลังจากกดค้นหา
  tableList: HospitalPaymentDataType[];
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
    ...initialCardTax,
    paymentList: [],
    chequeInfoList: [],
    cashAmount: 0,
    postAddress: '',
  },
};
