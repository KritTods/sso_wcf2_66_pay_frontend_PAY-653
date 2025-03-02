'use client';
import React from 'react';
import { Col, Row, Form, Radio, FormProps } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseItemInput, BaseItemDateRangePicker, BaseButton } from 'wcf-component-lib/src/components';
import { SearchOutlined } from '@ant-design/icons';
import { searchColumn } from '@/constants/layoutColumn';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  PrepareBudgetType,
  cutOffPaySelector,
  setFilter,
  FilterSearchForm,
} from '@/store-redux/slices/reserve/cut-off-pay';
import dayjs from 'dayjs';

export default function CardSearch(): React.ReactElement {
  const dataTestId = 'page-cutoffpay-search';
  const { filter, loadingBtnSearch } = useSelector(cutOffPaySelector);
  const dispatch = useAppDispatch();

  const onFinish: FormProps<FilterSearchForm>['onFinish'] = (values) => {
    const searchObj = {
      paymentNo: values.paymentNo,
      documentNo: values.documentNo,
      advancePaymentType: values.advancePaymentType,
      transactionDateGreaterEqual: values.payDate ? dayjs(values.payDate[0]).format('YYYY-MM-DD') : '',
      transactionDateLesserEqual: values.payDate ? dayjs(values.payDate[1]).format('YYYY-MM-DD') : '',
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };

    //เซ็ตค่า filter ที่ส่งเข้ามาจาก action
    void dispatch(setFilter(searchObj));
  };

  return (
    <>
      <BaseForm name={'cutoffpay-search'} onFinish={onFinish} initialValues={filter}>
        <div className='flex flex-col justify-center items-center gap-4 pb-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[175px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-paymentNo-input`}
                    label='เลขที่คำสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่คำสั่งจ่าย'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-payDate-input`}
                    label='เลขที่เอกสาร'
                    itemName='documentNo'
                    placeholder='ระบุเลขที่เอกสาร'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDateRangePicker
                    label='วันที่เตรียมจ่าย'
                    itemName='payDate'
                    id={`${dataTestId}-payDate-date`}
                    placeholder={['เริ่มต้น', 'สิ้นสุด']}
                  />
                </Col>
              </Row>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-label mb-2' id={`${dataTestId}-advancePaymentType-label`}>
                    ประเภทเบิกเงินรองจ่าย
                  </p>
                  <Form.Item<PrepareBudgetType> name='advancePaymentType' id={`${dataTestId}-advancePaymentType-text`}>
                    <Radio.Group className='h-[48px]' optionType='button' text-lg font-boldtyle='solid'>
                      <div className='flex gap-4 h-full'>
                        <Radio.Button
                          id={`${dataTestId}-advancePaymentType-radio-W`}
                          className='!h-full flex justify-center items-center'
                          value={'W'}
                          checked={true}
                        >
                          เบิกเงินรองจ่าย
                        </Radio.Button>
                        <Radio.Button
                          className='!h-full flex justify-center items-center '
                          id={`${dataTestId}-advancePaymentType-radio-B`}
                          value={'B'}
                        >
                          ยืมเงินระหว่างวัน
                        </Radio.Button>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <BaseButton
                  className='!min-w-[200px]'
                  size='middle'
                  loading={loadingBtnSearch}
                  icon={<SearchOutlined />}
                  htmlType='submit'
                  label={'ค้นหา'}
                />
              </div>
            </div>
          </div>
        </div>
      </BaseForm>
    </>
  );
}
