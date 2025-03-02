export const sliceName = 'bankAccount';

export interface BankAccountSSOType {
  ssoBranchCode: string;
  ssoBranchName: string;
  bankAccounts: BankAccountSSOListType[];
}

export interface BankAccountSSOListType {
  bankAccountId: number;
  bankAccountType: string;
  bankCode: string;
  bankName: string;
  bankBranchCode: string;
  bankBranchName: string;
  bankAccountNo: string;
  bankAccountName: string;
  remark: string;
}

export const DATA_INIT_BANK_ACCOUNT_LIST: BankAccountSSOListType = {
  bankAccountId: 0,
  bankAccountType: '',
  bankCode: '',
  bankName: '',
  bankBranchCode: '',
  bankBranchName: '',
  bankAccountNo: '',
  bankAccountName: '',
  remark: '',
};

export const DATA_INIT_BANK_ACCOUNT: BankAccountSSOType = {
  ssoBranchCode: '',
  ssoBranchName: '',
  bankAccounts: [],
};

export interface BankAccountGroupType {
  bankCode: string;
  bankName: string;
  bankAccountNoList: BankAccountSSOListType[];
}

export interface StateProps {
  loading: boolean;
  bankAccount: BankAccountSSOType;
  bankBranchCodeGroups: BankAccountGroupType[] | undefined;
}

export const initialState: StateProps = {
  loading: false,
  bankAccount: DATA_INIT_BANK_ACCOUNT,
  bankBranchCodeGroups: undefined,
};
