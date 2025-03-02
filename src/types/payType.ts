// X = รับเงิน ณ สำนักงาน
// T = โอนผ่านธนาคารโดยจังหวัด (ใช้กับจ่ายโรงพยาบาล)
// S = ส่งเช็คทางไปรณษีย์
// P = ธนาณัติ
// M = พร้อมเพย์
// B = โอนผ่านธนาคารโดยจังหวัด (ใช้กับเงินทดแทนแพทย์)

export type PayType = 'X' | 'T' | 'S' | 'P' | 'M' | 'B';

export type PayToCodeType = '1' | '8'; // ประเภทเบิกเงินรองจ่าย 1 = เงินทดแทน 8 = ค่าตอบแทนแพทย์

export type AdvancePaymentType = 'PAY' | 'FIN' | 'W' | 'B';

export type IncorrectPaymentReasonType = 'S' | 'O' | 'J' | 'E';

export type ReceiveType = 'O' | 'A';

export type PayBy = 'X' | 'C';

// ช่องทางการชำระเงิน
// T1 = จ่ายเงินทดแทน/ค่าตอบแทนแพทย์
// T13 = จ่ายโรงพยาบาล
// S1 = จ่ายคืนเงินสมทบให้นายจ้าง
// E1 = จ่ายเงินประเภทอื่น
// P1 = จ่ายเงินผิดกองทุนเงินทดแทน
// TX = นำส่งภาษีหัก ณ ที่จ่าย

export type PaymentCodeType = 'T1' | 'T13' | 'S1' | 'E1' | 'B2' | 'P1' | 'TX';
