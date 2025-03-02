'use client';
import React, { useState, useEffect } from 'react';
import { Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm, BaseButton, BaseItemTextArea, BaseToastNotification } from 'wcf-component-lib/src/components';
import CardHeaderTab from '@/modules/readytopay/other-payment/cardHeaderTab';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { maxRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
interface BaseTabsProps {
  dataTestId: string;
}

interface FormType {
  bookNo: string;
  receiverName: string;
  paymentType: string;
  address: string;
  cheques: TableChequeType[];
}

export default function ChequeTab({ dataTestId }: BaseTabsProps): React.ReactElement {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [form] = Form.useForm();
  const router = useRouter();
  const [initFormData, setInitFormData] = useState<FormType>({
    bookNo: '',
    receiverName: '',
    paymentType: '',
    address: '',
    cheques: INIT_DATA_CHEQUE,
  });

  useEffect(() => {
    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [...INIT_DATA_CHEQUE],
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
    router.push(`${URL.readytopay.otherPaymentDetail.url}?id=${1}`);

    //close modal confirm
    setIsOpenConfirmModal(false);
    // }
  };

  const onFinish = (values: FormType): void => {
    console.log('onFinish: ', values);

    //validate cheques length = 0 show modal error warning
    if (values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }
    setIsOpenConfirmModal(true);
  };

  return (
    <BaseForm name='other-payment-form-S' onFinish={onFinish} extraForm={form} initialValues={initFormData}>
      <div className='flex flex-col gap-4'>
        <div className='-mt-6 bg-white rounded-b-xl'>
          <CardHeaderTab dataTestId={dataTestId} />
        </div>

        <div className='w-full bg-white shadow-sm rounded-xl flex flex-col gap-4 p-6'>
          <p className='header-card'>ส่งเช็คทางไปรษณีย์</p>
          <div className='w-full'>
            <BaseItemTextArea
              id={`${dataTestId}-input-textarea`}
              itemName='address'
              label='ที่อยู่'
              rules={[requiredRule('ที่อยู่'), maxRule('ที่อยู่', 400)]}
            />
          </div>
        </div>

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
