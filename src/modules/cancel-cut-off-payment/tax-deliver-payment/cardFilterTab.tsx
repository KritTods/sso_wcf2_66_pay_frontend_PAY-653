'use client';
import React, { useState } from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseButton, BaseItemDropdown } from 'wcf-component-lib/src/components';
import { maxRule, minRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cancelCutOffPayTaxDeliverSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cancel-cut-off-payment/tax-deliver';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';
export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cancelCutOffPayTaxDeliverSelector);
  const [fields, setFields] = useState({ significantNo: '', significantHandNo: '' });

  const handleChange = (field: string, value: string): void => {
    setFields({
      significantNo: field === 'significantNo' ? value : '',
      significantHandNo: field === 'significantHandNo' ? value : '',
    });
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      significantNo: values.significantNo,
      significantHandNo: values.significantHandNo,
      payDateStart: {
        month: values.payDateStartM ? dayjs().format('MM') : '',
        year: values.payDateStartY ? dayjs().format('YYYY') : '',
      },
      payDateEnd: {
        month: values.payDateEndM ? dayjs().format('MM') : '',
        year: values.payDateEndY ? dayjs().format('YYYY') : '',
      },
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };
    console.log('searchObj', searchObj);
    void dispatch(setFilter(searchObj));
  };

  return (
    <div className='flex p-6 bg-white shadow-sm rounded-xl'>
      <BaseForm name='cancelCutOffPayTaxDeliverFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
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
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={3}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-payDateStartM-input-date`}
                    itemName='payDateStartM'
                    label='วันที่ตัดจ่าย (เริ่มต้น)'
                    placeholder='เลือกเดือน'
                    option={[
                      { value: '01', label: 'มกราคม' },
                      { value: '02', label: 'กุมภาพันธ์' },
                      { value: '03', label: 'มีนาคม' },
                      { value: '04', label: 'เมษายน' },
                      { value: '05', label: 'พฤษภาคม' },
                      { value: '06', label: 'มิถุนายน' },
                      { value: '07', label: 'กรกฎาคม' },
                      { value: '08', label: 'สิงหาคม' },
                      { value: '09', label: 'กันยายน' },
                      { value: '10', label: 'ตุลาคม' },
                      { value: '11', label: 'พฤศจิกายน' },
                      { value: '12', label: 'ธันวาคม' },
                    ]}
                    rules={[requiredRule('วันที่ตัดจ่าย')]}
                  />
                </Col>
                <Col span={3}>
                  <BaseItemDropdown
                    className='mt-8'
                    id={`${dataTestId}-filter-payDateStartY-input-date`}
                    itemName='payDateStartY'
                    placeholder='เลือกปี'
                    option={Array.from({ length: 10 }, (_, i) => {
                      const yearCE = new Date().getFullYear() - i; // ค.ศ.
                      const yearBE = yearCE + 543; // แปลงเป็น พ.ศ.

                      return { value: `${yearCE}`, label: `${yearBE}` };
                    })}
                    rules={[requiredRule('ปีที่ตัดจ่าย')]}
                  />
                </Col>
                <Col span={3}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-payDateEndM-input-date`}
                    itemName='payDateEndM'
                    label='วันที่ตัดจ่าย (สิ้นสุด)'
                    placeholder='เลือกเดือน'
                    option={[
                      { value: '01', label: 'มกราคม' },
                      { value: '02', label: 'กุมภาพันธ์' },
                      { value: '03', label: 'มีนาคม' },
                      { value: '04', label: 'เมษายน' },
                      { value: '05', label: 'พฤษภาคม' },
                      { value: '06', label: 'มิถุนายน' },
                      { value: '07', label: 'กรกฎาคม' },
                      { value: '08', label: 'สิงหาคม' },
                      { value: '09', label: 'กันยายน' },
                      { value: '10', label: 'ตุลาคม' },
                      { value: '11', label: 'พฤศจิกายน' },
                      { value: '12', label: 'ธันวาคม' },
                    ]}
                    rules={[requiredRule('วันที่ตัดจ่าย')]}
                  />
                </Col>
                <Col span={3}>
                  <BaseItemDropdown
                    className='mt-8'
                    id={`${dataTestId}-filter-payDateEndY-input-date`}
                    itemName='payDateEndY'
                    placeholder='เลือกปี'
                    option={Array.from({ length: 10 }, (_, i) => {
                      const yearCE = new Date().getFullYear() - i; // ค.ศ.
                      const yearBE = yearCE + 543; // แปลงเป็น พ.ศ.

                      return { value: `${yearCE}`, label: `${yearBE}` };
                    })}
                    rules={[requiredRule('ปีที่ตัดจ่าย')]}
                  />
                </Col>
                <Col span={12}>
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
  );
}
