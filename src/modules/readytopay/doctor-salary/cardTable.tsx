'use client';
import React, { useState, useMemo, useEffect } from 'react';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseButton } from 'wcf-component-lib/src/components';
import { Checkbox } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';
import { Page } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  readyToPayDoctorSalarySelector,
  getDoctorSalalyListService,
  ReadyToPayDataType,
  setPaymentNo,
  setCitizenId,
  setFilterDoctorSalaly,
  clearListFilter,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';
import PopUpWarning, { MSGCodeType } from '@/components/common/popUps/popUpWarning';

interface dataPops {
  dataSelected: ReadyToPayDataType[];
  setDataSelected: React.Dispatch<React.SetStateAction<ReadyToPayDataType[]>>;
  dataTestId: string;
}

export default function CardTable(props: dataPops): React.ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [codeWarningModal, setCodeWarningModal] = useState<MSGCodeType>('');
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);
  const { filter, loadDatafilter, listFilter, loading, totalElements, pageDoctorSalalyForm } =
    useSelector(readyToPayDoctorSalarySelector);
  const { pageSize, pageNumber, orders } = filter.pagination;

  useEffect(() => {
    // ล้าง data in table from filter ที่เลือก
    void dispatch(clearListFilter());
    // รีเซ็ต dataSelected เมื่อเปลี่ยน filter
    setDataSelected([]);
  }, [dispatch]);

  useEffect(() => {
    if (loadDatafilter) {
      void dispatch(getDoctorSalalyListService(filter));
    }
  }, [dispatch, filter, loadDatafilter]);

  const dataSource = useMemo(() => {
    return listFilter; // Return listFilter
  }, [listFilter]);

  const columns = [
    {
      title: filter.payType !== 'X' && (
        <Checkbox
          checked={dataSelected.length > 0 && dataSelected.length === listFilter.length}
          indeterminate={dataSelected.length > 0 && dataSelected.length < listFilter.length}
          onChange={(e) => {
            if (e.target.checked) {
              setDataSelected(listFilter);
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
      render: (paymentId: string, record: ReadyToPayDataType): React.ReactElement => {
        const isChecked = dataSelected.some((item) => item.paymentId === record.paymentId); // ตรวจสอบว่าแถวนี้ถูกเลือกหรือไม่

        const handleCheckboxChange = (checked: boolean, record: ReadyToPayDataType): void => {
          if (filter.payType === 'X' && checked && dataSelected.length === 1) {
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
      render: (chequeNo: number, record: unknown, index: number): React.ReactElement => {
        return <span key={`row-${index}`}>{index + 1}</span>;
      },
    },
    filter.payType === 'T' && {
      title: 'ธนาคาร',
      key: 'bankCode',
      dataIndex: 'bankCode',
      align: 'center',
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
    },
    {
      title: 'ลูกจ้าง /ผู้มีสิทธิ์',
      key: 'fullName',
      dataIndex: 'fullName',
      align: 'center',
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'right',
      sorter: true,
      render: (amount: string): React.ReactElement => {
        const amountNumber = Number(amount);

        return <div>{amountNumber.toLocaleString()}</div>;
      },
    },
    {
      title: 'รายละเอียด',
      key: 'paymentId',
      dataIndex: 'paymentId',
      render: (paymentId: string, record: ReadyToPayDataType): React.ReactElement => {
        return (
          <div className='flex justify-center gap-2'>
            <Page
              className='cursor-pointer bg-[#E7F3F5] text-[#1C4651] rounded-full w-10 h-10 p-2'
              onClick={() => goToDetailPage(record)}
            />
          </div>
        );
      },
    },
  ];

  //ปุ่ม รายละเอียด
  const goToDetailPage = (record: ReadyToPayDataType): void => {
    // console.log('record', record);
    void dispatch(setCitizenId(record.employeeCitizenId));
    void dispatch(setPaymentNo(record.accidentIssueCode));

    router.push(
      `${URL.readytopay.doctorSalaryDetail.url}?cid=${record.employeeCitizenId}&paymenttype=${filter.payToCode}`,
    );
  };

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
      setPagePaymentForm({
        ...pageDoctorSalalyForm,
        payType: filter.payType,
        selectList: dataSelected,
      }),
    );

    // จ่าย - รับเงิน ณ สำนักงาน
    if (filter.payType === 'X') {
      // โอนผ่านธนาคารโดยจังหวัด
      router.push(URL.readytopay.paymentOffice.url);
    } else if (filter.payType === 'B') {
      // ส่งเช็คทางไปรษณีย์
      router.push(URL.readytopay.paymentBank.url);
    } else if (filter.payType === 'S') {
      // ธนาณัติ
      router.push(URL.readytopay.paymentCheck.url);
    } else if (filter.payType === 'P') {
      // พร้อมเพย์
      router.push(URL.readytopay.paymentMoney.url);
    } else if (filter.payType === 'M') {
      router.push(URL.readytopay.paymentPromptPay.url);
    }
  };

  //สำหรับ Loading Table รอข้อมูล
  if (loadDatafilter) {
    return (
      <div className='h-[480px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
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
              loading={loading}
              rowKey='paymentId'
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
              page={{
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalData: totalElements,
                orders: orders,
              }}
              orderActive={filter.pagination.orders}
              setOrder={(orders) => {
                console.log('orders', orders);
                dispatch(setFilterDoctorSalaly({ ...filter, pagination: { ...filter.pagination, orders } }));
              }}
              setPagination={({ pageNumber, pageSize, totalData }) => {
                dispatch(
                  setFilterDoctorSalaly({
                    ...filter,
                    pagination: { ...filter.pagination, pageNumber, pageSize, totalData },
                  }),
                );
              }}
              isHaveBorderBottomLeftRight
            />
          }
        />
      </div>
      <div id={`${props.dataTestId}-popup-confirm-footer`} className='w-full flex justify-between items-center py-6'>
        <div></div>
        <div className='flex flex-row gap-6'>
          <BaseButton
            id={`${props.dataTestId}-popup-confirm-footer-btn-cancel`}
            size='large'
            type='cancel'
            label='ยกเลิก'
            onClick={() => router.push(URL.readytopay.readyToPay.url)}
          />
          <BaseButton
            id={`${props.dataTestId}-popup-confirm-footer-btn-confirm`}
            // loading={loadingSave}
            // disabled={props.dataSelected.length === 0 || selectedPaymentTypes.length === 0}
            size='large'
            label='บันทึกใบสั่งจ่าย'
            onClick={handleConfirm}
          />
        </div>

        <p className='input text-right'>เลือกแล้ว {dataSelected.length} รายการ</p>

        <PopUpWarning
          code={codeWarningModal}
          dataTestId={props.dataTestId}
          isOpen={isOpenWarningModal}
          setIsOpen={setIsOpenWarningModal}
          handleConfirm={() => setIsOpenWarningModal(false)}
        />
      </div>
    </div>
  );
}
