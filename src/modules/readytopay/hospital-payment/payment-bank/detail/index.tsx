'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { URL } from '@/constants/configPage';
import { PrinterOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import {
  BodyUpdateHospitalServiceType,
  getHospitalByIdService,
  GetHospitalByIdServiceType,
  initialDataCommonType,
  ReadyToPayDataType,
  updateHospitalService,
} from '@/store-redux/slices/readytopay/hospital-payment';
import { PayloadAction } from '@reduxjs/toolkit';
import { formatDayThai } from '@/utils/formatGeneral';
import TablePaymentRequest from '../../component/tablePaymentRequest';
import CacheCash from '@/components/common/cardCash';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import CardDetailTax from '@/components/common/cardDetailTax';
import dayjs from 'dayjs';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';

interface FormType {
  tableList: ReadyToPayDataType[];
  cheques: TableChequeType[];
  cash: number;
  taxHotpitalName: string;
  taxAmount: number;
  taxPercent: number;
  taxAmountAfterCalTax: number;
  taxTotalAmountAfterCalTax: number;
}

export default function BankDetail(): React.JSX.Element {
  const dataTestId = 'pageHospitalPaymentDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [dataDetail, setDetail] = useState<GetHospitalByIdServiceType>();
  const [dataPaymentOrders, setDataPaymentOrders] = useState<ReadyToPayDataType[]>([]);
  const [dataPaymentOrdersEdit, setDataPaymentOrdersEdit] = useState<ReadyToPayDataType[]>([]);
  const [taxPercent, setTaxPercent] = useState<number>(1);
  const [initFormData, setInitFormData] = useState<FormType>({
    ...initialDataCommonType,
    taxHotpitalName: '',
    taxAmount: 0,
    taxPercent,
    taxAmountAfterCalTax: 0,
    taxTotalAmountAfterCalTax: 0,
    cheques: [],
    tableList: [],
  });
  //for case update
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSave, setDataSave] = useState<BodyUpdateHospitalServiceType>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async (): Promise<void> => {
      //call api detail by id
      const resDetail = (await dispatch(getHospitalByIdService(id))) as PayloadAction<GetHospitalByIdServiceType>;
      if (resDetail.payload) {
        //set data detail รายละเอียด
        setDetail(resDetail.payload);
      }
    };
    void fetchData();
  }, [dispatch, id]);

  const dataCardTax = useMemo(() => {
    if (!dataDetail) return;

    const taxHotpitalName = dataDetail.paymentList[0]?.hospital;
    const taxAmount = dataPaymentOrdersEdit.reduce((acc, item: { amount: number }) => acc + Number(item.amount), 0);
    const taxAmountAfterCalTax = taxAmount * (Number(taxPercent) / 100);
    const taxTotalAmountAfterCalTax = taxAmount - taxAmountAfterCalTax;

    //update state ของ form when data change
    setInitFormData((prev) => {
      const newData = { ...prev };

      return {
        ...newData,
        cheques: (form.getFieldValue('cheques') as TableChequeType[]) || [],
        cash: (form.getFieldValue('cash') as number) || 0,
        taxHotpitalName,
        taxAmount,
        taxPercent,
        taxAmountAfterCalTax,
        taxTotalAmountAfterCalTax,
      };
    });

    return {
      taxHotpitalName: taxHotpitalName,
      taxAmount: taxAmount,
      taxPercent: taxPercent,
      taxAmountAfterCalTax: taxAmountAfterCalTax,
      taxTotalAmountAfterCalTax: taxTotalAmountAfterCalTax,
    };
  }, [dataDetail, taxPercent, form, dataPaymentOrdersEdit]);

  //update cheques to form
  useEffect(() => {
    if (!dataDetail) return;

    //update state ของ form when data change
    const cheques = dataDetail.chequeInfoList.map((item) => {
      return {
        id: item.chequeInfoId,
        chequeNo: item.chequeNo,
        bankCode: item.bank.code,
        bankBranchCode: '',
        amount: item.chequeAmount,
        chequeStampDate: item.chequeDate,
        mode: mode,
      };
    });

    form.setFieldsValue({
      cheques,
    });
  }, [dataDetail, mode, form]);

  useEffect(() => {
    if (!dataDetail) return;

    //set data payment orders รายการสั่งจ่าย
    setDataPaymentOrders(dataDetail.paymentList);

    //set data payment orders รายการสั่งจ่าย สำหรับ edit
    setDataPaymentOrdersEdit(dataDetail.paymentList);

    //set tax percent
    setTaxPercent(dataDetail.taxPercent);
    //set form data
    setInitFormData((prev) => {
      const newData = { ...prev };
      //map feilds cheques
      const cheques = dataDetail.chequeInfoList.map((item) => {
        return {
          id: item.chequeInfoId,
          chequeNo: item.chequeNo,
          bankCode: item.bank.code,
          bankBranchCode: '',
          amount: item.chequeAmount,
          chequeStampDate: item.chequeDate,
          mode: mode,
        };
      });

      return {
        ...newData,
        cheques,
        cash: dataDetail.cashAmount,
      };
    });
  }, [dataDetail, mode]);

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
    if (!dataDetail) return;

    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (dataPaymentOrdersEdit.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }

    //เช็คต้องมีเงินอย่างน้อย 1 รายการ หากไม่มีเปิด modal แจ้งเตือน
    if (values.cheques && values.cheques.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('000');

      return;
    }

    if (values.cheques) {
      //เช็คจำนวนเงินรวม cheques และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const sumCheque = values.cheques.reduce((acc: number, item: TableChequeType) => acc + Number(item.amount), 0);
      const sumPaymentOrder = dataPaymentOrdersEdit.reduce(
        (acc: number, item: { amount: number }) => acc + Number(item.amount),
        0,
      );
      if (sumCheque !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    if (values.cash) {
      //เช็คจำนวนเงินรวม cach และ sumPaymentOrder ต้องเท่ากัน หากเท่ากันเปิด modal แจ้งเตือน
      const cash = Number(values.cash);
      const sumPaymentOrder = dataPaymentOrdersEdit.reduce(
        (acc: number, item: { amount: number }) => acc + Number(item.amount),
        0,
      );
      if (cash !== sumPaymentOrder) {
        setIsOpenWarningModal(true);
        setCodeWarningModal('001');

        return;
      }
    }

    const paymentList = dataPaymentOrdersEdit.map((item: { paymentNo: string }) => {
      return {
        paymentNo: item.paymentNo,
      };
    });

    let dataBody: BodyUpdateHospitalServiceType = {
      prepareToPayId: dataDetail.prepareToPayId,
      taxPercent: values.taxPercent,
      taxAmount: values.taxAmountAfterCalTax,
      paymentList,
    };

    //case cash
    if (dataDetail.payBy.code === 'X') {
      dataBody = {
        ...dataBody,
        cashAmount: Number(values.cash),
      };
    }

    //case cheques
    if (dataDetail.payBy.code === 'C') {
      const chequeInfoList = values.cheques.map((item) => {
        return {
          chequeInfoId: item.id,
          chequeNo: item.chequeNo,
          bankCode: item.bankCode,
          chequeAmount: Number(item.amount),
          chequeDate: dayjs(item.chequeStampDate).format('YYYY-MM-DD'),
        };
      }) as {
        chequeInfoId: string;
        chequeNo: string;
        bankCode: string;
        chequeAmount: number;
        chequeDate: string;
      }[];

      dataBody = {
        ...dataBody,
        chequeInfoList,
      };
    }

    //set data save for update
    setDataSave(dataBody);
    setIsOpenConfirmModal(true);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!dataSave) return;

    const resCreateApi = (await dispatch(updateHospitalService(dataSave))) as PayloadAction<{ prepareToPayId: string }>;
    if (resCreateApi.payload) {
      BaseToastNotification({
        key: 'create',
        type: 'success',
        description: 'ทำรายการเสร็จสิ้น',
      });
      //redirect to หน้ารายละเอียดการเตรียมจ่าย
      // router.push(`${URL.readytopay.hospitalPaymentOfficeDetail.url}?id=${resCreateApi.payload.prepareToPayId}`);

      const fetchData = async (): Promise<void> => {
        //call api detail by id
        const resDetail = (await dispatch(
          getHospitalByIdService(resCreateApi.payload.prepareToPayId),
        )) as PayloadAction<GetHospitalByIdServiceType>;
        if (resDetail.payload) {
          //set data detail รายละเอียด
          setDetail(resDetail.payload);
        }
      };
      void fetchData();

      //close modal confirm
      setIsOpenConfirmModal(false);
      //set mode view
      setMode('view');
    }
  };

  //loading Page
  if (!dataDetail || !dataCardTax) {
    return <BaseLoading size='default' />;
  }

  return (
    <BaseForm extraForm={form} name='paymentOfficeEdit' initialValues={initFormData} onFinish={onFinish}>
      <div className='flex flex-col gap-4 mb-6'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'> รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>{dataDetail.documentNo || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ผู้เตรียมจ่าย</p>
                  <p className='text-display'>{dataDetail.createdBy || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่เตรียมจ่าย</p>
                  <p className='text-display'>{formatDayThai(dataDetail.createdDate) || '-'}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วิธีการชำระเงิน</p>
                  <p className='text-display'>{dataDetail.payType.name}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Table รายการสั่งจ่าย */}

        <TablePaymentRequest
          dataTestId={dataTestId}
          tabActive={'T'}
          data={mode === 'edit' ? dataPaymentOrdersEdit : dataPaymentOrders}
          setData={mode === 'edit' ? setDataPaymentOrdersEdit : setDataPaymentOrders}
          mode={mode === 'edit' ? 'input' : 'view'}
        />

        {dataDetail.payBy.code === 'C' && form && (
          <div className='bg-white rounded-xl '>
            <Form.List name='cheques'>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableCheque
                      itemName='cheques'
                      form={form}
                      add={add}
                      remove={remove}
                      mode={mode === 'edit' ? 'addBank' : 'view'}
                      dataTestId={dataTestId}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* เงินสด */}
        {dataDetail.payBy.code === 'X' && (
          <CacheCash dataTestId={dataTestId} cash={dataDetail.cashAmount} mode={mode === 'edit' ? 'input' : 'view'} />
        )}

        <CardDetailTax
          dataTestId={dataTestId}
          data={dataCardTax}
          mode={mode === 'edit' ? 'input' : 'view'}
          callBackTaxPercent={(value) => {
            setTaxPercent(value);
          }}
        />

        {/* button action */}
        <div className='flex justify-center gap-4'>
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
                  router.push(URL.readytopay.hospitalPayment.url);
                }}
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
                type='primary'
                label='ตัดจ่าย'
                className='w-[240px]'
                onClick={() => {
                  router.push(`${URL.cutOffPayment.cutOffHospitalPaymentBank.url}?id=${id}`);
                }}
              />
              <BaseButton size='large' label='พิมหนังสือในนามเช็ค' icon={<PrinterOutlined />} className='w-[240px]' />
            </>
          )}
        </div>
      </div>
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
    </BaseForm>
  );
}
