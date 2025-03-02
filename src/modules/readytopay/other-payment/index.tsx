'use client';

import React, { useState } from 'react';
import { Col, Row, TabsProps } from 'wcf-component-lib/node_modules/antd';
import { Bank, HomeSale, DeliveryTruck, MoneySquare } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseLoading, BaseTabs } from 'wcf-component-lib/src/components';
import { formColumn } from '@/constants/layoutColumn';
import OfficeTab from '@/modules/readytopay/other-payment/officeTab';
import BankTab from '@/modules/readytopay/other-payment/bankTab';
import ChequeTab from '@/modules/readytopay/other-payment/chequeTab';
import MoneyTab from '@/modules/readytopay/other-payment/moneyTab';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';
import { currentDate } from '@/utils/formatGeneral';
import { PayType } from '@/types/payType';

export default function OtherPayment(): React.ReactElement {
  const dataTestId = 'pageOtherPayment';
  const [tabActive, setTabActive] = useState<PayType>('X');
  const [tabActiveChange, setTabActiveChange] = useState<PayType>('X');
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const {
    stateLayout: { user },
  } = useLayout();

  const items: TabsProps['items'] = [
    {
      key: 'X',
      label: (
        <div id={`${dataTestId}-tab-X`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <Bank />
          <span>รับเงิน ณ สำนักงาน</span>
        </div>
      ),
    },
    {
      key: 'T',
      label: (
        <div id={`${dataTestId}-tab-T`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <HomeSale />
          <span>โอนผ่านธนาคารโดยจังหวัด</span>
        </div>
      ),
    },
    {
      key: 'S',
      label: (
        <div id={`${dataTestId}-tab-S`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <DeliveryTruck />
          <span>ส่งเช็คทางไปรษณีย์</span>
        </div>
      ),
    },
    {
      key: 'P',
      label: (
        <div id={`${dataTestId}-tab-P`} className='flex justify-center gap-2 items-center h-[72px] -m-[20px]'>
          <MoneySquare />
          <span>ธนาณัติ</span>
        </div>
      ),
    },
  ];

  const handleChangeTab = (key: PayType): void => {
    setIsOpenWarningModal(true);
    setCodeWarningModal('002');
    setTabActiveChange(key);
  };

  //loading Page
  if (!user) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      {/* รายละเอียด */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-2xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่เอกสาร</p>
                  <p className='text-display'>-</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>เลขที่คำสั่งจ่าย</p>
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
                  <p className='text-display'>{currentDate()}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Tab */}
      <BaseTabs
        noBackground={true}
        defaultActiveKey={tabActive}
        activeKey={tabActive}
        items={items}
        onChange={(e) => handleChangeTab(e as PayType)}
        className='w-full'
      />

      {/* Tab Content */}
      {tabActive === 'X' && <OfficeTab dataTestId={dataTestId} />}
      {tabActive === 'T' && <BankTab dataTestId={dataTestId} />}
      {tabActive === 'S' && <ChequeTab dataTestId={dataTestId} />}
      {tabActive === 'P' && <MoneyTab dataTestId={dataTestId} />}

      <PopUpWarning
        code={codeWarningModal}
        dataTestId={dataTestId}
        isOpen={isOpenWarningModal}
        setIsOpen={setIsOpenWarningModal}
        handleConfirm={() => {
          setIsOpenWarningModal(false);
          setTabActive(tabActiveChange);
        }}
        isCancel
        handleCancel={() => setIsOpenWarningModal(false)}
      />
    </div>
  );
}
