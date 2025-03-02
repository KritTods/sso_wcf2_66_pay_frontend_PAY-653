'use client';
import React from 'react';
import CardDataSummary from './cardDataSummary';
import { BaseButton } from 'wcf-component-lib/src/components';

import { useRouter } from 'next/navigation';
import { URL } from '@/constants/configPage';
import CardSearchSsoBranchCodeDetail from '@/modules/reserve/bank-deposit/components/cardSearchSsoBranchCodeDetail';
import CardTablePay from '@/modules/reserve/bank-deposit/form/cardTablePay';
import CardTable from '@/modules/reserve/bank-deposit/form/cardTable';
export default function BankDepositDetail(): React.ReactElement {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4'>
      <CardSearchSsoBranchCodeDetail />
      {/* รายการจ่ายเงินทดแทน */}
      <CardTablePay />
      {/* รายการเบิกเงินรองจ่าย */}
      <CardTable />
      {/* สรุปข้อมูล */}
      <CardDataSummary />
      <div className='flex flex-row justify-center items-center gap-4'>
        <BaseButton
          size='middle'
          type='cancel'
          label='ยกเลิก'
          className='bg-[#dedede] hover:bg-red-500'
          onClick={() => router.push(URL.reserve.findbankDeposit.url)}
        />
      </div>
    </div>
  );
}
