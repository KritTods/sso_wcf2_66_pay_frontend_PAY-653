'use client';

import { PayType } from '@/types/payType';
import React, { useEffect, useState } from 'react';
import { Col, Row, TabsProps, Form } from 'wcf-component-lib/node_modules/antd';
import {
  BaseButton,
  BaseForm,
  BaseItemDropdown,
  BaseItemInput,
  BaseItemInputNumber,
  BaseLoading,
  BaseTabs,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import { Bank, HomeSale, DeliveryTruck, MoneySquare } from 'wcf-component-lib/node_modules/iconoir-react';
import { formColumn } from '@/constants/layoutColumn';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { CODE_INCORRECT_PAYMENT_REASON, DROPDOWN_INIT_INCORRECT_PAYMENT_REASON } from '@/constants/statusSystem';
import { SearchOutlined } from '@ant-design/icons';
import {
  FormPayTypeX,
  FormPayTypeT,
  FormPayTypeS,
  FormPayTypeP,
} from '@/modules/readytopay/wrongfund-payment/pay/formPayType';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import {
  INIT_DATA_MONEY,
  TableMoneyType,
  INIT_DATA_CHEQUE,
  TableChequeType,
  INIT_DATA_BANK,
  TableBankType,
  PopUpWarning,
  MSGCodeType,
  PopUpConfirmSave,
} from '@/components/common';
import {
  BodySearchCompanyServiceType,
  createWrongFundPaymentService,
  ResSearchCompanyServiceType,
  searchCompanyService,
  wrongFundPaymentPaySelector,
} from '@/store-redux/slices/readytopay/wrongfund-payment';
import { useAppDispatch } from '@/redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

interface FormPayPropsType {
  incorrectPaymentReasonType: string | undefined; // สาเหตุการจ่ายผิด
  employerAccountNumber?: string; // เลขที่บัญชีนายจ้าง
  branchSequence?: string; // รหัสสาขา
  companyName?: string; // ชื่อสถานประกอบการ
  employeeCitizenId?: string; // เลขบัตรประชาชน
  employeeCitizenName?: string; // ชื่อ-นามสกุล
  paymentRequest: string; // จ่ายคืนให้
  amount: number; // จำนวนเงิน
  cash?: number; // จำนวนเงินสด
  address?: string; // ที่อยู่
  cheques?: TableChequeType[]; // จำนวนเช็ค
  banks?: TableBankType[]; // จำนวนเงินโอน
  moneys?: TableMoneyType[]; // จำนวนเงินสด
}

interface FormSearchCompanyType {
  employerAccountNumber: string;
  branchSequence: string;
  companyName?: string; // ชื่อสถานประกอบการ
}

const INIT_FORM_DATA = {
  incorrectPaymentReasonType: undefined,
  employerAccountNumber: '',
  branchSequence: '',
  companyName: '',
  employeeCitizenId: '',
  employeeCitizenName: '',
  paymentRequest: '',
  amount: 0,
  cash: 0,
  address: '',
  cheques: [],
  banks: [],
  moneys: [],
};

export default function FormPay({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const [tabActive, setTabActive] = useState<PayType>('X');
  const [tabActiveChange, setTabActiveChange] = useState<PayType>('X');
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [isStatusIncorrectPaymentReasonType, setIsStatusIncorrectPaymentReasonType] = useState<
    CODE_INCORRECT_PAYMENT_REASON | undefined
  >();
  const [form] = Form.useForm();
  const [formSearchCompany] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loading } = useSelector(wrongFundPaymentPaySelector);

  useEffect(() => {
    //reset form
    form.resetFields();
    formSearchCompany.resetFields();

    //set init form data formPayWrongFund
    form.setFieldsValue(INIT_FORM_DATA);
    form.setFieldValue('cheques', INIT_DATA_CHEQUE);

    if (tabActive === 'T') {
      //modify data INIT_DATA_BANK set mode is addWrongFund
      form.setFieldValue('banks', INIT_DATA_BANK);
    }

    if (tabActive === 'P') {
      form.setFieldValue('moneys', INIT_DATA_MONEY);
    }
  }, [tabActive, form, formSearchCompany]);

  const items: TabsProps['items'] = [
    {
      key: 'X',
      label: (
        <div id={`${dataTestId}-tab-X`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <Bank />
          <span>รับเงิน ณ สำนักงาน</span>
        </div>
      ),
    },
    {
      key: 'T',
      label: (
        <div id={`${dataTestId}-tab-T`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <HomeSale />
          <span>โอนผ่านธนาคารโดยจังหวัด</span>
        </div>
      ),
    },
    {
      key: 'S',
      label: (
        <div id={`${dataTestId}-tab-S`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <DeliveryTruck />
          <span>ส่งเช็คทางไปรษณีย์</span>
        </div>
      ),
    },
    {
      key: 'P',
      label: (
        <div id={`${dataTestId}-tab-P`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <MoneySquare />
          <span>ธนาณัติ</span>
        </div>
      ),
    },
  ];

  const handleSearchCompany = async (values: FormSearchCompanyType): Promise<void> => {
    //call api search company and return company name, company code
    console.log('handleSearchCompany', values);
    const dataBody: BodySearchCompanyServiceType = {
      employerAccountNumber: values.employerAccountNumber, // เลขที่บัญชีนายจ้าง
      branchSequence: values.branchSequence, // รหัสสาขา
    };
    //call api searchCompany
    const resSearchCompany = (await dispatch(
      searchCompanyService(dataBody),
    )) as PayloadAction<ResSearchCompanyServiceType>;

    if (resSearchCompany.payload) {
      //set value to form field companyName
      form.setFieldsValue({
        companyName: resSearchCompany.payload.companyName,
        employerAccountNumber: resSearchCompany.payload.employerAccountNumber, // เลขที่บัญชีนายจ้าง
        branchSequence: resSearchCompany.payload.branchSequence, // รหัสสาขา
      });
    }
  };

  const handleChangeTab = (key: PayType): void => {
    setIsOpenWarningModal(true);
    setCodeWarningModal('002');
    setTabActiveChange(key);
  };

  const onFinish = (values: FormPayPropsType): void => {
    console.log('onFinish: ', values);
    //sum จำนวนเงินใบสั่งจ่าย

    //เช็คต้องมีเช็คอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques && values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    //เช็คต้องมีธนาคารอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.banks && values.banks.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('100');

      return;
    }

    //เช็คต้องมีธนาณัติอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.moneys && values.moneys.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('200');

      return;
    }

    if (values.cheques !== undefined) {
      //เช็คจำนวนเงินรวม cheques และ amount ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);

      if (sumCheque !== Number(values.amount)) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.cash !== undefined) {
      //เช็คจำนวนเงินรวม cach และ amount ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const cash = Number(values.cash);

      if (cash !== Number(values.amount)) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.banks !== undefined) {
      //ธนาคารต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
      if (values.banks.length === 0) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('100');

        return;
      }

      //เช็คจำนวนเงินรวม bank และ amount ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumBank = values.banks.reduce((acc: number, item: TableBankType) => acc + Number(item.amount), 0);

      if (sumBank !== Number(values.amount)) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    //show modal confirm save
    setIsOpenConfirmSave(true);
  };

  const handleConfirm = async (): Promise<void> => {
    const dataBody = form.getFieldsValue() as FormPayPropsType;
    //call api create
    const resCreate = (await dispatch(createWrongFundPaymentService(dataBody))) as PayloadAction<{
      prepareToPayId: string;
    }>;

    if (resCreate.payload) {
      // show notification success
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //TODO: update url
      router.push(`${URL.readytopay.wrongfundPaymentPayDetail.url}?id=${resCreate.payload.prepareToPayId}`);

      //close modal
      setIsOpenConfirmSave(false);
    }
  };

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className=' flex flex-col justify-center gap-4 mb-6'>
      {/* Tab */}
      <BaseTabs
        noBackground={true}
        defaultActiveKey={tabActive}
        activeKey={tabActive}
        items={items}
        onChange={(e) => handleChangeTab(e as PayType)}
        className='w-full'
      />
      <BaseForm name='formPayWrongFund' extraForm={form} onFinish={onFinish}>
        <div className='flex flex-col gap-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-b-xl -mt-4'>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <BaseItemDropdown
                    rules={[requiredRule('สาเหตุการจ่ายผิด')]}
                    label='สาเหตุการจ่ายผิด'
                    itemName='incorrectPaymentReasonType'
                    placeholder='เลือกสาเหตุการจ่ายผิด'
                    onChange={(value) =>
                      setIsStatusIncorrectPaymentReasonType(String(value) as CODE_INCORRECT_PAYMENT_REASON)
                    }
                    option={DROPDOWN_INIT_INCORRECT_PAYMENT_REASON}
                  />
                </div>
              </Col>
              {isStatusIncorrectPaymentReasonType === CODE_INCORRECT_PAYMENT_REASON.O && (
                <>
                  <Col {...formColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-employeeCitizenId-input-text`}
                      label='เลขบัตรประชาชน'
                      itemName='employeeCitizenId'
                      placeholder='ระบุเลขบัตรประชาชน'
                      rules={[
                        requiredRule('เลขบัตรประชาชน'),
                        onlyNumberRule('เลขบัตรประชาชน'),
                        minRule('เลขบัตรประชาชน', 13),
                        maxRule('เลขบัตรประชาชน', 13),
                      ]}
                    />
                  </Col>
                  <Col {...formColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-employeeCitizenName-input-text`}
                      label='ชื่อ-นามสกุล'
                      itemName='employeeCitizenName'
                      placeholder='ระบุชื่อ-นามสกุล'
                      rules={[requiredRule('ชื่อ-นามสกุล')]}
                      disabled
                    />
                  </Col>
                </>
              )}

              {isStatusIncorrectPaymentReasonType === CODE_INCORRECT_PAYMENT_REASON.S && (
                <>
                  <Col lg={12} xl={12}>
                    <BaseForm
                      name='searchCompany'
                      extraForm={formSearchCompany}
                      onFinish={(values: FormSearchCompanyType) => void handleSearchCompany(values)}
                    >
                      <Row gutter={[18, 18]}>
                        <Col lg={12} xl={12}>
                          <BaseItemInput
                            id={`${dataTestId}-employerAccountNumber-input-text`}
                            label='เลขที่บัญชีนายจ้าง'
                            itemName='employerAccountNumber'
                            placeholder='ระบุเลขที่บัญชีนายจ้าง'
                            rules={[
                              requiredRule('เลขที่บัญชีนายจ้าง'),
                              onlyNumberRule('เลขที่บัญชีนายจ้าง'),
                              minRule('เลขที่บัญชีนายจ้าง', 10),
                              maxRule('เลขที่บัญชีนายจ้าง', 10),
                            ]}
                            onChangeFunction={() => {
                              //clear value companyName, branchSequence, employerAccountNumber from FormPayWrongFund
                              form.setFieldsValue({ companyName: '' });
                              form.setFieldsValue({ branchSequence: '' });
                              form.setFieldsValue({ employerAccountNumber: '' });
                            }}
                          />
                        </Col>
                        <Col lg={12} xl={12}>
                          <div className='flex justify-start items-end gap-4 w-full'>
                            <div>
                              <BaseItemInput
                                id={`${dataTestId}-branchSequence-input-text`}
                                label='รหัสสาขา'
                                itemName='branchSequence'
                                placeholder='ระบุรหัสสาขา'
                                rules={[
                                  requiredRule('รหัสสาขา'),
                                  onlyNumberRule('รหัสสาขา'),
                                  minRule('รหัสสาขา', 6),
                                  maxRule('รหัสสาขา', 6),
                                ]}
                                onChangeFunction={() => {
                                  //clear value companyName, branchSequence, employerAccountNumber from FormPayWrongFund
                                  form.setFieldsValue({ companyName: '' });
                                  form.setFieldsValue({ branchSequence: '' });
                                  form.setFieldsValue({ employerAccountNumber: '' });
                                }}
                              />
                            </div>
                            <div className='w-[20%]'>
                              <BaseButton
                                icon={<SearchOutlined />}
                                size='large'
                                label='ค้นหา'
                                type='honeyGlow'
                                className='mb-6'
                                onClick={() => formSearchCompany.submit()}
                                customSizeStyle='w-[100px] h-[44px]'
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </BaseForm>
                  </Col>
                  <Col {...formColumn}>
                    <BaseItemInput
                      id={`${dataTestId}-companyName-input-text`}
                      label='ชื่อสถานประกอบการ'
                      itemName='companyName'
                      placeholder='ระบุชื่อสถานประกอบการ'
                      rules={[requiredRule('ชื่อสถานประกอบการ')]}
                      disabled
                    />
                  </Col>
                </>
              )}
            </Row>
            <Row key={dataTestId} gutter={[16, 16]}>
              <Col {...formColumn}>
                <BaseItemInput
                  id={`${dataTestId}-paymentRequest-input-text`}
                  itemName='paymentRequest'
                  label='จ่ายคืนให้'
                  placeholder='ระบุจ่ายคืนให้'
                  rules={[requiredRule('จ่ายคืนให้')]}
                />
              </Col>
              <Col {...formColumn}>
                <BaseItemInputNumber
                  id={`${dataTestId}-amount-input-text`}
                  itemName='amount'
                  className='w-full'
                  label='จำนวนเงิน (บาท)'
                  placeholder='ระบุจ่ายคืนให้'
                  rules={[requiredRule('จ่ายคืนให้')]}
                  hideFieldControl
                />
              </Col>
            </Row>
          </div>

          {tabActive === 'X' && <FormPayTypeX dataTestId={dataTestId} payType='X' form={form} />}
          {tabActive === 'T' && <FormPayTypeT dataTestId={dataTestId} payType='T' form={form} />}
          {tabActive === 'S' && <FormPayTypeS dataTestId={dataTestId} payType='S' form={form} />}
          {tabActive === 'P' && <FormPayTypeP dataTestId={dataTestId} payType='P' form={form} />}
        </div>
      </BaseForm>

      <div className='flex flex-row justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          onClick={() => router.push(URL.readytopay.readyToPay.url)}
        />
        <BaseButton id={`${dataTestId}-save-button`} size='large' label='บันทึก' onClick={() => form.submit()} />
      </div>
      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => {
          setIsOpenWarningModal(false);
          setTabActive(tabActiveChange);
        }}
        isCancel
        handleCancel={() => setIsOpenWarningModal(false)}
      />
      <PopUpConfirmSave
        isOpen={isOpenConfirmSave}
        setIsOpen={setIsOpenConfirmSave}
        dataTestId={dataTestId}
        handleConfirm={() => void handleConfirm()}
      />
    </div>
  );
}
