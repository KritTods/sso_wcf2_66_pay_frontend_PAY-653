'use client';
import CardMenu from '@/components/common/cardMenu';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { BaseIcon } from 'wcf-component-lib/src/components';
import { HomeHospital, HomeUser, HomeSale, SendDollars, Bank, Coins } from 'wcf-component-lib/node_modules/iconoir-react';

// Card Component
export interface CardDataType {
  iconName: React.ReactElement; // Optional, default to undefined
  title: string;
  description: string;
  path: () => void;
}

export default function CancelPaymentMenus(): React.ReactElement {
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
      description: 'ยกเลิกเตรียมจ่ายเงินทดแทน',
      path: () => router.push(URL.cancelPayment.cancelPaymentDoctorSalary.url),
    },
    {
      iconName: (
        <div>
          <HomeHospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายโรงพยาบาล',
      description: 'ยกเลิกเตรียมจ่ายโรงพยาบาล',
      path: () => router.push(URL.cancelPayment.cancelHospitalPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeUser className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      description: 'ยกเลิกเตรียมจ่ายเงินสมทบคืนให้นายจ้าง',
      path: () => router.push(URL.cancelPayment.cancelRefundToEmployer.url),
    },
    {
      iconName: (
        <div>
          <SendDollars className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินประเภทอื่น',
      description: 'ยกเลิกเตรียมจ่ายเงินประเภทอื่น',
      path: () => router.push(URL.cancelPayment.cancelOtherPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      description: 'ยกเลิกเตรียมจ่ายเงินกองทุนบริหารสำนักงาน',
      path: () => router.push(URL.cancelPayment.cancelOfficeFundPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeSale className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินผิดกองทุนเงินทดแทน',
      description: 'ยกเลิกเตรียมจ่ายเงินกองทุนเงินทดแทน',
      path: () => router.push(URL.cancelPayment.cancelWrongfundPayment.url),
    },
    // {
    //   iconName: 'hospital',
    //   title: 'จ่ายคืนกองทุนUCEP',
    //   description: 'ยกเลิกเตรียมจ่ายเงินกองทุน UCEP',
    //   path: () => router.push(URL.readytopay.doctorSalary.url),
    // },
    // {
    //   iconName: 'hospital',
    //   title: 'เบิกเงินทดรองจ่าย',
    //   description: 'เบิกเงินทดรองจ่าย',
    //   path: () => router.push(URL.readytopay.doctorSalary.url),
    // },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'นำส่งรายการหักภาษี ณ ที่จ่าย',
      description: 'ยกเลิกนำส่งรายการหักภาษี ณ ที่จ่าย',
      path: () => router.push(URL.cancelPayment.cancelTaxDeliver.url),
    },
    {
      iconName: (
        <div>
          <Coins className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'เบิกเงินทดรองจ่าย',
      description: 'ยกเลิกเบิกเงินทดรองจ่าย',
      path: () => router.push(URL.cancelPayment.cancelReservePayment.url),
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
