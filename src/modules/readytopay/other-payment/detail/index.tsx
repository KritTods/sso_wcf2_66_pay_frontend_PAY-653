'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import { BaseButton, BaseForm, BaseItemTextArea, BaseLoading } from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import { URL } from '@/constants/configPage';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrinterOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { otherPaymentSelector } from '@/store-redux/slices/readytopay/other-pament';
import { statusPayType } from '@/constants/statusSystem';
import { useAppDispatch } from '@/store-redux/store';
import { PayType } from '@/types/payType';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import TableBank, { TableBankType } from '@/components/common/tableBank';
import { maxRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import TableMoney, { TableMoneyType } from '@/components/common/tableMoney';

interface FormType {
  documentNo: string; // เลขที่เอกสาร
  paymentNo: string; // เลขที่คำสั่งจ่าย
  paymentAgent: string; // ผู้จเตียมจ่าย
  transactionDate: string; // วันที่เตรียมจ่าย
  payType: string; // วิธีการชำระเงิน
  receiverName: string; // ลูกจ้าง/ผู้มีสิทธิ์
  bookNo: string; // เลขที่หนังสือ รง.
  paymentType: string; // ประเภทการจ่ายนอกระบบ
  isCheque: boolean;
  cheques: TableChequeType[];
  banks: TableBankType[];
  moneys: TableMoneyType[];
  cash: number;
  address: string;
  cashEdit: number;
  chequesEdit: TableChequeType[];
  banksEdit: TableBankType[];
  moneysEdit: TableMoneyType[];
  addressEdit: string;
}

export default function OtherPaymentDetail(): React.ReactElement {
  const dataTestId = 'pageOtherPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { loading } = useSelector(otherPaymentSelector);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<'view' | 'edit'>();
  const [dataDetail, setDataDetail] = useState<FormType>();
  const [initFormData, setInitFormData] = useState<FormType>();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    //  void dispatch(getPrepareBudgetService(prepareBudgetRequestId));

    const newData = {
      documentNo: 'P000167000001E1',
      paymentNo: 'J000167000001E1',
      paymentAgent: 'กาญจนา พิเศษ',
      transactionDate: '2024-12-31',
      receiverName: 'กาญจนา พิเศษ',
      bookNo: 'รง0615/สท884',
      paymentType: 'โอนเงินเกินเข้าชำระหนี้เงินสมทบ กองทุนประกันสังคม',
      payType: 'P',
      isCheque: true,
      cheques: [
        {
          id: '1',
          chequeNo: '00000001',
          bankCode: '006',
          bankBranchCode: '0001',
          amount: 5000,
          chequeStampDate: '2024-12-31',
          mode: 'view',
        },
        {
          id: '2',
          chequeNo: '00000002',
          bankCode: '006',
          bankBranchCode: '0001',
          amount: 5000,
          chequeStampDate: '2024-12-31',
          mode: 'view',
        },
      ] as TableChequeType[],
      banks: [
        {
          id: '1',
          bankCode: '006',
          bankAccountName: 'กสิกรไทย',
          bankAccountNo: '0001000011',
          amount: 1000,
          mode: 'view',
        },
      ] as TableBankType[],
      moneys: [
        {
          id: '1',
          postalNo: '00000001',
          portalDestination: 'นนทบุรี',
          postalCode: '0001',
          receiverName: 'นิรันรัตน์ เทศกาล',
          amount: 3000,
          mode: 'view',
        },
      ] as TableMoneyType[],
      cash: 10000,
      address: '54 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
      cashEdit: 0,
      chequesEdit: [],
      banksEdit: [],
      moneysEdit: [],
      addressEdit: '',
    };

    //set dataDetail
    setDataDetail(newData);

    //set initFormData
    setInitFormData(newData);

    // first load set mode view
    setMode('view');
  }, [dispatch, id]);

  useEffect(() => {
    //check mode is undefined end process
    if (!mode || !dataDetail) return;

    const newData = {
      ...dataDetail,
      cashEdit: mode === 'edit' ? dataDetail.cash : 0,
      addressEdit: mode === 'edit' ? dataDetail.address : '',
      chequesEdit:
        mode === 'edit' ? (dataDetail.cheques.map((cheque) => ({ ...cheque, mode: 'edit' })) as TableChequeType[]) : [],
      banksEdit:
        mode === 'edit' ? (dataDetail.banks.map((bank) => ({ ...bank, mode: 'edit' })) as TableBankType[]) : [],
      moneysEdit:
        mode === 'edit' ? (dataDetail.moneys.map((money) => ({ ...money, mode: 'edit' })) as TableMoneyType[]) : [],
    };

    //set form data when mode is change
    setInitFormData(newData);
  }, [dataDetail, mode]);

  const onFinish = (values: FormType): void => {
    console.log('onFinish: ', values);
    //call api do save and reset mode to view

    //set mode to view
    setMode('view');
  };

  //loading Page
  if (loading || !initFormData || !dataDetail) {
    return <BaseLoading size='default' />;
  }

  return (
    <BaseForm name='other-payment-form-T' onFinish={onFinish} extraForm={form} initialValues={initFormData}>
      <div className='flex flex-col mx-4 gap-4 mb-6'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียดบันทึกจ่ายเงินประเภทอื่น</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>{dataDetail.documentNo}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่คำสั่งจ่าย</p>
                  <p className='text-display'>{dataDetail.paymentNo}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ผู้เตรียมจ่าย</p>
                  <p className='text-display'>{dataDetail.paymentAgent}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่เตรียมจ่าย</p>
                  <p className='text-display'>{formatDayThai(dataDetail.transactionDate)}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วิธีการชำระเงิน</p>
                  <p className='text-display'>{statusPayType[dataDetail.payType as PayType]}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่หนังสือ รง.</p>
                  <p className='text-display'>{dataDetail.bookNo}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ชื่อผู้มีสิทธิ์</p>
                  <p className='text-display'>{dataDetail.receiverName}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ประเภทการจ่ายนอกระบบ</p>
                  <p className='text-display'>{dataDetail.paymentType}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* //section address case ส่งเช็คทางไปรณษีย์ */}
        {dataDetail.payType === 'S' && (
          <div className='w-full bg-white shadow-sm rounded-xl flex flex-col gap-4 p-6'>
            <p className='header-card'>ส่งเช็คทางไปรษณีย์</p>
            <div className='w-full'>
              {mode === 'view' && (
                <div>
                  <p className='text-label-info'>ที่อยู่</p>
                  <p className='text-display'>{dataDetail.address}</p>
                </div>
              )}
              {mode === 'edit' && (
                <BaseItemTextArea
                  id={`${dataTestId}-input-textarea`}
                  itemName='address'
                  label='ที่อยู่'
                  rules={[requiredRule('ที่อยู่'), maxRule('ที่อยู่', 400)]}
                />
              )}
            </div>
          </div>
        )}

        {/* //section cash */}
        {!dataDetail.isCheque && (
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'>สั่งจ่ายโดย : เงินสด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <p className='text-label-info'>จำนวนเงิน (บาท)</p>
                </Col>
                <Col {...formColumn}>
                  <p className='text-display'>{formatCurrency(dataDetail.cash)}</p>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* //section bank แสดงเฉพาะ โอนผ่านธนาคารโดยจังหวัด */}
        {dataDetail.payType === 'T' && form && (
          <div className='bg-white rounded-xl'>
            <Form.List name='banks'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableBank
                      itemName={mode === 'view' ? 'banks' : 'banksEdit'}
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode}
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* //section cheque */}
        {dataDetail.isCheque && form && (
          <div className='bg-white rounded-xl'>
            <Form.List name={mode === 'view' ? 'cheques' : 'chequesEdit'}>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableCheque
                      itemName={mode === 'view' ? 'cheques' : 'chequesEdit'}
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode}
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* //section money แสดงเฉพาะ ธนาณัติ */}
        {dataDetail.payType === 'P' && form && (
          <div className='bg-white rounded-xl'>
            <Form.List name={mode === 'view' ? 'moneys' : 'moneysEdit'}>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableMoney
                      itemName={mode === 'view' ? 'moneys' : 'moneysEdit'}
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode}
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* //section button footer */}
        {mode === 'view' && (
          <div className='flex justify-center items-center gap-4'>
            <BaseButton
              type='cancel'
              size='large'
              label='ยกเลิก'
              onClick={() => router.push(URL.readytopay.otherPayment.url)}
            />

            {(dataDetail.isCheque || dataDetail.payType === 'P') && (
              <>
                <BaseButton
                  size='large'
                  label='แก้ไข'
                  className='border border-[#1C4651]'
                  onClick={() => {
                    setMode('edit');
                  }}
                  type='default'
                />
              </>
            )}

            {/* //แสดงเฉพาะ ธนาณัติ */}
            {dataDetail.isCheque && dataDetail.payType === 'P' && (
              <BaseButton
                size='large'
                label='Export ไปยัง Post App'
                className='w-[280px]'
                onClick={() => console.log('Export ไปยัง Post App')}
              />
            )}

            <BaseButton
              type='primary'
              size='large'
              label='ตัดจ่าย'
              className='bg-[#dedede] hover:bg-red-500'
              onClick={() => {
                console.log('ตัดจ่าย');
                // router.push(URL.readytopay.otherPayment.url);
              }}
            />

            {dataDetail.isCheque && (
              <>
                <BaseButton
                  size='large'
                  label='พิมพ์หนังสือลงนามในเช็ค'
                  className='w-[280px]'
                  icon={<PrinterOutlined />}
                  onClick={() => console.log('print')}
                />
              </>
            )}
          </div>
        )}
        {mode === 'edit' && (
          <div className='flex justify-center items-center gap-4'>
            <BaseButton
              type='cancel'
              size='large'
              label='ยกเลิก'
              onClick={() => {
                setMode('view');
              }}
            />

            <BaseButton
              type='primary'
              size='large'
              label='บันทึกข้อมูล'
              className='w-[240px]'
              htmlType='submit'
              onClick={() => form.submit()}
            />
          </div>
        )}
      </div>
    </BaseForm>
  );
}
