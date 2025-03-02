'use client';
import React, { useEffect, useState, useRef } from 'react';
import { BaseButton } from 'wcf-component-lib/src/components';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseGrid } from 'wcf-component-lib/src/components/v2';
import { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Trash } from 'wcf-component-lib/node_modules/iconoir-react';
import { FormInstance, Table } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';
import { useSelector } from 'react-redux';
import {
  ReadyToPayDataType,
  readyToPayDoctorSalarySelector,
  setSelectPaymentList,
} from '@/store-redux/slices/readytopay/doctor-salary';
import ModalPaymentOrder from '@/modules/readytopay/doctor-salary/component/modalPaymentOrder';
import { PayType } from '@/types/payType';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency } from '@/utils/formatGeneral';

interface TableRequestPaymentProps {
  dataTestId: string;
  tabPaymentActive: PayType;
  mode?: 'view' | 'edit' | 'add';
  headerTitle?: string;
  onChange?: (data: TableRequestPaymentType[]) => void;
  add: (defaultValue?: TableRequestPaymentType, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  form: FormInstance;
  itemName: string;
}

export interface TableRequestPaymentType {
  id: string;
  paymentNo: string;
  accidentIssueCode: string;
  employeeCitizenId: string;
  fullName: string;
  bankCode: string;
  bankAccountNo: string;
  bankAccountName: string;
  amount: number;
  mode?: 'view' | 'edit' | 'add';
}

export const INIT_DATA_REQUEST: TableRequestPaymentType[] = [
  {
    id: uuidv4(),
    paymentNo: '',
    accidentIssueCode: '',
    employeeCitizenId: '',
    fullName: '',
    bankCode: '',
    bankAccountNo: '',
    bankAccountName: '',
    amount: 0,
    mode: 'add',
  },
];

export default function TableRequestPayment({
  dataTestId,
  mode,
  tabPaymentActive,
  headerTitle = 'รายการสั่งจ่าย',
  form,
  onChange,
  remove,
  itemName,
}: TableRequestPaymentProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false); //Insert Model
  const [dataSource, setDataSource] = useState<TableRequestPaymentType[]>([]);
  const {
    pageDoctorSalalyForm: { selectList },
  } = useSelector(readyToPayDoctorSalarySelector);

  useEffect(() => {
    if (!selectList) return;

    const inticalRequestPayment: TableRequestPaymentType[] = selectList.map((item: ReadyToPayDataType) => ({
      id: uuidv4(),
      paymentNo: item.paymentNo,
      accidentIssueCode: item.accidentIssueCode,
      employeeCitizenId: item.employeeCitizenId,
      fullName: item.fullName,
      bankCode: item.bank ? item.bank.code.concat(item.bank.name) : '',
      bankAccountNo: '',
      bankAccountName: '',
      amount: item.amount ?? 0, // จัดการกรณีที่ amount อาจเป็น undefined
      mode: 'add',
    }));
    setDataSource(inticalRequestPayment);
  }, [selectList]);

  const prevDataSourceRef = useRef(dataSource);

  useEffect(() => {
    // ตรวจสอบว่า dataSource เปลี่ยนแปลงจริงๆ หรือไม่
    if (dataSource !== prevDataSourceRef.current) {
      if (onChange) {
        onChange(dataSource);
      }

      // อัพเดตฟิลด์ requestPayment ด้วยข้อมูลที่เปลี่ยนแปลง
      form.setFieldsValue({
        requestPayment: dataSource,
      });

      // อัพเดตฟิลด์ requestPayment ด้วยข้อมูลที่เปลี่ยนแปลง
      form.setFieldsValue({
        requestPaymentEdit: dataSource,
      });

      // อัพเดตค่า prevDataSourceRef
      prevDataSourceRef.current = dataSource;
    }
  }, [dataSource, onChange, form]);

  const handleDelete = (paymentNo: string, index: number): void => {
    void remove(index);
    const newSelectListFilter = dataSource.filter((item) => item.paymentNo.toString() !== paymentNo.toString());
    setDataSource(newSelectListFilter);

    // อัพเดต selectList ใน Redux state
    const updatedSelectList = newSelectListFilter.map((item) => ({
      paymentId: item.paymentNo, // หรือปรับตามค่าที่เหมาะสม
      paymentNo: item.paymentNo,
      accidentIssueCode: item.accidentIssueCode,
      employeeCitizenId: item.employeeCitizenId,
      fullName: item.fullName,
      amount: item.amount,
      hospital: '', // หรือดึงข้อมูลที่ถูกต้องจาก source
      bankAccNo: item.bankAccountNo,
      bankAccName: item.bankAccountName,
      bank: {
        code: item.bankCode,
        name: '', // หรือดึงข้อมูลที่ถูกต้องจาก source
      },
      postal: {
        postalCode: '', // หรือดึงข้อมูลที่ถูกต้องจาก source
        postalName: '', // หรือดึงข้อมูลที่ถูกต้องจาก source
      },
    }));

    dispatch(setSelectPaymentList(updatedSelectList));

    console.log('newSelectListFilter', newSelectListFilter, 'dataSource', dataSource);
  };

  const headTableContent = (): React.ReactElement => {
    if (mode === 'view') return <></>;

    return (
      <BaseButton
        id={`${dataTestId}-button-add`}
        size='middle'
        className='!min-w-[240px]'
        icon={<PlusOutlined />}
        label='เพิ่มรายการสั่งจ่าย'
        onClick={() => setIsOpenCreateModal(true)}
      />
    );
  };

  if (itemName === undefined) {
    return (
      <div className='h-[280px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  const columns = [
    {
      title: 'ลำดับ',
      align: 'center',
      key: 'no',
      dataIndex: 'no',
      render: (chequeNo: number, record: unknown, index: number): React.ReactElement => {
        return <span key={`row-${index}`}>{index + 1}</span>;
      },
    },
    {
      title: 'เลขที่ใบสั่งจ่าย',
      align: 'center',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
    },
    {
      title: 'เลขประสบอันตราย',
      align: 'center',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
    },
    {
      title: 'เลขบัตรประชาชน',
      align: 'center',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
    },

    {
      title: 'ลูกจ้าง/ผู้มีสิทธิ์',
      align: 'left',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    ...(tabPaymentActive === 'B'
      ? [
          {
            title: 'ธนาคาร',
            align: 'center',
            key: 'bankCode',
            dataIndex: 'bankCode',
            render: (text: string, record: unknown): React.ReactElement => {
              const row = record as ReadyToPayDataType;

              return (
                <div id={`${dataTestId}-bank-label-value`} className='flex justify-start'>
                  {row.bank?.code} : {row.bank?.name}
                </div>
              );
            },
          },
          {
            title: 'เลขบัญชี',
            align: 'center',
            key: 'bankAccNo',
            dataIndex: 'bankAccNo',
          },
          {
            title: 'ชื่อบัญชี',
            align: 'center',
            key: 'bankAccName',
            dataIndex: 'bankAccName',
          },
        ]
      : []),
    {
      title: 'จำนวนเงิน',
      align: 'right',
      key: 'amount',
      dataIndex: 'amount',

      render: (amount: string): React.ReactElement => {
        const amountNumber = Number(amount);

        return (
          <div id={`${dataTestId}-amountNumber-label-value`} className='flex justify-end items-center'>
            {formatCurrency(amountNumber)}
          </div>
        );
      },
    },
    //เพิ่ม column สำหรับแสดงปุ่มลบ เฉพาะใน mode ที่ไม่ใช่ view
    ...(mode !== 'view'
      ? [
          {
            align: 'center',
            title: '',
            key: 'paymentId',
            dataIndex: 'paymentId',
            width: 50,
            render: (text: string, record: unknown, index: number): React.ReactElement => {
              const row = record as TableRequestPaymentType;

              switch (row.mode) {
                case 'view':
                  return <div className='mb-6'></div>;
                case 'edit':
                case 'add':
                  return (
                    <div className='flex justify-center items-center'>
                      <div
                        className='w-10 h-10 flex justify-center items-center p-2 rounded-full bg-red-100 cursor-pointer'
                        onClick={() => {
                          void handleDelete(row.paymentNo, index);
                        }}
                      >
                        <Trash color='red' />
                      </div>
                    </div>
                  );
                default:
                  return <div className='mb-6'></div>;
              }
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <div className='w-full flex flex-col p-6 bg-white shadow-sm rounded-xl'>
        <TableListLayout
          headTableContent={headTableContent()}
          textHeader={headerTitle}
          totalItems={dataSource.length}
          type='form'
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลรายการสั่งจ่าย'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              // isHaveBorderBottomLeftRight
              bordered={mode !== 'edit' ? itemName === 'requestPayment' : itemName === 'requestPaymentEdit'} //แสดง border not case edit and add
              rowKey='id'
              rows={dataSource}
              columns={columns as ColumnsTypeCustom}
              summary={(pageData) => {
                // คำนวณผลรวมของฟิลด์ amount

                // คำนวณผลรวมของฟิลด์ amount
                const totalAmount = pageData.reduce((sum, record) => sum + Number(record.amount), 0);

                // กำหนดค่า colSpan ตามเงื่อนไข
                const colSpanValue =
                  tabPaymentActive !== 'B'
                    ? mode !== 'view'
                      ? 5 // ไม่มีคอลัมน์เพิ่มเติม
                      : 5 // เมื่อไม่มีคอลัมน์ 'action'
                    : mode !== 'view'
                    ? 8
                    : 8;

                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={colSpanValue} className='!bg-gray-200 !rounded-bl-lg'>
                      <p className='px-6 text-right'>รวม</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className='!bg-gray-200 !rounded-br-lg'>
                      <p className='text-right'>{formatCurrency(totalAmount)}</p>
                    </Table.Summary.Cell>
                    {mode !== 'view' && (
                      <Table.Summary.Cell index={2} className='!bg-gray-200 !rounded-br-lg'></Table.Summary.Cell>
                    )}
                  </Table.Summary.Row>
                );
              }}
            />
          }
        />
      </div>
      {isOpenCreateModal && (
        <ModalPaymentOrder
          tabActive={tabPaymentActive}
          isOpenModal={isOpenCreateModal}
          setOpenModal={setIsOpenCreateModal}
          dataTestId={dataTestId}
        />
      )}
    </>
  );
}
