'use client';
import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardPreparePay from '@/components/common/cardPreparePay';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { URL } from '@/constants/configPage';
import { formColumn } from '@/constants/layoutColumn';
import CollapseCustoms from '@/modules/cancel-payment/officefund-payment/component/collapse';
import { PopUpHistory } from '@/components/common';
import {
  cutOffOfficeFundPaymentSelector,
  getOfficeFundDetailService,
  OfficeFundDataType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/officefund-payment';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Form, Row } from 'wcf-component-lib/node_modules/antd';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';

export default function OfficefundPaymentForm(): React.ReactElement {
  const dataTestId = 'pageCutOffOfficeFundPaymentForm';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail, pageForm } = useSelector(cutOffOfficeFundPaymentSelector);
  const router = useRouter();
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();
  const [form] = Form.useForm();
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getOfficeFundDetailService(id));

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getOfficeFundDetailService(id))) as PayloadAction<OfficeFundDataType>;

      if (payload) {
        let dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: '-',
        };

        if (dataCardConsider.receiveType === 'A') {
          //remove object key referenceDocument, referenceNo
          dataCardConsider = {
            ...dataCardConsider,
            referenceDocument: payload.cardConsider?.referenceDocument || '',
            referenceNo: payload.cardConsider?.referenceNo || '',
          };
        }

        // Set data to form
        dispatch(
          setPageForm({
            ...payload,
            cardConsider: {
              ...dataCardConsider,
            },
          }),
        );
      }
    };

    void fetchData();
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail;
  }, [pageDetail]);

  const dataCardPreparePay = useMemo(() => {
    return {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentNo: pageForm.cardPreparePay?.paymentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
    };
  }, [pageForm.cardPreparePay]);

  const dataHistory = useMemo(() => {
    if (!keyTableHistory) return [];

    return pageForm[keyTableHistory] || [];
  }, [pageForm, keyTableHistory]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(`${URL.cutOffPayment.cutOffOfficeFundPaymentDetail.url}?id=1`);

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };
  const onSubmit = (values: Record<string, unknown>): void => {
    console.log('onSubmit :>> ', values);
    setIsOpenConfirmSave(true);
  };
  
  const openHistoryModal = (title: string, key: KeyTableHistory): void => {
    setTitleHistoryModal(title);
    setKeyTableHistory(key);
    setIsOpenHistoryModal(true);
  };

  return (
    <>
      <BaseForm name='paymentChequeForm' extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col rounded-xl gap-4 mx-4 mb-6'>
          {pageForm.cardConsider && <CardConsider dataTestId={dataTestId} data={pageForm.cardConsider} />}
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

          {/* บันทึกข้อมูล */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>บันทึกข้อมูล</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-noticeName-label-title`} className='text-label-info'>
                        จ่ายตามประกาศฉบับที่
                      </p>
                      <p id={`${dataTestId}-noticeName-label-value`} className='text-display'>
                        {dataSource.noticeName}
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
                      <p id={`${dataTestId}-creditBalance-label-title`} className='text-label-info'>
                        จำนวนเงินคงเหลือตามประกาศ (บาท)
                      </p>
                      <p id={`${dataTestId}-creditBalance-label-value`} className='text-display'>
                        {formatCurrency(dataSource.creditBalance)}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {/* รายการ งวดที่ */}
          {dataSource.details.map((item, index) => {
            return (
              <div key={index}>
                <CollapseCustoms
                  title={`งวดที่ : ${item.dueInstallment}`}
                  collapseKey={item.dueInstallment} // ส่ง collapseKey เพื่อใช้แทน key ใน component
                  key={item.dueInstallment} // ใช้ key สำหรับ React rendering
                  type='detail'
                  isDefaultOpen={index === dataSource.details.length - 1}
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
                      <p id={`${dataTestId}-approveName-label-title`} className='text-label-info'>
                        ผู้อนุมัติสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-approveName-label-value`} className='text-display text-black'>
                        {item.approveName}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-approveName-label-title`} className='text-label-info'>
                        วันที่หนังสือ
                      </p>
                      <p id={`${dataTestId}-approveName-label-value`} className='text-display text-black'>
                        {formatDayThai(item.bookDate)}
                      </p>
                    </Col>
                  </Row>
                  <hr className='my-5' />
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col lg={24}>
                      <p id={`${dataTestId}-accountName1-label-title`} className='text-label-info'>
                        ชื่อบัญชีสั่งจ่าย : 1
                      </p>
                      <p id={`${dataTestId}-accountName1-label-value`} className='text-display text-black'>
                        {item.accountName1}
                      </p>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]} className='my-5'>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeNo1-label-title`} className='text-label-info'>
                        เลขที่เช็ค
                      </p>
                      <p id={`${dataTestId}-chequeNo1-label-value`} className='text-display text-black'>
                        {item.chequeNo1}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-amount1-label-title`} className='text-label-info'>
                        จำนวนเงิน (บาท)
                      </p>
                      <p id={`${dataTestId}-amount1-label-value`} className='text-display text-black'>
                        {formatCurrency(item.amount1)}
                      </p>
                    </Col>
                    <Col {...formColumn}>
                      <p id={`${dataTestId}-chequeBankDigitCode1-label-title`} className='text-label-info'>
                        ธนาคาร
                      </p>
                      <p id={`${dataTestId}-chequeBankDigitCode1-label-value`} className='text-display text-black'>
                        {item.chequeBankDigitCode1}
                      </p>
                    </Col>
                  </Row>
                  {/* // แสดงข้อมูลเฉพาะเมื่อมีข้อมูลบัญชีสั่งจ่าย : 2 */}
                  {item.accountName2 !== '' && item.chequeNo2 !== '' && item.chequeBankDigitCode2 !== '' && (
                    <>
                      <hr className='my-5' />
                      <Row gutter={[16, 16]} className='my-5'>
                        <Col lg={24}>
                          <p id={`${dataTestId}-accountName2-label-title`} className='text-label-info'>
                            ชื่อบัญชีสั่งจ่าย : 2
                          </p>
                          <p id={`${dataTestId}-accountName2-label-value`} className='text-display text-black'>
                            {item.accountName2}
                          </p>
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]} className='my-5'>
                        <Col {...formColumn}>
                          <p id={`${dataTestId}-chequeNo2-label-title`} className='text-label-info'>
                            เลขที่เช็ค
                          </p>
                          <p id={`${dataTestId}-chequeNo2-label-value`} className='text-display text-black'>
                            {item.chequeNo2}
                          </p>
                        </Col>
                        <Col {...formColumn}>
                          <p id={`${dataTestId}-amount2-label-title`} className='text-label-info'>
                            จำนวนเงิน (บาท)
                          </p>
                          <p id={`${dataTestId}-amount2-label-value`} className='text-display text-black'>
                            {formatCurrency(item.amount2)}
                          </p>
                        </Col>
                        <Col {...formColumn}>
                          <p id={`${dataTestId}-chequeBankDigitCode2-label-title`} className='text-label-info'>
                            ธนาคาร
                          </p>
                          <p id={`${dataTestId}-chequeBankDigitCode2-label-value`} className='text-display text-black'>
                            {item.chequeBankDigitCode2}
                          </p>
                        </Col>
                      </Row>
                    </>
                  )}
                </CollapseCustoms>
              </div>
            );
          })}

          <div className='flex justify-center gap-4'>
            <div className='flex justify-center items-center gap-4'>
              <BaseButton
                id={`${dataTestId}-cancel-button`}
                size='large'
                type='cancel'
                label='ยกเลิก'
                className='w-[240px]'
                onClick={() => router.push(URL.cutOffPayment.cutOffOfficeFundPayment.url)}
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
        </div>
      </BaseForm>
      <PopUpConfirmSave
        isOpen={isOpenConfirmSave}
        setIsOpen={setIsOpenConfirmSave}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
