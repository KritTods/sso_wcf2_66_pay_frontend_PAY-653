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
import { maxRule, minRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cutOffPaymentHospitalSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/hospital-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentHospitalSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      accidentIssueCode: values.accidentIssueCode,
      transactionDate: values.transactionDate ? dayjs(values.transactionDate).format('YYYY-MM-DD') : '',
      payType: values.payType,
      hospitalName: values.hospitalName,
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
      <BaseForm name='hospitalPaymentFilter' onFinish={onFinish} initialValues={filter}>
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
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-accidentIssueCode-input-text`}
                    label='เลขประสบอันตราย'
                    itemName='accidentIssueCode'
                    placeholder='ระบุเลขประสบอันตราย'
                    rules={[minRule('เลขประสบอันตราย', 13), maxRule('เลขประสบอันตราย', 13)]}
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
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <BaseItemDropdown
                    id={`${dataTestId}-hospitalName-selecter`}
                    label='ชื่อโรงพยาบาล'
                    itemName='hospitalName'
                    option={[{ value: '11560', label: 'โรงพยาบาลทั่วไปขนาดใหญ่เปาโล' }]}
                    placeholder='ค้นหาชื่อโรงพยาบาล'
                  />
                </Col>

                <Col span={12}>
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
