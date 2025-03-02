import dayjs from 'dayjs';

// ฟังก์ชันสำหรับจัดรูปแบบเลขบัญชี
export const formatBankAccountNo = (accountNo: string): string => {
  if (!accountNo || accountNo.length !== 10) {
    return accountNo; // ถ้าเลขบัญชีไม่ครบ 12 หลัก จะคืนค่าเดิม
  }

  return `${accountNo.substring(0, 3)}-${accountNo.substring(3, 4)}-${accountNo.substring(4, 9)}-${accountNo.substring(
    9,
    10,
  )}`;
};

export function formatCurrency(num: number, digit = 2): string {
  // Checking if the input is not a number
  if (isNaN(num)) {
    throw new Error(`Invalid input to the formatCurrency function, expected a number but received ${typeof num}`);
  }

  // Convert the number to a string and format it as a currency
  return num.toLocaleString('th-TH', { minimumFractionDigits: digit, maximumFractionDigits: digit });
}

export const formatDayThai = (date: string): string => {
  if (!date) {
    return date;
  }

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear() + 543;

  return `${day}/${month}/${year}`;
};

export const currentDate = (): string => {
  const dateNow = dayjs().format('YYYY-MM-DD');

  const dateObj = new Date(dateNow);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear() + 543;

  return `${day}/${month}/${year}`;
};
