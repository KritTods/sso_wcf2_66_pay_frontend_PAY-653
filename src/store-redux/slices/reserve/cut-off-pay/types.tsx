import dayjs from 'dayjs';
import { DateFormat } from 'wcf-component-lib/src/constants/date-format.constant';
import { getUserLoginFullName } from '@/utils/token';
import { Pagination } from 'wcf-component-lib/src/constants/interface';
import { pagination } from 'wcf-component-lib/src/constants/initialValue';

export const sliceName = 'cutoffpay';

//create function getCookie

//ตัวแปรที่เก็บข้อมูลเริ่มต้น info
export interface PrepareBudgetType {
  prepareBudgetRequestId: string;
  paymentNo: string;
  documentNo: string;
  transactionDate: string;
  paymentAgent: string;
  beginningBalance: number;
  bankName: string;
  bankAccountNo: string;
  chequeDate: string;
  chequeNo: string;
  receiveName: string;
  amount: number;
  advancePaymentType: string;
  payDate: string;
  payer: string;
}

export const DATA_INIT_CUTOFFPAY_INFO: PrepareBudgetType = {
  prepareBudgetRequestId: '-',
  paymentNo: '-',
  documentNo: '-',
  transactionDate: '-',
  paymentAgent: '-',
  beginningBalance: 0.0,
  bankName: '-',
  bankAccountNo: '-',
  chequeDate: '-',
  chequeNo: '-',
  receiveName: '-',
  amount: 0.0,
  advancePaymentType: '-',
  payDate: '-',
  payer: '-',
};

//ตัวแปรที่เก็บข้อมูลเริ่มต้น Form
export interface PrepareBudgetFormType {
  prepareBudgetRequestId: string;
  payDate: string;
  payStatus: string;
  payer: string;
}

export const DATA_INIT_CUTOFFPAY_FORM: PrepareBudgetFormType = {
  prepareBudgetRequestId: '-',
  payDate: dayjs().format(DateFormat.YYYYMMDD),
  payStatus: 'Y',
  payer: getUserLoginFullName() || '-',
};

// FilterSearch
export interface FilterSearch {
  paymentNo?: string;
  documentNo?: string;
  transactionDateGreaterEqual?: string;
  transactionDateLesserEqual?: string;
  advancePaymentType?: string;
  pagination: Pagination;
  payDate?: string[] | undefined;
}

export interface FilterSearchForm {
  advancePaymentType: string;
  documentNo: string;
  payDate: undefined;
  paymentNo: string;
}

export const filter: FilterSearch = {
  paymentNo: '',
  documentNo: '',
  transactionDateGreaterEqual: '',
  transactionDateLesserEqual: '',
  advancePaymentType: '',
  pagination,
};

// * -- Item --
export interface PrepareBudgetSearchType {
  prepareBudgetRequestId: string;
  paymentNo: string;
  documentNo: string;
  advancePaymentType: string;
  transactionDate: string;
  paymentAgent: string;
  beginningBalance: number;
  significantNo: string;
  payDate: string;
  payer: string;
  receiveName: string;
  amount: number;
  payStatus: string;
  remark: string;
  isDeleted: string;
  cancelBy: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  ssoBranchCode: string;
  significantHandNo: string;
  handNo: string;
  convertFlag: string;
  glId: number;
  cancelGlId: number;
}

export interface PrepareBudgetDelect {
  prepareBudgetRequestId?: string;
  isDeleted?: string;
  cancelBy?: string;
  remark?: string;
}

export interface StateProps {
  info: PrepareBudgetType;
  loading: boolean;
  loadData: boolean;
  loadingSubmit: boolean;
  loadingBtnSearch: boolean;
  form: PrepareBudgetFormType;
  filter: FilterSearch;
  list: PrepareBudgetSearchType[];
  totalElements: number;
}

export const initialState: StateProps = {
  loading: false,
  loadingSubmit: false,
  loadData: false,
  loadingBtnSearch: false,
  info: DATA_INIT_CUTOFFPAY_INFO,
  form: DATA_INIT_CUTOFFPAY_FORM,
  filter,
  list: [],
  totalElements: 0,
};

export interface SeveFormCutOffPayServiceResponse {
  prepareBudgetRequestId: string;
}

export interface DeleteServiceResponse {
  status: string;
}
