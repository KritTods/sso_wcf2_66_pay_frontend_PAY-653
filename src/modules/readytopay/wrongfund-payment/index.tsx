'use client';
import { formColumn } from '@/constants/layoutColumn';
import React, { useState } from 'react';
import { Col, Row, Radio } from 'wcf-component-lib/node_modules/antd';
import useLayout from 'wcf-component-lib/src/provider/LayoutProvider/useLayout';
import dayjs from 'dayjs';
import { formatDayThai } from '@/utils/formatGeneral';
import FormPay from './pay/form';
import FormFin from './fin/form';

export default function WrongFundPayment(): React.ReactElement {
  const dataTestId = 'pageWrongFundPayment';
  const [advancePaymentType, setAdvancePaymentType] = useState<'PAY' | 'FIN'>('PAY');
  const {
    stateLayout: { user },
  } = useLayout();

  const handleChangeAdvancePaymentType = (value: 'PAY' | 'FIN'): void => {
    setAdvancePaymentType(value);
  };

  return (
    <div className='flex flex-col gap-4 mx-4'>
      {/* แสดงเฉพาะ งานเงินจ่าย */}
      {advancePaymentType === 'PAY' && (
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'> รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>-</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่ใบสั่งจ่าย</p>
                  <p className='text-display'>-</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ผู้เตรียมจ่าย</p>
                  <p className='text-display'>{`${user?.firstName} ${user?.lastName}`}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่เตรียมจ่าย</p>
                  <p className='text-display'>{formatDayThai(dayjs().format('YYYY-MM-DD'))}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
        <div className='flex flex-col gap-4'>
          <p className='header-card'>บันทึกการจ่ายเงินผิดกองทุนเงินทดแทน</p>
          <Row gutter={[16, 16]}>
            <Col {...formColumn}>
              <Radio.Group
                className='h-[48px] w-full'
                optionType='button'
                text-lg
                font-boldtyle='solid'
                onChange={(e) => handleChangeAdvancePaymentType(e.target.value as 'PAY' | 'FIN')}
                value={advancePaymentType}
              >
                <div className='flex gap-4 h-full w-full'>
                  <Radio.Button
                    className={`!h-full !w-full flex justify-center items-center ${
                      advancePaymentType === 'PAY' ? '!bg-[#1C4651] !text-white' : ''
                    }`}
                    value={'PAY'}
                  >
                    <div id={`${dataTestId}-advancePaymentType-radio-PAY`}>งานเงินจ่าย</div>
                  </Radio.Button>
                  <Radio.Button
                    className={`!h-full !w-full flex justify-center items-center ${
                      advancePaymentType === 'FIN' ? '!bg-[#1C4651] !text-white' : ''
                    }`}
                    value={'FIN'}
                  >
                    <div id={`${dataTestId}-advancePaymentType-radio-FIN`}> งานเงินรับ</div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      </div>
      {/* form pay งานเงินจ่าย  */}
      {advancePaymentType === 'PAY' && <FormPay dataTestId={dataTestId} />}

      {/* form fin งานเงินรับ */}
      {advancePaymentType === 'FIN' && <FormFin dataTestId={dataTestId} />}
    </div>
  );
}
