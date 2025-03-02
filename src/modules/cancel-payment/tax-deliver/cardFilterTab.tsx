'use client';

import { useAppDispatch } from '@/store-redux/store';
import React from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseItemDateRangePicker,
  BaseButton,
  BaseItemDropdown,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { cancelTaxDeliverSelector, setFilter, FilterSearchType } from '@/store-redux/slices/cancel-payment/tax-deliver';
import dayjs from 'wcf-component-lib/src/components/v2/BaseItemDatePicker/dayjs-config-th';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cancelTaxDeliverSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      ssoCode: values.ssoCode,
      documentNo: values.documentNo,
      hospitalNo: values.hospitalNo,
      transactionDate: values.transactionDate,
      payType: values.payType,
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
        <BaseForm name='tax-deliver-filter' onFinish={onFinish} initialValues={filter}>
          <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      id={`${dataTestId}-ssoCode-selecter`}
                      rules={[requiredRule('รหัส สปส.')]}
                      disabled
                      label='รหัส สปส.'
                      itemName='ssoCode'
                      placeholder='เลือกรหัส สปส.'
                      option={[{ value: '1050', label: '1050' }]}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-documentNo-input-text`}
                      label='เลขที่เอกสาร'
                      itemName='documentNo'
                      placeholder='ระบุเลขที่เอกสาร'
                      rules={[onlyNumberRule('เลขที่เอกสาร'), minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-employerAccountNumber-input-text`}
                      label='เลขที่หนังสือรับรอง'
                      itemName='hospitalNo'
                      placeholder='ระบุเลขที่หนังสือรับรอง'
                    />
                  </Col>
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
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      id={`${dataTestId}-payType-selecter`}
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
