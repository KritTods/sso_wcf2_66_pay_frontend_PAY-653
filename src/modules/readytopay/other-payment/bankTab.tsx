'use client';
import React, { useState, useEffect } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseButton, BaseToastNotification } from 'wcf-component-lib/src/components';
import CardHeaderTab from '@/modules/readytopay/other-payment/cardHeaderTab';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import TableBank, { INIT_DATA_BANK, TableBankType } from '@/components/common/tableBank';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
interface BaseTabsProps {
  dataTestId: string;
}

interface FormType {
  bookNo: string;
  receiverName: string;
  paymentType: string;
  cheques: TableChequeType[];
  banks: TableBankType[];
}

export default function BankTab({ dataTestId }: BaseTabsProps): React.ReactElement {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [form] = Form.useForm();
  const router = useRouter();
  const [initFormData, setInitFormData] = useState<FormType>({
    bookNo: '',
    receiverName: '',
    paymentType: '',
    cheques: INIT_DATA_CHEQUE,
    banks: INIT_DATA_BANK,
  });

  useEffect(() => {
    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [...INIT_DATA_CHEQUE],
        banks: (form.getFieldValue('banks') as TableBankType[]) || [...INIT_DATA_BANK],
      };
    });
  }, [form]);

  const handleConfirm = (): void => {
    //call api do something
    // if (true) {
    BaseToastNotification({
      key: 'create',
      type: 'success',
      description: 'ทำรายการเสร็จสิ้น',
    });
    //redirect to หน้ารายละเอียดการเตรียมจ่าย
    router.push(`${URL.readytopay.otherPaymentDetail.url}?id=1`);

    //close modal confirm
    setIsOpenConfirmModal(false);
    // }
  };

  const onFinish = (values: FormType): void => {
    console.log('onFinish: ', values);

    //ธนาคารต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.banks.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('100');

      return;
    }

    //เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    if (values.cheques !== undefined && values.banks !== undefined) {
      //เช็คจำนวนเงินรวม cheques และ banks ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + item.amount, 0);
      const sumBank = values.banks.reduce((acc: number, item: TableBankType) => acc + item.amount, 0);
      if (sumCheque !== sumBank) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    setIsOpenConfirmModal(true);
  };

  return (
    <BaseForm name='other-payment-form-T' onFinish={onFinish} extraForm={form} initialValues={initFormData}>
      <div className='flex flex-col gap-4'>
        <div className='-mt-6 bg-white rounded-b-xl'>
          <CardHeaderTab dataTestId={dataTestId} />
        </div>

        {form && form.getFieldValue('banks') && (
          <div className='bg-white rounded-xl'>
            <Form.List name='banks'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableBank
                      itemName='banks'
                      form={form}
                      add={add}
                      remove={remove}
                      mode='add'
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {form && (
          <div className='bg-white rounded-xl'>
            <Form.List name='cheques'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableCheque
                      itemName='cheques'
                      form={form}
                      add={add}
                      remove={remove}
                      mode='add'
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        <div className='flex justify-center gap-4'>
          <BaseButton
            type='cancel'
            size='large'
            label='ยกเลิก'
            className='min-w-[240px] bg-[#dedede] hover:bg-red-500'
            onClick={() => router.push(URL.readytopay.readyToPay.url)}
          />
          <BaseButton
            size='large'
            label='บันทึกข้อมูล'
            className='w-[240px]'
            htmlType='submit'
            onClick={() => form.submit()}
          />
        </div>
      </div>

      <PopUpConfirmSave
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />

      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => setIsOpenWarningModal(false)}
      />
    </BaseForm>
  );
}
