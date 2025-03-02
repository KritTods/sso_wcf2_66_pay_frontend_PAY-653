'use client';
import React, { useState } from 'react';
// import CardSearch from './cardSearch';
import CardSearchSsoBranchCode from '@/modules/reserve/components/cardSearchSsoBranchCode';
import CardTable from './cardTable';
import CardDataSummary from './cardDataSummary';
import { BaseButton, BaseToastNotification, BaseDialog } from 'wcf-component-lib/src/components';
import CardTablePay from './cardTablePay';
import { useRouter } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { useSelector } from 'react-redux';
import { bankDepositSelector } from '@/store-redux/slices/reserve/bankDeposit';
import CustomEmpty from 'wcf-component-lib/src/components/v2/BaseGrid/CustomEmpty';
import { DownloadSquare } from 'wcf-component-lib/node_modules/iconoir-react';

export default function PageDailyPaymentControl(): React.ReactElement {
  const router = useRouter();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const { list: dataTableBankDeposit } = useSelector(bankDepositSelector);

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'เสร็จสิ้น',
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
    <div className='flex flex-col gap-4'>
      <CardSearchSsoBranchCode />
      {dataTableBankDeposit.length > 0 ? (
        <>
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
              onClick={() => router.push(URL.reserve.bankDeposit.url)}
            />
            <BaseButton
              size='middle'
              label='บันทึก'
              className='!min-w-[280px]'
              onClick={() => setIsOpenConfirmModal(true)}
            />
          </div>
        </>
      ) : (
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <CustomEmpty
            emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
            emptyDescription='รหัส สปส., ประจำวันที่'
            emptyImage='https://api-dev-wcf.soilfish.co/mw/api/asset/images/base-grid-empty.svg'
          />
        </div>
      )}

      <BaseDialog
        width='560px'
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        content={
          <div className='flex flex-col w-full gap-4'>
            <div className='text-left font-semibold text-3xl'>บันทึกข้อมูลนำเงินรองจ่ายใช่หรือไม่ ?</div>
            <div className='text-left status text-[#4B5760]'>กรุณายืนยันการทำรายการอีกครั้ง</div>
          </div>
        }
        headerLeftIcon={<DownloadSquare />}
        footer={
          <div className='flex justify-center gap-4'>
            <BaseButton size='large' type='cancel' label='ยกเลิก' onClick={handleCancel} />
            <BaseButton size='large' label='บันทึก' onClick={handleConfirm} />
          </div>
        }
      />
    </div>
  );
}
