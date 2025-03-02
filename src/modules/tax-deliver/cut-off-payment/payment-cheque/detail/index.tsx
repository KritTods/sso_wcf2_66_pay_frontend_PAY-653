'use client';
import CardAddress from '@/components/common/cardAddress';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import CardConsider, { CardConsiderType } from '@/components/common/cardConsider';
import CardPreparePay from '@/components/common/cardPreparePay';
import CardDropDown from '@/components/dropdownButton/cardDropDown';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentTaxDeliverSelector,
  getTaxDeliverDetailService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/tax-deliver/cut-off-payment';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { formatCurrency } from '@/utils/formatGeneral';
import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
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
  const dataTestId = 'pageCutOffPaymentTaxDeliverForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentTaxDeliverSelector);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getTaxDeliverDetailService(id));

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getTaxDeliverDetailService(id))) as PayloadAction<PageFormType>;

      if (payload) {
        let dataCardConsider: CardConsiderType = {
          payDate: payload.cardConsider?.payDate || '',
          payer: payload.cardConsider?.payer || '',
          status: payload.cardConsider?.status || '',
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
      title: 'เลขที่หนังสือรับรอง',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'โรงพยาบาล',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขประจำตัวผู้เสียภาษี',
      key: 'identityNo',
      dataIndex: 'identityNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ค่ารักษา',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'ภาษีหัก ณ ที่จ่าย',
      key: 'taxAmount',
      dataIndex: 'taxAmount',
      align: 'center',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
      },
    },
    {
      title: 'เลขที่ใบสำคัญรับเงินชนิดเล่ม',
      key: 'significantHandNo',
      dataIndex: 'significantHandNo',
      align: 'center',
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

  const menuItems = [
    { key: 'e-Filing', label: 'e-Filing', icon: <FilePdfOutlined /> },
    { key: 'พิมพ์หนังสือลงนามในเช็ค', label: 'พิมพ์หนังสือลงนามในเช็ค', icon: <PrinterOutlined /> },
    { key: 'พิมพ์ ภงด. 53', label: 'พิมพ์ ภงด. 53', icon: <PrinterOutlined /> },
    { key: 'พิมพ์แบบยื่น ภงด. 53', label: 'พิมพ์แบบยื่น ภงด. 53', icon: <PrinterOutlined /> },
    { key: 'พิมพ์ใบสำคัญรับเงิน', label: 'พิมพ์ใบสำคัญรับเงิน', icon: <FilePdfOutlined /> },
    { key: 'ดาวน์โหลดทั้งหมด', label: 'ดาวน์โหลดทั้งหมด', icon: <PrinterOutlined /> },
  ];

  const handleMenuClick = (key: string): void => {
    console.log(`เลือกเมนู: ${key}`);
    // คุณสามารถเพิ่มฟังก์ชันการทำงานที่นี่ เช่น การเปลี่ยนหน้า หรือการทำงานอื่นๆ
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
                rowKey='documentNo, id'
                columns={columns}
                rows={dataTableList}
                bordered
                summary={() => {
                  const sumAmount = dataTableList.reduce((prev, curr) => prev + curr.amount, 0);
                  const taxAmount = dataTableList.reduce((prev, curr) => prev + curr.taxAmount, 0);

                  return (
                    <Table.Summary.Row className='bg-gray-200'>
                      <Table.Summary.Cell index={0} colSpan={4} className='rounded-bl-xl'>
                        <p className='text-lg font-bold text-right mx-4'>รวม</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={0} colSpan={1} className=''>
                        <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={0} colSpan={1} className=''>
                        <p className='text-lg font-bold text-right'>{formatCurrency(taxAmount)}</p>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={0} colSpan={1} className='rounded-br-xl'>
                        <p className='text-lg font-bold text-right mx-4'></p>
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
            onClick={() => router.push(URL.taxDeliver.taxDeliverCutOffPayment.url)}
          />
          {pageForm.isCheque && <CardDropDown menuItems={menuItems} onMenuClick={handleMenuClick} />}
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
