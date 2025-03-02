import dayjs from 'dayjs';
import buddistEra from 'dayjs/plugin/buddhistEra';
import th from 'dayjs/locale/th';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// Set the locale for dayjs to Thai with custom formats including Buddhist Era (BBBB)
dayjs.locale({
  ...th,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/BBBB',
    LL: 'D MMMM BBBB',
    LLL: 'D MMMM BBBB เวลา H:mm',
    LLLL: 'วันddddที่ D MMMM BBBB เวลา H:mm',
  },
});

dayjs.extend(buddistEra);
dayjs.extend(weekOfYear);
dayjs.extend(buddistEra);

export const formatDateToCustom = (date: string): string => dayjs(date).format('DD/MM/BBBB');

export default dayjs;
