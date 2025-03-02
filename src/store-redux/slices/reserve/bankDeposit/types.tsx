import { InitialStateDefault } from 'wcf-component-lib/src/constants/interface';
export const sliceName = 'bankDeposit';

export interface DataMockupType {
  key: string;
  value_1: string;
  value_2: string;
  value_3: string;
  manage: string;
}

export const DATA_INIT: DataMockupType = {
  key: '1',
  value_1: '31/12/2567',
  value_2: '20,000.00',
  value_3: 'กาญจนา พิเศษ',
  manage: '',
};

export interface FilterSearchType {
  ssoBranchCode: string;
  date: string;
}

export interface StateProps extends InitialStateDefault {
  list: DataMockupType[];
  filterSearch: FilterSearchType;
}

export const initialState: StateProps = {
  loading: false,
  loadData: false,
  list: [],
  filterSearch: {
    ssoBranchCode: '',
    date: '',
  },
};
