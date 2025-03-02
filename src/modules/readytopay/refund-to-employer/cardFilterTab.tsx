'use client';
import { Bank, HomeSale, DeliveryTruck, MoneySquare } from 'wcf-component-lib/node_modules/iconoir-react';
import { useAppDispatch } from '@/store-redux/store';
import React, { useEffect, useState, useMemo } from 'react';
import { Col, Row, FormProps, TabsProps, Form, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { searchColumn, column12 } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseButton, BaseItemDropdown, BaseTabs } from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import {
  FilterSearchType,
  clearFilter,
  initFilter,
  refundToEmployerSelector,
  setFilter,
} from '@/store-redux/slices/readytopay/refund-to-employer';
import { useSelector } from 'react-redux';
import { PayType } from '@/types/payType';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';
import { getBankList, bankSelector, BankItem } from '@/redux/slices/mdm/bank';
import { SelectData } from 'wcf-component-lib/src/constants/interface';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [tabActive, setTabActive] = useState<PayType>('X');
  const { loading } = useSelector(refundToEmployerSelector);
  const {
    stateLayout: { branch },
  } = useLayout();

  //first load set ssoCode from user login branch
  useEffect(() => {
    if (!branch) return;
    form.setFieldsValue({ ssoCode: branch });
  }, [branch, form, tabActive]);

  const { list: bankList, loading: loadingBankData } = useSelector(bankSelector);
  useEffect(() => {
    void dispatch(
      getBankList({
        data: {
          pagination: {
            pageNumber: 0,
            pageSize: 10000,
            orders: [
              {
                direction: 'DESC',
                property: 'bankCode',
              },
            ],
          },
        },
      }),
    );
  }, [dispatch]);

  const bankSelectData = useMemo(() => {
    const result: SelectData[] = [];
    bankList.map((e: BankItem) => {
      result.push({
        value: e.bankCode,
        label: `${e.bankCode} : ${e.bankName}`,
      });
    });

    return result;
  }, [bankList]);

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
    {
      key: 'P',
      label: (
        <div className='flex justify-center gap-2'>
          <MoneySquare />
          <span>ธนาณัติ</span>
        </div>
      ),
    },
  ];

  const handleChangeTab = (key: PayType, form: FormInstance): void => {
    // เปลี่ยน tab update state tabActive
    setTabActive(key);

    // ล้าง data in table from filter ที่เลือก
    dispatch(clearFilter());
    form.resetFields();

    //clear result filter
    dispatch(clearFilter());
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      ssoCode: values.ssoCode,
      paymentNo: values.paymentNo,
      employerAccountNumber: values.employerAccountNumber,
      branchSequence: values.branchSequence,
      companyName: values.companyName,
      bankCode: values.bankCode,
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

  return (
    <div>
      <BaseTabs
        defaultActiveKey={tabActive}
        items={items}
        onChange={(key: string) => handleChangeTab(key as PayType, form)}
      />
      <div className='flex p-6 bg-white shadow-sm rounded-b-xl'>
        <BaseForm name='refundToEmployerFilter' extraForm={form} onFinish={onFinish} initialValues={initFilter}>
          <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-ssoCode-input-text`}
                      itemName='ssoCode'
                      label='รหัส สปส.'
                      placeholder='ระบุรหัส สปส.'
                      disabled
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-paymentNo-input-text`}
                      label='เลขที่ใบสั่งจ่าย'
                      itemName='paymentNo'
                      placeholder='ระบุเลขที่ใบสั่งจ่าย'
                      rules={[minRule('เลขที่ใบสั่งจ่าย', 15), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-employerAccountNumber-input-text`}
                      label='เลขที่บัญชีนายจ้าง'
                      itemName='employerAccountNumber'
                      placeholder='ระบุเลขที่บัญชีนายจ้าง'
                      rules={
                        ['S'].includes(tabActive)
                          ? [
                              requiredRule('เลขที่บัญชีนายจ้าง'),
                              onlyNumberRule('เลขที่บัญชีนายจ้าง'),
                              minRule('เลขที่บัญชีนายจ้าง', 10),
                              maxRule('เลขที่บัญชีนายจ้าง', 10),
                            ]
                          : [
                              onlyNumberRule('เลขที่บัญชีนายจ้าง'),
                              minRule('เลขที่บัญชีนายจ้าง', 10),
                              maxRule('เลขที่บัญชีนายจ้าง', 10),
                            ]
                      }
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-branchSequence-input-text`}
                      label='ลำดับที่สาขา'
                      itemName='branchSequence'
                      placeholder='ระบุลำดับที่สาขา'
                      rules={[onlyNumberRule('ลำดับที่สาขา'), minRule('ลำดับที่สาขา', 4), maxRule('ลำดับที่สาขา', 4)]}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-companyName-input-text`}
                      label='ชื่อสถานประกอบการ'
                      itemName='companyName'
                      placeholder='ระบุชื่อสถานประกอบการ'
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      id={`${dataTestId}-bankCode-selecter`}
                      label='ธนาคาร'
                      itemName='bankCode'
                      placeholder='เลือกธนาคาร'
                      rules={tabActive === 'T' ? [requiredRule('ธนาคาร')] : []}
                      option={bankSelectData}
                      loading={loadingBankData}
                      disabled={tabActive !== 'T'}
                    />
                  </Col>
                  <Col {...column12}>
                    <div className='grid place-items-end h-20'>
                      <BaseButton
                        id={`${dataTestId}-search-button`}
                        className='!min-w-[200px]'
                        size='middle'
                        icon={<SearchOutlined />}
                        htmlType='submit'
                        disabled={loading}
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
