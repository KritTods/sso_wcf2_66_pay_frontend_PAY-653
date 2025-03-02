'use client';
import { Bank, HomeSale, DeliveryTruck } from 'wcf-component-lib/node_modules/iconoir-react';
import { useAppDispatch } from '@/store-redux/store';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Form, FormProps, TabsProps, FormInstance } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseButton, BaseItemDropdown, BaseTabs } from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  clearFilter,
  FilterSearchType,
  hospitalPaymentSelector,
  setFilter,
} from '@/store-redux/slices/readytopay/hospital-payment';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { getBankList, bankSelector, BankItem } from '@/redux/slices/mdm/bank';
import { PayType } from '@/types/payType';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const [tabActive, setTabActive] = useState<PayType>('X');
  const { filter } = useSelector(hospitalPaymentSelector);
  const [form] = Form.useForm();

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
  ];

  const handleChangeTab = (key: PayType, form: FormInstance): void => {
    // เปลี่ยน tab update state tabActive
    setTabActive(key);

    // ล้าง data in table from filter ที่เลือก
    dispatch(clearFilter());
    form.resetFields();
  };

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

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      paymentNo: values.paymentNo,
      accidentIssueCode: values.accidentIssueCode,
      hospitalName: values.hospitalName,
      bankCode: values.bankCode,
      fullName: values.fullName,
      employeeCitizenId: values.employeeCitizenId,
      paymentType: tabActive,
      operation: 'AND',
      pagination: {
        pageNumber: filter.pagination.pageNumber,
        pageSize: filter.pagination.pageSize,
        orders: undefined,
      },
    };

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
        <BaseForm name='filter' extraForm={form} onFinish={onFinish} initialValues={{ filter }}>
          <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
            <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <p className='text-label mb-2'>เลขที่ใบสั่งจ่าย</p>
                    <div className='flex justify-between items-center gap-4'>
                      <BaseItemInput
                        id={`${dataTestId}-paymentNo-input-text`}
                        itemName={['paymentNo', 'start']}
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
                              if (!value && getFieldValue('paymentNo') && getFieldValue(['paymentNo', 'end'])) {
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
                        itemName={['paymentNo', 'end']}
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
                              if (!value && getFieldValue('paymentNo') && getFieldValue(['paymentNo', 'start'])) {
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

                  <Col {...searchColumn}>
                    <BaseItemInput
                      label='เลขประสบอันตราย'
                      itemName='accidentIssueCode'
                      placeholder='ระบุเลขประสบอันตราย'
                      rules={[
                        onlyNumberRule('เลขประสบอันตราย'),
                        minRule('เลขประสบอันตราย', 13),
                        maxRule('เลขประสบอันตราย', 13),
                      ]}
                    />
                  </Col>
                  <Col lg={12} xl={12}>
                    <BaseItemDropdown
                      id={`${dataTestId}-hospitalName-selecter`}
                      label='ชื่อโรงพยาบาล'
                      itemName='hospitalName'
                      placeholder='ค้นหาชื่อ หรือ รหัสโรงพยาบาล'
                      option={[]}
                      // rules={[requiredRule('ชื่อโรงพยาบาล')]}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      label='ธนาคาร'
                      itemName='bankCode'
                      placeholder='เลือกธนาคาร'
                      id={`${dataTestId}-bankCode-selecter`}
                      option={bankSelectData}
                      loading={loadingBankData}
                      disabled={tabActive !== 'T'}
                      rules={['T'].includes(tabActive) ? [requiredRule('ธนาคาร')] : []} // เพิ่ม rules เฉพาะ tab ที่กำหนด
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput label='ชื่อ - นามสกุล' itemName='fullName' placeholder='ระบุชื่อ - นามสกุล' />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      label='เลขบัตรประชาชน'
                      itemName='employeeCitizenId'
                      placeholder='เลขบัตรประชาชน'
                      rules={[
                        onlyNumberRule('เลขบัตรประชาชน'),
                        maxRule('เลขบัตรประชาชน', 13),
                        minRule('เลขบัตรประชาชน', 13),
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
