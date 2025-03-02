'use client';
import React from 'react';
import { BaseForm, BaseItemInput } from 'wcf-component-lib/src/components';

export default function CardDataSummary(): React.ReactElement {
  return (
    <BaseForm>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>สรุปข้อมูล</p>
            <div className='flex flex-row justify-between items-center gap-4'>
              <p className='text-display text-[#779097]'>ยอดคงเหลือยกมา</p>
              <p className='text-display'>21,003.00</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-4'>
              <p className='text-display text-[#779097]'>รายการเบิกเงินรองจ่าย</p>
              <p className='text-display'>150,000.00</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-4'>
              <div className='flex flex-row'>
                <p className='text-display text-[#779097] pr-2'>ปรับปรุงเงินคงเหลือประจำวัน</p>
                <p className='text-display'>0 รายการ</p>
              </div>
              <p className='text-display'>0.00</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-4'>
              <div className='flex flex-row'>
                <p className='text-display text-[#779097] pr-2'>จ่ายเงินทดแทนวันนี้</p>
                <p className='text-display'>2 รายการ</p>
              </div>
              <p className='text-display'>6,811.00</p>
            </div>
            <div className='flex flex-row justify-between items-center gap-4'>
              <p className='text-display text-[#779097]'>นำเงินรองจ่ายฝากธนาคาร</p>
              <p className='text-display'>
                <BaseItemInput itemName='payeeName' placeholder='0.00' className='text-right' />
              </p>
            </div>
            <hr />
            <div className='flex flex-row justify-between items-center gap-4'>
              <p className='text-display'>ยอดเงินรองจ่ายคงเหลือยกไป</p>
              <p className='header-card'>164,192.00</p>
            </div>
          </div>
        </div>
      </div>
    </BaseForm>
  );
}
