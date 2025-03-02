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
      description: 'บันทึกข้อมูลเตรียมจ่าย',
      path: () => router.push(URL.cutOffPayment.cutOffPaymentDoctorSalary.url),
    },
    {
      iconName: (
        <div>
          <HomeHospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายโรงพยาบาล',
      description: 'บันทึกข้อมูลเตรียมจ่ายโรงพยาบาล',
      path: () => router.push(URL.cutOffPayment.cutOffHospitalPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeUser className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      description: 'เตรียมจ่ายเงินสมทบคืนให้นายจ้าง',
      path: () => router.push(URL.cutOffPayment.cutOffPaymentRefundToEmployer.url),
    },
    {
      iconName: (
        <div>
          <SendDollars className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินประเภทอื่น',
      description: 'บันทึกข้อมูลเตรียมจ่ายเงินประเภทอื่น',
      path: () => router.push(URL.cutOffPayment.cutOffOtherPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      description: 'เตรียมจ่ายเงินกองทุนบริหารสำนักงาน',
      path: () => router.push(URL.cutOffPayment.cutOffOfficeFundPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeSale className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินผิดกองทุนเงินทดแทน',
      description: 'เตรียมจ่ายเงินกองทุนเงินทดแทน',
      path: () => router.push(URL.cutOffPayment.cutOffPaymentWrongFund.url),
    },
    {
      iconName: (
        <div>
          <Hospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนกองทุน UCEP',
      description: 'เตรียมจ่ายเงินกองทุน UCEP',
      path: () => router.push(URL.readytopay.doctorSalary.url),
    },
  ];

  return (
    <div className='flex flex-wrap gap-4  mx-4'>
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
