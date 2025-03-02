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
import { maxRule, minRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffPaymentRefundToEmployerSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/refund-to-employer';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';

export default function CardFilterSearch({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentRefundToEmployerSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      transactionDate: values.transactionDate ? dayjs(values.transactionDate).format('YYYY-MM-DD') : '',
      employerAccountNumber: values.employerAccountNumber,
      barnchCode: values.employerAccountNumber,
      companyName: values.employerAccountNumber,
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
      <BaseForm name='RefundToEmployerFilter' onFinish={onFinish} initialValues={filter}>
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
                    rules={[onlyNumberRule('เลขที่เอกสาร'), minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-paymentNo-input-text`}
                    label='เลขที่ใบสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่ใบสั่งจ่าย'
                    rules={[
                      onlyNumberRule('ระบุเลขที่ใบสั่งจ่าย'),
                      minRule('เลขที่ใบสั่งจ่าย', 15),
                      maxRule('เลขที่ใบสั่งจ่าย', 15),
                    ]}
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
                    ]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-employerAccountNumber-input-text`}
                    label='เลขที่บัญชีนายจ้าง'
                    itemName='employerAccountNumber'
                    placeholder='ระบุเลขที่บัญชีนายจ้าง'
                    rules={[
                      onlyNumberRule('ระบุเลขที่บัญชีนายจ้าง'),
                      minRule('เลขที่บัญชีนายจ้าง', 10),
                      maxRule('เลขที่บัญชีนายจ้าง', 10),
                    ]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-barnchCode-input-text`}
                    label='ลำดับที่สาขา'
                    itemName='barnchCode'
                    placeholder='ระบุลำดับที่สาขา'
                    rules={[onlyNumberRule('ระบุลำดับที่สาขา'), minRule('ลำดับที่สาขา', 4), maxRule('ลำดับที่สาขา', 4)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-companyName-input-text`}
                    label='ชื่อสถานประกอบการ'
                    itemName='companyName'
                    placeholder='ระบุชื่อสถานประกอบการ'
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
