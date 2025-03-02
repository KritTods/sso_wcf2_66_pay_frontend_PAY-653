'use client';
import React from 'react';
import { Col, Row, Radio, FormProps, Form } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseButton,
  BaseItemDropdown,
  BaseItemDateRangePicker,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffPaymentWrongFundSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/wrongfund-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from '@/utils/dayjs-setup-th';

export default function CardFilterSearch({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentWrongFundSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      transactionDate: values.transactionDate,
      advancePaymentType: values.advancePaymentType, //ประเภทเบิกเงินรองจ่าย
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
    <div className='flex p-6 bg-white shadow-sm rounded-lg'>
      <BaseForm name='wrongfund-payment-filter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-lg flex flex-row gap-4'>
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
                  <BaseItemDateRangePicker
                    id={`${dataTestId}-transactionDate-input-date`}
                    itemName='transactionDate'
                    label='วันที่เตรียมจ่าย'
                    placeholder={['เริ่มต้น', 'สิ้นสุด']}
                    minDate={dayjs().startOf('year')}
                    maxDate={dayjs().endOf('year')}
                  />
                </Col>
                <Col {...searchColumn}>
                  <div>
                    <p className='text-label mb-2' id={`${dataTestId}-advancePaymentType-label`}>
                      ประเภทการจ่าย/รับ
                    </p>
                    <Form.Item<FilterSearchType> name='advancePaymentType'>
                      <Radio.Group className='h-[48px] w-full' optionType='button' text-lg font-boldtyle='solid'>
                        <div className='flex gap-4 h-full w-full'>
                          <Radio.Button className='!h-full !w-full flex justify-center items-center' value={'PAY'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-PAY`}> งานเงินจ่าย</div>
                          </Radio.Button>
                          <Radio.Button className='!h-full !w-full flex justify-center items-center' value={'FIN'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-FIN`}> งานเงินรับ</div>
                          </Radio.Button>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </div>
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
