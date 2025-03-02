import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
import {
  sliceName,
  PrepareBudgetType,
  SeveFormCutOffPayServiceResponse,
  PrepareBudgetFormType,
  FilterSearch,
  PrepareBudgetSearchType,
  PrepareBudgetDelect,
  DeleteServiceResponse,
} from './types';
import { omitBy, isNil } from 'lodash';

//บันทึกข้อมูล
export const seveFormCutOffPayService = createAsyncThunk(
  `${sliceName}/save`,
  async (data: PrepareBudgetFormType): Promise<SeveFormCutOffPayServiceResponse> => {
    const response = (await callApi({
      method: 'patch',
      url: 'prepare-budget-request/expense',
      body: data,
      instanceName: 'pay',
    })) as SeveFormCutOffPayServiceResponse;

    return response;
  },
);

//ดึงข้อมูล
export const getPrepareBudgetService = createAsyncThunk(
  `${sliceName}/prepare-budget-request`,
  async (prepareBudgetRequestId: string): Promise<PrepareBudgetType> => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-budget-request/${prepareBudgetRequestId}`,
      instanceName: 'pay',
    })) as PrepareBudgetType;

    return response;
  },
);

//ค้นหาข้อมูล
export const getPrepareBudgetList = createAsyncThunk(`${sliceName}/list`, async ({ data }: { data: FilterSearch }) => {
  //กรองฟิวด์ที่เป็นค่าว่างออกจาก Object data ก่อนส่งเข้า api
  const newFilter = omitBy(data, (value) => isNil(value) || value === '');

  const response = await callApi({
    method: 'post',
    url: 'prepare-budget-request/list',
    body: newFilter,
    instanceName: 'pay',
  });

  const { content, totalElements, number } = response as {
    content: PrepareBudgetSearchType[];
    totalElements: number;
    number: number;
  };

  return { content, totalElements, number };
});

//ดึงข้อมูล
export const deletePrepareBudget = createAsyncThunk(
  `${sliceName}/prepare-budget-request/cancel`,
  async ({ data }: { data: PrepareBudgetDelect }): Promise<DeleteServiceResponse> => {
    const response = (await callApi({
      method: 'delete',
      url: 'prepare-budget-request/cancel',
      body: data,
      instanceName: 'pay',
    })) as DeleteServiceResponse;

    return response;
  },
);
