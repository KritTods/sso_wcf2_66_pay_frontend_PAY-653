'use client';
import React, { useState } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemDatePicker,
  BaseItemInputNumber,
  BaseItemTextArea,
  BaseItemDropdown,
  BaseButton,
  BaseToastNotification,
  BaseDialog,
} from 'wcf-component-lib/src/components';
import dayjs from 'dayjs';
import { DateFormat } from 'wcf-component-lib/src/constants/date-format.constant';

import { useRouter } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { DownloadSquare } from 'wcf-component-lib/node_modules/iconoir-react';

interface DataInitType {
  value1: string;
  value2: string;
  value3: number;
  value4: number;
  value5: number;
  value6: string;
}

export default function CashCalanceDailyForm(): React.ReactElement {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกเตรียมจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(URL.reserve.cutOffPayForm.url);

    //close modal
    setIsOpenConfirmModal(false);
  };

  const handleCancel = (): void => {
    setIsOpenConfirmModal(false);
  };

  const DATA_INIT: DataInitType = {
    value1: dayjs().format(DateFormat.YYYYMMDD),
    value2: '',
    value3: 100000,
    value4: 0,
    value5: 0,
    value6: '',
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>P00006700000E3</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่ทำรายการ</p>
                  <p className='text-display'>31/12/2567</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <BaseForm initialValues={DATA_INIT} extraForm={form} name={'prepare'}>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'>ปรับปรุงรายงานเงินคงเหลือประจำวัน</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemDatePicker itemName='value1' label='วันที่ต้องการแก้ไข' placeholder='วันที่ต้องการแก้ไข' />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemDropdown
                    label='ประเภทการจ่าย'
                    itemName='value2'
                    // rules={[requiredRule('Bank')]}
                    placeholder='เลือกประเภทการจ่าย'
                    id=''
                    option={[]}
                    loading={false}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    itemName={'value3'}
                    label='ยอดยกไปเดิม'
                    disabled
                    placeholder='0.00'
                    id='value3-form'
                    // rules={[{ required: true, message: 'กรุณากรอก' }]}
                    className='w-full text-right'
                    step={1}
                    hideFieldControl={true}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    itemName={'value4'}
                    label={'ยอดเงินที่ต้องการปรับปรุงบัญชี'}
                    placeholder='0.00'
                    id='value4-form'
                    // rules={[{ required: true, message: 'กรุณากรอก' }]}
                    className='w-full text-right'
                    step={1}
                    hideFieldControl={true}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    itemName={'value5'}
                    label='ยอดยกไปใหม่'
                    placeholder='0.00'
                    id='value5-form'
                    // rules={[{ required: true, message: 'กรุณากรอก' }]}
                    className='w-full text-right'
                    step={1}
                    hideFieldControl={true}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col lg={24} xl={24}>
                  <BaseItemTextArea itemName='value6' label='หมายเหตุ' placeholder='ระบุหมายเหตุ' />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseForm>

      <div className='flex justify-center items-center'>
        <BaseButton size='middle' label='บันทึก' className='w-[240px]' onClick={() => setIsOpenConfirmModal(true)} />
        <BaseDialog
          width='560px'
          isOpen={isOpenConfirmModal}
          setIsOpen={setIsOpenConfirmModal}
          content={
            <div className='flex flex-col w-full gap-4'>
              <div className='text-left font-semibold text-3xl'>บันทึกเตรียมจ่ายใช่หรือไม่?</div>
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
    </div>
  );
}
