'use client';
import React from 'react';
import { Col, Row, Radio, FormProps, Form } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseItemDateRangePicker,
  BaseButton,
  BaseItemDropdown,
  BaseItemInputNumber,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cancelWrongFundSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cancel-payment/wrongfund-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from '@/utils/dayjs-setup-th';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cancelWrongFundSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      ssoCode: values.ssoCode,
      documentNo: values.documentNo,
      paymentNo:
        values.paymentNo && values.paymentNo[0] && values.paymentNo[1]
          ? [values.paymentNo[0], values.paymentNo[1]]
          : [],
      transactionDate: values.transactionDate,
      amount: values.amount, //จำนวนเงิน
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
    <div>
      <div className='flex p-6 bg-white shadow-sm rounded-xl'>
        <BaseForm name='wrongfund-payment-filter' onFinish={onFinish} initialValues={filter}>
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
                      label='เลขที่เอกสาร'
                      itemName='documentNo'
                      placeholder='ระบุเลขที่เอกสาร'
                      id={`${dataTestId}-documentNo-input-text`}
                      rules={[onlyNumberRule('เลขที่เอกสาร'), minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                    />
                  </Col>
                  <Form.List name='paymentNo'>
                    {() => (
                      <>
                        <Col {...searchColumn}>
                          <p className='text-label mb-2'>เลขที่ใบสั่งจ่าย</p>
                          <div className='flex justify-between items-center gap-4'>
                            <BaseItemInput
                              id={`${dataTestId}-paymentNo-input-text`}
                              itemName={['0']}
                              placeholder='ระบุเลขเริ่มต้น'
                              rules={[
                                minRule('เลขที่ใบสั่งจ่าย', 15),
                                maxRule('เลขที่ใบสั่งจ่าย', 15),
                                ({
                                  getFieldValue,
                                }: {
                                  getFieldValue: (name: string | (string | number)[]) => string;
                                }): { validator(_: unknown, value: string): Promise<void> } => ({
                                  validator(_: unknown, value: string): Promise<void> {
                                    if (!value && getFieldValue('paymentNo')[1]) {
                                      return Promise.reject(
                                        new Error('โปรดระบุข้อมูล เลขที่ใบสั่งจ่าย เริ่ม - สิ้นสุด ให้ครบถ้วน'),
                                      );
                                    }

                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            />
                            <div className='mb-[23px]'>ถึง</div>
                            <BaseItemInput
                              id={`${dataTestId}-paymentNo-input-text`}
                              itemName={['1']}
                              placeholder='สิ้นสุด'
                              rules={[
                                minRule('เลขที่ใบสั่งจ่าย', 15),
                                maxRule('เลขที่ใบสั่งจ่าย', 15),
                                ({
                                  getFieldValue,
                                }: {
                                  getFieldValue: (name: string | (string | number)[]) => string;
                                }): { validator(_: unknown, value: string): Promise<void> } => ({
                                  validator(_: unknown, value: string): Promise<void> {
                                    if (!value && getFieldValue('paymentNo')[0]) {
                                      return Promise.reject(
                                        new Error('โปรดระบุข้อมูล เลขที่ใบสั่งจ่าย เริ่ม - สิ้นสุด ให้ครบถ้วน'),
                                      );
                                    }

                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            />
                          </div>
                        </Col>
                      </>
                    )}
                  </Form.List>
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
                    <BaseItemInputNumber
                      id={`${dataTestId}-amount-input-number`}
                      label='จำนวนเงิน(บาท)'
                      className='w-full text-center'
                      itemName='amount'
                      hideFieldControl={true}
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
                      id={`${dataTestId}-paymentType-selecter`}
                      label='วิธีการชำระเงิน'
                      itemName='paymentType'
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
