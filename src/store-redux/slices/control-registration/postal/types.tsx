import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { ReceiptType } from '@/components/common/cardTableReceipt';
import { MoneyOrderType } from '@/components/common/cardTableThananat';
import { DataHistoryType } from '@/components/common/popUps/popUpHistory';
import { TableChequeType } from '@/components/common/tableCheque';
import { IncorrectPaymentReasonType, PaymentCodeType } from '@/types/payType';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';

export const sliceName = 'controlRegistrationPostal';
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  receiptNo: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  payDate: string[]; // วันที่ตัดจ่าย
  postalNo: string; //เลขที่ธนาณัติ
  bankCode: string | undefined; //ธนาคาร
  chequeNo: string; //เลขที่เช็ค
  status: string | undefined; // สถานะ
  payType: PaymentCodeType | undefined; //ช่องทางชำระเงิน
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  documentNo: '',
  receiptNo: '',
  significantHandNo: '',
  payDate: [],
  postalNo: '',
  bankCode: undefined,
  chequeNo: '',
  status: undefined,
  payType: undefined,
  pagination,
};

export interface ResultFilterType {
  postalNo?: string; //เลขที่ธนาณัติ
  portalDestination?: string; //ชื่อไปรษณีย์ปลายทาง
  payDate?: string | undefined; // วันที่ธนาณัติ
  paymentNo?: string; // เลขที่ใบสั่งจ่าย
  accidentIssueCode?: string; // เลขประสบอันตราย
  citizenId?: string | undefined; // เลขบัตรประชาชน
  receiverName?: string; //จ่ายให้ - ลูกจ้าง/ผู้มีสิทธิ์/กองทุน/โรงบาล
  amount: number; // จำนวนเงิน
  status?: string; // สถานะ
  paymentType?: PaymentCodeType | undefined; //ช่องทางชำระเงิน
  significantNo?: string; // เลขที่ใบสำคัญรับเงิน
  significantHandNo?: string; // เลขที่ใบสำคัญรับเงินชนิดเล่ม
  ssoCode?: string; //รหัส สปส.
  accountNo?: string; //เลขที่บัญชีนายจ้าง
  accountName?: string; //จ่ายให้ ชื่อสถานประกอบการ
  incorrectPaymentReason?: IncorrectPaymentReasonType | undefined; // สาเหตุการจ่ายผิด
  paymentRequest?: string; // จ่ายให้ กองทุน
}

export interface PageFormType {
  paymentType?: PaymentCodeType | undefined; //ช่องทางชำระเงิน
  postalNo?: string; //เลขที่ธนาณัติ
  cardConsider?: CardConsiderType | undefined; // พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; // ข้อมูลเตรียมจ่าย
  isCheque?: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList?: ResultFilterType[]; // รายการสั่งจ่าย
  recipts?: ReceiptType[]; //รายการใบเสร็จรับเงิน
  cheques?: TableChequeType[]; // เช็ค
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
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    recipts: [],
    cheques: [],
    moneys: [],
  },
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    recipts: [],
    cheques: [],
    moneys: [],
  },
};
