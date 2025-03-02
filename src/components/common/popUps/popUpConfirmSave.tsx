'use client';
import React from 'react';
import { BaseButton, BaseDialog } from 'wcf-component-lib/src/components';
import { DownloadSquare } from 'wcf-component-lib/node_modules/iconoir-react';

export interface PopUpConfirmSaveProps {
  dataTestId: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function PopUpConfirmSave({
  dataTestId,
  handleConfirm,
  handleCancel,
  isOpen,
  setIsOpen,
}: PopUpConfirmSaveProps): React.ReactElement {
  return (
    <BaseDialog
      width='560px'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={
        <div className='flex flex-col w-full gap-4'>
          <div id={`${dataTestId}-popUpConfirmSave-label-title`} className='text-left font-semibold text-3xl'>
            บันทึกข้อมูลใช่หรือไม่?
          </div>
          <div id={`${dataTestId}-popUpConfirmSave-label-description`} className='text-left status text-[#4B5760]'>
            กรุณายืนยันการทำรายการอีกครั้ง
          </div>
        </div>
      }
      headerLeftIcon={<DownloadSquare />}
      footer={
        <div className='flex justify-center gap-4'>
          <BaseButton
            id={`${dataTestId}-popUpConfirmSave-button-cancel`}
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
            id={`${dataTestId}-popUpConfirmSave-button-save`}
            size='large'
            label='บันทึก'
            onClick={() => void handleConfirm()}
          />
        </div>
      }
    />
  );
}
