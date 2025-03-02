'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/components/wrongFundPayment/cardDetailWrongFundPayment';
import CardCheque from '@/components/common/cardCheque';
import CardTableWrongFundPayment from '@/components/common/cardTableWrongFundPayment';
import CardTableReceipt from '@/components/common/cardTableReceipt';
import { Row, Col } from 'wcf-component-lib/node_modules/antd';
import {
  cancelWrongFundSelector,
  getWrongFundDetailService,
} from '@/store-redux/slices/cancel-payment/wrongfund-payment';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
import { formColumn } from '@/constants/layoutColumn';

export default function Detail(): React.JSX.Element {
  const dataTestId = 'pageCancelWrongFundDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelWrongFundSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getWrongFundDetailService(id));
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail;
  }, [pageDetail]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    //detail ของ งานเงินรับ
    <div className='flex flex-col gap-4 mx-4 mb'>
      <CardDetail dataTestId={dataTestId} data={dataSource.cardHeader} />

      {dataSource.cardHeader.advancePaymentType === 'FIN' && (
        <>
          <CardTableWrongFundPayment dataTestId={dataTestId} data={dataSource.payments} />
          <CardTableReceipt dataTestId={dataTestId} data={dataSource.receipts} />
        </>
      )}

      <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
        <div className='flex flex-col gap-4'>
          <p className='header-card'>ข้อมูลโอน</p>
          <Row gutter={[16, 16]}>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-transferInformation-bankCode-label-title`} className='text-label-info'>
                  ธนาคาร
                </p>
                <p id={`${dataTestId}-transferInformation-bankCode-label-value`} className='text-display'>
                  {dataSource.transferInformation.bankCode} : {dataSource.transferInformation.bankName}
                </p>
              </div>
            </Col>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-transferInformation-bankAccountName-label-title`} className='text-label-info'>
                  ชื่อบัญชี
                </p>
                <p id={`${dataTestId}-transferInformation-bankAccountName-label-value`} className='text-display'>
                  {dataSource.transferInformation.bankAccountName}
                </p>
              </div>
            </Col>
            <Col {...formColumn}>
              <div>
                <p id={`${dataTestId}-transferInformation-bankAccountNo-label-title`} className='text-label-info'>
                  เลขที่บัญชี
                </p>
                <p id={`${dataTestId}-transferInformation-bankAccountNo-label-value`} className='text-display'>
                  {dataSource.transferInformation.bankAccountNo}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {pageDetail.isCheque && <CardCheque dataSource={pageDetail.cheques} dataTestId={dataTestId} />}

      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelWrongfundPayment.url)}
        />
      </div>
    </div>
  );
}
