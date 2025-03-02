'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Table, Form, Input } from 'wcf-component-lib/node_modules/antd';
import { formatCurrency } from '@/utils/formatGeneral';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { URL } from '@/constants/configPage';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import {
  receiptManualTaxDeliverSelector,
  getReceiptManualTaxDeliverDetailService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/receipt-manual/tax-deliver';
import CardPreparePay from '@/components/common/cardPreparePay';
import CardCash from '@/components/common/cardCash';
import { TableChequeType } from '@/components/common/tableCheque';
import { useSelector } from 'react-redux';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';
import { PayloadAction } from '@reduxjs/toolkit';
import { PopUpHistory } from '@/modules/test-component/popUpHistory';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import CardConsider from '@/modules/receipt-manual/component/cardConsider';
import CardTableBank from '@/components/common/cardTableBank';
import CardDropDown from '@/components/dropdownButton/cardDropDown';
import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import CardCheque from '@/components/common/cardCheque';

interface FormType {
  receiveType: string;
  receiveName: string;
  iddentityDocument: string;
  identityNo: string;
  receiveAddress: string;
  referenceDocument: string;
  referenceNo: string;
  cheques: TableChequeType[];
}

export default function PaymentBankForm(): React.ReactElement {
  const dataTestId = 'pageReceiptTaxDeliverForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(receiptManualTaxDeliverSelector);
  const [form] = Form.useForm();
  // const [formCheque] = Form.useForm();
  // const [editCheque, setEditCheque] = useState(false);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState('');
  // const [dataEditChequeOld, setDataEditChequeOld] = useState<TableChequeType[]>([]);

  const {
    stateLayout: { user },
  } = useLayout();

  useEffect(() => {
    if (!id || !user) return;
    // Call API Thunks
    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getReceiptManualTaxDeliverDetailService(id))) as PayloadAction<PageFormType>;

      const newPageForm = {
        ...pageForm,
        ...payload,
      };
      if (JSON.stringify(newPageForm) !== JSON.stringify(pageForm)) {
        void dispatch(setPageForm(newPageForm));
      }
    };

    void fetchData();
  }, [dispatch, id, user, pageForm]);

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
    {
      title: 'ระบุเลขที่ใบสำคัญรับเงินชนิดเล่ม',
      key: 'significantHandNo',
      dataIndex: 'significantHandNo',
      align: 'center',
      render: (text: string, record: any): React.ReactElement => {
        return (
          <Input
            value={text}  // ใช้ค่า text ที่ได้จาก dataIndex
            onChange={() => {}}  // ฟังก์ชัน onChange ว่าง
            placeholder="ระบุเลขที่ใบสำคัญรับเงินชนิดเล่ม"  // เพิ่ม placeholder
            style={{ width: '100%', textAlign: 'center' }}
          />
        );
      },
    }
  ];

  const dataCardPreparePay = useMemo(() => {
    return {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || 'X',
    };
  }, [pageForm.cardPreparePay]);

  const dataCardConsider = useMemo(() => {
    if (!user) return;

    return {
      ...pageForm.cardConsider,
      payer: `${user.firstName} ${user.lastName}`,
      status: '-',
      payDate: pageForm.cardConsider?.payDate || '',
    };
  }, [pageForm.cardConsider, user]);

  const dataTableList = useMemo(() => {
    return pageForm.tableList;
  }, [pageForm.tableList]);

  const initialValuesForm = useMemo(() => {
        const cheques = pageForm.cheques.map((item) => {
          return {
            id: item.id,
            chequeNo: item.chequeNo,
            amount: item.amount,
            bankCode: item.bankCode,
            chequeStampDate: item.chequeStampDate,
            bankBranchCode: '',
            mode: 'view',
          };
        });
    
        return {
          // ...pageForm.cardConsider,
          cheques,
        };
      }, [pageForm]);
  
  // //when editCheque
  // useEffect(() => {
  //   let dataCurrentForm: FormType = form.getFieldsValue() as FormType;
  //   //save old data for reset case cancel
  //   if (editCheque) {
  //     const cheques = Array.isArray(dataCurrentForm.cheques) ? dataCurrentForm.cheques : [];
  //     setDataEditChequeOld(cheques);
  //   }

  //   const cheques: TableChequeType[] =
  //     (Array.isArray(dataCurrentForm.cheques) &&
  //       dataCurrentForm.cheques.map((item: TableChequeType) => {
  //         return {
  //           id: item.id,
  //           chequeNo: item.chequeNo,
  //           amount: item.amount,
  //           bankCode: item.bankCode,
  //           chequeStampDate: item.chequeStampDate,
  //           bankBranchCode: '',
  //           mode: editCheque ? 'edit' : 'view',
  //         };
  //       })) ||
  //     [];

  //   if (Array.isArray(dataCurrentForm.cheques)) {
  //     dataCurrentForm = { ...dataCurrentForm, cheques } as FormType;
  //   }

  //   //set data to form
  //   form.setFieldsValue(dataCurrentForm);
  // }, [editCheque, form]);

  // const handleUpdateCheque = (): void => {
  //   const dataCurrentForm = form.getFieldsValue() as FormType;
  //   //set data to form
  //   form.setFieldsValue(dataCurrentForm);
  //   setEditCheque(false);
  // };

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(`${URL.receiptManual.receiptManualTaxDeliverPaymentBankDetail.url}?id=1`);

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };

  const onSubmit = (values: FormType): void => {
    console.log('onSubmit :>> ', values);
    setIsOpenConfirmSave(true);
  };

  const dataHistory = useMemo(() => {
      console.log('keyTableHistory :>> ', keyTableHistory);
      if (keyTableHistory === 'historyPreparePay') {
        return pageForm.historyPreparePay;
      }
      if (keyTableHistory === 'historyOrderPayment') {
        return pageForm.historyOrderPayment;
      }
      if (keyTableHistory === 'historyCheques') {
        return pageForm.historyCheques;
      }
      if (keyTableHistory === 'historyMoneys') {
        return pageForm.historyMoneys;
      }
  
      return [];
    }, [pageForm, keyTableHistory]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

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
      <BaseForm name='paymentBankForm' initialValues={initialValuesForm} extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          {dataCardConsider && <CardConsider dataTestId={dataTestId} data={dataCardConsider} />}

          <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-xl'>
            <CardPreparePay isNotShadow dataTestId={dataTestId} data={dataCardPreparePay} />
            <div className='mb-6'>
              <BaseButton
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไข'
                type='outline'
                onClick={() => {
                  setIsOpenHistoryModal(true);
                  setTitleHistoryModal('ประวัติการแก้ไข');
                  setKeyTableHistory('historyPreparePay');
                }}
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
                        <Table.Summary.Cell index={0} colSpan={1} className=''>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={0} colSpan={1} className='rounded-br-xl'>
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
                onClick={() => {
                  setIsOpenHistoryModal(true);
                  setTitleHistoryModal('ประวัติการแก้ไขใบสั่งจ่าย');
                  setKeyTableHistory('historyOrderPayment');
                }}
              />
            </div>
          </div>

          {pageForm.banks && (
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='-m-6'>
                <CardTableBank isNotShadow dataTestId={dataTestId} data={pageForm.banks} />
              </div>
              <div className='flex justify-center gap-4 mt-6'>
                <BaseButton
                  icon={<ClockRotateRight />}
                  size='large'
                  label='ประวัติการแก้ไขธนาคาร'
                  type='outline'
                  onClick={() => {
                    setIsOpenHistoryModal(true);
                    setTitleHistoryModal('ประวัติการแก้ไขธนาคาร');
                    setKeyTableHistory('historyBanks');
                  }}
                />
              </div>
            </div>
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
                  onClick={() => {
                    setIsOpenHistoryModal(true);
                    setTitleHistoryModal('ประวัติการแก้ไขเช็ค');
                    setKeyTableHistory('historyCheques');
                  }}
                />
              </div>
            </div>
          )}

          {!pageForm.isCheque && <CardCash dataTestId={dataTestId} cash={pageForm.cash} />}

          <div className='flex justify-center gap-4'>
            <BaseButton
              size='large'
              type='cancel'
              label='ย้อนกลับ'
              className='w-[240px]'
              onClick={() => router.push(URL.receiptManual.receiptManualTaxDeliverPayment.url)}
            />
            {pageForm.isCheque && (   
            <CardDropDown menuItems={menuItems} onMenuClick={handleMenuClick} />
            )}
            <BaseButton
              size='large'
              type='primary'
              label='ตัดจ่าย'
              className='w-[240px]'
              onClick={() => form.submit()}
            />
          </div>
        </div>
      </BaseForm>

      <PopUpConfirmSave
        isOpen={isOpenConfirmSave}
        setIsOpen={setIsOpenConfirmSave}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />

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
