import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  initialState,
  StateProps,
  sliceName,
  BankAccountSSOType,
  BankAccountGroupType,
  BankAccountSSOListType,
} from './types';
import { getBankAccountSSOService } from './thunks';
import { RootState } from '@/store-redux/store';

function manipulateGroupData(data: BankAccountSSOListType[]): BankAccountGroupType[] {
  //loop data group by bankCode
  const groupedData: BankAccountGroupType[] = [];
  data.forEach((item) => {
    const index = groupedData.findIndex((group) => group.bankCode === item.bankCode);
    if (index === -1) {
      groupedData.push({
        bankCode: item.bankCode,
        bankName: item.bankName,
        bankAccountNoList: [item],
      });
    } else {
      groupedData[index].bankAccountNoList.push(item);
    }
  });

  return groupedData;
}

const bankAccountSSOSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBankAccountSSOService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBankAccountSSOService.fulfilled, (state, action: PayloadAction<BankAccountSSOType>) => {
      state.loading = false;
      state.bankAccount = action.payload;
      //group data by bankCode
      state.bankBranchCodeGroups = manipulateGroupData(action.payload.bankAccounts);
    });
    builder.addCase(getBankAccountSSOService.rejected, (state) => {
      state.loading = false;
    });
  },
});

// export const { setFormDataSlice, clearFormPrepare } = prepareSlice.actions;
export default bankAccountSSOSlice.reducer;
export const bankAccountSSOSelector = (state: RootState): StateProps => state.bankAccountSSOSlice;
