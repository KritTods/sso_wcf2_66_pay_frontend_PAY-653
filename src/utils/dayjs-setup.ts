import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

export default dayjs;
