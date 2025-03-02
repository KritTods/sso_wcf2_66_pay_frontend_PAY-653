import dayjs from '@/utils/dayjs-setup-th';
import { getUserLoginFullName, getTokenDecode } from '@/utils/token';
export const sliceName = 'prepare';

export interface DataFormPrepareType {
  paymentNo: string;
  documentNo: string;
  advancePaymentType: string;
  broughtForwardAmount: number;
  payDate: string;
  paymentAgent: string;
  receiveName: string;
  amount: number;
  ssoBranchCode: string;
  chequeNo: string;
  bankCode: string | null;
  ssoMapBankId: string | null;
  chequeDate: string | null;
  beginningBalance: number;
}

export const DATA_INIT_PREPARE: DataFormPrepareType = {
  paymentNo: '-',
  documentNo: '-',
  advancePaymentType: 'W',
  broughtForwardAmount: 0,
  payDate: dayjs().format('YYYY-MM-DD'),
  paymentAgent: getUserLoginFullName() || '',
  receiveName: '',
  amount: 0,
  ssoBranchCode: getTokenDecode()?.userInfo.ssoBranchCode || '',
  chequeNo: '',
  bankCode: null,
  ssoMapBankId: null,
  chequeDate: '',
  beginningBalance: 0,
};

export interface StateProps {
  loading: boolean;
  loadingSave: boolean;
  form: DataFormPrepareType;
}

export const initialState: StateProps = {
  loading: false,
  loadingSave: false,
  form: DATA_INIT_PREPARE,
};

export interface GetBeginningBalanceServiceResponse {
  beginningBalance: number;
}

export interface SavePrepareServiceResponse {
  prepareBudgetRequestId: string;
}
