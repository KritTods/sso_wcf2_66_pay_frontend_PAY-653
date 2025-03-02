'use client';
import React, { useEffect, useMemo } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseItemDatePicker, BaseButton, BaseItemDropdown } from 'wcf-component-lib/src/components';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { ItemList, getSsoBranchsList, ssoBranchsSelector } from '@/redux/slices/mdm/ssoBranchs';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { searchColumn } from '@/constants/layoutColumn';

export default function CardSearch(): React.ReactElement {
  const [form] = Form.useForm();
  const { list: ssoList, loading: loadingSsoData } = useSelector(ssoBranchsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(
      getSsoBranchsList({
        pagination: {
          pageNumber: 0,
          pageSize: 10000,
          orders: [
            {
              direction: 'DESC',
              property: 'ssoBranchCode',
            },
          ],
        },
      }),
    );
  }, [dispatch]);

  const ssoSelectData = useMemo(() => {
    const result: SelectData[] = [];
    ssoList.map((e: ItemList) => {
      result.push({
        value: e.ssoBranchCode,
        label: `${e.ssoBranchName}`,
      });
    });

    return result;
  }, [ssoList]);

  return (
    <>
      <BaseForm extraForm={form} name={'test'}>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex justify-between items-center'>
              <div className='w-full'>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      label='รหัส สปส.'
                      itemName='ssoBranchCode'
                      // rules={[requiredRule('Bank')]}
                      placeholder='โปรดเลือก'
                      id='DailyPayment-FormSearch-ssoBranchCode'
                      option={ssoSelectData}
                      loading={loadingSsoData}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemDatePicker label='ประจำวันที่' placeholder='เลือกวันที่' />
                  </Col>
                </Row>
              </div>
              <BaseButton icon={<SearchOutlined />} htmlType='submit' label={'ค้นหา'} />
            </div>
          </div>
        </div>
      </BaseForm>
    </>
  );
}
