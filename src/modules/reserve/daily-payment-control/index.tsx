'use client';
import React, { useState } from 'react';
import CardSearch from './cardSearch';
import CardTable from './cardTable';
import CardDataSummary from './cardDataSummary';
import { BaseButton, BaseToastNotification, BaseDialog, BaseIcon } from 'wcf-component-lib/src/components';
import { PrinterOutlined } from '@ant-design/icons';
import CardTablePay from './cardTablePay';

export default function PageDailyPaymentControl(): React.ReactElement {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'พิมพ์เอกสารทะเบียนคุม',
      description: 'ทำรายการเสร็จสิ้น',
    });

    // router.push(URL.reserve.cutOffPayDetail.url);

    //close modal
    setIsOpenConfirmModal(false);
  };

  const handleCancel = (): void => {
    setIsOpenConfirmModal(false);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <CardSearch />
      <CardDataSummary />
      <div>
        <BaseButton
          label='พิมพ์เอกสารทะเบียนคุม'
          className='min-w-[250px]'
          icon={<PrinterOutlined />}
          onClick={() => setIsOpenConfirmModal(true)}
        />
        <BaseDialog
          width='560px'
          isOpen={isOpenConfirmModal}
          setIsOpen={setIsOpenConfirmModal}
          content={
            <div className='flex flex-col  w-full gap-4'>
              <div className='text-left font-semibold text-3xl'>พิมพ์เอกสารทะเบียนคุมใช่หรือไม่?</div>
              <div className='text-left status text-[#4B5760]'>กรุณายืนยันการทำรายการอีกครั้ง</div>
            </div>
          }
          headerLeftIcon={
            <BaseIcon
              name='printer'
              size='40px'
              classNameColor={{
                base: 'text-primary',
                hover: 'text-primary-bright',
                active: 'text-secondary',
                disabled: 'text-primary-very-bright',
              }}
              disabled={false}
              active={false}
            />
          }
          footer={
            <div className='flex justify-center gap-4'>
              <BaseButton size='large' type='cancel' label='ยกเลิก' onClick={handleCancel} />
              <BaseButton size='large' label='ยืนยัน' onClick={handleConfirm} />
            </div>
          }
        />
      </div>
      <CardTable />
      <CardTablePay />
    </div>
  );
}
