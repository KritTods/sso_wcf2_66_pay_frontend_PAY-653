export interface MoneyOrderType {
  id: string;
  // ข้อมูลธนาณัติ
  postalNo: string; //เลขที่ธนาณัติ
  postalCode: string; //รหัสไปรษณีย์ปลายทาง
  portalDestination: string; //ชื่อไปรษณีย์ปลายทาง
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  amount: number; // จำนวนเงิน
}
