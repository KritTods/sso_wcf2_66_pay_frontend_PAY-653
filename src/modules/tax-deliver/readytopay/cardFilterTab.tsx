'use client';
import { Bank, HomeSale, DeliveryTruck } from 'wcf-component-lib/node_modules/iconoir-react';
import { useAppDispatch } from '@/store-redux/store';
import React, { useState } from 'react';
import { Col, Row, FormProps, TabsProps, Form, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseButton, BaseItemDropdown, BaseTabs, BaseItemDatePicker } from 'wcf-component-lib/src/components';
import { SearchOutlined } from '@ant-design/icons';
import {
  FilterSearchType,
  clearFilter,
  readyToPaySelector,
  setFilter,
} from '@/store-redux/slices/tax-deliver/readytopay';
import { useSelector } from 'react-redux';
import { PayType } from '@/types/payType';
import dayjs from '@/utils/dayjs-setup';
import buddhistEra from 'dayjs/plugin/buddhistEra'; // ใช้แปลงเป็น พ.ศ.
import 'dayjs/locale/th';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [tabActive, setTabActive] = useState<PayType>('X');
  // const [tabActive, setTabActive] = useState<'X' | 'T' | 'S'>('X');  // ตั้งค่าเริ่มต้นเป็น 'X'
  const { filter } = useSelector(readyToPaySelector);

  const items: TabsProps['items'] = [
    {
      key: 'X',
      label: (
        <div className='flex justify-center gap-2'>
          <Bank />
          <span>รับเงิน ณ สำนักงาน</span>
        </div>
      ),
    },
    {
      key: 'T',
      label: (
        <div className='flex justify-center gap-2'>
          <HomeSale />
          <span>โอนผ่านธนาคารโดยจังหวัด</span>
        </div>
      ),
    },
    {
      key: 'S',
      label: (
        <div className='flex justify-center gap-2'>
          <DeliveryTruck />
          <span>ส่งเช็คทางไปรษณีย์</span>
        </div>
      ),
    },
    // {
    //   key: 'P',
    //   label: (
    //     <div className='flex justify-center gap-2'>
    //       <MoneySquare />
    //       <span>ธนาณัติ</span>
    //     </div>
    //   ),
    // },
  ];

  // const handleChangeTab = (key: PayType, form: FormInstance): void => {
  //   // เปลี่ยน tab update state tabActive
  //   setTabActive(key);

  //   // ล้าง data in table from filter ที่เลือก
  //   dispatch(clearFilter());
  //   form.resetFields();

  //   //clear result filter
  //   dispatch(clearFilter());
  // };

  // อัปเดตฟังก์ชัน handleChangeTab เพื่อให้สถานะของ tab และ dropdown สอดคล้องกัน
  const handleChangeTab = (key: PayType, form: FormInstance): void => {
    setTabActive(key);  // อัปเดตสถานะ tab
    dispatch(clearFilter());
    form.resetFields();
    dispatch(clearFilter());
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {

      paymentNo: values.paymentNo,
      paymentType: tabActive,
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

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  dayjs.extend(buddhistEra);
  dayjs.locale('th'); // ตั้งค่าให้ใช้ภาษาไทย  

  return (
    <div>
      <BaseTabs
        defaultActiveKey={tabActive}
        items={items}
        onChange={(key: string) => handleChangeTab(key as PayType, form)}
      />
      <div className='flex p-6 bg-white shadow-sm rounded-b-xl'>
        <BaseForm name='filter' extraForm={form} onFinish={onFinish} initialValues={{ filter }}>
          <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[100px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  {/* <Col {...searchColumn}>
                    <BaseItemDatePicker
                      label='วันที่ตัดจ่าย'
                      onChange={onChange} 
                      picker="month" 
                      placeholder="เลือกเดือน"
                      format='MMMM'
                    />
                  </Col>
                  <Col {...searchColumn}>
                  <BaseItemDatePicker
                    label="เลือกปี"
                    onChange={onChange}
                    picker="year"
                    placeholder="เลือกปี"
                    format="BBBB" // ใช้ 'BBBB' สำหรับแสดงปี พ.ศ.
                    disabledDate={(current) => {
                      const now = dayjs();
                      const minYear = now.year() - 5;
                      
                      return current.year() < minYear;
                    }}
                  />
                  </Col> */}
                  
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
                  <Col {...searchColumn}>
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
