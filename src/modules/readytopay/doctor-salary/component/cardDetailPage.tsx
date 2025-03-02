'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import { formatDayThai, formatCurrency } from '@/utils/formatGeneral';
import { formColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseButton,
  BaseLoading,
  BaseToastNotification,
  BaseItemTextArea,
} from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  Update_MType,
  Update_TType,
  Update_SType,
  Update_XType,
  Update_PType,
  readyToPayDoctorSalarySelector,
  setPagePaymentDetail,
  getDoctorSalalyByPrepareToPayIdService,
  updateDoctorSalalyService,
  updateDoctorSalaly_TService,
  updateDoctorSalaly_XService,
  updateDoctorSalaly_PService,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { useAppDispatch } from '@/store-redux/store';
import { PrinterOutlined } from '@ant-design/icons';
import TableRequestPayment from '@/modules/readytopay/doctor-salary/component/tableRequestPayment';
import TableCheque from '@/components/common/tableCheque';
import TableMoney from '@/components/common/tableMoney';
import { PayType } from '@/types/payType';
import { statusPayType } from '@/constants/statusSystem';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { maxRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
interface dataPops {
  paramsId: string; //prepareToPayId
  dataTestId: string;
}

export default function CardDetailPage({ paramsId, dataTestId }: dataPops): React.ReactElement {
  const id = paramsId;
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'view' | 'edit' | 'add'>('view'); // ตั้งค่าเริ่มต้นให้แน่ใจว่า 'view'
  const [payType, setPayType] = useState<PayType>('X');
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); //บันทึกข้อมูลใช่หรือไม่?
  const {
    pageDoctorSalalyDetail,
    pageDoctorSalalyDetail: { loadDatalist },
  } = useSelector(readyToPayDoctorSalarySelector);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');

  const [Obj_X, setObj_X] = useState({}); //เตรียมค่าก่อนบันทึก กรณี รับเงิน ณ สำนักงาน
  const [Obj_T, setObj_T] = useState({}); //เตรียมค่าก่อนบันทึก กรณี โอนผ่านธนาคารโดยจังหวัด
  const [Obj_S, setObj_S] = useState({}); //เตรียมค่าก่อนบันทึก กรณี ส่งเช็คทางไปรษณีย์
  const [Obj_P, setObj_P] = useState({}); //เตรียมค่าก่อนบันทึก กรณี ธนาณัติ
  const [Obj_M, setObj_M] = useState({}); //เตรียมค่าก่อนบันทึก กรณี พร้อมเพย์

  //ดึงข้อมูลรายละเอียดข้อมูลเตรียมจ่ายทดแทน/แพทย์
  useEffect(() => {
    if (!id) return;
    //Call API Thunks
    void dispatch(getDoctorSalalyByPrepareToPayIdService(id));
  }, [dispatch, id]);

  //add loading firstload
  const data = useMemo(() => {
    return pageDoctorSalalyDetail;
  }, [pageDoctorSalalyDetail]);

  useEffect(() => {
    //check mode is undefined end process
    if (!mode) return;

    if (mode === 'edit' || mode === 'view') {
      console.log('pageDoctorSalalyDetail', pageDoctorSalalyDetail);

      void dispatch(
        setPagePaymentDetail({
          ...pageDoctorSalalyDetail,
          //paymentList :รายการสั่งจ่าย
          paymentListEdit: pageDoctorSalalyDetail.paymentList.map((paymentLists) => ({
            ...paymentLists,
            mode: 'edit',
          })),
          //cheques :สั่งจ่ายโดย : เช็ค
          chequesEdit: pageDoctorSalalyDetail.cheques.map((cheque) => ({
            ...cheque,
            mode: 'edit',
          })),
          //moneys :ธนาณัติ
          moneysEdit: pageDoctorSalalyDetail.moneys.map((money) => ({
            ...money,
            mode: 'edit',
          })),
        }),
      );
    } else {
      //reset modeEdit clear data when cancel mode edit
      void dispatch(
        setPagePaymentDetail({
          ...pageDoctorSalalyDetail,
          paymentListEdit: [],
          chequesEdit: [],
          moneysEdit: [],
        }),
      );
    }
  }, [dispatch, mode, pageDoctorSalalyDetail]);

  //setPayType
  useEffect(() => {
    if (!data.payType.code) return;
    setPayType(data.payType.code as PayType);
  }, [data.payType.code]);

  //loading form
  if (loadDatalist) {
    return <BaseLoading size='default' />;
  }

  interface ValuesType {
    requestPaymentEdit?: { paymentNo: string }[];
    chequesEdit?: {
      id: string;
      chequeNo: string;
      bankCode: string;
      amount: number;
      chequeStampDate: string;
    }[];
    moneysEdit?: {
      id: string;
      postalNo: string;
      portalDestination: string;
      postalCode: string;
      amount: number;
    }[];
  }

  const onFinish = (values: ValuesType): void => {
    console.log('Detail values', values, values.requestPaymentEdit?.length);

    //validate กรณี จ่ายเงิน ณ สำนักงาน มีใบสั่งจ่ายได้แค่ 1 ใบ
    if (values.requestPaymentEdit?.length == 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }

    let paymentList: { paymentNo: string }[] = [];

    let chequeInfoList: {
      chequeInfoId: string;
      chequeNo: string;
      bankCode: string;
      chequeAmount: number;
      chequeDate: string;
    }[] = [];

    let postalInfoList: {
      //ไปรษณีย์
      postalInfoId: string;
      paymentNo: string;
      postalNo: string;
      postalCode: string;
      postalDestination: string;
      postalAmount: number;
    }[] = [];

    paymentList = (values.requestPaymentEdit || []).map((item) => ({
      paymentNo: item.paymentNo,
    }));

    if (data.payBy.code === 'C') {
      chequeInfoList = (values.chequesEdit || []).map((item) => ({
        chequeInfoId: item.id,
        chequeNo: item.chequeNo,
        bankCode: item.bankCode,
        chequeAmount: item.amount,
        chequeDate: item.chequeStampDate,
      }));
    }

    if (data.payBy.code === 'S') {
      postalInfoList = (values.moneysEdit || []).map((item) => ({
        postalInfoId: item.id,
        paymentNo: item.postalNo,
        postalNo: item.portalDestination,
        postalCode: item.postalCode,
        postalDestination: item.portalDestination,
        postalAmount: Number(item.amount || 0),
      }));
    }

    // กรณีพร้อมเพย์
    setObj_M({
      prepareToPayId: id,
      paymentList: paymentList, // ใส่ paymentList ที่ได้จากด้านบน
    });

    // โอนผ่านธนาคารโดยจังหวัด
    setObj_T({
      prepareToPayId: id,
      paymentList: paymentList,
      chequeInfoList: chequeInfoList,
    });

    // ส่งเช็คทางไปรษณีย์
    setObj_S({
      prepareToPayId: id,
      postAddress: data.address,
      paymentList: paymentList,
      chequeInfoList: chequeInfoList,
    });

    //เงินสด = X - เช็ค = C
    if (data.payBy.code === 'X') {
      // รับเงิน ณ สำนักงาน เงินสด
      if (payType === 'X') {
        setObj_X({
          prepareToPayId: id,
          cashAmount: data.cash,
          paymentList: paymentList,
        });
      }

      // ธนาณัติ เงินสด
      if (payType === 'P') {
        setObj_P({
          prepareToPayId: id,
          cashAmount: data.cash,
          paymentList: paymentList,
          postalInfoList: postalInfoList,
        });
      }
    } else {
      // รับเงิน ณ สำนักงาน เช็ค
      if (payType === 'X') {
        setObj_X({
          prepareToPayId: id,
          paymentList: paymentList,
          chequeInfoList: chequeInfoList,
        });
      }

      // ธนาณัติ เช็ค
      if (payType === 'P') {
        setObj_P({
          prepareToPayId: id,
          paymentList: paymentList,
          chequeInfoList: chequeInfoList,
          postalInfoList: postalInfoList,
        });
      }
    }

    setIsOpenConfirmModal(true);
  };

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'เสร็จสิ้น',
      description: 'ทำรายการเสร็จสิ้น',
    });
    //พร้อมเพย์
    if (payType == 'M') {
      console.log('Obj_M', Obj_M);
      if (Obj_M) {
        // Call API Thunks
        dispatch(updateDoctorSalalyService(Obj_M as Update_MType))
          .unwrap()
          .then((response) => {
            void dispatch(getDoctorSalalyByPrepareToPayIdService(response.prepareToPayId));
          })
          .catch((error) => {
            console.error('API error', error);
          });
      }
    }

    //โอนผ่านธนาคารโดยจังหวัด
    if (payType == 'T') {
      console.log('Obj_T', Obj_T);
      if (Obj_M) {
        // Call API Thunks
        dispatch(updateDoctorSalaly_TService(Obj_T as Update_TType))
          .unwrap()
          .then((response) => {
            void dispatch(getDoctorSalalyByPrepareToPayIdService(response.prepareToPayId));
          })
          .catch((error) => {
            console.error('API error', error);
          });
      }
    }

    //ส่งเช็คทางไปรษณีย์
    if (payType == 'S') {
      console.log('Obj_S', Obj_S);
      if (Obj_M) {
        // Call API Thunks
        dispatch(updateDoctorSalaly_TService(Obj_S as Update_SType))
          .unwrap()
          .then((response) => {
            void dispatch(getDoctorSalalyByPrepareToPayIdService(response.prepareToPayId));
          })
          .catch((error) => {
            console.error('API error', error);
          });
      }
    }

    //รับเงิน ณ สำนักงาน
    if (payType == 'X') {
      console.log('Obj_X', Obj_X);
      if (Obj_M) {
        // Call API Thunks
        dispatch(updateDoctorSalaly_XService(Obj_X as Update_XType))
          .unwrap()
          .then((response) => {
            void dispatch(getDoctorSalalyByPrepareToPayIdService(response.prepareToPayId));
          })
          .catch((error) => {
            console.error('API error', error);
          });
      }
    }

    //ธนาณัติ
    if (payType == 'P') {
      console.log('Obj_P', Obj_P);
      if (Obj_M) {
        // Call API Thunks
        dispatch(updateDoctorSalaly_PService(Obj_P as Update_PType))
          .unwrap()
          .then((response) => {
            void dispatch(getDoctorSalalyByPrepareToPayIdService(response.prepareToPayId));
          })
          .catch((error) => {
            console.error('API error', error);
          });
      }
    }

    setMode('view');

    //close modal
    setIsOpenConfirmModal(false);
  };

  const handleCancel = (): void => {
    setIsOpenConfirmModal(false);
  };

  return (
    <BaseForm name={dataTestId} onFinish={onFinish} extraForm={form} initialValues={data}>
      <div className='m-4 flex flex-col gap-4'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'> รายละเอียด</p>
            <Row key={dataTestId} gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-carddetail-documentno-label-title`} className='text-label-info'>
                    เลขที่เอกสาร
                  </p>
                  <p id={`${dataTestId}-carddetail-documentno-label-value`} className='text-display'>
                    {data.documentNo}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-carddetail-createdBy-label-title`} className='text-label-info'>
                    ผู้เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-carddetail-createdBy-label-value`} className='text-display'>
                    {data.createdBy}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-carddetail-createdDate-label-title`} className='text-label-info'>
                    วันที่เตรียมจ่าย
                  </p>
                  <p id={`${dataTestId}-carddetail-createdDate-label-value`} className='text-display'>
                    {formatDayThai(data.createdDate)}
                  </p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-carddetail-payType-label-title`} className='text-label-info'>
                    วิธีการชำระเงิน
                  </p>
                  <p id={`${dataTestId}-carddetail-payType-label-value`} className='text-display'>
                    {statusPayType[data.payType.code as PayType]}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* //section รายการสั่งจ่าย */}
        {form && (
          <div className='bg-white rounded-lg'>
            <Form.List name={mode === 'view' ? 'requestPayment' : 'requestPaymentEdit'}>
              {(_, { add, remove }) => {
                return (
                  <>
                    <TableRequestPayment
                      itemName={mode === 'view' ? 'requestPayment' : 'requestPaymentEdit'}
                      form={form}
                      add={add}
                      mode={mode}
                      remove={remove}
                      dataTestId={dataTestId}
                      tabPaymentActive={data.payType.code as PayType}
                    />
                  </>
                );
              }}
            </Form.List>
          </div>
        )}

        {/* //section address case ส่งเช็คทางไปรณษีย์ */}
        {data.payType.code === 'S' && (
          <div className='w-full bg-white shadow-sm rounded-lg flex flex-col gap-4 p-6'>
            <p className='header-card'>ส่งเช็คทางไปรษณีย์</p>
            <div className='w-full'>
              {mode === 'view' && (
                <div>
                  <p id={`${dataTestId}-carddetail-address-label-title`} className='text-label-info'>
                    ที่อยู่
                  </p>
                  <p id={`${dataTestId}-cardPaymentDetail-address-label-value`} className='text-display'>
                    {data.address}
                  </p>
                </div>
              )}
              {mode === 'edit' && (
                <BaseItemTextArea
                  id={`${dataTestId}-carddetail-input-textarea`}
                  itemName='address'
                  label='ที่อยู่'
                  rules={[requiredRule('ที่อยู่'), maxRule('ที่อยู่', 400)]}
                />
              )}
            </div>
          </div>
        )}

        {/* //section cash */}
        {!data.isCheque && data.payType.code != 'M' && (
          <div className='w-full bg-white p-6 shadow-sm rounded-lg'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'>สั่งจ่ายโดย : เงินสด</p>
              <Row gutter={[16, 16]}>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-carddetail-data-label-title`} className='text-label-info'>
                    จำนวนเงิน (บาท)
                  </p>
                </Col>
                <Col {...formColumn}>
                  <p id={`${dataTestId}-cardPaymentDetail-data-label-value`} className='text-display'>
                    {formatCurrency(data.cash)}
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* //section cheque */}
        {data.isCheque && form && data.payType.code != 'M' && (
          <div className='bg-white rounded-lg'>
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
        {data.payType.code === 'P' && form && (
          <div className='bg-white rounded-lg'>
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
              id={`${dataTestId}-button-cancel`}
              type='cancel'
              size='large'
              label='ยกเลิก'
              onClick={() => router.push(URL.readytopay.doctorSalary.url)}
            />

            <BaseButton
              id={`${dataTestId}-button-edit`}
              size='large'
              label='แก้ไข'
              className='border border-[#1C4651]'
              onClick={() => {
                setMode('edit');
              }}
              type='default'
            />

            {/* //แสดงเฉพาะ ธนาณัติ */}
            {data.isCheque && data.payType.code === 'P' && (
              <BaseButton
                id={`${dataTestId}-button-print-post-app`}
                size='large'
                label='Export ไปยัง Post App'
                className='w-[280px]'
                onClick={() => console.log('Export ไปยัง Post App')}
              />
            )}

            <BaseButton
              id={`${dataTestId}-button-cutoffpay`}
              type='primary'
              size='large'
              label='ตัดจ่าย'
              className='bg-[#dedede] hover:bg-red-500'
              onClick={() => {
                console.log('ตัดจ่าย');
                // router.push(URL.readytopay.otherPayment.url);
              }}
            />

            {data.isCheque && (
              <>
                <BaseButton
                  id={`${dataTestId}-button-print`}
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
              id={`${dataTestId}-button-cancel`}
              type='cancel'
              size='large'
              label='ยกเลิก'
              onClick={() => {
                setMode('view');
              }}
            />

            <BaseButton
              id={`${dataTestId}-button-submit`}
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
      <PopUpConfirmSave
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
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
