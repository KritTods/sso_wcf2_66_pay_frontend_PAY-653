'use client';
import CardAddress from '@/components/common/cardAddress';
import CardCash from '@/components/common/cardCash';
import CardConsider from '@/components/common/cardConsider';
import CardDetailTax from '@/components/common/cardDetailTax';
import CardPreparePay from '@/components/common/cardPreparePay';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import { URL } from '@/constants/configPage';
import { PopUpHistory } from '@/components/common';
import {
  cutOffPaymentHospitalSelector,
  getHospitalFormService,
  PageFormType,
  setPageForm,
} from '@/store-redux/slices/cutOffPayment/hospital-payment';
import { useAppDispatch } from '@/store-redux/store';
import { BaseKeyTableHistory, KeyTableHistory } from '@/types/keyTableHistory';
import { formatCurrency } from '@/utils/formatGeneral';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Table } from 'wcf-component-lib/node_modules/antd';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import { BaseButton, BaseForm, BaseLoading, BaseToastNotification } from 'wcf-component-lib/src/components';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';

interface FormType {
  receiveType: string;
  receiveName: string;
  identityDocument: string;
  identityNo: string;
  receiveAddress: string;
  referenceDocument: string;
  referenceNo: string;
  cheques: TableChequeType[];
}

export default function PaymentChequeForm(): React.ReactElement {
  const dataTestId = 'pageCutOffPaymentHospitalChequeForm';
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageForm } = useSelector(cutOffPaymentHospitalSelector);
  const [form] = Form.useForm();
  const [editCheque, setEditCheque] = useState(false);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();
  const [dataEditChequeOld, setDataEditChequeOld] = useState<TableChequeType[]>([]);

  const {
    stateLayout: { user },
  } = useLayout();

  useEffect(() => {
    if (!id || !user) return;
    // Call API Thunks
    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(getHospitalFormService(id))) as PayloadAction<PageFormType>;

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
      title: 'เลขที่ใบสั่งจ่าย',
      key: 'paymentNo',
      dataIndex: 'paymentNo',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้มีสิทธิ์',
      key: 'hospitalName',
      dataIndex: 'hospitalName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'เลขประสบอันตราย',
      key: 'accidentIssueCode',
      dataIndex: 'accidentIssueCode',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'เลขบัตรประชาชน',
      key: 'employeeCitizenId',
      dataIndex: 'employeeCitizenId',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-center'>{text}</span>;
      },
    },
    {
      title: 'ผู้ประสบอันตราย',
      key: 'receiverName',
      dataIndex: 'receiverName',
      align: 'center',
      render: (text: string): React.ReactElement => {
        return <span className='w-full flex justify-start'>{text}</span>;
      },
    },
    {
      title: 'จำนวนเงิน',
      key: 'amount',
      dataIndex: 'amount',
      align: 'center',
      render: (text: number): React.ReactElement => {
        return <span className='w-full flex justify-end'>{formatCurrency(text)}</span>;
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

  const dataCardConsider = useMemo(() => {
    if (!user) return;

    return {
      payDate: pageForm.cardConsider?.payDate || '',
      payer: `${user.firstName} ${user.lastName}`,
      status: '-',
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

  //when editCheque
  useEffect(() => {
    let dataCurrentForm: FormType = form.getFieldsValue() as FormType;
    //save old data for reset case cancel
    if (editCheque) {
      const cheques = Array.isArray(dataCurrentForm.cheques) ? dataCurrentForm.cheques : [];
      setDataEditChequeOld(cheques);
    }

    const cheques: TableChequeType[] =
      (Array.isArray(dataCurrentForm.cheques) &&
        dataCurrentForm.cheques.map((item: TableChequeType) => {
          return {
            id: item.id,
            chequeNo: item.chequeNo,
            amount: item.amount,
            bankCode: item.bankCode,
            chequeStampDate: item.chequeStampDate,
            bankBranchCode: '',
            mode: editCheque ? 'edit' : 'view',
          };
        })) ||
      [];

    if (Array.isArray(dataCurrentForm.cheques)) {
      dataCurrentForm = { ...dataCurrentForm, cheques } as FormType;
    }

    //set data to form
    form.setFieldsValue(dataCurrentForm);
  }, [editCheque, form]);

  const handleUpdateCheque = (): void => {
    const dataCurrentForm = form.getFieldsValue() as FormType;
    //set data to form
    form.setFieldsValue(dataCurrentForm);
    setEditCheque(false);
  };

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    router.push(`${URL.cutOffPayment.cutOffHospitalPaymentChequeDetail.url}?id=1`);

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };

  const onSubmit = (): void => {
    console.log('onSubmit :>> ');
    setIsOpenConfirmSave(true);
  };

  const dataHistory = useMemo(() => {
    if (!keyTableHistory) return [];

    return pageForm[keyTableHistory] || [];
  }, [pageForm, keyTableHistory]);

  const dataCardTax = useMemo(() => {
    return {
      taxHotpitalName: pageForm.taxHotpitalName,
      taxAmount: pageForm.taxAmount,
      taxPercent: pageForm.taxPercent,
      taxAmountAfterCalTax: pageForm.taxAmountAfterCalTax,
      taxTotalAmountAfterCalTax: pageForm.taxTotalAmountAfterCalTax,
    };
  }, [pageForm]);

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
      <BaseForm name='paymentChequeForm' initialValues={initialValuesForm} extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          {dataCardConsider && <CardConsider dataTestId={dataTestId} data={dataCardConsider} />}

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
                  rowKey='documentNo'
                  columns={columns}
                  rows={dataTableList}
                  bordered
                  summary={() => {
                    const sumAmount = dataTableList.reduce((prev, curr) => prev + curr.amount, 0);

                    return (
                      <Table.Summary.Row className='bg-gray-200'>
                        <Table.Summary.Cell index={0} colSpan={6} className='rounded-bl-xl'>
                          <p className='text-lg font-bold text-right mx-4'>รวม</p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={1} className='rounded-br-xl'>
                          <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
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
              {form && (
                <div className='bg-white rounded-xl -m-6'>
                  <Form.List name='cheques'>
                    {(_, { add, remove }) => {
                      return (
                        <>
                          <TableCheque
                            isNotShadow
                            itemName='cheques'
                            form={form}
                            add={add}
                            remove={remove}
                            mode={editCheque ? 'edit' : 'view'}
                            dataTestId={dataTestId}
                            hideButtonAdd
                          />
                        </>
                      );
                    }}
                  </Form.List>
                </div>
              )}
              <div className='flex justify-center gap-4 mt-6'>
                {editCheque ? (
                  <>
                    <BaseButton
                      size='large'
                      label='ยกเลิกการแก้ไขเช็ค'
                      type='cancel'
                      onClick={() => {
                        setEditCheque(false);
                        //when cancel reset data to old data from dataEditChequeOld
                        form.setFieldsValue({ cheques: dataEditChequeOld });
                      }}
                    />
                    <BaseButton
                      size='large'
                      label='บันทึกการแก้ไขเช็ค'
                      type='primary'
                      onClick={() => handleUpdateCheque()}
                    />
                  </>
                ) : (
                  <>
                    <BaseButton
                      icon={<ClockRotateRight />}
                      size='large'
                      label='ประวัติการแก้ไขเช็ค'
                      type='outline'
                      onClick={() =>
                        openHistoryModal(BaseKeyTableHistory.HISTORY_CHEQUES, BaseKeyTableHistory.HISTORY_CHEQUES)
                      }
                    />
                    <BaseButton size='large' label='แก้ไขเช็ค' type='outline' onClick={() => setEditCheque(true)} />
                  </>
                )}
              </div>
            </div>
          )}

          {!pageForm.isCheque && <CardCash dataTestId={dataTestId} cash={pageForm.cash} />}

          <CardDetailTax dataTestId={dataTestId} data={dataCardTax} mode={'view'} />

          <div className='flex justify-center gap-4'>
            <BaseButton
              size='large'
              type='cancel'
              label='ยกเลิก'
              className='w-[240px]'
              onClick={() => router.push(URL.cutOffPayment.cutOffHospitalPayment.url)}
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
