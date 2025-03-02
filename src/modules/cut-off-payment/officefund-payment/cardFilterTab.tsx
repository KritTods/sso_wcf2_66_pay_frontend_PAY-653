'use client';
import { useAppDispatch } from '@/store-redux/store';
import React from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseItemDateRangePicker, BaseButton } from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffOfficeFundPaymentSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/officefund-payment';
import dayjs from '@/utils/dayjs-setup-th';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffOfficeFundPaymentSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    console.log('values', values);
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      noticeName: values.noticeName,
      transactionDate: values.transactionDate,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };
    // //เซ็ตค่า filter ที่ส่งเข้ามาจาก action
    void dispatch(setFilter(searchObj));
  };

  return (
    <div>
      <div className='flex p-6 bg-white shadow-sm rounded-xl'>
        <BaseForm name='office-fund-filter' onFinish={onFinish} initialValues={filter}>
          <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      label='เลขที่เอกสาร'
                      itemName='documentNo'
                      placeholder='ระบุเลขที่เอกสาร'
                      id={`${dataTestId}-documentNo-input-text`}
                      rules={[onlyNumberRule('เลขที่เอกสาร'), minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-paymentNo-input-text`}
                      label='เลขที่ใบสั่งจ่าย'
                      itemName='paymentNo'
                      placeholder='ระบุเลขที่ใบสั่งจ่าย'
                      rules={[onlyNumberRule('เลขที่ใบสั่งจ่าย'), minRule('เลขที่ใบสั่งจ่าย', 15), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                    />
                  </Col>

                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-noticeName-input-text`}
                      label='จ่ายตามประกาศฉบับที่'
                      itemName='noticeName'
                      placeholder='ระบุจ่ายตามประกาศฉบับที่'
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemDateRangePicker
                      id={`${dataTestId}-transactionDate-input-date`}
                      itemName='transactionDate'
                      label='วันที่เตรียมจ่าย'
                      placeholder={['เริ่มต้น', 'สิ้นสุด']}
                      minDate={dayjs().startOf('year')}
                      maxDate={dayjs().endOf('year')}
                    />
                  </Col>
                  <Col span={18}>
                    <div className='grid place-items-end h-20'>
                      <BaseButton
                        className='!min-w-[200px]'
                        size='middle'
                        icon={<SearchOutlined />}
                        htmlType='submit'
                        label={'ค้นหา'}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </BaseForm>
      </div>
    </div>
  );
}
