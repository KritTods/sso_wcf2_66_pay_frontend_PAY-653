import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';
import { PayType, PayBy } from '@/types/payType';
import { TableMoneyType } from '@/components/common/tableMoney';
import { TableBankType } from '@/components/common/tableBank';
import { TableChequeType } from '@/components/common/tableCheque';
import { TableRequestPaymentType } from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';

export const sliceName = 'readytopayDoctorSalary';

// FilterSearch
export interface FilterSearchType {
  paymentNo: {
    start: string;
    end: string;
  }; // เลขที่ใบสั่งจ่าย
  payToCode: PayBy; // รหัสผู้รับเงิน
  payType: PayType; // ประเภทการจ่าย
  accidentIssueCode: string; // รหัสเหตุการณ์อุบัติเหตุ
  date: string[]; //date เฉพาะ ui
  startDate: string; // วันที่เริ่มต้น (YYYY-MM-DD)
  endDate: string; // วันที่สิ้นสุด (YYYY-MM-DD)
  fullName: string; // ชื่อ-นามสกุล
  employeeCitizenId: string; // เลขบัตรประชาชนของพนักงาน
  hospitalLikeField: string; // ชื่อโรงพยาบาล (ค้นหาคล้าย)
  bankCode: string | undefined; // รหัสธนาคาร
  pagination: Pagination;
}

// ประเภทการจ่าย {X = รับเงิน ณ สำนักงาน B = โอนผ่านธนาคารโดยจังหวัด S = ส่งเช็คทางไปรษณีย์ P = ธนาณัติ M = พร้อมเพย์}
// รหัสผู้รับเงิน    {1 = เงินทดแทน 2 = นายจ้าง 3 = โรงพยาบาล 4 = ผู้มีสิทธิ 5 = ผู้จัดการศพ 6 = ศูนย์ฟื้นฟู 7 = ทายาท 8 = ค่าตอบแทนแพย์}

export const initialFilter: FilterSearchType = {
  paymentNo: {
    start: '',
    end: '',
  },
  payToCode: 'C', //รหัสผู้รับเงิน
  payType: 'X', // ประเภทการจ่าย
  accidentIssueCode: '', // รหัสเหตุการณ์อุบัติเหตุ
  date: [],
  startDate: '', // วันที่เริ่มต้น (YYYY-MM-DD)
  endDate: '', // วันที่สิ้นสุด (YYYY-MM-DD)
  fullName: '', // ชื่อ-นามสกุล
  employeeCitizenId: '', // เลขบัตรประชาชนของพนักงาน
  hospitalLikeField: '', // ชื่อโรงพยาบาล (ค้นหาคล้าย)
  bankCode: undefined, // รหัสธนาคาร
  pagination,
};

//รายการจากการค้นหา
export interface ReadyToPayDataType {
  paymentId: string; //รหัสใบสั่งจ่าย
  paymentNo: string; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; //เลขประสบอันตราย
  employeeCitizenId: string; //เลขบัตรประชาชน
  fullName: string; //ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; //จำนวนเงิน
  hospital: string; //โรงพยาบาล
  bankAccNo?: string;
  bankAccName?: string;
  bank?: {
    code: string; //รหัสธนาคาร
    name: string; //ชื่อธนาคาร
  };
  postal?: {
    postalCode: string; //รหัสไปรษณีย์ปลายทาง
    postalName: string; //ชื่อไปรษณีย์ปลายทาง
  };
}

//ข้อมูลรายการใบสั่งจ่าย API
export interface PaymentListType {
  paymentNo: string; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; //เลขประสบอันตราย
  employeeCitizenId: string; //เลขบัตรประชาชน
  employeeName: string; //ลูกจ้าง/ผู้มีสิทธิ์
  bank: {
    code: string; //รหัสธนาคาร
    name: string; //ชื่อธนาคาร
  };
  accountName: string; //ชื่อบัญชี
  accountNo: string; //เลขที่บัญชี
  totalAmount: number;
}

export interface ChequeInfoListType {
  chequeInfoId: string; // id
  chequeNo: string; // เลขที่เช็ค
  bank: {
    code: string;
    name: string;
  };
  chequeAmount: number; // จำนวนเงิน
  chequeDate: string; // วันที่เช็ค
}

export interface PostalInfoList {
  postalInfoId: string; //ID
  paymentNo: string; // เลขที่ใบสั่งจ่าย
  postalNo: string; // เลขที่ธนาณัติ
  postalCode: string; // รหัสไปรษณีย์ปลายทาง
  postalDestination: string; // ชื่อไปรษณีย์ปลายทาง
  chequeAmount: number; // จำนวนเงิน
}

export interface AccountInfoListType {
  transferAccountInfoId: string; // รหัส uuid
  bank: {
    code: string; // รหัสธนาคาร
    name: string; // ชื่อธนาคาร
  };
  accountName: string; // ชื่อบัญชี
  accountNo: string; // เลขที่บัญชี
  totalAmount: number; // จำนวนเงิน
}

export interface ReadyToPayFormType {
  payType: string; // ประเภทการจ่าย
  payBy?: string; // จ่ายโดย
  cashAmount?: number; // จำนวนเงินสด
  postAddress?: string; // ที่อยู่สำหรับส่งเช็คทางไปรษณีย์
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[]; //เช็ค
  postalInfoList?: PostalInfoList[]; //ธนาณัติ
}

//เตรียมข้อมูล ส่งไปบันทึก ประเภทพร้อมเพย์
export interface MType {
  payType: string; // ประเภทการจ่าย
  payBy: string; // จ่ายโดย
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
}

//แก้ไข ประเภท พร้อมเพย์
export interface Update_MType {
  prepareToPayId: string; // id
  paymentList: PaymentListType[]; //ใบสั่งจ่าย
}

//เตรียมข้อมูล โอนผ่านธนาคารโดยจังหวัด
export interface TType {
  payType: string; // ประเภทการจ่าย
  payBy: string; // จ่ายโดย
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//แก้ไข ประเภท พร้อมเพย์
export interface Update_TType {
  prepareToPayId: string; // id
  paymentList: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//เตรียมข้อมูล ส่งเช็คทางไปรษณีย์
export interface SType {
  payType: string; // ประเภทการจ่าย
  payBy: string; // จ่ายโดย
  postAddress: string;
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//แก้ไข ประเภท ส่งเช็คทางไปรษณีย์
export interface Update_SType {
  prepareToPayId: string;
  cashAmount?: number;
  paymentList: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//เตรียมข้อมูล รับเงิน ณ สำนักงาน
export interface XType {
  payType: string; // ประเภทการจ่าย
  payBy: string; // จ่ายโดย
  cashAmount?: number;
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//แก้ไข ประเภท รับเงิน ณ สำนักงาน
export interface Update_XType {
  prepareToPayId: string; // id
  postAddress: string; // id
  paymentList: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//เตรียมข้อมูล ธนาณัติ
export interface PType {
  payType: string; // ประเภทการจ่าย
  payBy: string; // จ่ายโดย
  cashAmount?: number;
  paymentList?: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//แก้ไข ประเภท รัธนาณัติ
export interface Update_PType {
  prepareToPayId: string; // id
  postAddress: string; // id
  paymentList: PaymentListType[]; //ใบสั่งจ่าย
  chequeInfoList?: ChequeInfoListType[];
}

//for ChequePayment
export interface ConInvoiceListType {
  id: string;
  invoiceCode: string;
  invoiceType: string;
  year: string;
  accountNo: string;
  accountBranch: string;
  dueDate: string;
  payInvoiceStatus: string;
  returnChequeAmount: number;
  debitRemainMoney: number;
  fineRemain: number;
  debitRemainMoneyNew?: number;
  fineRemainNew?: number;
}

export interface SetPaySummaryType {
  summaryPay: number;
}

export const setTotal: SetPaySummaryType = {
  summaryPay: 0,
};

export type PaymentActiveType = 'view' | 'edit' | 'add' | undefined;

//รายละเอียดข้อมูลประสบอันตราย
export interface GetHistoryByCidType {
  citizenId: string;
  response?: GetHistoryByCidListType; // เพิ่ม response เพื่อรองรับข้อมูลที่คืนมา
}

//ประวัติใบสั่งจ่าย
export interface GetHistoryByCidListType {
  paymentCode: string; // เลขที่ใบสั่งจ่าย
  accidentIssueCode: string; // เลขประสบอันตราย
  employeeCitizenId: string; // เลขบัตรประชาชน
  treatmentName: string; // รายการเงินทดแทน
  payDate: string; // วันที่จ่าย
  fullName: string; // จ่ายให้ (ผู้รับเงิน)
  payType: string; // จ่ายโดย
  paymentId: string; // รหัสใบสั่งจ่าย
  fullName2: string; // ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; // จำนวนเงิน
  hospital: string; // โรงพยาบาล
  pagination: Pagination;
}

export interface CardHeaderDetailType {
  prepareToPayId: string; //รหัส uuid
  documentNo: string; //เลขที่เอกสาร
  paymentNo: string; //เลขที่เตรียมจ่าย
  createdBy: string; //ผู้เตรียมจ่าย
  createdDate: string; //วันที่เตรียมจ่าย
  payType: {
    //ประเภทการจ่าย
    code: string; //รหัสวิธีการชำระเงิน
    name: string; //ชื่อวิธีการชำระเงิน
  };
  bookNo: string; //เลขที่หนังสือ รง.
  receiverName: string; //ชื่อผู้มีสิทธิ์
  paymentType: string; //ประเภทการจ่ายนอกระบบ
  payBy: {
    //จ่ายโดย
    code: string; //รหัสการจ่ายโดย
    name: string; //ชื่อการจ่ายโดย
  };
  mode: 'view' | 'edit' | 'add';
}

export const initialCardHeaderDetailType: CardHeaderDetailType = {
  prepareToPayId: '',
  documentNo: '',
  paymentNo: '',
  createdBy: '',
  createdDate: '',
  payType: {
    code: 'X',
    name: 'รับเงิน ณ สำนักงาน',
  },
  bookNo: '',
  receiverName: '',
  paymentType: '',
  payBy: {
    code: 'CASH',
    name: 'เงินสด',
  },
  mode: 'view',
};

export interface DataCommonTypeType {
  headerDetail: CardHeaderDetailType;
  cheques: TableChequeType[];
  cash: number;
  paymentData: TableRequestPaymentType; // แยกฟิลด์เฉพาะสำหรับข้อมูลการชำระเงิน
}

export const initialDataCommonType: DataCommonTypeType = {
  headerDetail: initialCardHeaderDetailType,
  cheques: [],
  cash: 0,
  paymentData: {
    paymentNo: '',
    accidentIssueCode: '',
    employeeCitizenId: '',
    fullName: '',
    bankCode: '',
    bankAccountNo: '',
    bankAccountName: '',
    amount: 0,
    mode: 'view',
    id: '',
  },
};

//รับค่า Response ตอน Insert กลับมา เส้น url: 'prepare-to-pay/cmp'
export interface InsertDoctorSalalyResponse {
  prepareToPayId: string;
  // เพิ่ม fields อื่น ๆ ตามความจำเป็น
}

//ส่งค่า prepareToPayId เพื่อดึง รายละเอียดข้อมูลเตรียมจ่ายทดแทน/แพทย์
export interface PrepareToPayIdType {
  prepareToPayId: string;
  response?: PrepareToPayIdDetailType;
}

//response เพื่อรองรับข้อมูลที่คืนมา รายละเอียดข้อมูลเตรียมจ่ายทดแทน/แพทย์
export interface PrepareToPayIdDetailType {
  prepareToPayId: string;
  documentNo: string;
  paymentNo: string;
  createdBy: string;
  createdDate: string;
  payType: {
    code: string;
    name: string;
  };
  bookNo: string;
  receiverName: string;
  paymentType: string;
  payBy: {
    code: string;
    name: string;
  };
  cashAmount: number;
  postAddress: string;
  paymentList: PaymentListType[];
  accountInfoList: AccountInfoListType[];
  chequeInfoList: ChequeInfoListType[];
  postalInfoList: PostalInfoList[];
}

export interface StateProps {
  //หน้าค้นหาข้อมูล
  loading: boolean;
  loadDatafilter: boolean;
  filter: FilterSearchType;
  listFilter: ReadyToPayDataType[];
  totalElements: number;
  prepareToPayId: string;
  pageDoctorSalalyForm: {
    payType: PayType; // ประเภทการจ่าย X/T/S/P/M
    payBy: PayBy; // จ่ายโดย X/C
    paymentAgent: string;
    paymentNo: string;
    citizenId: string;
    sumTableList: number;
    selectList: ReadyToPayDataType[];
    tabs: {
      X: DataCommonTypeType; // รับเงิน ณ สำนักงาน
      T: DataCommonTypeType; //โอนผ่านธนาคารโดยจังหวัด
      S: {
        //ส่งเช็คทางไปรณษีย์
        address: string;
      } & DataCommonTypeType;
      P: {
        moneys: TableMoneyType[]; //ธนาณัติ
      } & DataCommonTypeType;
      M: TableRequestPaymentType[]; //พร้อมเพย์
    };
  };

  pageDoctorSalalyDetail: {
    loadDatalist: boolean;
    isCheque: boolean;
    banks: TableBankType[];
    cheques: TableChequeType[];
    moneys: TableMoneyType[];
    paymentList: TableRequestPaymentType[];
    cash: number;
    address: string;
    banksEdit: TableBankType[];
    chequesEdit: TableChequeType[];
    moneysEdit: TableMoneyType[];
    paymentListEdit: TableRequestPaymentType[];
  } & CardHeaderDetailType;
}

export const initialState: StateProps = {
  loading: false,
  loadDatafilter: false,
  filter: initialFilter,
  listFilter: [],
  totalElements: 0,
  prepareToPayId: '',
  pageDoctorSalalyForm: {
    payType: 'X',
    payBy: 'X', //(X เช็ค - C เงินสด)
    paymentAgent: '-',
    paymentNo: '',
    citizenId: '',
    sumTableList: 0,
    selectList: [],
    tabs: {
      X: initialDataCommonType, // รับเงิน ณ สำนักงาน
      T: initialDataCommonType, //โอนผ่านธนาคารโดยจังหวัด
      S: {
        //ส่งเช็คทางไปรณษีย์
        ...initialDataCommonType,
        address: '',
      },
      P: {
        //ธนาณัติ
        ...initialDataCommonType,
        moneys: [],
      },
      M: [], //พร้อมเพย์
    },
  },

  pageDoctorSalalyDetail: {
    ...initialCardHeaderDetailType,
    loadDatalist: false,
    isCheque: false,
    banks: [],
    cheques: [],
    moneys: [],
    paymentList: [],
    cash: 0,
    address: '',
    banksEdit: [],
    chequesEdit: [],
    moneysEdit: [],
    paymentListEdit: [],
  },
};
