'use client';
import React from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { ReceiveType } from '@/types/payType';
import { statusReceiveType } from '@/constants/statusSystem';
import { formatDayThai } from '@/utils/formatGeneral';
export interface CardDetailProps {
  dataTestId: string;
  data: CardConsiderType;
  isNotShadow?: boolean;
}

export interface CardConsiderType {
  payDate: string; //วันที่ตัดจ่าย
  payer: string; //ผู้ตัดจ่าย
  status: string; //สถานะ
  significantNo?: string; //เลขที่ใบสำคัญรับเงิน
  significantHandNo?: string; //เลขที่ใบสำคัญรับเงินชนิดเล่ม
  receiveType?: ReceiveType; //ประเภทผู้รับเงิน
  receiveName?: string; //ชื่อผู้รับเงิน
  identityDocument?: string; //ประเภทบัตรอ้างอิง
  identityNo?: string; //เลขที่บัตรอ้างอิง
  address?: string; //ที่อยู่ผู้รับ
  referenceDocument?: string; //ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
  referenceNo?: string; //เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
}

const CardConsiderDetail = ({ dataTestId, data, isNotShadow = false }: CardDetailProps): React.ReactElement => {
  console.log('data', data);

  return (
    <div className={`w-full bg-white p-6 ${!isNotShadow && 'shadow-sm'} rounded-xl`}>
      <div className='flex flex-col gap-4'>
        <p className='header-card'>พิจารณาตัดจ่าย</p>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardConsider-payDate-label-title`} className='text-label-info'>
                วันที่ตัดจ่าย
              </p>
              <p id={`${dataTestId}-cardConsider-payDate-label-value`} className='text-display'>
                {formatDayThai(data.payDate)}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardConsider-payer-label-title`} className='text-label-info'>
                ผู้ตัดจ่าย
              </p>
              <p id={`${dataTestId}-cardConsider-payer-label-value`} className='text-display'>
                {data.payer}
              </p>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <p id={`${dataTestId}-cardConsider-status-label-title`} className='text-label-info'>
                สถานะ
              </p>
              <p id={`${dataTestId}-cardConsider-status-label-value`} className='text-display'>
                {data.status}
              </p>
            </div>
          </Col>
          {data.significantNo && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-significantHandNo-label-title`} className='text-label-info'>
                  เลขที่ใบสำคัญรับเงิน
                </p>
                <p id={`${dataTestId}-cardConsider-significantHandNo-label-value`} className='text-display'>
                  {data.significantNo}
                </p>
              </div>
            </Col>
          )}
        </Row>

        <Row gutter={[16, 16]}>
          {data.significantHandNo && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-significantHandNo-label-title`} className='text-label-info'>
                  เลขที่ใบสำคัญรับเงินชนิดเล่ม
                </p>
                <p id={`${dataTestId}-cardConsider-significantHandNo-label-value`} className='text-display'>
                  {data.significantHandNo}
                </p>
              </div>
            </Col>
          )}
          {data.receiveType && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-receiveType-label-title`} className='text-label-info'>
                  ประเภทผู้รับเงิน
                </p>
                <p id={`${dataTestId}-cardConsider-receiveType-label-value`} className='text-display'>
                  {data.receiveType} : {statusReceiveType[data.receiveType]}
                </p>
              </div>
            </Col>
          )}
          {data.receiveName && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-receiveName-label-title`} className='text-label-info'>
                  ชื่อผู้รับเงิน
                </p>
                <p id={`${dataTestId}-cardConsider-receiveName-label-value`} className='text-display'>
                  {data.receiveName}
                </p>
              </div>
            </Col>
          )}
          {data.identityDocument && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-identityDocument-label-title`} className='text-label-info'>
                  ประเภทบัตรอ้างอิง
                </p>
                <p id={`${dataTestId}-cardConsider-identityDocument-label-value`} className='text-display'>
                  {data.identityDocument}
                </p>
              </div>
            </Col>
          )}
          {data.identityNo && (
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-cardConsider-identityNo-label-title`} className='text-label-info'>
                  เลขที่บัตรอ้างอิง
                </p>
                <p id={`${dataTestId}-cardConsider-identityNo-label-value`} className='text-display'>
                  {data.identityNo}
                </p>
              </div>
            </Col>
          )}
          {data.address && (
            <Col span={18}>
              <div>
                <p id={`${dataTestId}-cardConsider-address-label-title`} className='text-label-info'>
                  ที่อยู่ผู้รับ
                </p>
                <p id={`${dataTestId}-cardConsider-address-label-value`} className='text-display'>
                  {data.address}
                </p>
              </div>
            </Col>
          )}
        </Row>
        {data.receiveType == 'A' && (
          <Row gutter={[16, 16]}>
            {data.referenceDocument && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardConsider-referenceDocument-label-title`} className='text-label-info'>
                    ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)
                  </p>
                  <p id={`${dataTestId}-cardConsider-referenceDocument-label-value`} className='text-display'>
                    {data.referenceDocument}
                  </p>
                </div>
              </Col>
            )}
            {data.referenceNo && (
              <Col {...formColumn}>
                <div>
                  <p id={`${dataTestId}-cardConsider-referenceNo-label-title`} className='text-label-info'>
                    เลขที่บัตรอ้างอิง (ผู้มอบฉันทะ)
                  </p>
                  <p id={`${dataTestId}-cardConsider-referenceNo-label-value`} className='text-display'>
                    {data.referenceNo}
                  </p>
                </div>
              </Col>
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CardConsiderDetail;
