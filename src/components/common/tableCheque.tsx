'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseButton, BaseItemDropdown, BaseItemInput, BaseItemInputNumber } from 'wcf-component-lib/src/components';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseGrid, BaseItemDatePicker } from 'wcf-component-lib/src/components/v2';
import { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { PlusOutlined } from '@ant-design/icons';
import { onlyNumberRule, requiredRule, minRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '@/utils/formatGeneral';
import dayjs from '@/utils/dayjs-setup';
import { Trash, Refresh } from 'wcf-component-lib/node_modules/iconoir-react';
import { FormInstance } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';

interface TableChequeProps {
  dataTestId: string;
  mode?: 'view' | 'edit' | 'add' | 'addBank' | 'addWrongFund';
  headerTitle?: string;
  onChange?: (data: TableChequeType[]) => void;
  add: (defaultValue?: TableChequeType, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  form: FormInstance;
  itemName: string;
  hideButtonAdd?: boolean;
  isNotShadow?: boolean;
}

export interface TableChequeType {
  id: string;
  chequeNo: string;
  bankCode: string | undefined;
  bankBranchCode?: string;
  amount: number;
  chequeStampDate: string | dayjs.Dayjs | undefined;
  mode?: 'view' | 'add' | 'edit' | 'addBank';
}

export const INIT_DATA_CHEQUE: TableChequeType[] = [
  {
    id: uuidv4(),
    chequeNo: '',
    bankCode: '006',
    bankBranchCode: '',
    amount: 0,
    chequeStampDate: dayjs(),
    mode: 'add',
  },
];

export default function TableCheque({
  dataTestId,
  mode = 'view',
  headerTitle = 'สั่งจ่ายโดย : เช็ค',
  onChange,
  add,
  remove,
  form,
  itemName,
  hideButtonAdd = false,
  isNotShadow = false,
}: TableChequeProps): React.ReactElement {
  const [dataSource, setDataSource] = useState<TableChequeType[]>([]);
  const [dataSourceEdit, setDataSourceEdit] = useState<TableChequeType[]>([]);
  const dispatch = useAppDispatch();
  const dataChequeList = form.getFieldValue(itemName) as TableChequeType[];

  // ใช้ useSelector ภายในฟังก์ชัน component
  const { list: bankList } = useSelector(bankSelector);
  useEffect(() => {
    void dispatch(
      getBankList({
        data: {
          pagination: {
            pageNumber: 0,
            pageSize: 10000,
            orders: [
              {
                direction: 'DESC',
                property: 'bankCode',
              },
            ],
          },
        },
      }),
    );
  }, [dispatch]);

  const bankSelectData = useMemo(() => {
    const result: SelectData[] = [];
    bankList.map((e: BankItem) => {
      result.push({
        value: e.bankCode,
        label: `${e.bankCode} : ${e.bankName}`,
      });
    });

    return result;
  }, [bankList]);

  const displayBankName = (bankCode: string): string => {
    const bank = bankList.find((item) => item.bankCode === bankCode);

    return bank ? `${bank.bankCode} : ${bank.bankName}` : '';
  };

  useEffect(() => {
    if (dataChequeList !== undefined) {
      setDataSource(dataChequeList);
      //set dataSourceEdit for check data change
      if (dataSourceEdit.length === 0) {
        setDataSourceEdit(dataChequeList);
      }
    }
  }, [dataSourceEdit, dataChequeList]);

  useEffect(() => {
    //callback dataSource to parent
    if (onChange) {
      onChange(dataSource);
    }
  }, [dataSource, onChange]);

  const handleUpdate = (id: string, key: string, value: string | number | undefined): void => {
    const newDataSource = dataSource.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }

      return item;
    });
    setDataSource(newDataSource);
  };

  const handleDelete = (id: string, index: number): void => {
    //remove item from BaseForm
    void remove(index);
    //remove item from dataSource state
    const newSelectListFilter = dataSource.filter((item) => item.id.toString() !== id.toString());
    setDataSource(newSelectListFilter);
  };

  const handleAdd = (): void => {
    //overwrite id from INIT_DATA_CHEQUE[0] to new id by uuidv4
    //check mode for addBank or add
    const newMode = mode === 'addBank' ? 'addBank' : 'add';
    const bankCode = mode === 'addBank' ? bankList[0].bankCode : undefined;
    const newCheque: TableChequeType = {
      ...INIT_DATA_CHEQUE[0],
      id: uuidv4(),
      mode: newMode,
      bankCode: mode === 'addBank' ? bankCode : INIT_DATA_CHEQUE[0].bankCode,
      // bankCode: bankCode, // for bk
    };
    setDataSource([...dataSource, newCheque]);
    add(newCheque);
  };

  const columns: ColumnsTypeCustom = [
    {
      align: 'center',
      title: 'ลำดับ',
      key: 'id',
      dataIndex: 'id',
      width: 50,
      render: (id: number, record: unknown, index): React.ReactElement => {
        return <div className='mb-6'>{index + 1}</div>;
      },
    },
    {
      align: 'center',
      title: 'เลขที่เช็ค',
      key: 'chequeNo',
      dataIndex: 'chequeNo',
      width: 150,
      render: (chequeNo: number, record: unknown, index): React.ReactElement => {
        const row = record as TableChequeType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{chequeNo}</div>;
          case 'edit':
            return (
              <BaseItemInput
                value={chequeNo}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-chequeNo-${row.id}-input-text`}
                itemName={[index.toString(), 'chequeNo']}
                rules={[
                  requiredRule('เลขที่เช็ค'),
                  onlyNumberRule('เลขที่เช็ค'),
                  minRule('เลขที่เช็ค', 8),
                  maxRule('เลขที่เช็ค', 8),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'chequeNo', e.target.value);
                }}
              />
            );
          case 'add':
          case 'addBank':
            return (
              <BaseItemInput
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-chequeNo-${row.id}-input-text`}
                itemName={[index.toString(), 'chequeNo']}
                rules={[
                  requiredRule('เลขที่เช็ค'),
                  onlyNumberRule('เลขที่เช็ค'),
                  minRule('เลขที่เช็ค', 8),
                  maxRule('เลขที่เช็ค', 8),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'chequeNo', e.target.value);
                }}
              />
            );
          default:
            return <div className='mb-6'>-</div>;
        }
      },
    },
    {
      align: 'center',
      title: 'ธนาคาร',
      key: 'bankCode',
      width: 200,
      dataIndex: 'bankCode',
      render: (bankCode: string, record: unknown, index): React.ReactElement => {
        const row = record as TableChequeType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{displayBankName(bankCode)}</div>;
          case 'edit':
            return <div className='mb-6'>{displayBankName(bankCode)}</div>;
          case 'add':
            return (
              <BaseItemDropdown
                className='custom-bg-color-blue'
                id={`${dataTestId}-bankCode-${row.id}-selecter`}
                itemName={[index.toString(), 'bankCode']}
                option={bankSelectData}
                rules={[requiredRule('ธนาคาร')]}
                onChange={(e) => {
                  if (e !== undefined) {
                    handleUpdate(row.id, 'bankCode', e);
                  } else {
                    handleUpdate(row.id, 'bankCode', '');
                  }
                }}
              />
            );
          case 'addBank':
            return (
              <BaseItemDropdown
                className='custom-bg-color-blue'
                id={`${dataTestId}-bankCode-${row.id}-selecter`}
                itemName={[index.toString(), 'bankCode']}
                option={bankSelectData}
                rules={[requiredRule('ธนาคาร')]}
                disabled
                onChange={(e) => {
                  if (e !== undefined) {
                    handleUpdate(row.id, 'bankCode', e);
                  } else {
                    handleUpdate(row.id, 'bankCode', '');
                  }
                }}
              />
            );
          default:
            return <div className='mb-6'>-</div>;
        }
      },
    },
    {
      align: 'right',
      title: 'จำนวนเงิน',
      key: 'amount',
      width: 150,
      dataIndex: 'amount',
      render: (amount: number, record: unknown, index): React.ReactElement => {
        const row = record as TableChequeType;
        switch (row.mode) {
          case 'view':
            return (
              <div className='mb-6'>
                <span>{formatCurrency(amount)}</span>
              </div>
            );
          case 'edit':
            return (
              <div className='mb-6'>
                <span>{formatCurrency(amount)}</span>
              </div>
            );
          case 'add':
          case 'addBank':
            return (
              <BaseItemInputNumber
                className='bg-[#E7F3F5] w-full'
                id={`${dataTestId}-amount-${row.id}-input-text`}
                itemName={[index.toString(), 'amount']}
                rules={[requiredRule('จำนวนเงิน')]}
                hideFieldControl
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'amount', Number(e.target.value));
                }}
              />
            );
          default:
            return <div className='mb-6'>-</div>;
        }
      },
    },
    {
      align: 'center',
      title: 'วันที่เช็ค',
      width: 150,
      key: 'chequeStampDate',
      dataIndex: 'chequeStampDate',
      render: (chequeStampDate: number, record: unknown, index): React.ReactElement => {
        const row = record as TableChequeType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{dayjs(chequeStampDate).format('DD/MM/BBBB')}</div>;
          case 'edit':
            return <div className='mb-6'>{dayjs(chequeStampDate).format('DD/MM/BBBB')}</div>;
          case 'add':
          case 'addBank':
            return (
              <BaseItemDatePicker
                className='bg-[#E7F3F5]'
                id={`${dataTestId}-chequeStampDate-${row.id}-input-date`}
                itemName={[index.toString(), 'chequeStampDate']}
                rules={[requiredRule('วันที่เช็ค')]}
                onChange={(e) => {
                  //convert e to string
                  const date = e ? e.format('YYYY-MM-DD') : '';
                  handleUpdate(row.id, 'chequeStampDate', date);
                }}
              />
            );
          default:
            return <div className='mb-6'>-</div>;
        }
      },
    },
  ];

  //เพิ่ม column สำหรับแสดงปุ่มลบ เฉพาะใน mode ที่ไม่ใช่ view
  if (mode !== 'view' && mode !== 'addWrongFund') {
    columns.push({
      align: 'center',
      title: '',
      key: 'id',
      dataIndex: 'id',
      width: 50,
      render: (text: string, record: unknown, index): React.ReactElement => {
        const row = record as TableChequeType;
        const findIdOldData = dataSourceEdit.find((item) => item.id === row.id);
        //compare data change
        const dataChange = findIdOldData && findIdOldData.chequeNo !== row.chequeNo;

        switch (row.mode) {
          case 'view':
            return <div className='mb-6'></div>;
          case 'edit':
            //check data not change show disable button
            if (!dataChange) {
              return (
                <div className='flex justify-center items-center'>
                  <button
                    type='button'
                    disabled
                    className='w-10 h-10 flex justify-center items-center p-2 rounded-full bg-gray-100 cursor-not-allowed  mb-6'
                  >
                    <Refresh color='gray' />
                  </button>
                </div>
              );
            }

            return (
              <div className='flex justify-center items-center'>
                <button
                  type='button'
                  className='w-10 h-10 flex justify-center items-center p-2 rounded-full bg-red-100 cursor-pointer  mb-6'
                  onClick={() => {
                    //when data change then click button to reset data
                    if (dataChange) {
                      const newDataSource = (form.getFieldValue(itemName) as TableChequeType[]).map(
                        (item: TableChequeType) => {
                          if (item.id === row.id) {
                            return { ...item, chequeNo: findIdOldData?.chequeNo };
                          }

                          return item;
                        },
                      );

                      //set new data to form
                      form.setFieldsValue({
                        [itemName]: newDataSource,
                      });
                      //set new data to state dataSourceEdit
                      setDataSourceEdit(newDataSource);
                    }
                  }}
                >
                  <Refresh color='red' />
                </button>
              </div>
            );
          case 'add':
          case 'addBank':
            return (
              <div className='flex justify-center items-center'>
                <div
                  className='w-10 h-10 flex justify-center items-center p-2 rounded-full bg-red-100 cursor-pointer  mb-6'
                  onClick={() => {
                    void handleDelete(row.id, index);
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
    });
  }

  const headTableContent = (): React.ReactElement => {
    if (mode === 'view') return <></>;
    if (hideButtonAdd) return <></>;

    return (
      <BaseButton
        size='middle'
        className='!min-w-[240px]'
        icon={<PlusOutlined />}
        label='เพิ่มเช็ค'
        onClick={() => {
          void handleAdd();
        }}
      />
    );
  };

  if (form === undefined || bankList.length === 0) {
    return (
      <div className={`h-[280px] bg-white ${!isNotShadow && 'shadow-sm'} rounded-xl flex justify-center items-center`}>
        <SpinLoading />
      </div>
    );
  }

  return (
    <>
      <div className={`w-full flex flex-col p-6 bg-white ${!isNotShadow && 'shadow-sm'} rounded-xl`}>
        <TableListLayout
          headTableContent={headTableContent()}
          textHeader={headerTitle}
          totalItems={dataSource.length}
          type='form'
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลเช็ค'
          emptyDescription='ไม่มีข้อมูลที่ต้องการแสดงในขณะนี้'
          Grid={
            <BaseGrid
              isHaveBorderBottomLeftRight
              twoToneColor={mode === 'view'} //แสดง border case view
              bordered={mode !== 'view'} //แสดง border not case edit and add
              rowKey='id'
              rows={dataSource}
              columns={columns}
            />
          }
        />
      </div>
    </>
  );
}
