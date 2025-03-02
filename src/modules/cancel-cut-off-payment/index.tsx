'use client';
import CardMenu from '@/components/common/cardMenu';
import { BaseIcon } from 'wcf-component-lib/src/components';
import {
  HomeHospital,
  HomeUser,
  HomeSale,
  SendDollars,
  Bank,
  Hospital,
  Coins,
} from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';

// Card Component
export interface CardDataType {
  iconName: React.ReactElement; // Optional, default to undefined
  title: string;
  description: string;
  path: () => void;
}

export default function CutOffPaymentMenus(): React.ReactElement {
  const router = useRouter();

  const cardData: CardDataType[] = [
    {
      iconName: (
        <BaseIcon
          name='stethoscope'
          size='48px'
          className='flex justify-center items-center'
          classNameColor={{
            base: 'text-link',
            hover: 'text-link',
            active: 'text-link',
            disabled: 'text-link',
          }}
          disabled={false}
          active={false}
        />
      ),
      title: 'จ่ายเงินทดแทน /ค่าตอบแทนแพทย์',
      description: 'ยกเลิกจ่ายเงินทดแทน',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffPaymentDoctorSalary.url),
    },
    {
      iconName: (
        <div>
          <HomeHospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายโรงพยาบาล',
      description: 'ยกเลิกจ่ายโรงพยาบาล',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffHospitalPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeUser className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      description: 'ยกเลิกจ่ายคืนเงินสมทบให้นายจ้าง',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffRefundToEmployer.url),
    },
    {
      iconName: (
        <div>
          <SendDollars className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินประเภทอื่น',
      description: 'ยกเลิกจ่ายเงินประเภทอื่น',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffOtherPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      description: 'ยกเลิกจ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffOfficeFundPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeSale className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินผิดกองทุนเงินทดแทน',
      description: 'ยกเลิกจ่ายเงินผิดกองทุนเงินทดแทน',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffWrongfundPayment.url),
    },
    {
      iconName: (
        <div>
          <Hospital className='text-[#5A5A5A] size-12' />
        </div>
      ),
      title: 'จ่ายคืนกองทุนUCEP',
      description: 'ยกเลิกจ่ายคืนกองทุน UCEP',
      path: () => router.push(URL.cancelCutoffPayment.cancelCutOffRefundToUCEP.url),
    },
    {
      iconName: (
        <div>
          <Coins className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'เบิกเงินทดรองจ่าย',
      description: 'ยกเลิกเบิกเงินทดรองจ่าย',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffReservePayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'นำส่งรายการหักภาษี ณ ที่จ่าย',
      description: 'ยกเลิกนำส่งรายการหักภาษี ณ ที่จ่าย',
      path: () => router.push(URL.cancelCutOffPayment.cancelCutOffTaxDeliverPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'รายงานเงินคงเหลือประจำวัน',
      description: 'ยกเลิกรายงานเงินคงเหลือประจำวัน',
      path: () => router.push(URL.cancelCutoffPayment.cancelCutOffSummaryBudgetRequest.url),
    },
  ];

  return (
    <div className='flex flex-wrap gap-4 mx-4'>
      {cardData.map((data, index) => (
        <CardMenu
          key={index}
          iconName={data.iconName}
          title={data.title}
          description={data.description}
          path={data.path}
        />
      ))}
    </div>
  );
}
