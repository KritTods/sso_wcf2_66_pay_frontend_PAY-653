'use client';
import CardCash from '@/components/common/cardCash';
import CardConsider from '@/components/common/cardConsider';
import CardPreparePay, { CardPrepareType } from '@/components/common/cardPreparePay';
import CardTableReceipt from '@/components/common/cardTableReceipt';
import CardTableWrongFundPayment from '@/components/common/cardTableWrongFundPayment';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import TableMoney, { CUSTOM_DISPLAY_TABLE_MONEY, TableMoneyType } from '@/components/common/tableMoney';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentWrongFundSelector,
  getWrongFundFormService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/wrongfund-payment';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';
interface FormType {
  cheques: TableChequeType[];
  moneys: TableMoneyType[];
}

export default function PaymentMoneyForm(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentWrongFundForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentWrongFundSelector);
  const [form] = Form.useForm();
  const [editCheque, setEditCheque] = useState(false);
  const [editMoney, setEditMoney] = useState(false);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();
  const [dataEditChequeOld, setDataEditChequeOld] = useState<TableChequeType[]>([]);
  const [dataEditMoneyOld, setDataEditMoneyOld] = useState<TableMoneyType[]>([]);

  const {
    stateLayout: { user },
  } = useLayout();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getWrongFundFormService(id))) as PayloadAction<PageFormType>;
      // Set data to form
      const newPageForm = {
        ...pageForm,
        ...payload,
      };
      if (JSON.stringify(newPageForm) !== JSON.stringify(pageForm)) {
        void dispatch(setPageForm(newPageForm));
      }
    };

    void fetchData();
  }, [dispatch, id, pageForm]);

  const dataCardPreparePay = useMemo(() => {
    let dataCardPreparePay: CardPrepareType = {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || 'X',
      paymentNo: pageForm.cardPreparePay?.paymentNo || '',
      advancePaymentType: pageForm.cardPreparePay?.advancePaymentType || 'PAY',
      incorrectPaymentReason: pageForm.cardPreparePay?.incorrectPaymentReason || 'J',
      paymentRequest: pageForm.cardPreparePay?.paymentRequest || '',
      amount: pageForm.cardPreparePay?.amount || 0,
    };

    if (dataCardPreparePay.advancePaymentType === 'FIN') {
      //remove object key referenceDocument, advancePaymentType
      dataCardPreparePay = {
        documentNo: pageForm.cardPreparePay?.documentNo || '',
        paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
        transactionDate: pageForm.cardPreparePay?.transactionDate || '',
        payType: pageForm.cardPreparePay?.payType || 'X',
        advancePaymentType: pageForm.cardPreparePay?.advancePaymentType || 'PAY',
      };
    }

    return dataCardPreparePay;
  }, [pageForm.cardPreparePay]);

  const dataCardConsider = useMemo(() => {
    if (!user) return;

    return {
      payDate: pageForm.cardConsider?.payDate || '',
      payer: `${user.firstName} ${user.lastName}`,
      status: '-',
    };
  }, [pageForm.cardConsider, user]);

  const dataTableList = useMemo(() => {
    return pageForm.tableList;
  }, [pageForm.tableList]);

  const dataCardTableReceipt = useMemo(() => {
    return pageForm.receipts;
  }, [pageForm.receipts]);

  const initialValuesForm = useMemo(() => {
    const cheques = pageForm.cheques.map((item) => ({
      id: item.id,
      chequeNo: item.chequeNo,
      amount: item.amount,
      bankCode: item.bankCode,
      chequeStampDate: item.chequeStampDate,
      bankBranchCode: '',
      mode: 'view',
    }));

    const moneys = pageForm.moneys.map((item) => ({
      id: item.id,
      postalNo: item.postalNo,
      postalCode: item.postalCode,
      portalDestination: item.portalDestination,
      receiverName: item.receiverName,
      amount: item.amount,
      mode: 'view',
    }));

    return {
      cheques,
      moneys,
    };
  }, [pageForm]);

  useEffect(() => {
    let dataCurrentForm: FormType = form.getFieldsValue() as FormType;
    if (editCheque) {
      const cheques = Array.isArray(dataCurrentForm.cheques) ? dataCurrentForm.cheques : [];
      setDataEditChequeOld(cheques);
    }
    if (editMoney) {
      const moneys = Array.isArray(dataCurrentForm.moneys) ? dataCurrentForm.moneys : [];
      setDataEditMoneyOld(moneys);
    }

    const cheques: TableChequeType[] =
      (Array.isArray(dataCurrentForm.cheques) &&
        dataCurrentForm.cheques.map((item: TableChequeType) => ({
          id: item.id,
          chequeNo: item.chequeNo,
          amount: item.amount,
          bankCode: item.bankCode,
          chequeStampDate: item.chequeStampDate,
          bankBranchCode: '',
          mode: editCheque ? 'edit' : 'view',
        }))) ||
      [];

    const moneys: TableMoneyType[] =
      (Array.isArray(dataCurrentForm.moneys) &&
        dataCurrentForm.moneys.map((item: TableMoneyType) => ({
          id: item.id,
          postalNo: item.postalNo,
          postalCode: item.postalCode,
          portalDestination: item.portalDestination,
          receiverName: item.receiverName,
          amount: item.amount,
          mode: editMoney ? 'custom' : 'view',
        }))) ||
      [];

    if (Array.isArray(dataCurrentForm.cheques)) {
      dataCurrentForm = { ...dataCurrentForm, cheques };
    }
    if (Array.isArray(dataCurrentForm.moneys)) {
      dataCurrentForm = { ...dataCurrentForm, moneys };
    }

    form.setFieldsValue(dataCurrentForm);
  }, [editCheque, editMoney, form]);

  const handleUpdateCheque = (): void => {
    const dataCurrentForm = form.getFieldsValue() as FormType;
    form.setFieldsValue(dataCurrentForm);
    setEditCheque(false);
  };

  const handleUpdateMoney = (): void => {
    const dataCurrentForm = form.getFieldsValue() as FormType;
    form.setFieldsValue(dataCurrentForm);
    setEditMoney(false);
  };

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(`${URL.cutOffPayment.cutOffPaymentWrongFundMoneyDetail.url}?id=1`);

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };

  const onSubmit = (values: FormType): void => {
    console.log('onSubmit :>> ', values);
    setIsOpenConfirmSave(true);
  };

  const dataHistory = useMemo(() => {
    if (!keyTableHistory) return [];

    return pageForm[keyTableHistory] || [];
  }, [pageForm, keyTableHistory]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  const openHistoryModal = (title: string, key: KeyTableHistory): void => {
    setTitleHistoryModal(title);
    setKeyTableHistory(key);
    setIsOpenHistoryModal(true);
  };

  return (
    <>
      <BaseForm name='paymentOfficeForm' initialValues={initialValuesForm} extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          {dataCardConsider && <CardConsider dataTestId={dataTestId} data={dataCardConsider} />}

          <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-xl'>
            <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />
            <div className='mb-6'>
              <BaseButton
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไขเตรียมจ่าย'
                type='outline'
                onClick={() =>
                  openHistoryModal(BaseKeyTableHistory.HISTORY_PREPARE_PAY, BaseKeyTableHistory.HISTORY_PREPARE_PAY)
                }
              />
            </div>
          </div>

          {dataCardPreparePay.advancePaymentType === 'FIN' && (
            <>
              <div className='bg-white pb-6 shadow-sm rounded-xl'>
                <CardTableWrongFundPayment dataTestId='dataTestId' data={dataTableList} isNotShadow />

                <div className='flex justify-center gap-4'>
                  <BaseButton
                    icon={<ClockRotateRight />}
                    size='large'
                    label='ประวัติการแก้ไขใบสั่งจ่าย'
                    type='outline'
                    onClick={() =>
                      openHistoryModal(
                        BaseKeyTableHistory.HISTORY_ORDER_PAYMENT,
                        BaseKeyTableHistory.HISTORY_ORDER_PAYMENT,
                      )
                    }
                  />
                </div>
              </div>

              <CardTableReceipt dataTestId='dataTestId' data={dataCardTableReceipt} />
            </>
          )}

          {pageForm.isCheque && (
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              {form && (
                <div className='bg-white rounded-xl -m-6'>
                  <Form.List name='cheques'>
                    {(_, { add, remove }) => {
                      return (
                        <>
                          <TableCheque
                            isNotShadow
                            itemName='cheques'
                            form={form}
                            add={add}
                            remove={remove}
                            mode={editCheque ? 'edit' : 'view'}
                            dataTestId={dataTestId}
                            hideButtonAdd
                          />
                        </>
                      );
                    }}
                  </Form.List>
                </div>
              )}
              <div className='flex justify-center gap-4 mt-6'>
                {editCheque ? (
                  <>
                    <BaseButton
                      size='large'
                      label='ยกเลิกการแก้ไขเช็ค'
                      type='cancel'
                      onClick={() => {
                        setEditCheque(false);
                        //when cancel reset data to old data from dataEditChequeOld
                        form.setFieldsValue({ cheques: dataEditChequeOld });
                      }}
                    />
                    <BaseButton
                      size='large'
                      label='บันทึกการแก้ไขเช็ค'
                      type='primary'
                      onClick={() => handleUpdateCheque()}
                    />
                  </>
                ) : (
                  <>
                    <BaseButton
                      icon={<ClockRotateRight />}
                      size='large'
                      label='ประวัติการแก้ไขเช็ค'
                      type='outline'
                      onClick={() =>
                        openHistoryModal(BaseKeyTableHistory.HISTORY_CHEQUES, BaseKeyTableHistory.HISTORY_CHEQUES)
                      }
                    />
                    <BaseButton size='large' label='แก้ไขเช็ค' type='outline' onClick={() => setEditCheque(true)} />
                  </>
                )}
              </div>
            </div>
          )}

          {!pageForm.isCheque && <CardCash dataTestId={dataTestId} cash={pageForm.cash} />}

          {pageForm.moneys && (
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              {form && (
                <div className='bg-white rounded-xl -m-6'>
                  <Form.List name='moneys'>
                    {(_, { add, remove }) => {
                      return (
                        <>
                          <TableMoney
                            customDisplayTable={{ ...CUSTOM_DISPLAY_TABLE_MONEY, postalNo: 'input' }}
                            isNotShadow
                            hideButtonAdd
                            itemName='moneys'
                            form={form}
                            add={add}
                            remove={remove}
                            mode={editMoney ? 'edit' : 'view'}
                            dataTestId={dataTestId}
                          />
                        </>
                      );
                    }}
                  </Form.List>
                </div>
              )}
              <div className='flex justify-center gap-4 mt-6'>
                {editMoney ? (
                  <>
                    <BaseButton
                      size='large'
                      label='ยกเลิกการแก้ไขธนาณัติ'
                      type='cancel'
                      onClick={() => {
                        setEditMoney(false);
                        //when cancel reset data to old data from dataEditMoneyOld
                        form.setFieldsValue({ moneys: dataEditMoneyOld });
                      }}
                    />
                    <BaseButton
                      size='large'
                      label='บันทึกการแก้ไขธนาณัติ'
                      type='primary'
                      onClick={() => handleUpdateMoney()}
                    />
                  </>
                ) : (
                  <>
                    <BaseButton
                      icon={<ClockRotateRight />}
                      size='large'
                      label='ประวัติการแก้ไขธนาณัติ'
                      type='outline'
                      onClick={() =>
                        openHistoryModal(BaseKeyTableHistory.HISTORY_MONEYS, BaseKeyTableHistory.HISTORY_MONEYS)
                      }
                    />
                    <BaseButton size='large' label='แก้ไขธนาณัติ' type='outline' onClick={() => setEditMoney(true)} />
                  </>
                )}
              </div>
            </div>
          )}

          <div className='flex justify-center gap-4'>
            <BaseButton
              size='large'
              type='cancel'
              label='ยกเลิก'
              className='w-[240px]'
              onClick={() => router.push(URL.cutOffPayment.cutOffPaymentWrongFund.url)}
            />

            <BaseButton
              size='large'
              label='พิมหนังสือลงในนามเช็ค'
              icon={<PrinterOutlined />}
              className='w-[280px]'
              onClick={() => {
                console.log('พิมหนังสือลงในนามเช็ค');
              }}
            />
            <BaseButton
              size='large'
              type='primary'
              label='ตัดจ่าย'
              className='w-[240px]'
              onClick={() => form.submit()}
            />
          </div>
        </div>
      </BaseForm>

      <PopUpConfirmSave
        isOpen={isOpenConfirmSave}
        setIsOpen={setIsOpenConfirmSave}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />

      {/* PopUp History */}
      {dataHistory && (
        <PopUpHistory
          dataTestId={dataTestId}
          isOpen={isOpenHistoryModal}
          setIsOpen={setIsOpenHistoryModal}
          titleTable={titleHistoryModal}
          handleCancel={() => setIsOpenHistoryModal(false)}
          typeData='string'
          align='center'
          data={dataHistory}
        />
      )}
    </>
  );
}
