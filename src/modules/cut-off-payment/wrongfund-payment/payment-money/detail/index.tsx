'use client';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardPreparePay, { CardPrepareType } from '@/components/common/cardPreparePay';
import CardTableReceipt from '@/components/common/cardTableReceipt';
import CardTableThananat from '@/components/common/cardTableThananat';
import CardTableWrongFundPayment from '@/components/common/cardTableWrongFundPayment';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentWrongFundSelector,
  getWrongFundDetailService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/wrongfund-payment';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';

export default function PaymentMoneyDetail(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentWrongFundForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentWrongFundSelector);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getWrongFundDetailService(id));

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getWrongFundDetailService(id))) as PayloadAction<PageFormType>;

      if (payload) {
        const dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
          significantNo: payload.cardConsider?.significantNo || '',
          significantHandNo: payload.cardConsider?.significantHandNo || '',
        };

        // Set data to form
        const newPageForm = {
          ...pageForm,
          ...payload,
          cardConsider: {
            ...dataCardConsider,
          },
        };
        if (JSON.stringify(newPageForm) !== JSON.stringify(pageForm)) {
          void dispatch(setPageForm(newPageForm));
        }
      }
    };

    void fetchData();
  }, [dispatch, id, pageForm]);

  const dataCardPreparePay = useMemo(() => {
    let dataCardPreparePay: CardPrepareType = {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || 'X',
      paymentNo: pageForm.cardPreparePay?.paymentNo || '',
      advancePaymentType: pageForm.cardPreparePay?.advancePaymentType || 'PAY',
      incorrectPaymentReason: pageForm.cardPreparePay?.incorrectPaymentReason || 'J',
      paymentRequest: pageForm.cardPreparePay?.paymentRequest || '',
      amount: pageForm.cardPreparePay?.amount || 0,
    };

    if (dataCardPreparePay.advancePaymentType === 'FIN') {
      //remove object key referenceDocument, advancePaymentType
      dataCardPreparePay = {
        documentNo: pageForm.cardPreparePay?.documentNo || '',
        paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
        transactionDate: pageForm.cardPreparePay?.transactionDate || '',
        payType: pageForm.cardPreparePay?.payType || 'X',
        advancePaymentType: pageForm.cardPreparePay?.advancePaymentType || 'PAY',
      };
    }

    return dataCardPreparePay;
  }, [pageForm.cardPreparePay]);

  const dataTableList = useMemo(() => {
    return pageForm.tableList;
  }, [pageForm.tableList]);

  const dataCardTableReceipt = useMemo(() => {
    return pageForm.receipts;
  }, [pageForm.receipts]);

  const dataHistory = useMemo(() => {
    if (!keyTableHistory) return [];

    return pageForm[keyTableHistory] || [];
  }, [pageForm, keyTableHistory]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  const openHistoryModal = (title: string, key: KeyTableHistory): void => {
    setTitleHistoryModal(title);
    setKeyTableHistory(key);
    setIsOpenHistoryModal(true);
  };

  return (
    <>
      <div className='flex flex-col gap-4 mx-4 mb-6'>
        {pageForm.cardConsider && <CardConsider dataTestId={dataTestId} data={pageForm.cardConsider} />}
        <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-xl'>
          <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />
          <div className='mb-6'>
            <BaseButton
              icon={<ClockRotateRight />}
              size='large'
              label='ประวัติการแก้ไขเตรียมจ่าย'
              type='outline'
              onClick={() =>
                openHistoryModal(BaseKeyTableHistory.HISTORY_PREPARE_PAY, BaseKeyTableHistory.HISTORY_PREPARE_PAY)
              }
            />
          </div>
        </div>

        {dataCardPreparePay.advancePaymentType === 'FIN' && (
          <>
            <div className='bg-white pb-6 shadow-sm rounded-xl'>
              <CardTableWrongFundPayment dataTestId='dataTestId' data={dataTableList} isNotShadow />

              <div className='flex justify-center gap-4'>
                <BaseButton
                  icon={<ClockRotateRight />}
                  size='large'
                  label='ประวัติการแก้ไขใบสั่งจ่าย'
                  type='outline'
                  onClick={() =>
                    openHistoryModal(
                      BaseKeyTableHistory.HISTORY_ORDER_PAYMENT,
                      BaseKeyTableHistory.HISTORY_ORDER_PAYMENT,
                    )
                  }
                />
              </div>
            </div>

            <CardTableReceipt dataTestId='dataTestId' data={dataCardTableReceipt} />
          </>
        )}

        {pageForm.isCheque && (
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='bg-white rounded-xl -m-6'>
              <CardCheque isNotShadow dataTestId={dataTestId} dataSource={pageForm.cheques} />
            </div>
            <div className='flex justify-center gap-4 mt-6'>
              <BaseButton
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไขเช็ค'
                type='outline'
                onClick={() =>
                  openHistoryModal(BaseKeyTableHistory.HISTORY_CHEQUES, BaseKeyTableHistory.HISTORY_CHEQUES)
                }
              />
            </div>
          </div>
        )}

        {!pageForm.isCheque && <CardCash dataTestId={dataTestId} cash={pageForm.cash} />}

        {pageForm.moneys && (
          <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
            <div className='bg-white rounded-xl -m-6'>
              <CardTableThananat isNotShadow dataTestId={dataTestId} dataSource={pageForm.moneys} />
            </div>
            <div className='flex justify-center gap-4 mt-6'>
              <BaseButton
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไขธนาณัติ'
                type='outline'
                onClick={() => openHistoryModal(BaseKeyTableHistory.HISTORY_MONEYS, BaseKeyTableHistory.HISTORY_MONEYS)}
              />
            </div>
          </div>
        )}

        <div className='flex justify-center gap-4'>
          <BaseButton
            size='large'
            type='cancel'
            label='ยกเลิก'
            className='w-[240px]'
            onClick={() => router.push(URL.cutOffPayment.cutOffPaymentWrongFund.url)}
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
            label='พิมพ์ใบสำคัญรับเงิน'
            icon={<PrinterOutlined />}
            className='w-[280px]'
            onClick={() => {
              console.log('พิมพ์ใบสำคัญรับเงิน');
            }}
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
    </>
  );
}
