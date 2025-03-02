'use client';
import CardAddress from '@/components/common/cardAddress';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardPreparePay from '@/components/common/cardPreparePay';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentDoctorSalarySelector,
  getDoctorSalaryDetailService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/doctor-salary';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { formatCurrency } from '@/utils/formatGeneral';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'wcf-component-lib/node_modules/antd';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';

export default function PaymentChequeDetail(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentDoctorSalaryForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentDoctorSalarySelector);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getDoctorSalaryDetailService(id));

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getDoctorSalaryDetailService(id))) as PayloadAction<PageFormType>;

      if (payload) {
        const dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
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

  const columns: ColumnsTypeCustom = [
    {
      title: 'ลำดับ',
      key: 'key',
      dataIndex: 'key',
      align: 'center',
      width: 50,
      render: (text: string, record: unknown, index: number): React.ReactElement => {
        return <span className='w-full flex justify-center'>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ลูกจ้าง/ผู้มีสิทธิ์',
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      width: 100,
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantHandNo',
      dataIndex: 'significantHandNo',
      align: 'center',
      width: 100,
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
  ];

  const dataCardPreparePay = useMemo(() => {
    return {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || 'X',
    };
  }, [pageForm.cardPreparePay]);

  const dataTableList = useMemo(() => {
    return pageForm.tableList;
  }, [pageForm.tableList]);

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

        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <TableListLayout
            totalItems={dataTableList.length}
            textHeader='รายการสั่งจ่าย'
            type='form'
            firstLoading={dataTableList.length === 0}
            emptyText='ไม่พบข้อมูลรายการสั่งจ่าย'
            Grid={
              <BaseGrid
                rowKey='id'
                columns={columns}
                rows={dataTableList}
                bordered
                summary={() => {
                  const sumAmount = dataTableList.reduce((prev, curr) => prev + curr.amount, 0);

                  return (
                    <Table.Summary.Row className='bg-gray-200'>
                      <Table.Summary.Cell index={0} colSpan={5} className='rounded-bl-xl'>
                        <p className='text-lg font-bold text-right mx-4'>รวม</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} colSpan={1}>
                        <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={1} className='rounded-br-xl'>
                        <></>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  );
                }}
              />
            }
          />
          <div className='flex justify-center gap-4 mt-6'>
            <BaseButton
              icon={<ClockRotateRight />}
              size='large'
              label='ประวัติการแก้ไขใบสั่งจ่าย'
              type='outline'
              onClick={() =>
                openHistoryModal(BaseKeyTableHistory.HISTORY_ORDER_PAYMENT, BaseKeyTableHistory.HISTORY_ORDER_PAYMENT)
              }
            />
          </div>
        </div>

        {pageForm.address && <CardAddress dataTestId={dataTestId} address={pageForm.address} />}

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

        <div className='flex justify-center gap-4'>
          <BaseButton
            size='large'
            type='cancel'
            label='ยกเลิก'
            className='w-[240px]'
            onClick={() => router.push(URL.cutOffPayment.cutOffPaymentDoctorSalary.url)}
          />
          {pageForm.isCheque && (
            <BaseButton
              size='large'
              label='พิมหนังสือลงในนามเช็ค'
              icon={<PrinterOutlined />}
              className='w-[280px]'
              onClick={() => {
                console.log('พิมหนังสือลงในนามเช็ค');
              }}
            />
          )}

          <BaseButton
            size='large'
            label='พิมพ์หนังสือแจ้ง'
            icon={<PrinterOutlined />}
            className='w-[280px]'
            onClick={() => {
              console.log('พิมพ์หนังสือแจ้ง');
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
