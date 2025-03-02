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

export default function ReceiptManualMenus(): React.ReactElement {
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
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualDoctorSalary.url),
    },
    {
      iconName: (
        <div>
          <HomeHospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายโรงพยาบาล',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualHospitalPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeUser className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualRefundToEmployer.url),
    },
    {
      iconName: (
        <div>
          <SendDollars className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินประเภทอื่น',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualOtherPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualofficeFundPayment.url),
    },
    {
      iconName: (
        <div>
          <HomeSale className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายเงินผิดกองทุนเงินทดแทน',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualWrongfundPayment.url),
    },
    {
      iconName: (
        <div>
          <Hospital className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'จ่ายคืนกองทุน UCEP',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManual.url), // TODO: Add URL
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'นำส่งรายการหักภาษี ณ ที่จ่าย',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManualTaxDeliverPayment.url),
    },
    {
      iconName: (
        <div>
          <Bank className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'โอนเงินของ สำนักบริหารการลงทุน',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManual.url), // TODO: Add URL
    },
    {
      iconName: (
        <div>
          <HomeSale className='text-[#1A6CA8] size-12' />
        </div>
      ),
      title: 'โอนเงินให้ สปส. กทม. พื้นที่/จังหวัด/สาขา',
      description: 'บันทึกใบสำคัญรัเงินชนิดเล่ม',
      path: () => router.push(URL.receiptManual.receiptManual.url), // TODO: Add URL
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
