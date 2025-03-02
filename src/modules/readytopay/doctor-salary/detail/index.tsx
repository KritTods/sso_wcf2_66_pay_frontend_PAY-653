'use client';
import React, { useState, useEffect } from 'react';
import { BaseButton, BaseTabs, BaseLoading } from 'wcf-component-lib/src/components';
import { TabsProps } from 'wcf-component-lib/node_modules/antd';
import CardAllDetail from '@/modules/readytopay/doctor-salary/detail/cardAllDetail';
import CardHistoryTable from '@/modules/readytopay/doctor-salary/detail/cardHistroyTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { useAppDispatch } from '@/redux/store';
import {
  getHistoryByCidService,
  AccidentIssueDetailServiceType,
  GetHistoryByCidServiceType,
  getCmpPaymentDetailsService,
  getMedPaymentDetailsService,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { PayloadAction } from '@reduxjs/toolkit';
import { QuestionMark } from 'wcf-component-lib/node_modules/iconoir-react';

export default function DoctorSalaryDetail(): React.ReactElement {
  const dataTestId = 'pageDoctorSalaryPaymentDetail';
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');
  const paymentType = searchParams.get('paymenttype') || '1';
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [dataHistory, setDataHistory] = useState<GetHistoryByCidServiceType[]>();
  const [dataDetails, setDataDetails] = useState<AccidentIssueDetailServiceType>();
  const [activeKey, setActiveKey] = useState<string>('1');

  useEffect(() => {
    if (!cid || !paymentType) return;

    const fetchData = async (): Promise<void> => {
      setLoading(true);
      //call api history
      const resHistory = (await dispatch(getHistoryByCidService(cid))) as PayloadAction<GetHistoryByCidServiceType[]>;
      if (resHistory.payload) {
        setDataHistory(resHistory.payload);
      }
      //call api details
      console.log('paymentType', paymentType);
      if (paymentType === '1') {
        const resDetails = (await dispatch(
          getCmpPaymentDetailsService(paymentType),
        )) as PayloadAction<AccidentIssueDetailServiceType>;
        console.log('resDetails.payload', resDetails.payload);
        if (resDetails.payload) {
          setDataDetails(resDetails.payload);
        }
      } else {
        const resDetails = (await dispatch(
          getMedPaymentDetailsService(paymentType),
        )) as PayloadAction<AccidentIssueDetailServiceType>;
        console.log('resDetails.payload', resDetails.payload);
        if (resDetails.payload) {
          setDataDetails(resDetails.payload);
        }
      }

      setLoading(false);
    };
    void fetchData();
  }, [cid, dispatch, paymentType]);

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
      children: <CardAllDetail dataTestId={dataTestId} data={dataDetails} type={paymentType} />,
    },
    {
      key: '2',
      label: (
        <div className='flex justify-center'>
          <QuestionMark />
          <span>ประวัติใบสั่งจ่าย</span>
        </div>
      ),
      children: <CardHistoryTable dataTestId={dataTestId} data={dataHistory} />,
    },
  ];

  //loading Page
  // if (loading || !dataHistory || !dataDetails) {
  if (loading || !dataDetails) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      <BaseTabs noBackground={true} defaultActiveKey={activeKey} items={items} onChange={handleTabChange} />
      <div className='flex flex-row justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-button-cancel`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='bg-[#dedede] hover:bg-red-500'
          onClick={() => router.push(URL.readytopay.doctorSalary.url)}
        />
      </div>
    </div>
  );
}
