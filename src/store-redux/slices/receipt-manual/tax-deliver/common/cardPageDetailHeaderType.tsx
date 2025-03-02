import { PayType } from '@/types/payType';

export interface CardPageDetailHeaderType {
  //ข้อมูลรายละเอียด
  documentNo: string; //เลขที่เอกสาร
  username: string;
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: PayType | undefined; //ประเภทการจ่ายเงิน
}

export const initialCardPageDetailHeader: CardPageDetailHeaderType = {
  documentNo: '',
  username: '',
  transactionDate: '',
  payType: undefined,
};
