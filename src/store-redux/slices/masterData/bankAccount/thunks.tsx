import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
import { sliceName, BankAccountSSOType } from './types';

export const getBankAccountSSOService = createAsyncThunk(
  `${sliceName}/masterdata/bank-accounts/query`,
  async (ssoBranchCode: string): Promise<BankAccountSSOType> => {
    const response = (await callApi({
      method: 'get',
      url: `bank-accounts/query?ssoBranch=${ssoBranchCode}`,
      instanceName: 'mdm',
    })) as BankAccountSSOType;

    return response;
  },
);
