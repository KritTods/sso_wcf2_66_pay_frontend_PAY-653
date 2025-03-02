import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from 'wcf-component-lib/src/utils/apiServerSide';
import { FilterSearchType, sliceName } from './types';
import { Pagination } from 'wcf-component-lib/src/constants/interface';

//for map data this response
export interface GetFilterListServiceType {
  content: {
    paymentId: number; //รหัสใบสั่งจ่าย
    paymentNo: string; //เลขที่ใบสั่งจ่าย
    accidentIssueCode: string; //เลขประสบอันตราย
    employeeCitizenId: string; //เลขบัตรประชาชน
    fullName: string; //ลูกจ้าง/ผู้มีสิทธิ์
    amount: number; //จำนวนเงิน
    hospital: string; //โรงพยาบาล
    bank: {
      code: string;
      name: string;
    };
    accountName?: string;
    accountNo?: string;
  }[];
  totalElements: number;
  number: number;
}

export interface GetHistoryByCidServiceType {
  paymentNo: 'string'; //เลขที่ใบสั่งจ่าย
  accidentIssueCode: 'string'; //เลขประสบอันตราย
  employeeCitizenId: 'string'; //เลขบัตรประชาชน
  treatmentName: 'string'; //รายการเงินทดแทน
  payDate: 'string'; //วันที่จ่าย
  payType: 'string'; //จ่ายโดย
  paymentId: 'string'; //รหัสใบสั่งจ่าย
  fullName: 'string'; //จ่ายให้ (ลูกจ้าง/ผู้มีสิทธิ์)
  compensationPerPerson: number; //จำนวนเงิน
  hospital: 'string'; //โรงพยาบาล
}

export interface GetPaymentDetailsServiceType {
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
  accidentInformation: {
    employeeCid: string;
    employeeName: string;
    careerPosition: {
      code: string;
      description: string;
    };
    accidentOrganSubGroup: {
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
  payment: {
    paymentNo: string;
    paymentStatus: string;
    payTo: string;
    payBy: string;
    payIndex: string;
    destinationPortal: string;
    paymentDate: string;
    createdBy: string;
  };
  hospitalBillingInvoice: {
    invoiceNo: string;
    hospital: string;
    hospitalInSystem: string;
    startDate: string;
    endDate: string;
    month: number;
    day: number;
    amount: number;
    paidAmount: number;
  }[];
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

export interface BodyCreateHospitalServiceType {
  payType: string;
  payBy: string;
  taxPercent: number;
  taxAmount: number;
  paymentList: {
    paymentNo: string;
  }[];
  postAddress?: string | undefined;
  cashAmount?: number | undefined;
  chequeInfoList?:
    | {
        chequeNo: string;
        bankCode: string;
        chequeAmount: number;
        chequeDate: string;
      }[]
    | undefined;
}

export interface GetHospitalByIdServiceType {
  prepareToPayId: string;
  documentNo: string;
  // paymentNo: string;
  createdBy: string;
  createdDate: string;
  payType: {
    code: string;
    name: string;
  };
  bookNo: string;
  receiverName: string;
  paymentType: string;
  payBy: {
    code: string;
    name: string;
  };
  cashAmount: number;
  taxPercent: number;
  taxAmount: number;
  postAddress: string;
  paymentList: {
    paymentId: number;
    paymentNo: string;
    accidentIssueCode: string;
    employeeCitizenId: string;
    fullName: string;
    bank: {
      code: string;
      name: string;
    };
    accountName: string;
    accountNo: string;
    hospital: string;
    amount: number;
  }[];
  chequeInfoList: {
    chequeInfoId: string;
    chequeNo: string;
    bank: {
      code: string;
      name: string;
    };
    chequeAmount: number;
    chequeDate: string;
  }[];
}

export interface ChequeInfoListType {
  chequeInfoId: string;
  chequeNo: string;
  bankCode: string;
  chequeAmount: number;
  chequeDate: string;
}

export interface PaymentListType {
  paymentNo: string;
}

export interface BodyUpdateHospitalServiceType {
  prepareToPayId: string;
  taxPercent: number;
  taxAmount: number;
  paymentList: PaymentListType[];
  postAddress?: string;
  cashAmount?: number;
  chequeInfoList?: ChequeInfoListType[];
}

export interface BodyGetFilterListServiceType {
  payToCode: string;
  payType: string;
  startPaymentNo?: string;
  endPaymentNo?: string;
  hospitalLikeField?: string;
  bankCode?: string;
  employeeCitizenId?: string;
  fullName?: string;
  accidentIssueCode?: string;
  pagination?: Pagination;
}

//ค้นหาข้อมูลหน้าหลัก
export const getFilterListService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/list`,
  async (data: FilterSearchType) => {
    let dataBody: BodyGetFilterListServiceType = {
      payToCode: '3',
      payType: data.paymentType === 'T' ? 'B' : data.paymentType, // แปลง T เป็น B เปฉพาะประเภทจ่ายงานโรงพยาบาล
      pagination: {
        ...data.pagination,
      },
    };

    // กรณีมีการกรอกเลขที่ใบสั่งจ่าย
    if (data.paymentNo && data.paymentNo.start && data.paymentNo.end) {
      dataBody = {
        ...dataBody,
        startPaymentNo: data.paymentNo.start,
        endPaymentNo: data.paymentNo.end,
      };
    }

    // กรณีมีการกรอกชื่อโรงพยาบาล
    if (data.hospitalName) {
      dataBody = {
        ...dataBody,
        hospitalLikeField: data.hospitalName,
      };
    }

    // กรณีมีการกรอกธนาคาร
    if (data.bankCode) {
      dataBody = {
        ...dataBody,
        bankCode: data.bankCode,
      };
    }

    // กรณีมีการกรอกเลขบัตรประชาชน
    if (data.employeeCitizenId) {
      dataBody = {
        ...dataBody,
        employeeCitizenId: data.employeeCitizenId,
      };
    }

    // กรณีมีการกรอกชื่อ - นามสกุล
    if (data.fullName) {
      dataBody = {
        ...dataBody,
        fullName: data.fullName,
      };
    }

    // กรณีเลขประสบอันตราย
    if (data.accidentIssueCode) {
      dataBody = {
        ...dataBody,
        accidentIssueCode: data.accidentIssueCode,
      };
    }

    const response = await callApi({
      method: 'post',
      url: 'prepare-to-pay/list',
      body: dataBody,
      instanceName: 'pay',
    });

    const { content, totalElements, number } = response as GetFilterListServiceType;

    //loop map data
    const manipulateDataContent = content.map((item) => {
      return {
        ...item,
        bank: {
          code: '001',
          name: 'Bank A รอเพิ่ม API',
        },
      };
    });

    return { content: manipulateDataContent, totalElements, number };
  },
);

export const getHistoryByCidService = createAsyncThunk(`${sliceName}/history-by-cid`, async (cid: string) => {
  const response = (await callApi({
    method: 'get',
    url: `prepare-to-pay/history/cid/${cid}`,
    instanceName: 'pay',
  })) as GetHistoryByCidServiceType[];

  return response;
});

export const getPaymentDetailsService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/payment/hospital`,
  async (paymentNo: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/payment/hospital/${paymentNo}`,
      instanceName: 'pay',
    })) as GetPaymentDetailsServiceType;

    return response;
  },
);

export const createHospitalService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/hospital`,
  async (body: BodyCreateHospitalServiceType) => {
    const response = (await callApi({
      method: 'post',
      url: '/prepare-to-pay/hospital',
      body: body,
      instanceName: 'pay',
    })) as { prepareToPayId: string };

    return response;
  },
);

export const getHospitalByIdService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/hospital/id`,
  async (prepareToPayId: string) => {
    const response = (await callApi({
      method: 'get',
      url: `prepare-to-pay/hospital/${prepareToPayId}`,
      instanceName: 'pay',
    })) as GetHospitalByIdServiceType;

    return response;
  },
);

export const updateHospitalService = createAsyncThunk(
  `${sliceName}/prepare-to-pay/hospital/update`,
  async (body: BodyUpdateHospitalServiceType) => {
    const response = (await callApi({
      method: 'patch',
      url: '/prepare-to-pay/hospital',
      body: body,
      instanceName: 'pay',
    })) as { prepareToPayId: string };

    return response;
  },
);
