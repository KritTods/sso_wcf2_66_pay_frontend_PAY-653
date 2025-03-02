'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Col, Row, Divider, Form, Radio } from 'wcf-component-lib/node_modules/antd';
import {
  BaseForm,
  BaseItemInput,
  BaseItemInputNumber,
  BaseButton,
  BaseItemDropdown,
  BaseToastNotification,
  BaseDialog,
  BaseLoading,
} from 'wcf-component-lib/src/components';
import { useRouter } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { formColumn } from '@/constants/layoutColumn';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  DataFormPrepareType,
  initialState,
  prepareSelector,
  clearFormPrepare,
  setFormDataSlice,
  getBeginningBalanceService,
  seveFormPrepareService,
  SavePrepareServiceResponse,
} from '@/store-redux/slices/reserve/prepare';
import {
  getBankAccountSSOService,
  bankAccountSSOSelector,
  BankAccountGroupType,
} from '@/store-redux/slices/masterData/bankAccount';
import { PayloadAction } from '@reduxjs/toolkit';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { formatBankAccountNo, formatCurrency } from '@/utils/formatGeneral';
import { InfoCircleOutlined } from '@ant-design/icons';
import { isArray } from 'lodash';
import dayjs from '@/utils/dayjs-setup';
import { formatDateToCustom } from '@/utils/dayjs-setup-th';
import { BaseItemDatePicker } from 'wcf-component-lib/src/components/v2';
import { DownloadSquare } from 'wcf-component-lib/node_modules/iconoir-react';

export default function PrepareForm(): React.ReactElement {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenNotFoundBankModal, setIsOpenNotFoundBankModal] = useState(false);
  const { loadingSave, loading: loading, form: formData } = useSelector(prepareSelector);
  const { loading: loadingBankData, bankBranchCodeGroups } = useSelector(bankAccountSSOSelector);
  const [bankNoSelectData, setBankNoSelectData] = useState<SelectData[]>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    stateLayout: { user },
  } = useLayout();
  const dataTestId = 'page-prepare-form';

  //initial form
  useEffect(() => {
    if (!user) return;
    //ดึงยอดยกมา
    void dispatch(getBeginningBalanceService(user.ssoBranchCode));
    //ดึงข้อมูลธนาคาร
    void dispatch(getBankAccountSSOService(user.ssoBranchCode));
  }, [dispatch, user]);

  const bankSelectData = useMemo(() => {
    //check bankBranchCodeGroups is not undefined
    if (!bankBranchCodeGroups) {
      return;
    }

    setIsOpenNotFoundBankModal(bankBranchCodeGroups.length === 0);

    const data: SelectData[] = [];
    isArray(bankBranchCodeGroups) &&
      bankBranchCodeGroups.forEach((e: BankAccountGroupType) => {
        data.push({
          value: e.bankCode,
          label: `${e.bankCode} : ${e.bankName}`,
        });
      });

    return data;
  }, [bankBranchCodeGroups]);

  const handleConfirm = async (): Promise<void> => {
    //get form value from store and save form to api service
    const {
      payload: { prepareBudgetRequestId },
    } = (await dispatch(seveFormPrepareService(formData))) as PayloadAction<SavePrepareServiceResponse>;

    if (prepareBudgetRequestId) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });

      //close modal confirm
      setIsOpenConfirmModal(false);
      // clear form
      void dispatch(clearFormPrepare());
      form.resetFields();

      if (formData.advancePaymentType === 'W') {
        //redirect to cut off pay form
        router.push(`${URL.reserve.cutOffPayForm.url}?id=${prepareBudgetRequestId}`);
      }
    }
  };

  const handleFormSubmit = (values: DataFormPrepareType): void => {
    //convert amount to number
    values.amount = Number(values.amount);
    //set data to store form
    void dispatch(setFormDataSlice(values));
    //open confirm modal
    setIsOpenConfirmModal(true);
  };

  //loading form
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='m-4'>
      <BaseForm onFinish={handleFormSubmit} initialValues={initialState.form} extraForm={form} name={'prepare-form'}>
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'>บันทึกข้อมูลเตรียมจ่าย</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info' id={`${dataTestId}-paymentNo-label`}>
                      เลขที่คำสั่งจ่าย
                    </p>
                    <p className='text-display' id={`${dataTestId}-paymentNo-text`}>
                      {formData.paymentNo}
                    </p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info' id={`${dataTestId}-documentNo-label`}>
                      เลขที่เอกสาร
                    </p>
                    <p className='text-display' id={`${dataTestId}-documentNo-text`}>
                      {formData.documentNo}
                    </p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info' id={`${dataTestId}-buddhist-label`}>
                      วันที่เตรียมจ่าย
                    </p>
                    <p className='text-display' id={`${dataTestId}-buddhist-text`}>
                      {formatDateToCustom(formData.payDate)}
                    </p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info' id={`${dataTestId}-paymentAgent-label`}>
                      ผู้เตรียมจ่าย
                    </p>
                    <p className='text-display' id={`${dataTestId}-paymentAgent-text`}>
                      {formData.paymentAgent}
                    </p>
                  </div>
                </Col>
                <Col {...formColumn}>
                  <div>
                    <p className='text-label-info' id={`${dataTestId}-beginningBalance-label`}>
                      ยอดยกมา (บาท)
                    </p>
                    <p className='text-display' id={`${dataTestId}-beginningBalance-text`}>
                      {formatCurrency(formData.beginningBalance)}
                    </p>
                  </div>
                </Col>
              </Row>
              <Divider className='my-0' />
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemDropdown
                    label='ธนาคาร'
                    itemName='bankCode'
                    rules={[requiredRule('ธนาคาร')]}
                    placeholder='โปรดเลือก'
                    id={`${dataTestId}-bankCode-selecter`}
                    option={bankSelectData}
                    loading={loadingBankData}
                    onChange={(e) => {
                      //find bank account no by bank code
                      const findBankCode =
                        (isArray(bankBranchCodeGroups) &&
                          bankBranchCodeGroups.find((item) => item.bankCode === String(e))) ||
                        null;

                      setBankNoSelectData(
                        findBankCode?.bankAccountNoList.map((item) => ({
                          value: item.bankAccountId,
                          label: formatBankAccountNo(item.bankAccountNo),
                        })) || [],
                      );
                    }}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemDropdown
                    label='เลขบัญชีธนาคาร'
                    itemName='ssoMapBankId'
                    rules={[requiredRule('เลขบัญชีธนาคาร')]}
                    placeholder='โปรดเลือก'
                    id={`${dataTestId}-ssoMapBankId-selecter`}
                    option={bankNoSelectData}
                    loading={loadingBankData}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-chequeNo-input-text`}
                    rules={[
                      requiredRule('เลขที่เช็ค'),
                      onlyNumberRule('เลขที่เช็ค'),
                      maxRule('เลขที่เช็ค', 8),
                      minRule('เลขที่เช็ค', 8),
                    ]}
                    label='เลขที่เช็ค'
                    itemName='chequeNo'
                    placeholder='ระบุเลขที่เช็ค'
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-chequeDate-input-date`}
                    rules={[requiredRule('วันที่เช็ค')]}
                    itemName='chequeDate'
                    label='วันที่เช็ค'
                    placeholder='เลือกวันที่'
                    minDate={dayjs()}
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-receiveName-input-text`}
                    rules={[requiredRule('ชื่อผู้รับเงิน')]}
                    label='ชื่อผู้รับเงิน'
                    itemName='receiveName'
                    placeholder='ระบุชื่อผู้รับเงิน'
                  />
                </Col>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    label='จำนวนเงิน (บาท)'
                    id={`${dataTestId}-amount-input-number`}
                    rules={[requiredRule('จำนวนเงิน (บาท)')]}
                    className='w-full bg-white'
                    itemName='amount'
                    step={1}
                    hideFieldControl={true}
                    placeholder='0.00'
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col>
                  <div>
                    <p className='text-label mb-2' id={`${dataTestId}-advancePaymentType-label`}>
                      ประเภทเบิกเงินรองจ่าย
                    </p>
                    <Form.Item<DataFormPrepareType> name='advancePaymentType'>
                      <Radio.Group className='h-[48px]' optionType='button' text-lg font-boldtyle='solid'>
                        <div className='flex gap-4 h-full'>
                          <Radio.Button className='!h-full flex justify-center items-center' value={'W'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-W`}> เบิกเงินรองจ่าย</div>
                          </Radio.Button>
                          <Radio.Button className='!h-full flex justify-center items-center' value={'B'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-B`}> ยืมเงินระหว่างวัน</div>
                          </Radio.Button>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <BaseButton
              id={`${dataTestId}-submit-button`}
              size='middle'
              label='บันทึก'
              className='w-[240px]'
              onClick={() => form.submit()}
            />
            <BaseDialog
              width='560px'
              isOpen={isOpenConfirmModal}
              setIsOpen={setIsOpenConfirmModal}
              content={
                <div id={`${dataTestId}-popup-confirm-content`} className='flex flex-col w-full gap-4'>
                  <div className='text-left font-semibold text-3xl'>บันทึกเตรียมจ่ายใช่หรือไม่</div>
                  <div className='text-left status text-[#4B5760]'>กรุณายืนยันการทำรายการอีกครั้ง</div>
                </div>
              }
              headerLeftIcon={<DownloadSquare />}
              footer={
                <div id={`${dataTestId}-popup-confirm-footer`} className='flex justify-center gap-4'>
                  <BaseButton
                    id={`${dataTestId}-popup-confirm-footer-btn-cancel`}
                    size='large'
                    type='cancel'
                    label='ยกเลิก'
                    onClick={() => setIsOpenConfirmModal(false)}
                  />
                  <BaseButton
                    id={`${dataTestId}-popup-confirm-footer-btn-confirm`}
                    loading={loadingSave}
                    size='large'
                    label='บันทึก'
                    onClick={() => void handleConfirm()}
                  />
                </div>
              }
            />
          </div>
        </div>
      </BaseForm>
      <BaseDialog
        width='560px'
        isOpen={isOpenNotFoundBankModal}
        setIsOpen={setIsOpenNotFoundBankModal}
        content={
          <div id={`${dataTestId}-popup-notfoundbank-content`} className='flex flex-col w-full gap-4'>
            <div className='text-left font-semibold text-3xl'>ไม่พบข้อมูลบัญชีธนาคาร</div>
            <div className='text-left status text-[#4B5760]'>กรุณาติดต่อเจ้าหน้าที่เพื่อเพิ่มข้อมูลธนาคาร</div>
          </div>
        }
        iconBackgroundColor={'#F9EAEA'}
        iconColor={'#C42828'}
        headerLeftIcon={<InfoCircleOutlined />}
        footer={
          <div id={`${dataTestId}-popup-notfoundbank-footer`} className='flex justify-center gap-4'>
            <BaseButton
              id={`${dataTestId}-popup-notfoundbank-footer-btn-cancel`}
              size='large'
              type='cancel'
              label='ปิดหน้าต่าง'
              onClick={() => setIsOpenNotFoundBankModal(false)}
            />
          </div>
        }
      />
    </div>
  );
}
