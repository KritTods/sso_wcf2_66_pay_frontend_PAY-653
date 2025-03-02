'use client';
import React, { useState, useEffect } from 'react';
import { Col, Row, Form, TabsProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import {
  BaseForm,
  BaseIcon,
  BaseItemInputNumber,
  BaseTabs,
  BaseButton,
  BaseToastNotification,
} from 'wcf-component-lib/src/components';
import { Cash } from 'wcf-component-lib/node_modules/iconoir-react';
import TableCheque, { INIT_DATA_CHEQUE, TableChequeType } from '@/components/common/tableCheque';
import CardHeaderTab from '@/modules/readytopay/other-payment/cardHeaderTab';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import TableMoney, { INIT_DATA_MONEY, TableMoneyType } from '@/components/common/tableMoney';

interface BaseTabsProps {
  dataTestId: string;
}

interface FormType {
  cheques: TableChequeType[];
  cash: number;
  bookNo: string;
  receiverName: string;
  paymentType: string;
  moneys: TableMoneyType[];
}

export default function MoneyTab({ dataTestId }: BaseTabsProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('cheque');
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
    moneys: INIT_DATA_MONEY,
    cash: 0,
  });

  const items: TabsProps['items'] = [
    {
      key: 'cheque',
      label: (
        <div className='flex justify-center items-center h-[72px] -mt-[6px] w-full'>
          <BaseIcon
            name='payOrders'
            size='24px'
            className='!mr-1'
            classNameColor={{
              base: '!text-primary',
              active: 'white-text',
              disabled: 'text-primary-very-bright',
            }}
            disabled={false}
            active={activeTab === 'cheque'}
          />
          <span>เช็ค</span>
        </div>
      ),
    },
    {
      key: 'cash',
      label: (
        <div className='flex justify-center items-center h-[72px] -mt-[6px] w-full'>
          <Cash className='mr-2' />
          <span>เงินสด</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [...INIT_DATA_CHEQUE],
        cash: (form.getFieldValue('cash') as number) || 0,
        moneys: (form.getFieldValue('moneys') as TableMoneyType[]) || [...INIT_DATA_MONEY],
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
    //sum จำนวนเงินของ cheques
    const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);

    //เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques && values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }
    //ธนาณัติต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.moneys.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('200');

      return;
    }

    if (values.cheques) {
      //เช็คจำนวนเงินรวม cheques และ moneys ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumMoney = values.moneys.reduce((acc: number, item: TableMoneyType) => acc + Number(item.amount), 0);
      if (sumCheque !== sumMoney) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    setIsOpenConfirmModal(true);
  };

  return (
    <BaseForm name='other-payment-form-P' onFinish={onFinish} extraForm={form} initialValues={initFormData}>
      <div className='flex flex-col gap-4'>
        <div className='-mt-6 bg-white rounded-b-xl'>
          <CardHeaderTab dataTestId={dataTestId} />
        </div>

        <BaseTabs
          className='w-full'
          defaultActiveKey={'cheque'}
          items={items}
          onChange={(key: string) => setActiveTab(key)}
        />

        {activeTab === 'cheque' && form && (
          <div className='-mt-4 bg-white rounded-b-xl'>
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

        {activeTab === 'cash' && (
          <div className='-mt-4 bg-white rounded-b-xl'>
            <div className='p-6'>
              <p className='header-card'>เงินสด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <BaseItemInputNumber
                    label='จำนวนเงิน (บาท)'
                    id='amount-form'
                    className='w-full'
                    rules={[{ required: true, message: 'กรุณากรอก' }]}
                    itemName='amount'
                    step={1}
                    hideFieldControl={true}
                  />
                </Col>
              </Row>
            </div>
          </div>
        )}

        {form && (
          <div className='bg-white rounded-xl'>
            <Form.List name='moneys'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableMoney
                      itemName='moneys'
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

        <div className='flex justify-center  gap-4'>
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
