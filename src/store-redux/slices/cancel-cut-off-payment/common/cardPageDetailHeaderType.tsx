import { PayType } from '@/types/payType';

export interface CardPageDetailHeaderType {
  //ข้อมูลรายละเอียด
  documentNo: string; //เลขที่เอกสาร
  paymentAgent: string; //ผู้เตรียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: {
    //ประเภทการจ่ายเงิน
    code: PayType | undefined;
    name: string;
  };
}

export const initialCardPageDetailHeader: CardPageDetailHeaderType = {
  documentNo: '',
  paymentAgent: '',
  transactionDate: '',
  payType: {
    code: undefined,
    name: '',
  },
};
