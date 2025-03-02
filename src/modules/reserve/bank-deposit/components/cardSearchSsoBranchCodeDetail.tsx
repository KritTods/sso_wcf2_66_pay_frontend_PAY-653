'use client';
import React from 'react';
import { Col, Row, Form } from 'wcf-component-lib/node_modules/antd';
import { BaseForm } from 'wcf-component-lib/src/components';
import { searchColumn } from '@/constants/layoutColumn';

export default function CardSearchSsoBranchCodeDetail(): React.ReactElement {
  const [form] = Form.useForm();

  return (
    <>
      <BaseForm extraForm={form} name={'test'}>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='flex flex-col gap-4'>
              <p className='header-card'>รายละเอียด</p>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <div>
                    <p className='text-label-info'>รหัส สปส.</p>
                    <p className='text-display'>1008: นนทบุรี</p>
                  </div>
                </Col>
                <Col {...searchColumn}>
                  <div>
                    <p className='text-label-info'>ประจำวันที่</p>
                    <p className='text-display'>31/12/2567</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseForm>
    </>
  );
}
