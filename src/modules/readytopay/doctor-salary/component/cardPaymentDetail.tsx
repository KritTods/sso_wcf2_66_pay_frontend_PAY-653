'use client';
import React, { useEffect } from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';
import { currentDate } from '@/utils/formatGeneral';
import { useSelector } from 'react-redux';
import { readyToPayDoctorSalarySelector, setPagePaymentForm } from '@/store-redux/slices/readytopay/doctor-salary';
import { statusPayType } from '@/constants/statusSystem';
import { useAppDispatch } from '@/store-redux/store';
import { PayType } from '@/types/payType';
interface BaseTabsProps {
  dataTestId: string;
  tabActive: string;
}

export default function CardPaymentDetail({ dataTestId, tabActive }: BaseTabsProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const {
    pageDoctorSalalyForm,
    pageDoctorSalalyForm: { payType },
  } = useSelector(readyToPayDoctorSalarySelector);

  const {
    stateLayout: { user },
  } = useLayout();

  //set ชื่อผู้เตรียมจ่าย จาก user login
  useEffect(() => {
    if (!user) return;
    const newData = {
      ...pageDoctorSalalyForm,
      paymentAgent: `${user?.firstName} ${user?.lastName}`,
      payType: tabActive as PayType,
    };
    if (JSON.stringify(newData) !== JSON.stringify(pageDoctorSalalyForm)) {
      void dispatch(setPagePaymentForm(newData));
    }
  }, [dispatch, pageDoctorSalalyForm, tabActive, user]);

  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <p className='header-card'> รายละเอียด</p>
        <Row key={dataTestId} gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardPaymentDetail-documentNo-label-title`} className='text-label-info'>
                เลขที่เอกสาร
              </p>
              <p id={`${dataTestId}-cardPaymentDetail-documentNo-label-value`} className='text-display'>
                -
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardPaymentDetail-fullname-label-title`} className='text-label-info'>
                ผู้เตรียมจ่าย
              </p>
              <p
                id={`${dataTestId}-cardPaymentDetail-fullname-label-value`}
                className='text-display'
              >{`${user?.firstName} ${user?.lastName}`}</p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardPaymentDetail-currentDate-label-title`} className='text-label-info'>
                วันที่เตรียมจ่าย
              </p>
              <p id={`${dataTestId}-cardPaymentDetail-currentDate-label-value`} className='text-display'>
                {currentDate()}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardPaymentDetail-payType-label-title`} className='text-label-info'>
                วิธีการชำระเงิน
              </p>
              <p id={`${dataTestId}-cardPaymentDetail-payType-label-value`} className='text-display'>
                {' '}
                {statusPayType[payType]}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
