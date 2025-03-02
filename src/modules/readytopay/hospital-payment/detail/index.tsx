'use client';
import React, { useEffect, useState } from 'react';
import { BaseButton, BaseTabs, BaseLoading } from 'wcf-component-lib/src/components';
import { TabsProps } from 'wcf-component-lib/node_modules/antd';
import Tab1 from './tab1';
import Tab2 from './tab2';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { useAppDispatch } from '@/redux/store';
import {
  getHistoryByCidService,
  GetHistoryByCidServiceType,
  getPaymentDetailsService,
  GetPaymentDetailsServiceType,
} from '@/store-redux/slices/readytopay/hospital-payment';
import { PayloadAction } from '@reduxjs/toolkit';
import { QuestionMark } from 'wcf-component-lib/node_modules/iconoir-react';

export default function DoctorSalaryDetail(): React.ReactElement {
  const dataTestId = 'pageHospitalPaymentDetail';
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');
  const paymentNo = searchParams.get('paymentNo');
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [dataHistory, setDataHistory] = useState<GetHistoryByCidServiceType[]>();
  const [dataDetails, setDataDetails] = useState<GetPaymentDetailsServiceType>();

  useEffect(() => {
    if (!cid || !paymentNo) return;

    const fetchData = async (): Promise<void> => {
      setLoading(true);
      //call api history
      const resHistory = (await dispatch(getHistoryByCidService(cid))) as PayloadAction<GetHistoryByCidServiceType[]>;
      if (resHistory.payload) {
        setDataHistory(resHistory.payload);
      }
      //call api details
      const resDetails = (await dispatch(
        getPaymentDetailsService(paymentNo),
      )) as PayloadAction<GetPaymentDetailsServiceType>;
      if (resDetails.payload) {
        setDataDetails(resDetails.payload);
      }

      setLoading(false);
    };

    void fetchData();
  }, [cid, paymentNo, dispatch]);

  const handleTabChange = (key: string): void => {
    setActiveKey(key); // อัปเดต activeKey เมื่อแท็บเปลี่ยน
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className='flex justify-center'>
          <QuestionMark />
          <span>รายละเอียด</span>
        </div>
      ),
      children: <Tab1 dataTestId={dataTestId} data={dataDetails} />,
    },
    {
      key: '2',
      label: (
        <div className='flex justify-center'>
          <QuestionMark />
          <span>ประวัติใบสั่งจ่าย</span>
        </div>
      ),
      children: <Tab2 dataTestId={dataTestId} data={dataHistory} />,
    },
  ];

  //loading Page
  if (loading || !dataHistory || !dataDetails) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      <BaseTabs noBackground={true} defaultActiveKey={activeKey} items={items} onChange={handleTabChange} />
      <div className='flex flex-row justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='middle'
          type='cancel'
          label='ยกเลิก'
          className='bg-[#dedede] hover:bg-red-500'
          onClick={() => router.push(URL.readytopay.hospitalPayment.url)}
        />
      </div>
    </div>
  );
}
