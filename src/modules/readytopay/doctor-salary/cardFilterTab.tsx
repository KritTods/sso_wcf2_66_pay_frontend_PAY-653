'use client';
import { Bank, HomeSale, DeliveryTruck, MoneySquare, ScanQrCode } from 'wcf-component-lib/node_modules/iconoir-react';
import { useAppDispatch } from '@/store-redux/store';
import React, { useEffect, useState, useMemo } from 'react';
import { Form, Col, Row, Radio, FormProps, TabsProps, RadioChangeEvent } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseItemDateRangePicker,
  BaseButton,
  BaseItemDropdown,
  BaseTabs,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { PayType } from '@/types/payType';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import {
  readyToPayDoctorSalarySelector,
  FilterSearchType,
  clearSelectPaymentList,
  setFilterDoctorSalaly,
  ReadyToPayDataType,
  setOptionPaymentTabsActive,
} from '@/store-redux/slices/readytopay/doctor-salary';
import dayjs from '@/utils/dayjs-setup';

interface dataPops {
  setDataSelected: React.Dispatch<React.SetStateAction<ReadyToPayDataType[]>>;
  dataTestId: string;
}

export default function CardSearchTab({ setDataSelected, dataTestId }: dataPops): React.ReactElement {
  const dispatch = useAppDispatch();
  const [tabActive, setTabActive] = useState<string>('X');
  // const { loading: loadingBankData, bankBranchCodeGroups } = useSelector(bankAccountSSOSelector);

  const {
    filter,
    pageDoctorSalalyForm: { selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

  const manipulateInitData = useMemo(() => {
    const newData = {
      ...filter,
      date: [dayjs(filter.date[0]), dayjs(filter.date[1])],
    };

    return newData;
  }, [filter]);

  const [valueRadio, setValueRadio] = useState<string | number>('1');

  const onChangeRadio = (e: RadioChangeEvent): void => {
    const value = e.target.value as string | number; // Explicitly cast the value type
    //console.log('radio checked', value);
    setValueRadio(value);
  };

  // ใช้ useSelector ภายในฟังก์ชัน component
  const { list: bankList } = useSelector(bankSelector);
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
      key: 'B',
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
    {
      key: 'M',
      label: (
        <div className='flex justify-center gap-2'>
          <ScanQrCode />
          <span>พร้อมเพย์</span>
        </div>
      ),
    },
  ];

  const handleChangeTab = (key: string): void => {
    // เปลี่ยน tab update state tabActive
    setTabActive(key);
    void dispatch(setOptionPaymentTabsActive(key as PayType));
    setDataSelected([]);
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      paymentNo: values.paymentNo,
      payToCode: valueRadio,
      payType: tabActive,
      accidentIssueCode: values.accidentIssueCode,
      // startDate: values?.date ? dayjs(values.date[0]).format('YYYY-MM-DD') : '',
      // endDate: values?.date ? dayjs(values.date[1]).format('YYYY-MM-DD') : '',
      date: [dayjs(values.date[0]).format('YYYY-MM-DD'), dayjs(values.date[1]).format('YYYY-MM-DD')],
      fullName: values.fullName,
      employeeCitizenId: values.employeeCitizenId,
      hospitalLikeField: values.hospitalLikeField,
      bankCode: values.bankCode,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
      },
    };

    // console.log('searchObj', searchObj);
    //เคลียร์ค่า checkbox และ listที่ค้นหา
    // console.log('datal', selectList.length);
    if (selectList.length === 0) {
      void dispatch(clearSelectPaymentList());
    }

    // //เซ็ตค่า filter ที่ส่งเข้ามาจาก action
    void dispatch(setFilterDoctorSalaly(searchObj));
  };

  return (
    <div>
      <BaseTabs defaultActiveKey={tabActive} items={items} onChange={handleChangeTab} />
      <div className='flex p-6 bg-white shadow-sm rounded-b-lg'>
        <BaseForm name='doctor-salary-filter' onFinish={onFinish} initialValues={manipulateInitData}>
          <div className='w-full bg-white shadow-sm rounded-lg flex flex-row gap-4'>
            <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <Row gutter={[16, 16]}>
                  <Form.List name={dataTestId}>
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
                      </>
                    )}
                  </Form.List>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-accidentIssueCode-input-text`}
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
                  <Col {...searchColumn}>
                    <BaseItemDateRangePicker
                      id={`${dataTestId}-date-input-date`}
                      rules={[requiredRule('วันที่คำสั่งจ่าย')]}
                      itemName='date'
                      label='วันที่คำสั่งจ่าย'
                      placeholder={['เริ่มต้น', 'สิ้นสุด']}
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemDropdown
                      label='ธนาคาร'
                      itemName='bankCode'
                      placeholder='เลือกธนาคาร'
                      id={`${dataTestId}-bankCode-selecter`}
                      option={bankSelectData}
                      // option={[{ value: 1, label: 'ธนาคารกรุงเทพ', disabled: false }]}
                      // loading={loadingBankData}
                      disabled={tabActive === 'X' || tabActive === 'M' || tabActive === 'S' || tabActive === 'P'}
                      rules={['B'].includes(tabActive) ? [requiredRule('ธนาคาร')] : []} // เพิ่ม rules เฉพาะ tab ที่กำหนด
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-fullName-input-text`}
                      label='ชื่อ - นามสกุล'
                      itemName='fullName'
                      placeholder='ระบุชื่อ - นามสกุล'
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <BaseItemInput
                      label='เลขบัตรประชาชน'
                      itemName='employeeCitizenId'
                      id={`${dataTestId}-employeeCitizenId-input`}
                      placeholder='เลขบัตรประชาชน'
                      rules={
                        ['S'].includes(tabActive)
                          ? [
                              requiredRule('เลขบัตรประชาชน'),
                              onlyNumberRule('เลขบัตรประชาชน'),
                              minRule('เลขบัตรประชาชน', 13),
                              maxRule('เลขบัตรประชาชน', 13),
                            ]
                          : [
                              onlyNumberRule('เลขบัตรประชาชน'),
                              minRule('เลขบัตรประชาชน', 13),
                              maxRule('เลขบัตรประชาชน', 13),
                            ]
                      }
                    />
                  </Col>
                  <Col {...searchColumn}>
                    <div>
                      <p className='text-label mb-2' id={`${dataTestId}-advancePaymentType-label`}>
                        ประเภทเบิกเงินรองจ่าย
                      </p>

                      <Radio.Group
                        className='h-[48px]'
                        optionType='button'
                        text-lg
                        font-boldtyle='solid'
                        onChange={onChangeRadio}
                        value={valueRadio}
                      >
                        <div className='flex gap-4 h-full'>
                          <Radio.Button className='!h-full flex justify-center items-center' value={'1'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-W`}> เงินทดแทน</div>
                          </Radio.Button>
                          <Radio.Button className='!h-full flex justify-center items-center' value={'8'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-B`}> ค่าตอบแทนแพทย์</div>
                          </Radio.Button>
                        </div>
                      </Radio.Group>
                    </div>
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
