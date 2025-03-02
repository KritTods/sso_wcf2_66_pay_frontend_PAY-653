'use client';
import React from 'react';
import { BaseButton, BaseDialog } from 'wcf-component-lib/src/components';
import { InfoCircle } from 'wcf-component-lib/node_modules/iconoir-react';

export interface PopUpConfirmDeleteProps {
  dataTestId: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function PopUpConfirmDelete({
  dataTestId,
  handleConfirm,
  handleCancel,
  isOpen,
  setIsOpen,
}: PopUpConfirmDeleteProps): React.ReactElement {
  return (
    <BaseDialog
      width='560px'
      themeIcon='danger'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={
        <div className='flex flex-col w-full gap-4'>
          <div id={`${dataTestId}-popUpConfirmDelete-label-title`} className='text-left font-semibold text-3xl'>
            ยืนยันการลบรายการ
          </div>
          <div id={`${dataTestId}-popUpConfirmDelete-label-description`} className='text-left status text-[#4B5760]'>
            กรุณายืนยันการทำรายการอีกครั้ง
          </div>
        </div>
      }
      headerLeftIcon={<InfoCircle />}
      footer={
        <div className='flex justify-center gap-4'>
          <BaseButton
            id={`${dataTestId}-popUpConfirmDelete-button-cancel`}
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
          <BaseButton
            id={`${dataTestId}-popUpConfirmDelete-button-ok`}
            size='large'
            label='ตกลง'
            onClick={() => void handleConfirm()}
          />
        </div>
      }
    />
  );
}
