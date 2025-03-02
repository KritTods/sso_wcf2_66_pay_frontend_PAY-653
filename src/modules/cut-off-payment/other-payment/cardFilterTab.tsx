'use client';
import React from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseItemDatePicker,
  BaseButton,
  BaseItemDropdown,
} from 'wcf-component-lib/src/components';
import { maxRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffPaymentOtherSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/other-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentOtherSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      transactionDate: values.transactionDate ? dayjs(values.transactionDate).format('YYYY-MM-DD') : '',
      payType: values.payType,
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
      <BaseForm name='otherPaymentFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-documentNo-input-text`}
                    label='เลขที่เอกสาร'
                    itemName='documentNo'
                    placeholder='ระบุเลขที่เอกสาร'
                    rules={[maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-paymentNo-input-text`}
                    label='เลขที่ใบสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่ใบสั่งจ่าย'
                    rules={[onlyNumberRule('เลขที่ใบสั่งจ่าย'), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-filter-transactionDate-input-date`}
                    itemName='transactionDate'
                    label='วันที่เตรียมจ่าย'
                    placeholder='เลือกวันที่เตรียมจ่าย'
                  />
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-payType-select`}
                    label='วิธีการชำระเงิน'
                    itemName='payType'
                    placeholder='เลือกวิธีการชำระเงิน'
                    option={[
                      { value: 'X', label: 'จ่ายเงิน ณ สำนักงาน' },
                      { value: 'T', label: 'โอนผ่านธนาคารโดยจังหวัด' },
                      { value: 'S', label: 'ส่งเช็คทางไปรษณีย์' },
                      { value: 'P', label: 'ธนาณัติ' },
                      //{ value: 'M', label: 'พร้อมเพย์' },
                    ]}
                  />
                </Col>
                <Col span={18}>
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
