import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { MoneyOrderType } from '@/components/common/cardTableThananat';
import { DataHistoryType } from '@/components/common/popUps/popUpHistory';
import { TableChequeType } from '@/components/common/tableCheque';
import { ReceiptType } from '@/components/common/cardTableReceipt';
import { IncorrectPaymentReasonType, PaymentCodeType } from '@/types/payType';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';

export const sliceName = 'controlRegistrationCheque';
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  receiptNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  bankCode: string | undefined; //ธนาคาร
  chequeNo: string; //เลขที่เช็ค
  chequeStampDate: string[]; // วันที่เช็ค
  status: string | undefined; // สถานะ
  payType: PaymentCodeType | undefined; //ช่องทางชำระเงิน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  receiptNo: '',
  significantHandNo: '',
  bankCode: undefined,
  chequeNo: '',
  chequeStampDate: [],
  status: undefined,
  payType: undefined,
  pagination,
};

export interface ResultFilterType {
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  citizenId: string | undefined; // เลขบัตรประชาชน
  receiverName: string; //จ่ายให้ - ลูกจ้าง/ผู้มีสิทธิ์/กองทุน/โรงบาล
  amount: number; // จำนวนเงิน
  significantNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  employeeName?: string; //ผู้ประสบอันตราย
  chequeNo?: string; //เลขที่เช็ค
  chequeStampDate?: string; // วันที่เช็ค
  status?: string; // สถานะ
  paymentType?: PaymentCodeType | undefined; //ช่องทางชำระเงิน

  banks: {
    code: string;
    name: string;
  };
  bankAccountNo?: string; //เลขบัญชี
  bankAccountName?: string; //ชื่อบัญชี
  hospitalName?: string; //ผู้มีสิทธิ ชื่อโรงพยาบาล
  hospitalNo?: string; // เลขที่หนังสือรับรอง
  ssoCode?: string; //รหัส สปส.
  accountNo?: string; //เลขที่บัญชีนายจ้าง
  accountName?: string; //จ่ายให้ ชื่อสถานประกอบการ
  incorrectPaymentReason?: IncorrectPaymentReasonType | undefined; // สาเหตุการจ่ายเงินผิด
  paymentRequest?: string; // จ่ายให้ กองทุน
  payDate?: string | undefined; // วันที่ตัดจ่าย
  taxtotal?: number; //ค่ารักษา
  identityNo?: string; //เลขประจำตัวผู้เสียภาษี
  taxAmount?: number; // ภาษี ณ ที่จ่าย
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

export interface PageFormType {
  paymentType?: PaymentCodeType | undefined; //ช่องทางชำระเงิน
  cardConsider?: CardConsiderType | undefined; // พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; // ข้อมูลเตรียมจ่าย
  isCheque?: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList?: ResultFilterType[]; // รายการสั่งจ่าย
  recipts?: ReceiptType[]; //รายการใบเสร็จรับเงิน
  cheques?: TableChequeType[]; // เช็ค
  taxHospitalName?: string;
  taxAmount?: number;
  taxVat?: number;
  taxTotalVat?: number;
  taxTotalAmount?: number;
  address?: string; // ที่อยู่
  noticeName?: string; // จ่ายตามประกาศฉบับที่
  noticeAmount?: number; // จำนวนเงินจ่ายตามประกาศ (บาท)
  creditBalance?: number; // ยอดเงินคงเหลือ (บาท)
  carddueInstallment?: DueInstallmentType[]; //ข้อมูลงวด
  moneys?: MoneyOrderType[]; // ธนาณัติ
  historyPreparePay?: DataHistoryType[]; // ประวัติการแก้ไขเตรียมจ่าย
  historyOrderPayment?: DataHistoryType[]; // ประวัติการแก้ไขใบสั่งจ่าย
  historyCheques?: DataHistoryType[]; // ประวัติการแก้ไขเช็ค
  historyMoneys?: DataHistoryType[]; // ประวัติการแก้ไขธนาณัติ
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
    taxHospitalName: '',
    taxAmount: 0,
    taxVat: 0,
    taxTotalVat: 0,
    taxTotalAmount: 0,
    noticeName: '',
    noticeAmount: 0,
    creditBalance: 0,
    carddueInstallment: [],
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    recipts: [],
    cheques: [],
    moneys: [],
  },
  pageDetail: {
    address: '',
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    recipts: [],
    cheques: [],
    moneys: [],
  },
};
