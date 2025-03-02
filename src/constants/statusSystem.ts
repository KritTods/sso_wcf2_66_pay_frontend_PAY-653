import { PayType, ReceiveType, PaymentCodeType } from '@/types/payType';

export type StatusSystemType = Record<
  string,
  {
    text: string;
    color: string;
    backgoundColor: string;
  }
>;

export const statusReserve: StatusSystemType = {
  P: {
    text: 'เตรียมจ่าย',
    color: '#C99A06',
    backgoundColor: '#FFF9E5',
  },
  IS_DELETE_P: {
    text: 'ยกเลิกเตรียมจ่าย',
    color: '#121212',
    backgoundColor: '#EDEDED',
  },
  Y: {
    text: 'ตัดจ่าย',
    color: '#000080',
    backgoundColor: '#E6E6F2',
  },
  IS_DELETE_Y: {
    text: 'ยกเลิกเตรียมจ่าย',
    color: '#121212',
    backgoundColor: '#EDEDED',
  },
  W: {
    text: 'รออนุมัติ',
    color: '#176197',
    backgoundColor: '#E6EFF5',
  },
  A: {
    text: 'อนุมัติ',
    color: '#09AA6A',
    backgoundColor: '#E7FAF2',
  },
  U: {
    text: 'ไม่อนุมัติ',
    color: '#C42828',
    backgoundColor: '#F9EAEA',
  },
};

export const statusPayType: Record<PayType, string> = {
  X: 'รับเงิน ณ สำนักงาน',
  T: 'โอนผ่านธนาคารโดยจังหวัด',
  S: 'ส่งเช็คทางไปรษณีย์',
  P: 'ธนาณัติ',
  M: 'พร้อมเพย์',
  B: 'โอนผ่านธนาคารโดยจังหวัด',
};

export const statusAdvancePaymentType: Record<string, string> = {
  PAY: 'งานเงินจ่าย',
  FIN: 'งานเงินรับ',
  W: 'เบิกเงินรองจ่าย',
  B: 'ยืมเงินระหว่างวัน',
};

export const statusReceiveType: Record<ReceiveType, string> = {
  O: 'ผู้มีสิทธิหรือลูกจ้างมารับเงินด้วยตัวเอง',
  A: 'ผู้มีสิทธิหรือลูกจ้างมอบอำนาจให้ผู้อื่นมารับแทน',
};

export enum CODE_INCORRECT_PAYMENT_REASON {
  S = 'S',
  O = 'O',
  J = 'J',
  E = 'E',
}

export const statusIncorrectPaymentReason: Record<string, string> = {
  [CODE_INCORRECT_PAYMENT_REASON.S]: 'สถานประกอบการ',
  [CODE_INCORRECT_PAYMENT_REASON.O]: 'ลูกจ้าง/ผู้มีสิทธิ์',
  [CODE_INCORRECT_PAYMENT_REASON.J]: 'เจ้าหน้าที่',
  [CODE_INCORRECT_PAYMENT_REASON.E]: 'จ่ายคืนผิดกองทุน',
};

export interface IncorrectPaymentReasonType {
  value: CODE_INCORRECT_PAYMENT_REASON;
  label: string;
  disabled?: boolean;
}

export const DROPDOWN_INIT_INCORRECT_PAYMENT_REASON: IncorrectPaymentReasonType[] = [
  {
    value: CODE_INCORRECT_PAYMENT_REASON.S,
    label: `S : ${statusIncorrectPaymentReason[CODE_INCORRECT_PAYMENT_REASON.S]}`,
  },
  {
    value: CODE_INCORRECT_PAYMENT_REASON.O,
    label: `O : ${statusIncorrectPaymentReason[CODE_INCORRECT_PAYMENT_REASON.O]}`,
  },
  {
    value: CODE_INCORRECT_PAYMENT_REASON.J,
    label: `J : ${statusIncorrectPaymentReason[CODE_INCORRECT_PAYMENT_REASON.J]}`,
  },
];
export const statusPaymentCodeTypeType: Record<PaymentCodeType, string> = {
  T1: 'จ่ายเงินทดแทน/ค่าตอบแทนแพทย์',
  T13: 'จ่ายโรงพยาบาล',
  S1: 'จ่ายคืนเงินสมทบให้นายจ้าง',
  E1: 'จ่ายเงินประเภทอื่น',
  P1: 'จ่ายเงินผิดกองทุนเงินทดแทน',
  TX: 'นำส่งภาษีหัก ณ ที่จ่าย',
  B2: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
};
