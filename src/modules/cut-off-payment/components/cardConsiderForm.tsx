'use client';
import React, { useState } from 'react';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import { formColumn } from '@/constants/layoutColumn';
import { formatDayThai } from '@/utils/formatGeneral';
import { BaseItemInput, BaseItemDropdown, BaseItemTextArea } from 'wcf-component-lib/src/components';
import { maxRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { ReceiveType } from '@/types/payType';
import { getIdentityRules } from '@/utils/valitator';

export interface CardConsiderFormType {
  dataTestId: string;
  data: {
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
  };
}

const CardConsiderForm = ({ dataTestId, data }: CardConsiderFormType): React.ReactElement => {
  const [receiveTypeSelect, setReceiveTypeSelect] = useState<ReceiveType | undefined>(data.receiveType);
  const [identityType, setIdentityType] = useState('');
  const [referenceDocumentType, setReferenceDocumentType] = useState('');

  const handleIdentityTypeChange = (value: string): void => {
    setIdentityType(value);
  };

  const handlereferenceDocumentTypeChange = (value: string): void => {
    setReferenceDocumentType(value);
  };

  return (
    <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
      <div className='flex flex-col gap-4'>
        <div className='header-card'>พิจารณาตัดจ่าย</div>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <div id={`${dataTestId}-cardConsider-payDate-label-title`} className='text-label-info'>
                วันที่ตัดจ่าย
              </div>
              <div id={`${dataTestId}-cardConsider-payDate-label-value`} className='text-display'>
                {formatDayThai(data.payDate)}
              </div>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <div id={`${dataTestId}-cardConsider-payer-label-title`} className='text-label-info'>
                ผู้ตัดจ่าย
              </div>
              <div id={`${dataTestId}-cardConsider-payer-label-value`} className='text-display'>
                {data.payer}
              </div>
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <div id={`${dataTestId}-cardConsider-status-label-title`} className='text-label-info'>
                สถานะ
              </div>
              <div id={`${dataTestId}-cardConsider-status-label-value`} className='text-display'>
                {data.status}
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col {...formColumn}>
            <div>
              <BaseItemDropdown
                rules={[requiredRule('ประเภทผู้รับเงิน')]}
                label='ประเภทผู้รับเงิน'
                itemName='receiveType'
                placeholder='เลือกประเภทผู้รับเงิน'
                onChange={(value) => setReceiveTypeSelect(String(value) as ReceiveType)}
                option={[
                  { value: 'O', label: 'O : ผู้มีสิทธิหรือลูกจ้างมารับเงินด้วยตัวเอง' },
                  { value: 'A', label: 'A : ผู้มีสิทธิหรือลูกจ้างมอบอำนาจให้ผู้อื่นมารับเงินแทน' },
                ]}
              />
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <BaseItemInput
                rules={[requiredRule('ชื่อผู้รับเงิน')]}
                label='ชื่อผู้รับเงิน'
                itemName='receiveName'
                placeholder='ระบุชื่อผู้รับเงิน'
              />
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <BaseItemDropdown
                rules={[requiredRule('ประเภทบัตรอ้างอิง')]}
                label='ประเภทบัตรอ้างอิง'
                itemName='identityDocument'
                placeholder='เลือกประเภทบัตรอ้างอิง'
                onChange={(e) => {
                  if (e !== undefined) {
                    handleIdentityTypeChange(e.toString());
                  }
                }}
                option={[
                  { value: '1', label: '1 : บัตรประชาชน' },
                  { value: '2', label: '2 : บัตรข้าราชการ' },
                  { value: '3', label: '3 : บัตรรัฐวิสาหกิจ' },
                  { value: '4', label: '4 : ใบอนุญาตทำงาน' },
                  { value: '5', label: '5 : หนังสือเดินทาง' },
                  { value: '6', label: '6 : ใบต่างด้าว' },
                  { value: '7', label: '7 : ใบรับขอคำมีบัตรฯ' },
                  { value: '8', label: '8 : ใบอนุญาตขับขี่' },
                  { value: '9', label: '9 : อื่น ๆ' },
                ]}
              />
            </div>
          </Col>
          <Col {...formColumn}>
            <div>
              <BaseItemInput
                rules={getIdentityRules(identityType)}
                label='เลขที่บัตรอ้างอิง'
                itemName='identityNo'
                placeholder='ระบุเลขที่บัตรอ้างอิง'
              />
            </div>
          </Col>
          <Col span={24}>
            <div>
              <BaseItemTextArea
                rules={[requiredRule('ที่อยู่ผู้รับ'), maxRule('ที่อยู่ผู้รับ', 400)]}
                label='ที่อยู่ผู้รับ'
                itemName='receiveAddress'
                placeholder='ระบุที่อยู่ผู้รับ'
                className='!min-h-[48px]'
              />
            </div>
          </Col>
          {receiveTypeSelect === 'A' && (
            <>
              <Col {...formColumn}>
                <div>
                  <BaseItemDropdown
                    rules={[requiredRule('ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)')]}
                    label='ประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)'
                    itemName='referenceDocument'
                    placeholder='เลือกประเภทบัตรอ้างอิง (ผู้มอบฉันทะ)'
                    onChange={(e) => {
                      if (e !== undefined) {
                        handlereferenceDocumentTypeChange(e.toString());
                      }
                    }}
                    option={[
                      { value: '1', label: '1 : บัตรประชาชน' },
                      { value: '2', label: '2 : บัตรข้าราชการ' },
                      { value: '3', label: '3 : บัตรรัฐวิสาหกิจ' },
                      { value: '4', label: '4 : ใบอนุญาตทำงาน' },
                      { value: '5', label: '5 : หนังสือเดินทาง' },
                      { value: '6', label: '6 : ใบต่างด้าว' },
                      { value: '7', label: '7 : ใบรับขอคำมีบัตรฯ' },
                      { value: '8', label: '8 : ใบอนุญาตขับขี่' },
                      { value: '9', label: '9 : อื่น ๆ' },
                    ]}
                  />
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <BaseItemInput
                    rules={getIdentityRules(referenceDocumentType)}
                    label='เลขบัตรอ้างอิง (ผู้มอบฉันทะ)'
                    itemName='referenceNo'
                    placeholder='ระบุเลขบัตรอ้างอิง (ผู้มอบฉันทะ)'
                  />
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CardConsiderForm;
