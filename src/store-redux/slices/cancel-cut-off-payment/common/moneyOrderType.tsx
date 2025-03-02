export interface MoneyOrderType {
  // ข้อมูลธนาณัติ
  postalInfoId: string; //id
  postalNo: string; //เลขที่ธนาณัติ
  postalCode: string; //รหัสไปรษณีย์ปลายทาง
  portalDestination: string; //ชื่อไปรษณีย์ปลายทาง
  employeeName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  postalAmount: number; // จำนวนเงิน
}
