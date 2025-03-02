'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseButton, BaseItemDropdown, BaseItemInput, BaseItemInputNumber } from 'wcf-component-lib/src/components';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseGrid } from 'wcf-component-lib/src/components/v2';
import { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { PlusOutlined } from '@ant-design/icons';
import { onlyNumberRule, requiredRule, minRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '@/utils/formatGeneral';
import { Trash, Refresh } from 'wcf-component-lib/node_modules/iconoir-react';
import { FormInstance } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';

interface TableBankProps {
  dataTestId: string;
  mode?: 'view' | 'edit' | 'add' | 'addWrongFund';
  headerTitle?: string;
  onChange?: (data: TableBankType[]) => void;
  add: (defaultValue?: TableBankType, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  form: FormInstance;
  itemName: string;
  hideButtonAdd?: boolean;
}

export interface TableBankType {
  id: string;
  bankCode: string | undefined;
  bankAccountName: string;
  bankAccountNo: string;
  amount: number;
  mode: 'view' | 'edit' | 'add' | 'addWrongFund';
}

export const INIT_DATA_BANK: TableBankType[] = [
  {
    id: uuidv4(),
    bankCode: '006',
    bankAccountName: '',
    bankAccountNo: '',
    amount: 0,
    mode: 'add',
  },
];

export default function TableBank({
  dataTestId,
  mode = 'view',
  headerTitle = 'ธนาคาร',
  onChange,
  add,
  remove,
  form,
  itemName,
  hideButtonAdd = false,
}: TableBankProps): React.ReactElement {
  const [dataSource, setDataSource] = useState<TableBankType[]>([]);
  const [dataSourceEdit, setDataSourceEdit] = useState<TableBankType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (form.getFieldValue(itemName) !== undefined) {
      setDataSource(form.getFieldValue(itemName) as TableBankType[]);
      //set dataSourceEdit for check data change
      if (dataSourceEdit.length === 0) {
        setDataSourceEdit(form.getFieldValue(itemName) as TableBankType[]);
      }
    }
  }, [form, itemName, dataSource, dataSourceEdit]);

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
    //overwrite id from INIT_DATA_BANK[0] to new id by uuidv4
    const newCheque: TableBankType = { ...INIT_DATA_BANK[0], id: uuidv4(), mode: 'add' };
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
      title: 'ธานาคาร',
      key: 'bankCode',
      width: 200,
      dataIndex: 'bankCode',
      render: (bankCode: string, record: unknown, index): React.ReactElement => {
        const row = record as TableBankType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{displayBankName(bankCode)}</div>;
          case 'edit':
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
          default:
            return <div className='mb-6'>-</div>;
        }
      },
    },
    {
      align: 'left',
      title: 'ชื่อบัญชี',
      key: 'bankAccountName',
      dataIndex: 'bankAccountName',
      width: 150,
      render: (bankAccountName: number, record: unknown, index): React.ReactElement => {
        const row = record as TableBankType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{bankAccountName}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={bankAccountName}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-bankAccountName-${row.id}-input-text`}
                itemName={[index.toString(), 'bankAccountName']}
                rules={[requiredRule('ชื่อบัญชี')]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'bankAccountName', e.target.value);
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
      title: 'เลขที่บัญชี',
      key: 'bankAccountNo',
      dataIndex: 'bankAccountNo',
      width: 150,
      render: (bankAccountNo: number, record: unknown, index): React.ReactElement => {
        const row = record as TableBankType;
        switch (row.mode) {
          case 'view':
            return <div className='mb-6'>{bankAccountNo}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={bankAccountNo}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-bankAccountNo-${row.id}-input-text`}
                itemName={[index.toString(), 'bankAccountNo']}
                rules={[
                  requiredRule('เลขที่บัญชี'),
                  onlyNumberRule('เลขที่บัญชี'),
                  minRule('เลขที่บัญชี', 10),
                  maxRule('เลขที่บัญชี', 10),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'bankAccountNo', e.target.value);
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
        const row = record as TableBankType;
        switch (row.mode) {
          case 'view':
            return (
              <div className='mb-6'>
                <span>{formatCurrency(amount)}</span>
              </div>
            );
          case 'edit':
          case 'add':
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
        const row = record as TableBankType;

        const findIdOldData = dataSourceEdit.find((item) => item.id === row.id);
        //compare data object with old data object by bypass mode for compare
        const dataChange =
          findIdOldData &&
          JSON.stringify({ ...findIdOldData, mode: 'edit' }) !== JSON.stringify({ ...row, mode: 'edit' });

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
                      const newDataSource = (form.getFieldValue(itemName) as TableBankType[]).map(
                        (item: TableBankType) => {
                          if (item.id === row.id) {
                            return { ...item, ...findIdOldData, mode: 'edit' };
                          }

                          return item;
                        },
                      );

                      //set new data to form
                      form.setFieldsValue({
                        [itemName]: newDataSource,
                      });
                      //set new data to state dataSourceEdit
                      setDataSourceEdit(newDataSource as TableBankType[]);
                    }
                  }}
                >
                  <Refresh color='red' />
                </button>
              </div>
            );

          case 'add':
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
        label='เพิ่มธนาคาร'
        onClick={() => {
          void handleAdd();
        }}
      />
    );
  };

  if (form === undefined || bankSelectData.length === 0) {
    return (
      <div className='h-[280px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  return (
    <>
      <div className='w-full flex flex-col p-6 bg-white shadow-sm rounded-xl'>
        <TableListLayout
          headTableContent={headTableContent()}
          textHeader={headerTitle}
          totalItems={dataSource.length}
          type='form'
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลธนาคาร'
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
