import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

export const getIdentityRules = (identityType: string): Record<string, unknown>[] => {
  switch (identityType) {
    case '1': // บัตรประชาชน
      return [
        requiredRule('เลขที่บัตรอ้างอิง'),
        onlyNumberRule('เลขที่บัตรอ้างอิง'),
        minRule('เลขที่เอกสาร', 13),
        maxRule('เลขที่เอกสาร', 13),
      ];
    case '2': // บัตรข้าราชการ
    case '3': // บัตรรัฐวิสาหกิจ
    case '4': // ใบอนุญาตทำงาน
    case '6': // ใบต่างด้าว
    case '7': // ใบรับขอคำมีบัตรฯ
    case '8': // ใบอนุญาตขับขี่
      return [
        requiredRule('เลขที่บัตรอ้างอิง'),
        onlyNumberRule('เลขที่บัตรอ้างอิง'),
        minRule('เลขที่เอกสาร', 20),
        maxRule('เลขที่เอกสาร', 20),
      ];
    case '5': // หนังสือเดินทาง
      return [
        requiredRule('เลขที่บัตรอ้างอิง'),
        {
          validator(_: unknown, value: string): Promise<void> {
            if (!value) {
              return Promise.reject(new Error('โปรดระบุเลขที่บัตรอ้างอิง'));
            }

            // เช็คว่า value มีรูปแบบเป็นตัวอักษรภาษาอังกฤษตัวใหญ่ 2 ตัว ตามด้วยตัวเลข 7 ตัว
            const regex = /^(?=(.*[A-Z]){2})(?=(.*\d){7}).*$/;
            if (!regex.test(value)) {
              return Promise.reject(new Error('โปรดระบุข้อมูล ตัวอักษรภาษาอังกฤษตัวใหญ 2 ตัว และ ตัวเลข 7 ตัว'));
            }

            return Promise.resolve();
          },
        },
        minRule('เลขที่เอกสาร', 9),
        maxRule('เลขที่เอกสาร', 9),
      ];
    default:
      return [];
  }
};
