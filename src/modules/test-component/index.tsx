'use client';
import React, { useState } from 'react';
import CardPreparePay from '@/modules/test-component/cardPreparePay';
import { AdvancePaymentType, IncorrectPaymentReasonType, PayType } from '@/types/payType';
import { PopUpHistory } from '@/components/common';
import { BaseButton } from 'wcf-component-lib/src/components';

export default function TestComponent(): React.ReactElement {
  const [isOpenPopupHistory, setIsOpenPopupHistory] = useState(false);

  const dataTestId = 'pageTestComponent';

  const dataCardPreparePay = {
    documentNo: 'P000167000001E1',
    transactionDate: '2024-12-31',
    paymentAgent: 'นาย สมชาย ใจดี',
    payType: 'X' as PayType,

    paymentNo: 'asdsddasd23132', //อื่นๆ
    // bookNo: '123456',
    // receiverName: 'string',
    // paymentType: 'string',
    advancePaymentType: 'PAY' as AdvancePaymentType,
    incorrectPaymentReason: 'S' as IncorrectPaymentReasonType,
    //employeeCitizenId: '1234567891012', // หมายเลขบัตรประชาชน
    //employeeName: 'asdasdads', // ชื่อ-นามสกุล
    paymentRequest: '123456789', // จ่ายคืนให้
    accountNo: 'ชื่อสถานประกอบการ 123456', //  ชื่อสถานประกอบการ
    amount: 1000000, // จำนวนเงิน
  };

  const dataPopUpHistory = [
    {
      id: '1',
      name: 'เปลี่ยน',
      beforeValue: 123456,
      afterValue: 123456,
      updateBy: 'Admin admin',
      updateDate: '2024-12-31',
    },
    {
      id: '2',
      name: 'เปลี่ยน',
      beforeValue: 123456,
      afterValue: 123456,
      updateBy: 'Admin admin',
      updateDate: '2024-12-31',
    },
    {
      id: '3',
      name: 'เปลี่ยน',
      beforeValue: 123456,
      afterValue: 123456,
      updateBy: 'Admin admin',
      updateDate: '2024-12-31',
    },
  ];

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardPreparePay dataTestId={dataTestId} data={dataCardPreparePay} />
      <div className='flex justify-center gap-4 mt-6'>
        <BaseButton size='large' label='ประวัติการแก้ไข' type='outline' onClick={() => setIsOpenPopupHistory(true)} />
      </div>

      <PopUpHistory
        titleTable='ประวัติการแก้ไข'
        isOpen={isOpenPopupHistory}
        setIsOpen={setIsOpenPopupHistory}
        handleCancel={() => setIsOpenPopupHistory(false)}
        dataTestId={dataTestId}
        data={dataPopUpHistory}
        typeData='number'
        align='right'
      />
    </div>
  );
}
