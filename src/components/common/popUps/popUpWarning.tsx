'use client';
import React from 'react';
import { BaseButton, BaseDialog } from 'wcf-component-lib/src/components';
import { InfoCircle } from 'wcf-component-lib/node_modules/iconoir-react';

export type MSGCodeType = keyof typeof MSG;

const MSG = {
  //default
  '': {
    title: '-',
    description: '-',
  },
  '000': {
    title: 'ไม่สามารถทำรายการได้',
    description: 'กรุณาเพิ่มเช็คอย่างน้อย 1 รายการ',
  },
  '100': {
    title: 'ไม่สามารถทำรายการได้',
    description: 'กรุณาเลือกธนาคารอย่างน้อย 1 รายการ',
  },
  '200': {
    title: 'ไม่สามารถทำรายการได้',
    description: 'กรุณาเพิ่มธนาณัติอย่างน้อย 1 รายการ',
  },
  '001': {
    title: 'จำนวนเงินไม่สอดคล้อง',
    description: 'จำนวนเงินสั่งจ่ายไม่สอดคล้องกับจำนวนเงินที่ต้องจ่าย กรุณาตรวจสอบการทำรายการอีกครั้ง',
  },
  '002': {
    title: 'ต้องการเปลี่ยนวิธีการจ่ายเงินใช่หรือไม่',
    description: 'กรุณายืนยันการทำรายการอีกครั้ง',
  },
  '003': {
    title: 'ต้องการเปลี่ยนช่องทางการจ่ายเงินใช่หรือไม่',
    description: 'กรุณายืนยันการทำรายการอีกครั้ง',
  },
  '004': {
    title: 'บันทึกใบสั่งจ่าย',
    description: 'กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ',
  },
  '005': {
    title: 'รับเงิน ณ สำนักงาน',
    description: 'กรณีรับเงิน ณ สำนักงานไม่สามารถเลือกรายการสั่งจ่ายได้มากกว่า 1 รายการ',
  },
  '006': {
    title: 'จำนวนเงินไม่สอดคล้อง',
    description: 'จำนวนเงินรวมเช็คไม่สอดคล้องกับจำนวนเงินจ่ายตามประกาศ กรุณาตรวจสอบการทำรายการอีกครั้ง',
  },
  '007': {
    title: 'ชื่อบัญชีสั่งจ่ายซ้ำกัน',
    description: 'ชื่อบัญชีสั่งจ่ายใน 1 งวดต้องไม่ซ้ำกัน กรุณาตรวจสอบการทำรายการอีกครั้ง',
  },
};

export interface PopUpWarningProps {
  dataTestId: string;
  handleConfirm: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  code?: MSGCodeType;
  handleCancel?: () => void;
  isCancel?: boolean;
}

export default function PopUpWarning({
  dataTestId,
  handleConfirm,
  isOpen,
  setIsOpen,
  code = '',
  handleCancel,
  isCancel = false,
}: PopUpWarningProps): React.ReactElement {
  return (
    <BaseDialog
      width='560px'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      themeIcon='warning'
      content={
        <div className='flex flex-col w-full gap-4'>
          <div id={`${dataTestId}-popUpWarning-label-title`} className='text-left font-semibold text-3xl'>
            {MSG[code].title}
          </div>
          <div id={`${dataTestId}-popUpWarning-label-description`} className='text-left status text-[#4B5760]'>
            {MSG[code].description}
          </div>
        </div>
      }
      headerLeftIcon={<InfoCircle />}
      footer={
        <div className='flex justify-center gap-4'>
          {isCancel && (
            <BaseButton
              id={`${dataTestId}-popUpWarning-button-cancel`}
              size='large'
              type='cancel'
              label='ยกเลิก'
              onClick={() => {
                void setIsOpen(false);
                if (handleCancel) {
                  void handleCancel();
                }
              }}
            />
          )}
          <BaseButton
            id={`${dataTestId}-popUpWarning-button-ok`}
            size='large'
            label='ตกลง'
            onClick={() => {
              void setIsOpen(false);
              if (handleConfirm) {
                void handleConfirm();
              }
            }}
          />
        </div>
      }
    />
  );
}
