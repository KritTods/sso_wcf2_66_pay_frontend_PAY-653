import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
import {
  sliceName,
  GetBeginningBalanceServiceResponse,
  DataFormPrepareType,
  SavePrepareServiceResponse,
} from './types';

//for mockup code only
export const seveFormPrepareService = createAsyncThunk(
  `${sliceName}/form-save`,
  async (data: DataFormPrepareType): Promise<SavePrepareServiceResponse> => {
    const response = (await callApi({
      method: 'post',
      url: 'prepare-budget-request',
      body: data,
      instanceName: 'pay',
    })) as SavePrepareServiceResponse;

    return response;
  },
);

//ดึงยอดยกมา
export const getBeginningBalanceService = createAsyncThunk(
  `${sliceName}/budget-control/beginning-balance`,
  async (ssoBranchCode: string): Promise<GetBeginningBalanceServiceResponse> => {
    const response = (await callApi({
      method: 'get',
      url: `budget-control/beginning-balance/${ssoBranchCode}`,
      instanceName: 'pay',
    })) as GetBeginningBalanceServiceResponse;

    return response;
  },
);
