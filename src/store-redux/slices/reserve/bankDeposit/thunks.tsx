import { createAsyncThunk } from '@reduxjs/toolkit';
// import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
// import { omitBy, isNil } from 'lodash';
import { sliceName, DataMockupType } from './types';

export const getBankDepositService = createAsyncThunk(`${sliceName}/get`, (): DataMockupType[] => {
  //mockup response
  return [{ key: '1', value_1: '31/12/2567', value_2: '20,000.00', value_3: 'กาญจนา พิเศษ', manage: '' }];
});
