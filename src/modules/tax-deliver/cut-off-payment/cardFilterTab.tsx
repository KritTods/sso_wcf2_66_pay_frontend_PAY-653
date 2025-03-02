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
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffPaymentTaxDeliverSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/tax-deliver/cut-off-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';
import { onlyNumberRule, requiredRule, minRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentTaxDeliverSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      identityNo: values.identityNo,
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
      <BaseForm name='TaxDeliverFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[100px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-identityNo-input-text`}
                    label='เลขที่เตรียมนำส่งภาษี'
                    itemName='identityNo'
                    placeholder='ระบุเลขที่เตรียมนำส่งภาษี'
                    rules={[
                      requiredRule('เลขที่เตรียมนำส่งภาษี'),
                      onlyNumberRule('เลขที่เตรียมนำส่งภาษี'),
                      minRule('เลขที่เตรียมนำส่งภาษี', 10),
                      maxRule('เลขที่เตรียมนำส่งภาษี', 10),
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
                      // { value: 'P', label: 'ธนาณัติ' },
                      //{ value: 'M', label: 'พร้อมเพย์' },
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
