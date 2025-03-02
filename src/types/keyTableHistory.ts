import { DataHistoryType } from '@/components/common/popUps/popUpHistory';

export enum BaseKeyTableHistory {
  HISTORY_PREPARE_PAY = 'historyPreparePay',
  HISTORY_ORDER_PAYMENT = 'historyOrderPayment',
  HISTORY_CHEQUES = 'historyCheques',
  HISTORY_MONEYS = 'historyMoneys',
  HISTORY_BANKS = 'historyBanks',
}

export interface HistoryType {
  [BaseKeyTableHistory.HISTORY_PREPARE_PAY]?: DataHistoryType[]; // ประวัติการแก้ไขเตรียมจ่าย
  [BaseKeyTableHistory.HISTORY_ORDER_PAYMENT]?: DataHistoryType[]; // ประวัติการแก้ไขใบสั่งจ่าย
  [BaseKeyTableHistory.HISTORY_CHEQUES]?: DataHistoryType[]; // ประวัติการแก้ไขเช็ค
  [BaseKeyTableHistory.HISTORY_MONEYS]?: DataHistoryType[]; // ประวัติการแก้ไขเงิน
  [BaseKeyTableHistory.HISTORY_BANKS]?: DataHistoryType[]; // ประวัติการแก้ไขธนาคาร
}

export type KeyTableHistory = BaseKeyTableHistory;
