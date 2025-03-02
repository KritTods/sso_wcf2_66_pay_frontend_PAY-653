import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  sliceName,
  initialState,
  StateProps,
  FilterSearchType,
  ReadyToPayDataType,
  ChequeInfoListType,
  PaymentListType,
  AccountInfoListType,
  PostalInfoList,
} from './types';
import {
  getDoctorSalalyListService,
  insertDoctorSalalyService,
  insertDoctorSalaly_TService,
  updateDoctorSalaly_TService,
  insertDoctorSalaly_SService,
  updateDoctorSalaly_SService,
  updateDoctorSalalyService,
  insertDoctorSalaly_XService,
  updateDoctorSalaly_XService,
  insertDoctorSalaly_PService,
  updateDoctorSalaly_PService,
  getDoctorSalalyByPrepareToPayIdService,
} from './thunks';
import { RootState } from '@/store-redux/store';
import { PayType } from '@/types/payType';

const readyToPayDoctorSalarySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilterDoctorSalaly: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      } as FilterSearchType; // ใช้เฉพาะ filter ปัจจุบัน
      // console.log('state filter', state.doctorSalaly.tabs.paymentOffice.filter);
      state.loadDatafilter = true;
    },

    clearListFilter: (state) => {
      state.filter = initialState.filter;
      state.listFilter = initialState.listFilter;
    },

    //checkbox
    setSelectPaymentList: (state, action: { payload: ReadyToPayDataType[] }) => {
      //เก็บค่าจากการ checkbox
      state.pageDoctorSalalyForm.selectList = action.payload;
    },

    clearSelectPaymentList: (state) => {
      state.pageDoctorSalalyForm.selectList = [];
    },

    //บันทึกข้อมูล
    setPagePaymentForm: (state, action: PayloadAction<StateProps['pageDoctorSalalyForm']>) => {
      state.pageDoctorSalalyForm = action.payload;
    },
    setPagePaymentDetail: (state, action: PayloadAction<StateProps['pageDoctorSalalyDetail']>) => {
      state.pageDoctorSalalyDetail = action.payload;
    },

    //เก็บค่า ประเภทการจ่ายเงิน
    setOptionPaymentTabsActive: (state, action: { payload: PayType }) => {
      state.pageDoctorSalalyForm.payType = action.payload;
    },

    //เก็บค่า paymentNo
    setPaymentNo: (state, action) => {
      state.pageDoctorSalalyForm.paymentNo = String(action.payload);
    },

    //เก็บค่า CitizenId
    setCitizenId: (state, action) => {
      state.pageDoctorSalalyForm.citizenId = String(action.payload);
    },

    //เซตค่า ผลรวม รายการสั่งจ่าย
    setPaySummary: (state, action) => {
      state.pageDoctorSalalyForm.sumTableList = Number(action.payload);
    },
  },

  extraReducers(builder) {
    //Get List โหลดข้อมูล เบิกเงินทดรองจ่าย
    builder.addCase(getDoctorSalalyListService.pending, (state) => {
      state.loadDatafilter = true;
      state.listFilter = []; //เซตค่าเริ่มต้น
      state.totalElements = 0;
    });
    builder.addCase(getDoctorSalalyListService.fulfilled, (state, action) => {
      state.loadDatafilter = false;
      state.listFilter = action.payload.content; //เซ็ตค่า content เข้า list สำหรับแสดงข้อมูลใน table
      state.totalElements = action.payload.totalElements; // เซ็ตค่า totalElements (จำนวนข้อมูลในตารางทั้งหมด)
    });
    builder.addCase(getDoctorSalalyListService.rejected, (state) => {
      state.loadDatafilter = false;
    });

    //Get List โหลดข้อมูล id ข้อมูลเตรียมจ่าย
    builder.addCase(insertDoctorSalalyService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertDoctorSalalyService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(insertDoctorSalalyService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูล รายละเอียดข้อมูลเตรียมจ่ายทดแทน/แพทย์
    builder.addCase(getDoctorSalalyByPrepareToPayIdService.pending, (state) => {
      state.pageDoctorSalalyDetail.loadDatalist = true;
    });
    builder.addCase(getDoctorSalalyByPrepareToPayIdService.fulfilled, (state, action) => {
      state.pageDoctorSalalyDetail.loadDatalist = false;
      console.log('response getDoctorSalalyByPrepareToPayIdService:', action.payload.response);
      if (action.payload.response) {
        const {
          prepareToPayId,
          documentNo,
          paymentNo,
          createdBy,
          createdDate,
          payType,
          bookNo,
          receiverName,
          paymentType,
          payBy,
          cashAmount,
          postAddress,
          chequeInfoList,
          paymentList,
          postalInfoList,
          accountInfoList,
        } = action.payload.response;
        state.pageDoctorSalalyDetail.mode = 'view';
        state.pageDoctorSalalyDetail.isCheque = payBy.code == 'X' ? false : true;
        state.pageDoctorSalalyDetail.prepareToPayId = prepareToPayId || '';
        state.pageDoctorSalalyDetail.documentNo = documentNo || ''; //เลขที่เอกสาร
        state.pageDoctorSalalyDetail.paymentNo = paymentNo || ''; //เลขที่เตรียมจ่าย
        state.pageDoctorSalalyDetail.createdBy = createdBy || ''; //ผู้เตรียมจ่าย
        state.pageDoctorSalalyDetail.createdDate = createdDate || ''; //วันที่เตรียมจ่าย
        state.pageDoctorSalalyDetail.payType.code = payType.code || ''; //รหัสวิธีการชำระเงิน
        state.pageDoctorSalalyDetail.payType.name = payType.name || ''; //ชื่อวิธีการชำระเงิน
        state.pageDoctorSalalyDetail.bookNo = bookNo || ''; //เลขที่หนังสือ รง.
        state.pageDoctorSalalyDetail.receiverName = receiverName || ''; //ชื่อผู้มีสิทธิ์
        state.pageDoctorSalalyDetail.paymentType = paymentType || ''; //ประเภทการจ่ายนอกระบบ
        state.pageDoctorSalalyDetail.payBy.code = payBy.code || ''; //รหัสการจ่ายโดย
        state.pageDoctorSalalyDetail.payBy.name = payBy.name || ''; //ชื่อการจ่ายโดย

        state.pageDoctorSalalyDetail.cash = cashAmount || 0; //จำนวนเงินสด
        state.pageDoctorSalalyDetail.address = postAddress || ''; //ที่อยู่สำหรับส่งเช็คทางไปรษณีย์

        // ข้อมูล `cheques`
        state.pageDoctorSalalyDetail.cheques = chequeInfoList.map((cheque: ChequeInfoListType) => ({
          id: cheque.chequeInfoId || '',
          chequeNo: cheque.chequeNo || '',
          bankCode: cheque.bank?.code || undefined,
          bankName: cheque.bank?.name || undefined,
          bankBranchCode: '', // ไม่มีข้อมูลใน API
          amount: cheque.chequeAmount || 0,
          chequeStampDate: cheque.chequeDate || '',
          mode: 'view',
        }));

        // ข้อมูล `paymentList`
        state.pageDoctorSalalyDetail.paymentList = paymentList.map((payment: PaymentListType) => ({
          id: '',
          paymentNo: payment.paymentNo || '',
          accidentIssueCode: payment.accidentIssueCode || '',
          employeeCitizenId: payment.employeeCitizenId || '',
          fullName: payment.employeeName || '',
          bankCode: payment.bank?.code || '',
          bankAccountNo: payment.accountNo || '',
          bankAccountName: payment.accountName || '',
          amount: Number(payment.totalAmount) || 0,
          mode: 'view',
        }));

        // ข้อมูล `moneys`
        state.pageDoctorSalalyDetail.moneys = postalInfoList.map((money: PostalInfoList) => ({
          id: money.postalInfoId || '',
          postalNo: money.paymentNo || '',
          portalDestination: money.postalNo || '',
          postalCode: money.postalCode || '',
          receiverName: money.postalDestination || '',
          amount: Number(money.chequeAmount) || 0,
          mode: 'view',
        }));

        // ข้อมูล `banks`
        state.pageDoctorSalalyDetail.banks = accountInfoList.map((bank: AccountInfoListType) => ({
          id: bank.transferAccountInfoId || '',
          bankCode: bank.bank?.code || '',
          bankAccountName: bank.accountName || '',
          bankAccountNo: bank.accountNo || '',
          amount: Number(bank.totalAmount) || 0,
          mode: 'view',
        }));
      }
    });
    builder.addCase(getDoctorSalalyByPrepareToPayIdService.rejected, (state) => {
      state.pageDoctorSalalyDetail.loadDatalist = false;
    });

    //response หนังแก้ไข
    builder.addCase(updateDoctorSalalyService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctorSalalyService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(updateDoctorSalalyService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูล id ข้อมูลเตรียมจ่าย โอนผ่านธนาคารโดยจังหวัด
    builder.addCase(insertDoctorSalaly_TService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertDoctorSalaly_TService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(insertDoctorSalaly_TService.rejected, (state) => {
      state.loading = false;
    });

    //response หนัาแก้ไข โอนผ่านธนาคารโดยจังหวัด
    builder.addCase(updateDoctorSalaly_TService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctorSalaly_TService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(updateDoctorSalaly_TService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูล id ข้อมูลเตรียมจ่าย ส่งเช็คทางไปรษณีย์
    builder.addCase(insertDoctorSalaly_SService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertDoctorSalaly_SService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(insertDoctorSalaly_SService.rejected, (state) => {
      state.loading = false;
    });

    //response หนัาแก้ไข ส่งเช็คทางไปรษณีย์
    builder.addCase(updateDoctorSalaly_SService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctorSalaly_SService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(updateDoctorSalaly_SService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูล id ข้อมูลเตรียมจ่าย รับเงิน ณ สำนักงาน
    builder.addCase(insertDoctorSalaly_XService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertDoctorSalaly_XService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(insertDoctorSalaly_XService.rejected, (state) => {
      state.loading = false;
    });

    //response หนัาแก้ไข รับเงิน ณ สำนักงาน
    builder.addCase(updateDoctorSalaly_XService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctorSalaly_XService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(updateDoctorSalaly_XService.rejected, (state) => {
      state.loading = false;
    });

    //Get List โหลดข้อมูล id ข้อมูลเตรียมจ่าย รับเงิน ณ สำนักงาน
    builder.addCase(insertDoctorSalaly_PService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertDoctorSalaly_PService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(insertDoctorSalaly_PService.rejected, (state) => {
      state.loading = false;
    });

    //response หนัาแก้ไข รับเงิน ณ สำนักงาน
    builder.addCase(updateDoctorSalaly_PService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDoctorSalaly_PService.fulfilled, (state, action) => {
      state.loading = false;
      state.prepareToPayId = String(action.payload);
    });
    builder.addCase(updateDoctorSalaly_PService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setFilterDoctorSalaly,
  setPaySummary,
  setPaymentNo,
  setCitizenId,
  setOptionPaymentTabsActive,
  setSelectPaymentList,
  clearSelectPaymentList,
  clearListFilter,
  setPagePaymentForm,
  setPagePaymentDetail,
} = readyToPayDoctorSalarySlice.actions;
export default readyToPayDoctorSalarySlice.reducer;
export const readyToPayDoctorSalarySelector = (state: RootState): StateProps => state.readyToPayDoctorSalarySlice;
