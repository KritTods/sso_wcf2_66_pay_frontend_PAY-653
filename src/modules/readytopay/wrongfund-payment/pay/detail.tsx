'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CardDetailWrongFundPayment from '@/components/wrongFundPayment/cardDetailWrongFundPayment';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import {
  BodyUpdateWrongFundPaymentServiceType,
  getWrongFundDetailService,
  ResGetWrongFundDetailServiceType,
  updateWrongFundPaymentService,
  wrongFundPaymentPaySelector,
} from '@/store-redux/slices/readytopay/wrongfund-payment';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  TableBankType,
  TableCheque,
  TableChequeType,
  TableMoneyType,
  CardCash,
  PopUpConfirmSave,
  PopUpWarning,
  MSGCodeType,
  TableBank,
  TableMoney,
  CardAddress,
  CUSTOM_DISPLAY_TABLE_MONEY,
} from '@/components/common';
import { PrinterOutlined } from '@ant-design/icons';

interface FormType {
  cheques?: TableChequeType[];
  cash?: number;
  banks?: TableBankType[];
  address?: string;
  moneys?: TableMoneyType[];
  chequesEdit?: TableChequeType[];
  cashEdit?: number;
  banksEdit?: TableBankType[];
  addressEdit?: string;
  moneysEdit?: TableMoneyType[];
}

export default function DetailPay(): React.ReactElement {
  const dataTestId = 'pageWrongFundPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading } = useSelector(wrongFundPaymentPaySelector);
  const router = useRouter();
  const [dataPageDetail, setDataPageDetail] = useState<ResGetWrongFundDetailServiceType>();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<'view' | 'edit'>();
  //for case update
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');

  //fn set data rerender mode
  const handleSetDataToForm = useCallback(
    (mode: 'view' | 'edit', data: ResGetWrongFundDetailServiceType): void => {
      if (mode === 'view') {
        //set data to mode edit

        if (data.isCheque) {
          const manipulateCheques = data.cheques.map((item) => {
            return { ...item, mode: 'view' };
          });
          form.setFieldValue('cheques', manipulateCheques);
        }

        if (data.cardHeader.payType === 'T') {
          //set mode to data banks
          const manipulateBanks = data.banks.map((item) => {
            return { ...item, mode: 'view' };
          });
          form.setFieldValue('banks', manipulateBanks);
        }

        if (data.cardHeader.payType === 'S') {
          //set mode to data cheque
          form.setFieldValue('address', data.address);
        }

        if (data.cardHeader.payType === 'P') {
          const manipulateMoneys = data.moneys.map((item) => {
            return { ...item, mode: 'view' };
          });
          //set mode to data cheque
          form.setFieldValue('moneys', manipulateMoneys);
        }
      }

      if (mode === 'edit') {
        //set data to mode edit

        if (data.isCheque) {
          const manipulateCheques = data.cheques.map((item) => {
            return { ...item, mode: 'edit' };
          });
          form.setFieldValue('chequesEdit', manipulateCheques);
        }

        if (data.cardHeader.payType === 'T') {
          //set mode to data banks
          const manipulateBanks = data.banks.map((item) => {
            return { ...item, mode: 'edit' };
          });
          form.setFieldValue('banksEdit', manipulateBanks);
        }

        if (data.cardHeader.payType === 'S') {
          //set mode to data cheque
          form.setFieldValue('addressEdit', data.address);
        }

        if (data.cardHeader.payType === 'P') {
          const manipulateMoneys = data.moneys.map((item) => {
            return { ...item, mode: 'custom' };
          });
          //set mode to data cheque
          form.setFieldValue('moneysEdit', manipulateMoneys);
        }
      }
    },
    [form],
  );
  //fn call api detail
  const fetchData = useCallback(async (): Promise<void> => {
    if (!id) return;

    //call api detail by id
    const resDetail = (await dispatch(
      getWrongFundDetailService(id),
    )) as PayloadAction<ResGetWrongFundDetailServiceType>;

    if (resDetail.payload) {
      //set data detail รายละเอียด
      setDataPageDetail(resDetail.payload);
      setMode('view');
      //for first load
      handleSetDataToForm('view', resDetail.payload);
      handleSetDataToForm('edit', resDetail.payload);
    }
  }, [id, dispatch, handleSetDataToForm]);

  //call api detail first load
  useEffect(() => {
    if (!id) return;

    void fetchData();
  }, [id, dispatch, fetchData]);

  //monitor mode when mode change tiger set data to form
  useEffect(() => {
    if (!dataPageDetail || !mode) return;
    //call fn set data to form
    handleSetDataToForm(mode, dataPageDetail);
  }, [mode, dataPageDetail, handleSetDataToForm]);

  //redirect to cut off payment
  const handleRedirectToCutOffPayment = (): void => {
    if (!dataPageDetail) return;

    if (dataPageDetail.cardHeader.payType === 'X') {
      //redirect to cut off payment office รับเงิน ณ สำนักงาน
      router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundOffice.url}?id=${dataPageDetail.cardHeader.id}`);
    }

    if (dataPageDetail.cardHeader.payType === 'T') {
      //redirect to cut off payment bank โอนผ่านธนาคาร
      router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundBank.url}?id=${dataPageDetail.cardHeader.id}`);
    }

    if (dataPageDetail.cardHeader.payType === 'S') {
      //redirect to cut off payment cheque ส่งเช็คทางไปรษณีย์
      router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundCheque.url}?id=${dataPageDetail.cardHeader.id}`);
    }

    if (dataPageDetail.cardHeader.payType === 'P') {
      //redirect to cut off payment monys ธนาณัติ
      router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundMoney.url}?id=${dataPageDetail.cardHeader.id}`);
    }
  };

  const onFinish = (values: FormType): void => {
    console.log('onFinish', values);
    if (!dataPageDetail) return;
    //ยอดเงินจาก CardHeader
    const amount = dataPageDetail.cardHeader.amount;

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
      //เช็คจำนวนเงินรวม cheques และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);

      if (sumCheque !== amount) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.cash !== undefined) {
      //เช็คจำนวนเงินรวม cach และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const cash = Number(values.cash);

      if (cash !== amount) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.banks !== undefined) {
      //เช็คจำนวนเงินรวม cheques และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumBank = values.banks.reduce((acc: number, item: TableBankType) => acc + Number(item.amount), 0);

      if (sumBank !== amount) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    //เปิด modal ยืนยันการทำรายการ
    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!id) return;

    const dataSave: BodyUpdateWrongFundPaymentServiceType = {
      prepareToPayId: id,
    }; // todo : ต้องเปลี่ยนเป็นข้อมูลจริง

    const resCreateApi = (await dispatch(updateWrongFundPaymentService(dataSave))) as PayloadAction<{
      prepareToPayId: string;
    }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });

      void fetchData();

      //close modal confirm
      setIsOpenConfirmModal(false);
      //set mode view
      setMode('view');
    }
  };

  //loading Page
  if (loading || !dataPageDetail) {
    return <BaseLoading size='default' />;
  }

  return (
    <>
      <BaseForm name='formDetailWrongFundPaymentPay' extraForm={form} onFinish={onFinish}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          <CardDetailWrongFundPayment dataTestId={dataTestId} data={dataPageDetail.cardHeader} />
          {/* //section address case ส่งเช็คทางไปรณษีย์ */}
          {dataPageDetail.cardHeader.payType === 'S' && (
            <div className='bg-white rounded-xl p-6'>
              <CardAddress
                dataTestId={dataTestId}
                address={dataPageDetail.address}
                mode={mode === 'edit' ? 'input' : 'view'}
                itemName={mode === 'edit' ? 'addressEdit' : 'address'}
              />
            </div>
          )}

          {/*  ธนาคาร case โอนผ่านธนาคาร */}
          {dataPageDetail.cardHeader.payType === 'T' && form && (
            <div className='bg-white rounded-xl'>
              <Form.List name={mode === 'edit' ? 'banksEdit' : 'banks'}>
                {(_, { add, remove }) => {
                  return (
                    <TableBank
                      itemName={mode === 'edit' ? 'banksEdit' : 'banks'}
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode}
                      dataTestId={dataTestId}
                      hideButtonAdd
                    />
                  );
                }}
              </Form.List>
            </div>
          )}

          {/*  เช็ค */}
          {dataPageDetail.isCheque && form && (
            <div className='bg-white rounded-xl '>
              <Form.List name={mode === 'edit' ? 'chequesEdit' : 'cheques'}>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableCheque
                        itemName={mode === 'edit' ? 'chequesEdit' : 'cheques'}
                        form={form}
                        add={add}
                        remove={remove}
                        mode={mode}
                        dataTestId={dataTestId}
                        hideButtonAdd={dataPageDetail.cardHeader.payType === 'P'}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}
          {/* เงินสด */}
          {!dataPageDetail.isCheque && (
            <CardCash
              dataTestId={dataTestId}
              cash={dataPageDetail.cash}
              mode={mode === 'edit' ? 'input' : 'view'}
              itemName={mode === 'edit' ? 'cashEdit' : 'cash'}
            />
          )}

          {/* //section money แสดงเฉพาะ ธนาณัติ */}
          {dataPageDetail.cardHeader.payType === 'P' && form && (
            <div className='bg-white rounded-xl'>
              <Form.List name={mode === 'edit' ? 'moneysEdit' : 'moneys'}>
                {(_, { add, remove }) => {
                  return (
                    <>
                      <TableMoney
                        itemName={mode === 'edit' ? 'moneysEdit' : 'moneys'}
                        form={form}
                        add={add}
                        remove={remove}
                        dataTestId={dataTestId}
                        // mode={'addWrongFund'}
                        mode={mode}
                        hideButtonAdd
                        customDisplayTable={{ ...CUSTOM_DISPLAY_TABLE_MONEY, postalNo: 'input' }}
                      />
                    </>
                  );
                }}
              </Form.List>
            </div>
          )}

          <div className='flex justify-center items-center gap-4'>
            {mode === 'edit' && (
              <>
                <BaseButton
                  size='large'
                  type='cancel'
                  label='ยกเลิก'
                  className='w-[240px]'
                  onClick={() => {
                    setMode('view');
                  }}
                />
                <BaseButton
                  size='large'
                  type='primary'
                  label='บันทึก'
                  className='w-[240px]'
                  onClick={() => form.submit()}
                />
              </>
            )}
            {mode === 'view' && (
              <>
                <BaseButton
                  size='large'
                  type='cancel'
                  label='ยกเลิก'
                  className='w-[240px]'
                  onClick={() => {
                    router.push(URL.readytopay.wrongfundPayment.url);
                  }}
                />
                <BaseButton
                  size='large'
                  type='outline'
                  label='แก้ไข'
                  className='w-[240px]'
                  onClick={() => {
                    setMode('edit');
                  }}
                />

                {/* //แสดงเฉพาะ ธนาณัติ */}
                {dataPageDetail.cardHeader.payType === 'P' && (
                  <BaseButton
                    id={`${dataTestId}-button-print-post-app`}
                    size='large'
                    label='Export ไปยัง Post App'
                    className='w-[280px]'
                    onClick={() => console.log('Export ไปยัง Post App')}
                  />
                )}

                <BaseButton
                  size='large'
                  type='primary'
                  label='ตัดจ่าย'
                  className='w-[240px]'
                  onClick={handleRedirectToCutOffPayment}
                />
                <BaseButton size='large' label='พิมหนังสือในนามเช็ค' icon={<PrinterOutlined />} className='w-[240px]' />
              </>
            )}
          </div>
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
  );
}
