'use client';
import { searchColumn } from '@/constants/layoutColumn';
import { controlRegistrationMedSelector, FilterSearchType, setFilter } from '@/store-redux/slices/control-registration/med';

import { useAppDispatch } from '@/store-redux/store';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, FormProps, Row } from 'wcf-component-lib/node_modules/antd';
import {
  BaseButton,
  BaseForm,
  BaseItemDateRangePicker,
  BaseItemDropdown,
  BaseItemInput
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(controlRegistrationMedSelector);
  




  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      receiptNo: values.receiptNo,
      significantHandNo: values.significantHandNo,
      payDate: values.payDate ? dayjs(values.payDate).format('YYYY-MM-DD') : '',
      status: values.status,
      doctorCode: values.doctorCode,
      fullName: values.fullName,
      citizenId: values.citizenId,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };

    void dispatch(setFilter(searchObj));
  };

  return (
    <div className='flex p-6 bg-white shadow-sm rounded-xl'>
      <BaseForm name='cutOffPaymentDoctorSalaryFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-documentNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงิน'
                    itemName='receiptNo'
                    placeholder='ระบุเลขที่ใบสำคัญรับเงิน'
                    rules={[minRule('เลขที่ใบสำคัญรับเงิน', 15), maxRule('เลขที่ใบสำคัญรับเงิน', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-paymentNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    itemName='significantHandNo'
                    placeholder='เลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDateRangePicker
                    id={`${dataTestId}-filter-payDate-input-date`}
                    itemName='payDate'
                    label='วันที่ตัดจ่าย'
                    placeholder={['เริ่มต้น', 'สิ้นสุด']}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-status-select`}
                    label='สถานะ'
                    itemName='status'
                    option={[
                      {
                        label: 'จ่ายแล้ว',
                        value: 'A',
                      },
                      {
                        label: 'ยกเลิก',
                        value: 'U',
                      },
                      {
                        label: 'โอนกลับ',
                        value: 'B',
                      },
                    ]}
                    placeholder='เลือกสถานะ'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-doctorCode-input-text`}
                    label='รหัสแพทย์'
                    itemName='doctorCode'
                    placeholder='รหัสแพทย์'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-fullName-input-text`}
                    label='ชื่อ-นามสกุล'
                    itemName='fullName'
                    placeholder='ชื่อ-นามสกุล'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-citizenId-input-text`}
                    label='เลขบัตรประชาชน'
                    itemName='citizenId'
                    placeholder='เลขบัตรประชาชน'
                    rules={[
                      onlyNumberRule('เลขบัตรประชาชน'),
                      minRule('เลขบัตรประชาชน', 13),
                      maxRule('เลขบัตรประชาชน', 13),
                    ]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <div className='grid place-items-end h-20'>
                    <BaseButton
                      id={`${dataTestId}-filter-button-search`}
                      className='!min-w-[200px]'
                      size='middle'
                      icon={<SearchOutlined />}
                      htmlType='submit'
                      label={'ค้นหา'}
                      loading={false}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
