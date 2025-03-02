import { CardConsiderType } from '@/components/common/cardConsider';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { CardTableBankType } from '@/components/common/cardTableBank';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { PayType } from '@/types/payType';
import dayjs from 'dayjs';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'cutOffPaymentHospitalPayment';

// FilterSearch
export interface FilterSearchType {
  documentNo: string; //เลขที่เอกสาร
  accidentIssueCode: string; // เลขประสบอันตราย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน,วิธีการชำระเงิน
  hospitalName: string | undefined; // ชื่อโรงพยาบาล
  pagination: Pagination;
}

export const filter: FilterSearchType = {
  documentNo: '',
  accidentIssueCode: '',
  transactionDate: '',
  payType: undefined,
  hospitalName: undefined,
  pagination,
};

//รายการจากการค้นหา
export interface ResultFilterType {
  documentNo: string; //เลขที่เอกสาร
  accidentIssueCode: string; //เลขประสบอันตราย
  hospitalName: string; // ชื่อโรงพยาบาล*******
  transactionDate: string; //วันที่เตรียมจ่าย
  amount: number; //จำนวนเงิน
  payType: PayType; //วิธีการชำระเงิน
}

//รายการสั่งจ่าย ทั้งหมดตั้งแต่ (รับเงินสำนักงาน ,โอนธนาคารจังหวัด ,ส่งเช็คทางไปรษณีย์)
export interface HospitalPaymentDataType {
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  hospitalName: string; //ชื่อโรงพยาบาล , ผู้มีสิทธิ์
  transactionDate: string; // วันที่เตรียมจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์ ,ผู้ประสบอันตราย
  amount: number; // จำนวนเงิน
  payType: PayType; //ประเภทการจ่ายเงิน
  bankCode: string; //ธนคาร
  bankAccountNo: string; //เลขที่บัญชี
  bankAccountName: string; //ชืื่อบัญชี
  significantNo: string; //เลขที่ใบสำคัญรับเงิน
  significantHandNo: string; //เลขที่ใบสำคัญรับเงินชนิดเล่ม
  hospitalNo: string; //เลขที่หนังสือรับรอง
}

export interface CardTaxType {
  taxHotpitalName: string; // ชื่อโรงพยาบาล
  taxAmount: number; // จำนวนเงิน
  taxPercent: number; // ภาษี หัก ณ ที่จ่าย
  taxAmountAfterCalTax: number; // ยอดรวม ภาษี หัก ณ ที่จ่าย
  taxTotalAmountAfterCalTax: number; // ยอดรวมเงินที่จ่าย
}

export const initialCardTax: CardTaxType = {
  taxHotpitalName: '',
  taxAmount: 0,
  taxPercent: 0,
  taxAmountAfterCalTax: 0,
  taxTotalAmountAfterCalTax: 0,
};

export type PageFormType = {
  cardConsider?: CardConsiderType | undefined;
  cardPreparePay: CardPrepareType | undefined;
  isCheque: boolean;
  tableList: HospitalPaymentDataType[];
  cheques: TableChequeType[];
  banks: CardTableBankType[];
  cash: number;
  address: string;
} & CardTaxType &
  HistoryType;

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
    banks: [],
    cash: 0,
    address: '',
    ...initialCardTax,
  },
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    banks: [],
    cash: 0,
    address: '',
    ...initialCardTax,
  },
};
