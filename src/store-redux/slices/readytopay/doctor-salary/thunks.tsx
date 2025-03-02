import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
import {
  sliceName,
  FilterSearchType,
  MType,
  Update_MType,
  TType,
  Update_TType,
  SType,
  Update_SType,
  XType,
  Update_XType,
  PType,
  Update_PType,
  InsertDoctorSalalyResponse,
  PrepareToPayIdType,
  PrepareToPayIdDetailType,
} from './types';
import { isEmpty, omitBy } from 'lodash';

//for map data this response
export interface GetFilterListServiceType {
  content: {
    paymentId: string;
    paymentNo: string;
    accidentIssueCode: string;
    employeeCitizenId: string;
    fullName: string;
    amount: number;
    hospital: string;
    bank?: {
      code: string;
      name: string;
    };
  }[];
  totalElements: number;
  number: number;
}

export interface GetHistoryByCidServiceType {
  paymentCode: 'string'; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: 'string'; //เลขประสบอันตราย
  employeeCitizenId: 'string'; //เลขบัตรประชาชน
  treatmentName: 'string'; //รายการเงินทดแทน
  payDate: 'string'; //วันที่จ่าย
  payType: 'string'; //จ่ายโดย
  paymentId: 'string'; //รหัสใบสั่งจ่าย
  fullName: 'string'; //จ่ายให้ (ลูกจ้าง/ผู้มีสิทธิ์)
  amount: number; //จำนวนเงิน
  hospital: 'string'; //โรงพยาบาล
}

export interface AccidentIssueDetailServiceType {
  payment: {
    paymentCode: string;
    paymentStatus: string;
    payStatus: string;
    payBy: string;
    paymentOrderer: string;
    paymentDate: string;
    paymentNo: string;
    payAmount: number;
    payTo?: string; // เพิ่มเติมจากข้อมูลใหม่
    payIndex?: string; // เพิ่มเติมจากข้อมูลใหม่
    destinationPortal?: string; // เพิ่มเติมจากข้อมูลใหม่
    createdBy?: string; // เพิ่มเติมจากข้อมูลใหม่
  };
  medicalAssessment: {
    assessmentRequestNo: string;
    assessingDoctor: string;
    assessmentDate: string;
    assessmentLocation: string;
    requestIssuer: string;
    approvalStatus: string;
    approver: string;
    approvalDate: string;
  };
  accidentInformation: {
    accidentNumber: string;
    accidentDate: string;
    severityLevel: string;
    fullName: string;
    addressNumber: string;
    villageNumber: string;
    road: string;
    alley: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
    employer: string;
    employeeCid: string;
    employeeName: string;
    careerPosition: {
      code: string;
      description: string;
    };
    accidentOrgan: {
      code: string;
      description: string;
    };
    position: string;
    accidentItem: {
      code: string;
      description: string;
    };
    accidentCauseText: string;
    accidentCase: {
      code: string;
      description: string;
    };
    accidentInjuryText: string;
    accidentInjury: {
      code: string;
      description: string;
    };
  };
  details: {
    investigatedLogCode: string;
    companyName: string;
    accidentIssuesCode: string;
    businessType: string;
    accountNo: string;
    businessGroup: string;
    accidentDate: string;
    informDate: string;
    tsic: {
      code: string;
      description: string;
    };
  };
  investigate: {
    treatmentDescription: string;
    investigateType: {
      code: string;
      description: string;
    };
    result: string;
    amount: number;
    expiryDate: string;
    compensationFee: number;
  };
  paymentInvoice: {
    treatMentDescription: string;
    startDate: string;
    endDate: string;
    month: number;
    day: number;
    amount: number;
  }[];
  approval: {
    status: string;
    date: string;
    approver: string;
  };
}

//ค้นหาข้อมูลหน้าหลัก
export const getDoctorSalalyListService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/list`,
  async (data: FilterSearchType) => {
    //remove empty value in data
    const manipulateData = omitBy(data, (value) => isEmpty(value) || value === undefined);

    // Remove the 'date' field explicitly if it exists
    const { date, ...filteredData } = manipulateData;

    const dataBody = {
      ...filteredData,
      startPaymentNo: '',
      endPaymentNo: '',
      pagination: {
        ...filteredData.pagination,
      },
    };

    // กรณีมีการกรอกเลขที่ใบสั่งจ่าย
    if (manipulateData.paymentNo && manipulateData.paymentNo.start && manipulateData.paymentNo.end) {
      dataBody.startPaymentNo = manipulateData.paymentNo.start;
      dataBody.endPaymentNo = manipulateData.paymentNo.end;
    }

    if (date && date.length === 2) {
      dataBody.startDate = date[0];
      dataBody.endDate = date[1];
    }

    console.log('dataBody', dataBody);

    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/list',
      body: dataBody,
      instanceName: 'pay',
    });

    console.log('response', response);
    const { content, totalElements, number } = response as GetFilterListServiceType;

    return { content, totalElements, number };
  },
);

//ค้นหาข้อมูลประวัติใบสั่งจ่าย
export const getHistoryByCidService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/history/cid`,
  async (citizenId: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/history/cid/${citizenId}`,
      instanceName: 'pay',
    })) as GetHistoryByCidServiceType[];

    return response;
  },
);

// ค้นหาข้อมูลรายละเอียดการจ่ายเงินทดแทน
export const getCmpPaymentDetailsService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/payment/cmp/{paymentCode}`,
  async (paymentCode: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/payment/cmp/${paymentCode}`,
      instanceName: 'pay',
    })) as AccidentIssueDetailServiceType;

    return response;
  },
);

// ค้นหาข้อมูลรายละเอียดการจ่ายค่าตอบแทนแพทย์
export const getMedPaymentDetailsService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/payment/med/{paymentCode}`,
  async (paymentCode: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/payment/med/${paymentCode}`,
      instanceName: 'pay',
    })) as AccidentIssueDetailServiceType;

    return response;
  },
);

// ค้นหารายละเอียดข้อมูลเตรียมจ่ายทดแทน/แพทย์
export const getDoctorSalalyByPrepareToPayIdService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/payment/cmp/{paymentCode}`,
  async (prepareToPayId: string): Promise<PrepareToPayIdType> => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/cmp/${prepareToPayId}`,
      instanceName: 'pay',
    })) as PrepareToPayIdDetailType;

    return { prepareToPayId, response };
  },
);

// เพิ่ม คำร้องขอบันทึกข้อมูลเตรียมจ่าย MType
export const insertDoctorSalalyService = createAsyncThunk(`${sliceName}/prepare-to-pay/cmp`, async (data: MType) => {
  const response = await callApi({
    method: 'post',
    url: 'prepare-to-pay/cmp',
    body: data,
    instanceName: 'pay',
  });

  console.log('call api saveReceiptPaymentService', response);

  return response as InsertDoctorSalalyResponse;
});

// แก้ไข คำร้องขอบันทึกข้อมูลเตรียมจ่าย MType
export const updateDoctorSalalyService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/patch`,
  async (data: Update_MType) => {
    const response = await callApi({
      method: 'patch',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('update M', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// เพิ่ม คำร้องขอบันทึกข้อมูลเตรียมจ่าย TType
export const insertDoctorSalaly_TService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/t`,
  async (data: TType) => {
    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('call api saveReceiptPaymentService', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// แก้ไข คำร้องขอบันทึกข้อมูลเตรียมจ่าย TType
export const updateDoctorSalaly_TService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/patch/t`,
  async (data: Update_TType) => {
    const response = await callApi({
      method: 'patch',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('update T', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// เพิ่ม คำร้องขอบันทึกข้อมูลเตรียมจ่าย SType
export const insertDoctorSalaly_SService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/s`,
  async (data: SType) => {
    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('call api saveReceiptPaymentService', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// แก้ไข คำร้องขอบันทึกข้อมูลเตรียมจ่าย SType
export const updateDoctorSalaly_SService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/patch/s`,
  async (data: Update_SType) => {
    const response = await callApi({
      method: 'patch',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('update S', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// เพิ่ม คำร้องขอบันทึกข้อมูลเตรียมจ่าย XType
export const insertDoctorSalaly_XService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/x`,
  async (data: XType) => {
    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('call api save X', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// แก้ไข คำร้องขอบันทึกข้อมูลเตรียมจ่าย XType
export const updateDoctorSalaly_XService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/patch/x`,
  async (data: Update_XType) => {
    const response = await callApi({
      method: 'patch',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('update X', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// เพิ่ม คำร้องขอบันทึกข้อมูลเตรียมจ่าย PType
export const insertDoctorSalaly_PService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/p`,
  async (data: PType) => {
    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('call api save P', response);

    return response as InsertDoctorSalalyResponse;
  },
);

// แก้ไข คำร้องขอบันทึกข้อมูลเตรียมจ่าย PType
export const updateDoctorSalaly_PService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/cmp/patch/p`,
  async (data: Update_PType) => {
    const response = await callApi({
      method: 'patch',
      url: 'prepare-to-pay/cmp',
      body: data,
      instanceName: 'pay',
    });

    console.log('update P', response);

    return response as InsertDoctorSalalyResponse;
  },
);
