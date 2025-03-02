'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import {
  BaseForm,
  BaseItemInput,
  BaseItemInputNumber,
  BaseButton,
  BaseItemDatePicker,
  BaseItemDropdown,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
import { formatDayThai } from '@/utils/formatGeneral';
import dayjs from 'dayjs';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { v4 as uuidv4 } from 'uuid';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { createOfficefundPaymentService } from '@/store-redux/slices/readytopay/officefund-payment';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import { PayloadAction } from '@reduxjs/toolkit';

interface AccountListType {
  accountName: string;
  bankCode: string;
  chequeNumber: string;
  amount: number;
}

interface PeriodListsType {
  id: string;
  periodNumber: string;
  bookNo: string;
  bookDate: string;
  bookApprover: string;
  accountLists: AccountListType[];
}

interface FormType {
  noticeNumber: string;
  noticeAmount: number;
  balanceAmount: number;
  periodLists: PeriodListsType[];
}

const accountList1 = [
  {
    accountName: 'บัญชีเงินบริหารสำนักงานกองทุนเงินทดแทน บัญชีที่ 1',
    bankCode: '006',
    chequeNumber: '',
    amount: 0,
  },
];

const accountList2 = [
  {
    accountName: 'บัญชีเงินค่าใช้จ่ายในการฟื้นฟูและส่งเสริมความปลอดภัย บัญชีที่ 1',
    bankCode: '006',
    chequeNumber: '',
    amount: 0,
  },
];

export const initPeriodLists: PeriodListsType[] = [
  {
    id: uuidv4(),
    periodNumber: '',
    bookNo: '',
    bookDate: '',
    bookApprover: '',
    accountLists: [...accountList1],
  },
];

export default function OfficeFundPayment(): React.ReactElement {
  const dataTestId = 'pageOfficeFundPaymentForm';
  const [form] = Form.useForm();
  const router = useRouter();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<FormType>();
  const dispatch = useAppDispatch();
  const {
    stateLayout: { user },
  } = useLayout();
  const [initialForm] = useState<FormType>({
    noticeNumber: '',
    noticeAmount: 0,
    balanceAmount: 0,
    periodLists: [...initPeriodLists],
  });

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

  // เพิ่มแถวใหม่
  const handleAddRow = (): void => {
    //add new row periodLists to form
    form.setFieldsValue({
      periodLists: [
        ...(form.getFieldValue('periodLists') as PeriodListsType[]),
        {
          id: uuidv4(),
          periodNumber: '',
          bookNo: '',
          bookDate: '',
          bookApprover: '',
          accountLists: [...accountList1],
        },
      ],
    });
  };

  const onFinish = (values: FormType): void => {
    //validate balanceAmount ต้องเป็น 0 ถ้าไม่เป็น 0 แสดง modal แจ้งเตือน
    if (values.balanceAmount !== 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('006');

      return;
    }

    //validate accountName in periodLists ชื่อบัญชีสั่งจ่ายใน 1 งวดต้องไม่ซ้ำกัน กรุณาตรวจสอบการทำรายการอีกครั้ง
    let isAccountNameDuplicate = false;
    values.periodLists.map((period) => {
      if (period.accountLists.length > 1) {
        const accountName1 = period.accountLists[0].accountName;
        const accountName2 = period.accountLists[1].accountName;
        if (accountName1 === accountName2) {
          isAccountNameDuplicate = true;

          //return to stop loop
          return;
        }
      }
    });

    if (isAccountNameDuplicate) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('007');

      return;
    }

    //validate pass all condition save data
    setDataSave(values);

    //show modal confirm
    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!dataSave) return;
    const resCreateApi = (await dispatch(createOfficefundPaymentService(dataSave))) as PayloadAction<{
      prepareToPayId: string;
    }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //redirect to หน้ารายละเอียดการเตรียมจ่าย
      router.push(`${URL.readytopay.officeFundPaymentDetail.url}?id=${resCreateApi.payload.prepareToPayId}`);

      //close modal confirm
      setIsOpenConfirmModal(false);
    }
  };

  const handleFormChange = (): void => {
    //get lists of periodLists
    const periodLists = form.getFieldValue('periodLists') as PeriodListsType[];
    //sum array periodLists.accountLists.amount
    const sumAmount = periodLists.reduce((acc: number, curr: PeriodListsType) => {
      return acc + curr.accountLists.reduce((acc2, curr2) => acc2 + Number(curr2.amount), 0);
    }, 0);
    const noticeAmount = form.getFieldValue('noticeAmount') as number;
    //set balanceAmount = noticeAmount - sumAmount
    form.setFieldsValue({
      balanceAmount: noticeAmount - sumAmount,
    });
  };

  return (
    <div className='flex flex-col gap-4 mx-4 rounded-2xl'>
      {/* รายละเอียด */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-2xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-documentNo-title`} className='text-label-info'>
                    เลขที่เอกสาร
                  </p>
                  <p id={`${dataTestId}-documentNo-value`} className='text-display'>
                    -
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-paymentNo-title`} className='text-label-info'>
                    เลขที่ใบสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentNo-value`} className='text-display'>
                    -
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-user-title`} className='text-label-info'>
                    ผู้เตรียมจ่าย
                  </p>
                  <p
                    id={`${dataTestId}-user-value`}
                    className='text-display'
                  >{`${user?.firstName} ${user?.lastName}`}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-payDate-title`} className='text-label-info'>
                    วันที่เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-payDate-title`} className='text-display'>
                    {formatDayThai(dayjs().format('YYYY-MM-DD'))}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* บันทึกข้อมูล */}
      <BaseForm
        onFinish={onFinish}
        initialValues={initialForm}
        extraForm={form}
        name={'officefundPaymentForm'}
        onValuesChange={handleFormChange}
      >
        {/* บันทึกข้อมูล */}
        <div className='flex p-6 bg-white shadow-sm rounded-2xl mb-4'>
          <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
            <div className='w-full'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>บันทึกข้อมูล</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <BaseItemInput
                      suffix={<span className='text-gray-500'>/{Number(dayjs().format('YYYY')) + 543}</span>}
                      label='จ่ายตามประกาศฉบับที่'
                      itemName='noticeNumber'
                      placeholder='จ่ายตามประกาศฉบับที่'
                      rules={[requiredRule('จ่ายตามประกาศฉบับที่'), onlyNumberRule('จ่ายตามประกาศฉบับที่')]}
                    />
                  </Col>
                  <Col {...formColumn}>
                    <BaseItemInputNumber
                      label='จำนวนเงินจ่ายตามประกาศ (บาท)'
                      itemName='noticeAmount'
                      className='w-full'
                      rules={[requiredRule('จำนวนเงินจ่ายตามประกาศ (บาท)')]}
                      hideFieldControl
                    />
                  </Col>
                  <Col {...formColumn}>
                    {/* <p className='text-label'>จำนวนเงินคงเหลือตามประกาศ (บาท)</p> */}
                    {/* <p className='text-display mt-4 text-right'>
                      {formatCurrency(form.getFieldValue('balanceAmount') || 0)}
                    </p> */}
                    <BaseItemInputNumber
                      label='จำนวนเงินคงเหลือตามประกาศ (บาท)'
                      itemName='balanceAmount'
                      placeholder='จำนวนเงินคงเหลือตามประกาศ (บาท)'
                      className='w-full'
                      disabled
                      hideFieldControl
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>

        {/* รายการ งวดที่ */}

        <Form.List name='periodLists'>
          {(periodLists, { remove: removePeriodLists }) => {
            return (
              <>
                {periodLists.map((periodList, periodListIndex) => {
                  return (
                    <div key={periodList.key} className='p-6 bg-white shadow-sm rounded-2xl my-4'>
                      <div className='flex justify-between mb-6'>
                        <p className='header-card'>งวดที่</p>
                        <div className='flex gap-6'>
                          <BaseButton
                            className='!min-w-[150px]'
                            size='middle'
                            type='fieryRed'
                            icon={<Trash />}
                            label='ลบ'
                            onClick={() => removePeriodLists(periodListIndex)}
                            disabled={periodLists.length === 1}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col gap-4'>
                        <Row gutter={[16, 16]}>
                          <Col {...formColumn}>
                            <BaseItemInput
                              label='งวดที่'
                              itemName={[String(periodListIndex), 'periodNumber']}
                              placeholder='ระบุงวดที่'
                              rules={[requiredRule('งวดที่'), onlyNumberRule('งวดที่')]}
                            />
                          </Col>
                          <Col {...formColumn}>
                            <BaseItemInput
                              label='เลขที่หนังสือ รง.'
                              itemName={[String(periodListIndex), 'bookNo']}
                              placeholder='ระบุเลขที่หนังสือ รง.'
                              rules={[requiredRule('เลขที่หนังสือ รง.')]}
                            />
                          </Col>
                          <Col {...formColumn}>
                            <BaseItemDatePicker
                              label='วันที่หนังสือ'
                              itemName={[String(periodListIndex), 'bookDate']}
                              placeholder='เลือกวันที่หนังสือ'
                              className='w-full'
                              rules={[requiredRule('เลือกวันที่หนังสือ')]}
                            />
                          </Col>
                          <Col {...formColumn}>
                            <BaseItemInput
                              label='ชื่อผู้อนุมัติสั่งจ่าย'
                              itemName={[String(periodListIndex), 'bookApprover']}
                              placeholder='ระบุชื่อผู้อนุมัติสั่งจ่าย'
                              rules={[requiredRule('ระบุชื่อผู้อนุมัติสั่งจ่าย')]}
                            />
                          </Col>
                        </Row>
                        <hr className='mb-4' />
                        <Form.List name={[String(periodListIndex), 'accountLists']}>
                          {(accountLists, { add: addAccountLists, remove: removeAccountLists }) => {
                            return (
                              <>
                                {accountLists.map((accountList, accountListIndex) => (
                                  <div key={accountList.key}>
                                    <Row gutter={[16, 16]}>
                                      <Col xl={12}>
                                        <BaseItemInput
                                          label={`${accountListIndex + 1}.ชื่อบัญชีสั่งจ่าย`}
                                          itemName={[accountListIndex.toString(), 'accountName']}
                                          placeholder='ระบุชื่อบัญชีสั่งจ่าย'
                                          rules={[requiredRule('ชื่อบัญชีสั่งจ่าย')]}
                                        />
                                      </Col>
                                      <Col {...formColumn}>
                                        <BaseItemDropdown
                                          label='ธนาคาร'
                                          id={`${dataTestId}-bankCode-${accountList.key}-selecter`}
                                          itemName={[accountListIndex.toString(), 'bankCode']}
                                          option={bankSelectData}
                                          rules={[requiredRule('ธนาคาร')]}
                                        />
                                      </Col>
                                      <Col xl={3}>
                                        <BaseItemInput
                                          label='เลขที่เช็ค'
                                          className='text-center'
                                          itemName={[accountListIndex.toString(), 'chequeNumber']}
                                          placeholder='ระบุเลขที่เช็ค'
                                          rules={[
                                            requiredRule('เลขที่เช็ค'),
                                            onlyNumberRule('เลขที่เช็ค'),
                                            minRule('เลขที่เช็ค', 8),
                                            maxRule('เลขที่เช็ค', 8),
                                          ]}
                                        />
                                      </Col>
                                      <Col xl={3}>
                                        <BaseItemInputNumber
                                          label='จำนวนเงิน'
                                          itemName={[accountListIndex.toString(), 'amount']}
                                          placeholder='ระบุจำนวนเงิน'
                                          className='w-full'
                                          rules={[requiredRule('จำนวนเงิน')]}
                                          hideFieldControl
                                        />
                                      </Col>
                                    </Row>
                                    {accountLists.length === 1 && accountListIndex === 0 ? (
                                      <p
                                        className='text-lg font-bold text-[#1A6CA8] underline cursor-pointer'
                                        onClick={() => addAccountLists(accountList2[0])}
                                      >
                                        เพิ่มบัญชีสั่งจ่าย 2
                                      </p>
                                    ) : null}
                                    {accountLists.length > 1 && accountListIndex === 0 ? (
                                      <p
                                        className='text-lg font-bold text-[#C42828] underline cursor-pointer'
                                        onClick={() => removeAccountLists(1)}
                                      >
                                        ลบบัญชีสั่งจ่าย 2
                                      </p>
                                    ) : null}
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </Form.List>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          }}
        </Form.List>

        {/* ปุ่ม เพิ่มงวด/บันทึกข้อมูล */}

        <div className='flex justify-center gap-4 py-6'>
          <BaseButton size='large' type='outline' label='เพิ่มงวด' className='w-[240px]' onClick={handleAddRow} />
          <BaseButton size='large' label='บันทึกข้อมูล' className='w-[240px]' onClick={() => form.submit()} />
        </div>
      </BaseForm>

      <PopUpConfirmSave
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        dataTestId={dataTestId}
        handleConfirm={() => void handleConfirm()}
      />

      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => setIsOpenWarningModal(false)}
      />
    </div>
  );
}
