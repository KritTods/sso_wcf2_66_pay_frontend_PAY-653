import { CardConsiderType } from '@/components/common/cardConsider';
import { CardDetailTaxType } from '@/components/common/cardDetailTax';
import { CardPrepareType } from '@/components/common/cardPreparePay';
import { TableChequeType } from '@/components/common/tableCheque';
import { HistoryType } from '@/types/keyTableHistory';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'controlRegistrationHospital';

export interface FilterSearchType {
  significantNo: string; // เลขใบสำคัญรับเงิน
  significantHandNo: string; // เลขใบสำคัญรับเงินชนิดเล่ม
  payDate: string; // วันที่ตัดจ่าย
  hospitalName: string; // ชื่อโรงพยาบาล
  status: string | undefined; // สถานะ
  pagination: Pagination;
}
export const filter: FilterSearchType = {
  significantNo: '',
  significantHandNo: '',
  payDate: '',
  hospitalName: '',
  status: undefined,
  pagination,
};

export interface ResultFilterType {
  documentNo: string;
  hospitalCode: string;
  hospitalName: string;
  identityNo: string; // เลขผู้มีเสียภาษี
  significantNo: string;
  significantHandNo: string;
  payDate: string;
  amount: number;
  vat: number;
  totalAmount: number;
  status: string | undefined;
}

export interface HospitalDataType {
  hospitalCode: string;
  hospitalName: string;
  paymentNo: string;
  accidentIssueCode: string;
  employeeCitizenId: string;
  receiverName: string;
  totalAmount: number;
  significantHandNo: string;
  significantNo: string;
  bankCode: string;
  bankName: string;
  bankAccountNo: string;
  bankAccountName: string;
  citizenId: string;
  receiveDate: string;
  hospitalNo: string;
}

export interface PageFormType extends HistoryType {
  cardConsider?: CardConsiderType | undefined; // พิจารณาตัดจ่าย
  cardPreparePay: CardPrepareType | undefined; // ข้อมูลเตรียมจ่าย
  cardTax: CardDetailTaxType | undefined; // ข้อมูลภาษี
  isCheque: boolean; // ตัวแปรเก็บค่าว่าเป็นเช็คหรือไม่
  tableList: HospitalDataType[]; // รายการสั่งจ่าย
  cheques: TableChequeType[]; // เช็ค
  address: string; // ที่อยู่
}

export interface StateProps {
  filter: FilterSearchType;
  tableList: ResultFilterType[];
  loading: boolean;
  totalElements: number;
  pageForm: PageFormType;
  pageDetail: PageFormType;
}

export const initialState: StateProps = {
  filter,
  tableList: [],
  loading: false,
  totalElements: 0,
  pageForm: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    cardTax: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    address: '',
  },
  pageDetail: {
    cardConsider: undefined,
    cardPreparePay: undefined,
    cardTax: undefined,
    isCheque: false,
    tableList: [],
    cheques: [],
    address: '',
  },
};
