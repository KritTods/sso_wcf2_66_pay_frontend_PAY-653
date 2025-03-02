'use client';
import React, { useState, useMemo, useEffect } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseForm, BaseButton } from 'wcf-component-lib/src/components';
import { Checkbox } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  clearFilter,
  getFilterListService,
  hospitalPaymentSelector,
  ReadyToPayDataType,
  setFilter,
  setPageForm,
} from '@/store-redux/slices/readytopay/hospital-payment';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';
import { formatCurrency } from '@/utils/formatGeneral';

export default function CardTable({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const router = useRouter();
  const { loading, filter, totalElements, filterResult, pageForm } = useSelector(hospitalPaymentSelector);
  const { pageSize, pageNumber, orders } = filter.pagination;
  const dispatch = useAppDispatch();
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');

  useEffect(() => {
    // ล้าง data in table from filter ที่เลือก
    void dispatch(clearFilter());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      void dispatch(getFilterListService(filter));
    }
    // รีเซ็ต dataSelected เมื่อเปลี่ยน filter
    setDataSelected([]);
  }, [dispatch, loading, filter]);

  const dataSource = useMemo(() => {
    return filterResult;
  }, [filterResult]);

  const columns = [
    {
      title: filter.paymentType !== 'X' && (
        <Checkbox
          checked={dataSelected.length > 0 && dataSelected.length === filterResult.length}
          indeterminate={dataSelected.length > 0 && dataSelected.length < filterResult.length}
          onChange={(e) => {
            if (e.target.checked) {
              setDataSelected(filterResult);
            } else {
              // ยกเลิกการเลือกทั้งหมด
              setDataSelected([]);
            }
          }}
        />
      ),
      key: 'checkbox',
      dataIndex: 'paymentId',
      width: 50,
      align: 'center',
      render: (paymentId: number, record: ReadyToPayDataType): React.ReactElement => {
        const isChecked = dataSelected.some((item) => String(item.paymentId) === String(record.paymentId));

        const handleCheckboxChange = (checked: boolean, record: ReadyToPayDataType): void => {
          if (filter.paymentType === 'X' && checked && dataSelected.length === 1) {
            // ถ้า paymentType เป็น 'X' จะให้เลือกได้แค่ 1 รายการ
            setIsOpenWarningModal(true);
            setCodeWarningModal('005');

            return;
          } else {
            // สำหรับกรณีทั่วไปให้สามารถเลือกหลายรายการได้
            if (checked) {
              setDataSelected((prev) => [...prev, record]);
            } else {
              setDataSelected((prev) => prev.filter((item) => item.paymentId !== record.paymentId));
            }
          }
        };

        return (
          <div className='flex justify-center'>
            <Checkbox checked={isChecked} onChange={(e) => handleCheckboxChange(e.target.checked, record)} />
          </div>
        );
      },
    },
    {
      title: 'ลำดับ',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      width: 50,
      render: (text: number, record: unknown, index: number): React.ReactElement => {
        return <div>{index + 1}</div>;
      },
    },
    filter.paymentType === 'T' && {
      title: 'ธนาคาร',
      key: 'bankCode',
      dataIndex: 'bankCode',
      align: 'center',
      width: 250,
      render: (text: string, record: unknown): React.ReactElement => {
        const row = record as ReadyToPayDataType;

        return (
          <div className='flex justify-start'>
            {row.bank?.code} : {row.bank?.name}
          </div>
        );
      },
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      width: 150,
      align: 'center',
    },
    {
      title: 'ผู้มีสิทธิ์',
      key: 'hospital',
      dataIndex: 'hospital',
      width: 250,
      align: 'center',
      render: (hospital: string): React.ReactElement => {
        return <div className='flex justify-start'>{hospital}</div>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      width: 200,
      align: 'center',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      width: 200,
      align: 'center',
    },
    {
      title: 'ผู้ประสบอันตราย',
      key: 'fullName',
      dataIndex: 'fullName',
      width: 250,
      align: 'center',
      render: (fullName: string): React.ReactElement => {
        return <div className='flex justify-start'>{fullName}</div>;
      },
    },

    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      sorter: true,
      align: 'center',
      width: 250,
      render: (amount: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(amount)}</span>;
      },
    },
    {
      title: 'รายละเอียด',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
      width: 50,
      render: (employeeCitizenId: string, record: unknown): React.ReactElement => {
        const row = record as ReadyToPayDataType;

        return (
          <>
            <div className='flex justify-center gap-2'>
              <Page
                className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
                onClick={() =>
                  router.push(
                    `${URL.readytopay.hospitalPaymentDetail.url}?cid=${employeeCitizenId}&paymentNo=${row.paymentNo}`,
                  )
                }
              />
            </div>
          </>
        );
      },
    },
  ];

  //เมื่อกด บันทึกใบสั่งจ่าย
  const handleConfirm = (): void => {
    //validate กรุณาเลือกใบสั่งจ่ายอย่างน้อย 1 รายการ
    if (dataSelected.length === 0) {
      setIsOpenWarningModal(true);
      setCodeWarningModal('004');

      return;
    }
    //set ค่าให้กับ pageForm slice
    void dispatch(
      setPageForm({
        ...pageForm,
        payTypeTabActive: filter.paymentType,
        tableList: dataSelected,
      }),
    );

    if (filter.paymentType === 'X') {
      // จ่าย - รับเงิน ณ สำนักงาน
      router.push(URL.readytopay.hospitalPaymentOffice.url);
    } else if (filter.paymentType === 'T') {
      // โอนผ่านธนาคารโดยจังหวัด
      router.push(URL.readytopay.hospitalPaymentBank.url);
    } else if (filter.paymentType === 'S') {
      // ส่งเช็คทางไปรษณีย์
      router.push(URL.readytopay.hospitalPaymentCheck.url);
    }
  };

  //สำหรับ Loading Table รอข้อมูล
  if (loading) {
    return (
      <div className='h-[480px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
    <BaseForm>
      <div className='flex flex-col items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl relative'>
          <TableListLayout
            textHeader='ผลลัพธ์การค้นหา'
            type='form'
            totalItems={totalElements}
            firstLoading={dataSource.length === 0}
            emptyText='โปรดระบุข้อมูลที่ต้องการค้นหา'
            emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
            Grid={
              <BaseGrid
                page={{
                  pageNumber: pageNumber,
                  pageSize: pageSize,
                  totalData: totalElements,
                  orders: orders,
                }}
                orderActive={filter.pagination.orders}
                setOrder={(orders) => {
                  dispatch(setFilter({ ...filter, pagination: { ...filter.pagination, orders } }));
                }}
                setPagination={({ pageNumber, pageSize }) => {
                  dispatch(setFilter({ ...filter, pagination: { ...filter.pagination, pageNumber, pageSize } }));
                }}
                isHaveBorderBottomLeftRight
                rowKey='paymentId'
                rows={dataSource}
                columns={columns as ColumnsTypeCustom}
              />
            }
          />
        </div>
        <div id={`${dataTestId}-popup-confirm-footer`} className='w-full flex justify-between items-center py-6'>
          <div></div>
          <div className='flex flex-row gap-6'>
            <BaseButton
              id={`${dataTestId}-popup-confirm-footer-btn-cancel`}
              size='large'
              type='cancel'
              label='ยกเลิก'
              onClick={() => router.push(URL.readytopay.readyToPay.url)}
            />
            <BaseButton
              id={`${dataTestId}-popup-confirm-footer-btn-confirm`}
              size='large'
              label='บันทึกใบสั่งจ่าย'
              onClick={handleConfirm}
            />
          </div>
          <p className='input text-right'>เลือกแล้ว {dataSelected.length} รายการ</p>

          <PopUpWarning
            code={codeWarningModal}
            dataTestId={dataTestId}
            isOpen={isOpenWarningModal}
            setIsOpen={setIsOpenWarningModal}
            handleConfirm={() => setIsOpenWarningModal(false)}
          />
        </div>
      </div>
    </BaseForm>
  );
}
