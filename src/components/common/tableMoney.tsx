'use client';
import React, { useEffect, useState } from 'react';
import { BaseButton, BaseForm, BaseItemInput, BaseItemInputNumber } from 'wcf-component-lib/src/components';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { BaseGrid } from 'wcf-component-lib/src/components/v2';
import { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { PlusOutlined } from '@ant-design/icons';
import { onlyNumberRule, requiredRule, minRule, maxRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '@/utils/formatGeneral';
import { Trash, Refresh, NumberedListRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { FormInstance, Form } from 'wcf-component-lib/node_modules/antd';
import { SpinLoading } from '@/components/common';

interface TableMoneyProps {
  dataTestId: string;
  mode?: 'view' | 'edit' | 'add' | 'custom' | 'addFnRunNumber' | 'addWrongFund';
  headerTitle?: string;
  onChange?: (data: TableMoneyType[]) => void;
  add: (defaultValue?: TableMoneyType, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  form: FormInstance;
  itemName: string;
  hideButtonAdd?: boolean;
  isNotShadow?: boolean;
  customDisplayTable?: CustomDisplayTableMoneyType;
}

export interface TableMoneyType {
  id: string;
  postalNo: string;
  portalDestination: string;
  postalCode: string;
  receiverName: string;
  amount: number;
  mode: 'view' | 'edit' | 'add' | 'custom';
}

export const INIT_DATA_MONEY: TableMoneyType[] = [
  {
    id: uuidv4(),
    postalNo: '', // เลขที่ธนาณัติ
    portalDestination: '', // ชื่อไปรษณีย์ปลายทาง
    postalCode: '', // รหัสไปรษณีย์ปลายทาง
    receiverName: '', // ชื่อผู้มีสิทธิ์
    amount: 0, // จำนวนเงิน
    mode: 'add',
  },
];

export interface CustomDisplayTableMoneyType {
  id: 'text' | 'input';
  postalNo: 'text' | 'input';
  portalDestination: 'text' | 'input';
  postalCode: 'text' | 'input';
  receiverName: 'text' | 'input';
  amount: 'text' | 'input';
}

export const CUSTOM_DISPLAY_TABLE_MONEY: CustomDisplayTableMoneyType = {
  id: 'text',
  postalNo: 'text', // เลขที่ธนาณัติ
  portalDestination: 'text', // ชื่อไปรษณีย์ปลายทาง
  postalCode: 'text', // รหัสไปรษณีย์ปลายทาง
  receiverName: 'text', // ชื่อผู้มีสิทธิ์
  amount: 'text', // จำนวนเงิน
};

export default function TableMoney({
  dataTestId,
  mode = 'view',
  headerTitle = 'ธนาณัติ',
  onChange,
  add,
  remove,
  form,
  itemName,
  hideButtonAdd,
  isNotShadow = false,
  customDisplayTable = CUSTOM_DISPLAY_TABLE_MONEY,
}: TableMoneyProps): React.ReactElement {
  const [dataSource, setDataSource] = useState<TableMoneyType[]>([]);
  const [dataSourceEdit, setDataSourceEdit] = useState<TableMoneyType[]>([]);
  const [formRunNumber] = Form.useForm();
  const dataMoneyList = form.getFieldValue(itemName) as TableMoneyType[];

  useEffect(() => {
    const isDataSourceEditEmpty = dataSourceEdit.length === 0;
    if (dataMoneyList !== undefined) {
      setDataSource(dataMoneyList);
      //set dataSourceEdit for check data change
      if (isDataSourceEditEmpty) {
        setDataSourceEdit(dataMoneyList);
      }
    }
  }, [dataMoneyList, dataSourceEdit, form, itemName]);

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
    const newCheque: TableMoneyType = { ...INIT_DATA_MONEY[0], id: uuidv4(), mode: 'add' };
    setDataSource([...dataSource, newCheque]);
    add(newCheque);
  };

  const handleRunNumber = (vlaue: { inputRunNumber: string }): void => {
    const runNumber = Number(vlaue.inputRunNumber);
    const currentData = form.getFieldValue(itemName) as TableMoneyType[];

    //loop set form value to postalNo field from currentData array
    const newDataSource: TableMoneyType[] = currentData.map((item: TableMoneyType, index: number) => {
      return { ...item, postalNo: String(runNumber + index).padStart(20, '0') };
    });
    //set data newDataSource to form moneys
    form.setFieldsValue({
      moneys: newDataSource,
    });
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
      title: 'เลขที่ธนาณัติ',
      key: 'postalNo',
      dataIndex: 'postalNo',
      width: 150,
      render: (postalNo: number, record: unknown, index): React.ReactElement => {
        const row = record as TableMoneyType;
        switch (row.mode) {
          case 'custom':
            if (customDisplayTable.postalNo === 'text') {
              return <div className='mb-6'>{postalNo}</div>;
            }

            return (
              <BaseItemInput
                value={postalNo}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-postalNo-${row.id}-input-text`}
                itemName={[index.toString(), 'postalNo']}
                rules={[
                  requiredRule('เลขที่ธนาณัติ'),
                  onlyNumberRule('เลขที่ธนาณัติ'),
                  minRule('เลขที่ธนาณัติ', 20),
                  maxRule('เลขที่ธนาณัติ', 20),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'postalNo', e.target.value);
                }}
              />
            );
          case 'view':
            return <div className='mb-6'>{postalNo}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={postalNo}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-postalNo-${row.id}-input-text`}
                itemName={[index.toString(), 'postalNo']}
                rules={[
                  requiredRule('เลขที่ธนาณัติ'),
                  onlyNumberRule('เลขที่ธนาณัติ'),
                  minRule('เลขที่ธนาณัติ', 20),
                  maxRule('เลขที่ธนาณัติ', 20),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'postalNo', e.target.value);
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
      title: 'รหัสไปรษณีย์ปลายทาง',
      key: 'postalCode',
      dataIndex: 'postalCode',
      width: 150,
      render: (postalCode: number, record: unknown, index): React.ReactElement => {
        const row = record as TableMoneyType;
        switch (row.mode) {
          case 'custom':
            if (customDisplayTable.postalCode === 'text') {
              return <div className='mb-6'>{postalCode}</div>;
            }

            return (
              <BaseItemInput
                value={postalCode}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-postalCode-${row.id}-input-text`}
                itemName={[index.toString(), 'postalCode']}
                rules={[
                  requiredRule('รหัสไปรษณีย์ปลายทาง'),
                  onlyNumberRule('รหัสไปรษณีย์ปลายทาง'),
                  minRule('รหัสไปรษณีย์ปลายทาง', 5),
                  maxRule('รหัสไปรษณีย์ปลายทาง', 5),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'postalCode', e.target.value);
                }}
              />
            );
          case 'view':
            return <div className='mb-6'>{postalCode}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={postalCode}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-postalCode-${row.id}-input-text`}
                itemName={[index.toString(), 'postalCode']}
                rules={[
                  requiredRule('รหัสไปรษณีย์ปลายทาง'),
                  onlyNumberRule('รหัสไปรษณีย์ปลายทาง'),
                  minRule('รหัสไปรษณีย์ปลายทาง', 5),
                  maxRule('รหัสไปรษณีย์ปลายทาง', 5),
                ]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'postalCode', e.target.value);
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
      title: 'ชื่อไปรษณีย์ปลายทาง',
      key: 'portalDestination',
      dataIndex: 'portalDestination',
      width: 150,
      render: (portalDestination: number, record: unknown, index): React.ReactElement => {
        const row = record as TableMoneyType;
        switch (row.mode) {
          case 'custom':
            if (customDisplayTable.portalDestination === 'text') {
              return <div className='mb-6'>{portalDestination}</div>;
            }

            return (
              <BaseItemInput
                value={portalDestination}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-portalDestination-${row.id}-input-text`}
                itemName={[index.toString(), 'portalDestination']}
                rules={[requiredRule('ชื่อไปรษณีย์ปลายทาง'), maxRule('ชื่อไปรษณีย์ปลายทาง', 100)]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'portalDestination', e.target.value);
                }}
              />
            );
          case 'view':
            return <div className='mb-6'>{portalDestination}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={portalDestination}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-portalDestination-${row.id}-input-text`}
                itemName={[index.toString(), 'portalDestination']}
                rules={[requiredRule('ชื่อไปรษณีย์ปลายทาง'), maxRule('ชื่อไปรษณีย์ปลายทาง', 100)]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'portalDestination', e.target.value);
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
      title: 'ลูกจ้าง/ผู้มีสิทธิ์',
      key: 'receiverName',
      dataIndex: 'receiverName',
      width: 150,
      render: (receiverName: number, record: unknown, index): React.ReactElement => {
        const row = record as TableMoneyType;
        switch (row.mode) {
          case 'custom':
            if (customDisplayTable.receiverName === 'text') {
              return <div className='mb-6'>{receiverName}</div>;
            }

            return (
              <BaseItemInput
                value={receiverName}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-receiverName-${row.id}-input-text`}
                itemName={[index.toString(), 'receiverName']}
                rules={[requiredRule('ลูกจ้าง/ผู้มีสิทธิ์'), maxRule('ลูกจ้าง/ผู้มีสิทธิ์', 100)]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'receiverName', e.target.value);
                }}
              />
            );
          case 'view':
            return <div className='mb-6'>{receiverName}</div>;
          case 'edit':
          case 'add':
            return (
              <BaseItemInput
                value={receiverName}
                className='bg-[#E7F3F5] text-center'
                id={`${dataTestId}-receiverName-${row.id}-input-text`}
                itemName={[index.toString(), 'receiverName']}
                rules={[requiredRule('ลูกจ้าง/ผู้มีสิทธิ์'), maxRule('ลูกจ้าง/ผู้มีสิทธิ์', 100)]}
                onChangeFunction={(e) => {
                  handleUpdate(row.id, 'receiverName', e.target.value);
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
        const row = record as TableMoneyType;
        switch (row.mode) {
          case 'custom':
            if (customDisplayTable.amount === 'text') {
              return <div className='mb-6'>{formatCurrency(amount)}</div>;
            }

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
        const row = record as TableMoneyType;
        const findIdOldData = dataSourceEdit.find((item) => item.id === row.id);
        //compare data change
        const dataChange = findIdOldData && findIdOldData.postalNo !== row.postalNo;

        switch (row.mode) {
          case 'custom':
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
                      const currentData = (form.getFieldValue(itemName) as TableMoneyType[]) || [];
                      const newDataSource: TableMoneyType[] = currentData.map((item: TableMoneyType) => {
                        if (item.id === row.id) {
                          return { ...item, postalNo: findIdOldData?.postalNo };
                        }

                        return item;
                      });

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
          case 'view':
            return <div className='mb-6'></div>;
          case 'edit':
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
    if (mode === 'addFnRunNumber')
      return (
        <>
          <BaseForm
            name='form-run-number'
            initialValues={{ inputRunNumber: undefined }}
            onFinish={handleRunNumber}
            extraForm={formRunNumber}
          >
            <div className='flex justify-end gap-4  right-5 bottom-5'>
              <BaseItemInput
                id={`${dataTestId}-incidentNumber-input-text`}
                placeholder='ระบุเลขที่ธนาณัติเริ่มต้น'
                className='text-left w-[250px] mt-[4px]'
                itemName={'inputRunNumber'}
                rules={[
                  requiredRule('เลขที่ธนาณัติเริ่มต้น'),
                  onlyNumberRule('เลขที่ธนาณัติเริ่มต้น'),
                  {
                    validator: (_: unknown, value: string): Promise<void> => {
                      const numberValue = Number(value);
                      if (isNaN(numberValue) || numberValue <= 0) {
                        return Promise.reject(new Error('เลขที่ธนาณัติเริ่มต้นต้อง > 0'));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <BaseButton
                id={`${dataTestId}-runNumber-button`}
                size='middle'
                className='!min-w-[240px]'
                icon={<NumberedListRight />}
                label='รันเลขธนาณัติ'
                onClick={() => formRunNumber.submit()}
              />
            </div>
          </BaseForm>
        </>
      );

    return (
      <BaseButton
        size='middle'
        className='!min-w-[240px]'
        icon={<PlusOutlined />}
        label='เพิ่มธนาณัติ'
        onClick={() => {
          void handleAdd();
        }}
      />
    );
  };

  if (form.getFieldValue(itemName) === undefined) {
    return (
      <div className={`h-[280px] bg-white ${!isNotShadow && 'shadow-sm'} rounded-xl flex justify-center items-center`}>
        <SpinLoading />
      </div>
    );
  }

  return (
    <>
      <div className={`w-full flex flex-col p-6 bg-white ${!isNotShadow && 'shadow-sm'}  rounded-xl`}>
        <TableListLayout
          headTableContent={headTableContent()}
          textHeader={headerTitle}
          totalItems={dataSource.length}
          type='form'
          firstLoading={dataSource.length === 0}
          emptyText='โปรดระบุข้อมูลธนาณัติ'
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
