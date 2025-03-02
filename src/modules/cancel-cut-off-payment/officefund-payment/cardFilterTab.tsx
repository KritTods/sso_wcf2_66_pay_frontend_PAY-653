'use client';
import React, { useState } from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseButton, BaseItemDatePicker } from 'wcf-component-lib/src/components';
import { maxRule, minRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cancelCutOffPayOfficeFundSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cancel-cut-off-payment/officefund-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';
export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cancelCutOffPayOfficeFundSelector);
  const [fields, setFields] = useState({ significantNo: '', significantHandNo: '' });

  const handleChange = (field: string, value: string): void => {
    setFields({
      significantNo: field === 'significantNo' ? value : '',
      significantHandNo: field === 'significantHandNo' ? value : '',
    });
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      noticeName: values.noticeName,
      significantNo: values.significantNo,
      significantHandNo: values.significantHandNo,
      payDate: values.payDate ? dayjs(values.payDate).format('YYYY-MM-DD') : '',
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
      <BaseForm name='cancelCutOffPayOfficeFundFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-documentNo-input-text`}
                    label='เลขที่เอกสาร'
                    itemName='documentNo'
                    placeholder='ระบุเลขที่เอกสาร'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-paymentNo-input-text`}
                    label='เลขที่ใบสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่ใบสั่งจ่าย'
                    rules={[minRule('เลขที่ใบสั่งจ่าย', 15), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-noticeName-input-text`}
                    label='จ่ายตามประกาศฉบับที่'
                    itemName='noticeName'
                    placeholder='ระบุระบุประกาศฉบับที่'
                    rules={[minRule('จ่ายตามประกาศฉบับที่', 15), maxRule('จ่ายตามประกาศฉบับที่', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-significantNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงิน'
                    itemName='significantNo'
                    placeholder='ระบุเลขที่ใบสำคัญรับเงิน'
                    rules={[minRule('เลขที่ใบสำคัญรับเงิน', 15), maxRule('เลขที่ใบสำคัญรับเงิน', 15)]}
                    onChangeFunction={(e) => handleChange('significantNo', e.target.value)}
                    disabled={!!fields.significantHandNo}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-significantHandNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    itemName='significantHandNo'
                    placeholder='ระบุเลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    rules={[minRule('เลขที่ใบสำคัญรับเงินชนิดเล่ม', 15), maxRule('เลขที่ใบสำคัญรับเงินชนิดเล่ม', 15)]}
                    onChangeFunction={(e) => handleChange('significantHandNo', e.target.value)}
                    disabled={!!fields.significantNo}
                  />
                </Col>

                <Col {...searchColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-filter-payDate-input-date`}
                    itemName='payDate'
                    label='วันที่ตัดจ่าย'
                    placeholder='เลือกวันที่ตัดจ่าย'
                    rules={[requiredRule('วันที่ตัดจ่าย')]}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div className='grid place-items-end h-20'>
                    <BaseButton
                      id={`${dataTestId}-search-button`}
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
  );
}
