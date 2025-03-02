'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import {
  BaseButton,
  BaseForm,
  BaseItemDatePicker,
  BaseItemDropdown,
  BaseItemInput,
  BaseItemInputNumber,
  BaseLoading,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { URL } from '@/constants/configPage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import {
  GetOfficefundPaymentByIdServiceType,
  getOfficefundPaymentByIdService,
  updateRefundtoEmployerService,
} from '@/store-redux/slices/readytopay/officefund-payment';
import { PayloadAction } from '@reduxjs/toolkit';
import CollapseCustoms from '../component/collapse';
import { PrinterOutlined } from '@ant-design/icons';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { v4 as uuidv4 } from 'uuid';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { useSelector } from 'react-redux';
import { maxRule, minRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import dayjs from 'dayjs';

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

interface FormType extends GetOfficefundPaymentByIdServiceType {
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

export default function OfficefundPaymentDetail(): React.ReactElement {
  const dataTestId = 'pageOfficeFundPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const [dataDetail, setDataDetail] = useState<GetOfficefundPaymentByIdServiceType>();
  const router = useRouter();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [form] = Form.useForm();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<FormType>();
  const [initialForm] = useState<FormType>({
    prepareToPayId: '',
    documentNo: '',
    paymentNo: '',
    paymentAgent: '',
    transactionDate: '',
    noticeNumber: '',
    noticeAmount: 0,
    balanceAmount: 0,
    periodLists: [],
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

  const displayBankName = (bankCode: string): string => {
    const bank = bankList.find((item) => item.bankCode === bankCode);

    return bank ? `${bank.bankCode} : ${bank.bankName}` : '';
  };

  //for view-------------------------------------------------------------

  useEffect(() => {
    if (!id) return;
    // Call API Thunks

    const fetchData = async (): Promise<void> => {
      //call api detail by id
      const resDetail = (await dispatch(
        getOfficefundPaymentByIdService(id),
      )) as PayloadAction<GetOfficefundPaymentByIdServiceType>;
      if (resDetail.payload) {
        //set data detail รายละเอียด
        setDataDetail(resDetail.payload);
      }
    };
    void fetchData();
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return dataDetail;
  }, [dataDetail]);

  //for edit-------------------------------------------------------------

  useEffect(() => {
    if (!dataSource) return;

    const newData = {
      ...dataSource,
      periodLists: dataSource.periodLists.map((period) => {
        return {
          ...period,
          accountLists: period.accountLists.map((account) => {
            return {
              ...account,
            };
          }),
        };
      }),
    };

    //set initial value form
    form.setFieldsValue(newData);
  }, [mode, dataSource, form]);
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
    const resCreateApi = (await dispatch(updateRefundtoEmployerService(dataSave))) as PayloadAction<{
      prepareToPayId: string;
    }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //call api detail by id fetch new data
      const resDetail = (await dispatch(
        getOfficefundPaymentByIdService(resCreateApi.payload.prepareToPayId),
      )) as PayloadAction<GetOfficefundPaymentByIdServiceType>;
      if (resDetail.payload) {
        //set data detail รายละเอียด
        setDataDetail(resDetail.payload);
      }

      //set mode view
      setMode('view');

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

  //loading Page
  if (!dataDetail || !dataSource) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col rounded-xl gap-4 mx-4 mb-6'>
      <div className='flex flex-col justify-center items-center '>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-documentNo-label-title`} className='text-label-info'>
                    เลขที่เอกสาร
                  </p>
                  <p id={`${dataTestId}-documentNo-label-value`} className='text-display'>
                    {dataSource.documentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-paymentNo-label-title`} className='text-label-info'>
                    เลขที่คำสั่งจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentNo-label-value`} className='text-display'>
                    {dataSource.paymentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-paymentAgent-label-title`} className='text-label-info'>
                    ผู้เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-paymentAgent-label-value`} className='text-display'>
                    {dataSource.paymentAgent}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-transactionDate-label-title`} className='text-label-info'>
                    วันที่เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-transactionDate-label-value`} className='text-display'>
                    {formatDayThai(dataSource.transactionDate)}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {mode === 'view' && (
        <>
          {/* บันทึกข้อมูล */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>บันทึกข้อมูล</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-noticeNumber-label-title`} className='text-label-info'>
                        จ่ายตามประกาศฉบับที่
                      </p>
                      <p id={`${dataTestId}-noticeNumber-label-value`} className='text-display'>
                        {dataSource.noticeNumber}
                      </p>
                    </div>
                  </Col>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-noticeAmount-label-title`} className='text-label-info'>
                        จำนวนเงินจ่ายตามประกาศ (บาท)
                      </p>
                      <p id={`${dataTestId}-noticeAmount-label-value`} className='text-display'>
                        {formatCurrency(dataSource.noticeAmount)}
                      </p>
                    </div>
                  </Col>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-balanceAmount-label-title`} className='text-label-info'>
                        จำนวนเงินคงเหลือตามประกาศ (บาท)
                      </p>
                      <p id={`${dataTestId}-balanceAmount-label-value`} className='text-display'>
                        {formatCurrency(dataSource.balanceAmount)}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {/* รายการ งวดที่ */}
          {dataSource.periodLists.map((item, index) => {
            return (
              <div key={index}>
                <CollapseCustoms
                  title={`งวดที่ : ${item.periodNumber}`}
                  collapseKey={item.id} // ส่ง collapseKey เพื่อใช้แทน key ใน component
                  key={item.id} // ใช้ key สำหรับ React rendering
                  type='detail'
                  isDefaultOpen={index === dataSource.periodLists.length - 1}
                >
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-bookNo-label-title`} className='text-label-info'>
                        เลขที่หนังสือ รง.
                      </p>
                      <p id={`${dataTestId}-bookNo-label-value`} className='text-display text-black'>
                        {item.bookNo}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-bookApprover-label-title`} className='text-label-info'>
                        ผู้อนุมัติสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-bookApprover-label-value`} className='text-display text-black'>
                        {item.bookApprover}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-bookDate-label-title`} className='text-label-info'>
                        วันที่หนังสือ
                      </p>
                      <p id={`${dataTestId}-bookDate-label-value`} className='text-display text-black'>
                        {formatDayThai(item.bookDate)}
                      </p>
                    </Col>
                  </Row>

                  {item.accountLists.map((item, index) => {
                    return (
                      <>
                        <hr className='my-5' />
                        <Row key={index} gutter={[16, 16]} className='my-5'>
                          <Col lg={24}>
                            <p id={`${dataTestId}-accountName-label-title`} className='text-label-info'>
                              ชื่อบัญชีสั่งจ่าย
                            </p>
                            <p id={`${dataTestId}-accountName-label-value`} className='text-display text-black'>
                              {item.accountName}
                            </p>
                          </Col>
                          <Col {...formColumn}>
                            <p id={`${dataTestId}-chequeNumber-label-title`} className='text-label-info'>
                              เลขที่เช็ค
                            </p>
                            <p id={`${dataTestId}-chequeNumber-label-value`} className='text-display text-black'>
                              {item.chequeNumber}
                            </p>
                          </Col>
                          <Col {...formColumn}>
                            <p id={`${dataTestId}-amount-label-title`} className='text-label-info'>
                              จำนวนเงิน (บาท)
                            </p>
                            <p id={`${dataTestId}-amount-label-value`} className='text-display text-black'>
                              {formatCurrency(item.amount)}
                            </p>
                          </Col>
                          <Col {...formColumn}>
                            <p id={`${dataTestId}-amount-label-title`} className='text-label-info'>
                              ธนาคาร
                            </p>
                            <p id={`${dataTestId}-amount-label-value`} className='text-display text-black'>
                              {displayBankName(item.bankCode)}
                            </p>
                          </Col>
                        </Row>
                      </>
                    );
                  })}
                </CollapseCustoms>
              </div>
            );
          })}

          <div className='flex justify-center items-center gap-4'>
            <BaseButton
              id={`${dataTestId}-cancel-button`}
              size='large'
              type='cancel'
              label='ยกเลิก'
              className='w-[240px]'
              onClick={() => router.push(URL.readytopay.officeFundPayment.url)}
            />
            <BaseButton
              size='large'
              type='outline'
              label='แก้ไข'
              className='w-[240px]'
              onClick={() => setMode('edit')}
            />
            <BaseButton
              size='large'
              label='พิมพ์หนังสือลงนามในเช็ค'
              className='!min-w-[280px]'
              icon={<PrinterOutlined />}
              onClick={() => console.log('print')}
            />
          </div>
        </>
      )}

      {mode === 'edit' && (
        <>
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
              <BaseButton
                id={`${dataTestId}-cancel-button`}
                size='large'
                type='cancel'
                label='ยกเลิก'
                className='w-[240px]'
                onClick={() => setMode('view')}
              />
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
        </>
      )}
    </div>
  );
}
