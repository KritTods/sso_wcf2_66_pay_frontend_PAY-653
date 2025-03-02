'use client';
import CardCash from '@/components/common/cardCash';
import CardConsider from '@/components/common/cardConsider';
import CardPreparePay from '@/components/common/cardPreparePay';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentOtherSelector,
  getOtherFormService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/other-payment';
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
  receiveType: string;
  receiveName: string;
  identityDocument: string;
  identityNo: string;
  receiveAddress: string;
  referenceDocument: string;
  referenceNo: string;
  cheques: TableChequeType[];
}

export default function PaymentOfficeForm(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentOfficeForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentOtherSelector);
  const [form] = Form.useForm();
  const [editCheque, setEditCheque] = useState(false);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();
  const [dataEditChequeOld, setDataEditChequeOld] = useState<TableChequeType[]>([]);

  const {
    stateLayout: { user },
  } = useLayout();

  useEffect(() => {
    if (!id || !user) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getOtherFormService(id))) as PayloadAction<PageFormType>;
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
  }, [dispatch, id, pageForm, user]);

  const dataCardPreparePay = useMemo(() => {
    return {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || 'X',
      paymentNo: pageForm.cardPreparePay?.paymentNo || '',
      bookNo: pageForm.cardPreparePay?.bookNo || '',
      receiverName: pageForm.cardPreparePay?.receiverName || '',
      paymentType: pageForm.cardPreparePay?.paymentType || '',
    };
  }, [pageForm.cardPreparePay]);

  const dataCardConsider = useMemo(() => {
    if (!user) return;

    return {
      payDate: pageForm.cardConsider?.payDate || '',
      payer: `${user.firstName} ${user.lastName}`,
      status: '-',
    };
  }, [pageForm.cardConsider, user]);

  const initialValuesForm = useMemo(() => {
    const cheques = pageForm.cheques.map((item) => {
      return {
        id: item.id,
        chequeNo: item.chequeNo,
        amount: item.amount,
        bankCode: item.bankCode,
        chequeStampDate: item.chequeStampDate,
        bankBranchCode: '',
        mode: 'view',
      };
    });

    return {
      // ...pageForm.cardConsider,
      cheques,
    };
  }, [pageForm]);

  //when editCheque
  useEffect(() => {
    let dataCurrentForm: FormType = form.getFieldsValue() as FormType;
    //save old data for reset case cancel
    if (editCheque) {
      const cheques = Array.isArray(dataCurrentForm.cheques) ? dataCurrentForm.cheques : [];
      setDataEditChequeOld(cheques);
    }

    const cheques: TableChequeType[] =
      (Array.isArray(dataCurrentForm.cheques) &&
        dataCurrentForm.cheques.map((item: TableChequeType) => {
          return {
            id: item.id,
            chequeNo: item.chequeNo,
            amount: item.amount,
            bankCode: item.bankCode,
            chequeStampDate: item.chequeStampDate,
            bankBranchCode: '',
            mode: editCheque ? 'edit' : 'view',
          };
        })) ||
      [];

    if (Array.isArray(dataCurrentForm.cheques)) {
      dataCurrentForm = { ...dataCurrentForm, cheques } as FormType;
    }

    //set data to form
    form.setFieldsValue(dataCurrentForm);
  }, [editCheque, form]);

  const handleUpdateCheque = (): void => {
    const dataCurrentForm = form.getFieldsValue() as FormType;
    //set data to form
    form.setFieldsValue(dataCurrentForm);
    setEditCheque(false);
  };

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(`${URL.cutOffPayment.cutOffOtherPaymentOfficeDetail.url}?id=1`);

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };

  const onSubmit = (values: Record<string, unknown>): void => {
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
      <BaseForm name='paymentChequeForm' initialValues={initialValuesForm} extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          {dataCardConsider && <CardConsider dataTestId={dataTestId} data={dataCardConsider} />}

          <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-xl'>
            <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />
            <div className='mb-6'>
              <BaseButton
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไข'
                type='outline'
                onClick={() =>
                  openHistoryModal(BaseKeyTableHistory.HISTORY_PREPARE_PAY, BaseKeyTableHistory.HISTORY_PREPARE_PAY)
                }
              />
            </div>
          </div>

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

          <div className='flex justify-center gap-4'>
            <BaseButton
              size='large'
              type='cancel'
              label='ยกเลิก'
              className='w-[240px]'
              onClick={() => router.push(URL.cutOffPayment.cutOffOtherPayment.url)}
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
