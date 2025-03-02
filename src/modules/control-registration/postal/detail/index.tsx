'use client';
import { URL } from '@/constants/configPage';
import { PrinterOutlined } from '@ant-design/icons';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Table } from 'wcf-component-lib/node_modules/antd';
import { ClockRotateRight } from 'wcf-component-lib/node_modules/iconoir-react';
import CardConsiderDetail from '@/components/common/cardConsider';
import CardPreparePay, { CardPrepareType } from '@/components/common/cardPreparePay';
import PopUpConfirmSave from '@/components/common/popUps/popUpConfirmSave';
import { PopUpHistory } from '@/components/common/popUps/popUpHistory';
import TableCheque, { TableChequeType } from '@/components/common/tableCheque';
import TableMoney, { CUSTOM_DISPLAY_TABLE_MONEY, TableMoneyType } from '@/components/common/tableMoney';
import {
  ResultFilterType,
  controlRegistrationPostalSelector,
  getControlRegistrationPostalDetailService,
  PageFormType,
  setPageForm,
  updateControlRegistrationChequeService,
  updateControlRegistrationMoneysService,
} from '@/store-redux/slices/control-registration/postal';
import { useAppDispatch } from '@/store-redux/store';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';
import { BaseForm, BaseToastNotification } from 'wcf-component-lib/src/components';
import BaseButton from 'wcf-component-lib/src/components/BaseButton';
import BaseLoading from 'wcf-component-lib/src/components/BaseLoading';
import BaseGrid, { ColumnsTypeCustom } from 'wcf-component-lib/src/components/v2/BaseGrid';
import TableListLayout from 'wcf-component-lib/src/layout/TableListLayout';
import CardTableReceipt from '@/components/common/cardTableReceipt';
import CardTableWrongFundPayment, { WrongFundPaymentType } from '@/components/common/cardTableWrongFundPayment';

interface FormType {
  cheques: TableChequeType[];
  moneys: TableMoneyType[];
}

enum KeyTableHistory {
  HISTORY_PREPARE_PAY = 'historyPreparePay',
  HISTORY_ORDER_PAYMENT = 'historyOrderPayment',
  HISTORY_CHEQUES = 'historyCheques',
  HISTORY_MONEYS = 'historyMoneys',
}

export default function ControlRegistrationPostalDetail(): React.ReactElement {
  const dataTestId = 'pageControlRegistrationPostalDetail';
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const { loading, pageForm } = useSelector(controlRegistrationPostalSelector);
  const payType = pageForm.cardPreparePay?.payType;
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [titleHistoryModal, setTitleHistoryModal] = useState('ประวัติการแก้ไข');
  const [typeDataHistoryModal, settypeDataHistoryModal] = useState<'string' | 'number' | 'date'>();
  const [keyTableHistory, setKeyTableHistory] = useState<KeyTableHistory | undefined>();
  const [editCheque, setEditCheque] = useState(false);
  const [form] = Form.useForm();
  const [dataEditChequeOld, setDataEditChequeOld] = useState<TableChequeType[]>([]);
  const [isOpenConfirmSave, setIsOpenConfirmSave] = useState(false);
  // useRef to hold the current page detail to avoid unnecessary updates.
  const pageDetailRef = useRef<PageFormType>(pageForm);
  const [editMoney, setEditMoney] = useState(false);
  const [dataEditMoneyOld, setDataEditMoneyOld] = useState<TableMoneyType[]>([]);
  // Helper function to open history modal.
  const openHistoryModal = (title: string, key: KeyTableHistory, type: 'string' | 'number' | 'date'): void => {
    setTitleHistoryModal(title);
    setKeyTableHistory(key);
    setIsOpenHistoryModal(true);
    settypeDataHistoryModal(type);
  };

  // Fetch detail data when the page loads (or when id/pageForm changes).
  useEffect(() => {
    if (!id) return;

    const fetchData = async (): Promise<void> => {
      const { payload } = (await dispatch(
        getControlRegistrationPostalDetailService(id),
      )) as PayloadAction<PageFormType>;
      if (payload) {
        const newPageForm = { ...pageForm, ...payload };
        if (JSON.stringify(newPageForm) !== JSON.stringify(pageDetailRef.current)) {
          pageDetailRef.current = newPageForm;
          void dispatch(setPageForm(newPageForm));
        }
      }
    };

    void fetchData();
  }, [dispatch, id, pageForm]);

  const dataCardPreparePay = useMemo((): CardPrepareType => {
    if (!pageForm.cardPreparePay?.documentNo) {
      return {
        documentNo: '',
        paymentNo: '',
        paymentAgent: '',
        transactionDate: '',
        payType: undefined, // หรือใช้ค่าเริ่มต้นที่เหมาะสม
        bookNo: '',
        receiverName: '',
        paymentType: undefined,
        advancePaymentType: undefined,
        incorrectPaymentReason: undefined,
        employeeCitizenId: '',
        employeeName: '',
        accountNo: '',
        paymentRequest: '',
        amount: 0,
      };
    }

    return {
      documentNo: pageForm.cardPreparePay?.documentNo || '',
      paymentNo: pageForm.cardPreparePay?.paymentNo || '',
      paymentAgent: pageForm.cardPreparePay?.paymentAgent || '',
      transactionDate: pageForm.cardPreparePay?.transactionDate || '',
      payType: pageForm.cardPreparePay?.payType || undefined,
      bookNo: pageForm.cardPreparePay?.bookNo || '',
      receiverName: pageForm.cardPreparePay?.receiverName || '',
      paymentType: pageForm.cardPreparePay?.paymentType || undefined,
      advancePaymentType: pageForm.cardPreparePay?.advancePaymentType || undefined,
      incorrectPaymentReason: pageForm.cardPreparePay?.incorrectPaymentReason || undefined,
      employeeCitizenId: pageForm.cardPreparePay?.employeeCitizenId || '',
      employeeName: pageForm.cardPreparePay?.employeeName || '',
      accountNo: pageForm.cardPreparePay?.accountNo || '',
      paymentRequest: pageForm.cardPreparePay?.paymentRequest || '',
      amount: pageForm.cardPreparePay?.amount || undefined,
    };
  }, [pageForm.cardPreparePay]);

  // Memoizing the table list data.
  const dataTableList = useMemo(() => pageForm.tableList ?? [], [pageForm.tableList]);

  const dataHistory = useMemo(() => {
    if (!keyTableHistory) return [];

    return pageForm[keyTableHistory] || [];
  }, [pageForm, keyTableHistory]);

  // Table columns definition.
  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      align: 'center',
      width: 50,
      render: (_: string, __: unknown, index: number): React.ReactElement => (
        <span className='w-full flex justify-center'>{index + 1}</span>
      ),
    },
    ...(pageForm.paymentType === 'S1'
      ? [
          {
            title: 'รหัส สปส.',
            key: 'ssoCode',
            dataIndex: 'ssoCode',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    {
      title: 'เลขที่ใบสั่งจ่าย',
      dataIndex: 'paymentNo',
      align: 'center',
      render: (text: string): React.ReactElement => <span className='w-full flex justify-center'>{text}</span>,
    },
    ...(pageForm.paymentType === 'P1'
      ? [
          {
            title: 'สาเหตุการจ่ายผิด',
            key: 'incorrectPaymentReason',
            dataIndex: 'incorrectPaymentReason',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
          {
            title: 'จ่ายให้',
            key: 'paymentRequest',
            dataIndex: 'paymentRequest',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    ...(pageForm.paymentType === 'S1'
      ? [
          {
            title: 'เลขที่บัญชีนายจ้าง',
            key: 'accountNo',
            dataIndex: 'accountNo',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
          {
            title: 'จ่ายให้',
            key: 'accountName',
            dataIndex: 'accountName',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    ...(pageForm.paymentType === 'T13'
      ? [
          {
            title: 'ผู้มีสิทธิ์',
            key: 'hospitalName',
            dataIndex: 'hospitalName',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    ...(pageForm.paymentType === 'T1' || pageForm.paymentType === 'T13'
      ? [
          {
            title: 'เลขประสบอันตราย',
            dataIndex: 'accidentIssueCode',
            align: 'center',
            render: (text: string): React.ReactElement => <span className='w-full flex justify-center'>{text}</span>,
          },
          {
            title: 'เลขบัตรประชาชน',
            dataIndex: 'citizenId',
            align: 'center',
            render: (text: string): React.ReactElement => <span className='w-full flex justify-center'>{text}</span>,
          },
        ]
      : []),
    ...(pageForm.paymentType === 'T13'
      ? [
          {
            title: 'ผู้ประสบอันตราย',
            key: 'receiverName',
            dataIndex: 'receiverName',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    ...(pageForm.paymentType === 'T1'
      ? [
          {
            title: 'ลูกจ้าง/ผู้มีสิทธิ์',
            dataIndex: 'receiverName',
            align: 'center',
            render: (text: string): React.ReactElement => <span className='w-full flex justify-center'>{text}</span>,
          },
        ]
      : []),

    {
      title: 'จำนวนเงิน',
      dataIndex: 'amount',
      align: 'center',
      render: (text: number): React.ReactElement => (
        <span className='w-full flex justify-end'>{formatCurrency(Number(text))}</span>
      ),
    },
    ...(pageForm.paymentType === 'P1'
      ? [
          {
            title: 'วันที่',
            key: 'payDate',
            dataIndex: 'payDate',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{formatDayThai(text)}</span>;
            },
          },
        ]
      : []),
    ...(pageForm.paymentType === 'T13'
      ? [
          {
            title: 'เลขที่หนังสือรับรอง',
            key: 'hospitalNo',
            dataIndex: 'hospitalNo',
            align: 'center',
            render: (text: string): React.ReactElement => {
              return <span className='w-full flex justify-center'>{text}</span>;
            },
          },
        ]
      : []),
    {
      title: 'เลขที่ใบสำคัญรับเงิน/ชนิดเล่ม',
      key: 'significantCombined',
      dataIndex: ['significantNo', 'significantHandNo'], // ใช้ array เพื่อเข้าถึงทั้งสองค่า
      align: 'center',
      width: 250,
      render: (_: unknown, record: ResultFilterType): React.ReactElement => {
        const combinedText = [record.significantNo, record.significantHandNo]
          .filter(Boolean) // ลบค่าที่เป็น '', null, undefined
          .join(' / '); // ใช้ '/' เป็นตัวคั่น

        return (
          <span className='w-full flex justify-center'>
            {combinedText || '-'} {/* ถ้าไม่มีค่าให้แสดง "-" */}
          </span>
        );
      },
    },
  ];

  // Initial values for the form.
  const initialValuesForm = useMemo(() => {
    const cheques =
      pageForm.cheques?.map((item) => ({
        id: item.id,
        chequeNo: item.chequeNo,
        amount: item.amount,
        bankCode: item.bankCode,
        chequeStampDate: item.chequeStampDate,
        bankBranchCode: '',
        mode: 'view',
      })) ?? [];

    const moneys =
      pageForm.moneys?.map((item) => ({
        ...item,
        mode: 'view',
      })) ?? [];

    return { cheques, moneys };
  }, [pageForm]);

  const dataWrongFundPaymentList = useMemo(() => {
    // ตรวจสอบว่า pageForm.tableList มีค่าหรือไม่ และแปลงข้อมูลให้ตรงตามประเภทที่ต้องการ
    if (!pageForm.tableList) return [];

    return pageForm.tableList.map((item) => ({
      significantNo: item.significantNo || '',
      significantHandNo: item.significantHandNo || '',
      paymentNo: item.paymentNo || '',
      causesOfIncorrectPayment: item.incorrectPaymentReason || undefined,
      paymentRequest: item.paymentRequest || undefined,
      date: item.payDate || '', // ต้องมีค่าหรือ default เป็น '' หากไม่มีกำหนด
      amount: item.amount || 0, // กำหนดค่า default หากไม่มี
    })) as WrongFundPaymentType[];
  }, [pageForm.tableList]);

  const dataRecipts = useMemo(() => pageForm.recipts ?? [], [pageForm.recipts]);

  const handleConfirm = (): void => {
    // show notification success
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกตัดจ่าย',
      description: 'ทำรายการเสร็จสิ้น',
    });

    //TODO: update url
    router.push('');

    //close modal
    setIsOpenConfirmSave(false);
    form.resetFields();
  };

  // Form submit handler.
  const onSubmit = (values: FormType): void => {
    console.log('onSubmit :>> ', values);
    setIsOpenConfirmSave(true);
  };

  const handleUpdateMoney = async (): Promise<void> => {
    try {
      const dataCurrentForm = form.getFieldsValue() as FormType;
      const moneys = dataCurrentForm.moneys || [];

      await dispatch(
        updateControlRegistrationMoneysService({
          id: moneys[0].id,
          postalNo: moneys[0].postalNo,
        }),
      ).unwrap();
    } catch (error) {
      console.error('Error updating money:', error);
    }
    BaseToastNotification({
      type: 'success',
      message: 'บันทึกข้อมูลสำเร็จ',
      description: 'ทำรายการเสร็จสิ้น',
    });

    const dataCurrentForm = form.getFieldsValue() as FormType;
    form.setFieldsValue(dataCurrentForm);
    setEditMoney(false);
  };

  // When editing cheques, update form values with the correct mode and backup old data.
  useEffect(() => {
    const dataCurrentForm = form.getFieldsValue() as FormType;

    if (editCheque) {
      setDataEditChequeOld(dataCurrentForm.cheques || []);
    }

    if (editMoney) {
      const moneys = Array.isArray(dataCurrentForm.moneys) ? dataCurrentForm.moneys : [];
      setDataEditMoneyOld(moneys);
    }

    const updatedCheques = (dataCurrentForm.cheques || []).map((item) => ({
      ...item,
      bankBranchCode: '',
      mode: editCheque ? 'edit' : 'view',
    }));

    const updatedMoneys = (dataCurrentForm.moneys || []).map((item) => ({
      ...item,
      mode: editMoney ? 'custom' : 'view',
    }));

    form.setFieldsValue({ ...dataCurrentForm, cheques: updatedCheques, moneys: updatedMoneys });
  }, [editCheque, editMoney, form]);

  const handleUpdateCheque = async (): Promise<void> => {
    const dataCurrentForm = form.getFieldsValue() as FormType;

    if (!dataCurrentForm.cheques || dataCurrentForm.cheques.length === 0) {
      BaseToastNotification({
        type: 'error',
        message: 'ไม่พบข้อมูลเช็ค',
        description: 'กรุณาตรวจสอบข้อมูลเช็คก่อนทำการบันทึก',
      });

      return;
    }

    try {
      const response = await dispatch(
        updateControlRegistrationChequeService({
          id: dataCurrentForm.cheques[0].id,
          chequeNo: dataCurrentForm.cheques[0].chequeNo,
        }),
      ).unwrap();
      console.log('response', response.prepareToPayId);

      BaseToastNotification({
        type: 'success',
        message: response.message,
        description: 'การแก้ไขเช็คสำเร็จ',
      });
      setEditCheque(false);
    } catch (error) {
      console.error('Error updating cheque:', error);
      BaseToastNotification({
        type: 'error',
        message: 'การแก้ไขเช็คล้มเหลว',
        description: 'กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  // Render loading state.
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <BaseLoading size='default' />
      </div>
    );
  }

  // Render table summary (total amount).
  const renderTableSummary = (): React.ReactElement => {
    const sumAmount = dataTableList.reduce((total, curr) => total + curr.amount, 0);

    return (
      <Table.Summary.Row className='bg-gray-200'>
        <Table.Summary.Cell
          index={0}
          colSpan={
            pageForm.paymentType === 'T1' || pageForm.paymentType === 'S1' ? columns.length - 2 : columns.length - 3
          }
          className='rounded-bl-xl'
        >
          <p className='text-lg font-bold text-right mx-4'>รวม</p>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1} colSpan={1}>
          <p className='text-lg font-bold text-right'>{formatCurrency(sumAmount)}</p>
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={2}
          colSpan={
            pageForm.paymentType === 'T1' || pageForm.paymentType === 'S1' ? columns.length - 2 : columns.length - 3
          }
          className='rounded-br-xl'
        />
      </Table.Summary.Row>
    );
  };

  console.log('pageForm.paymentType', pageForm.paymentType);

  return (
    <>
      <BaseForm name='paymentOfficeForm' initialValues={initialValuesForm} extraForm={form} onFinish={onSubmit}>
        <div className='flex flex-col gap-4 mx-4 mb-6'>
          {pageForm.cardConsider && <CardConsiderDetail dataTestId={dataTestId} data={pageForm.cardConsider} />}

          {pageForm.cardPreparePay && (
            <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-xl'>
              <CardPreparePay dataTestId={dataTestId} data={dataCardPreparePay} isNotShadow />
              <BaseButton
                className='my-5'
                icon={<ClockRotateRight />}
                size='large'
                label='ประวัติการแก้ไขเตรียมจ่าย'
                type='outline'
                onClick={() =>
                  openHistoryModal('ประวัติการแก้ไขเตรียมจ่าย', KeyTableHistory.HISTORY_PREPARE_PAY, 'number')
                }
              />
            </div>
          )}

          {pageForm.paymentType !== 'E1' &&
            pageForm.paymentType !== 'B2' &&
            pageForm.paymentType !== 'TX' &&
            pageForm.cardPreparePay?.advancePaymentType !== 'FIN' &&
            pageForm.cardPreparePay?.advancePaymentType !== 'PAY' && (
              <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
                <TableListLayout
                  key={`${dataTestId}-cardTable`}
                  totalItems={dataTableList.length}
                  textHeader='รายการสั่งจ่าย'
                  type='form'
                  firstLoading={dataTableList.length === 0}
                  emptyText='ไม่พบข้อมูลรายการสั่งจ่าย'
                  Grid={
                    <BaseGrid
                      rowKey='id'
                      columns={columns as ColumnsTypeCustom}
                      rows={dataTableList}
                      bordered
                      summary={renderTableSummary}
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
                      openHistoryModal('ประวัติการแก้ไขใบสั่งจ่าย', KeyTableHistory.HISTORY_ORDER_PAYMENT, 'number')
                    }
                  />
                </div>
              </div>
            )}

          {pageForm.cardPreparePay?.advancePaymentType === 'FIN' && (
            <>
              <CardTableWrongFundPayment dataTestId={dataTestId} data={dataWrongFundPaymentList} />
              <CardTableReceipt dataTestId={dataTestId} data={dataRecipts} />
            </>
          )}

          {pageForm.isCheque &&
            pageForm.paymentType !== 'B2' && ( // ใช้ ? ป้องกัน undefined
              <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
                <div className='bg-white rounded-xl -m-6'>
                  <Form.List name='cheques'>
                    {(_, { add, remove }) => (
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
                    )}
                  </Form.List>
                </div>
                <div className='flex justify-center gap-4 mt-6'>
                  {editCheque ? (
                    <>
                      <BaseButton
                        size='large'
                        label='ยกเลิกการแก้ไขเช็ค'
                        type='cancel'
                        onClick={() => {
                          setEditCheque(false);
                          form.setFieldsValue({ cheques: dataEditChequeOld }); // Restore previously saved cheque data.
                        }}
                      />
                      <BaseButton
                        size='large'
                        label='บันทึกการแก้ไขเช็ค'
                        type='primary'
                        onClick={() => void handleUpdateCheque()}
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
                          openHistoryModal('ประวัติการแก้ไขเช็ค', KeyTableHistory.HISTORY_CHEQUES, 'string')
                        }
                      />
                      {pageForm.cardConsider?.status === 'จ่ายแล้ว' && (
                        <BaseButton size='large' label='แก้ไขเช็ค' type='outline' onClick={() => setEditCheque(true)} />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

          {pageForm.moneys && payType === 'P' && (
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              {form && (
                <div className='bg-white rounded-xl -m-6'>
                  <Form.List name='moneys'>
                    {(_, { add, remove }) => {
                      return (
                        <>
                          <TableMoney
                            dataTestId={dataTestId}
                            form={form}
                            add={add}
                            remove={remove}
                            itemName='moneys'
                            mode={editMoney ? 'edit' : 'view'}
                            customDisplayTable={{ ...CUSTOM_DISPLAY_TABLE_MONEY, postalNo: 'input' }}
                            isNotShadow
                            hideButtonAdd
                          />
                        </>
                      );
                    }}
                  </Form.List>
                </div>
              )}
              <div className='flex justify-center gap-4 mt-6'>
                {editMoney ? (
                  <>
                    <BaseButton
                      size='large'
                      label='ยกเลิกการแก้ไขธนาณัติ'
                      type='cancel'
                      onClick={() => {
                        setEditMoney(false);
                        //when cancel reset data to old data from dataEditMoneyOld
                        form.setFieldsValue({ moneys: dataEditMoneyOld });
                      }}
                    />
                    <BaseButton
                      size='large'
                      label='บันทึกการแก้ไขธนาณัติ'
                      type='primary'
                      onClick={() => void handleUpdateMoney()}
                    />
                  </>
                ) : (
                  <>
                    <BaseButton
                      icon={<ClockRotateRight />}
                      size='large'
                      label='ประวัติการแก้ไขธนาณัติ'
                      type='outline'
                      onClick={() =>
                        openHistoryModal('ประวัติการแก้ไขธนาณัติ', KeyTableHistory.HISTORY_MONEYS, 'string')
                      }
                    />
                    {pageForm.cardConsider?.status === 'จ่ายแล้ว' && (
                      <BaseButton size='large' label='แก้ไขธนาณัติ' type='outline' onClick={() => setEditMoney(true)} />
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div className='flex justify-center gap-4 mt-6'>
            <BaseButton
              size='large'
              label='ยกเลิก'
              type='cancel'
              className='w-[280px]'
              onClick={() => router.push(URL.controlRegistration.controlRegistrationPostal.url)}
            />

            <BaseButton
              size='large'
              label='พิมพ์หนังสือลงนามในเช็ค'
              icon={<PrinterOutlined />}
              className='w-[280px]'
              onClick={() => console.log('พิมพ์หนังสือลงนามในเช็ค')}
            />
            {(pageForm.paymentType === 'T1' || pageForm.paymentType === 'S1') && (
              <BaseButton
                size='large'
                label='พิมพ์หนังสือแจ้ง'
                icon={<PrinterOutlined />}
                className='w-[280px]'
                onClick={() => console.log('พิมพ์หนังสือแจ้ง')}
              />
            )}

            {pageForm.paymentType === 'TX' && (
              <BaseButton
                size='large'
                label='พิมพ์ ภงด. 53'
                icon={<PrinterOutlined />}
                className='w-[280px]'
                onClick={() => console.log('พิมพ์ ภงด. 53')}
              />
            )}
            <BaseButton
              size='large'
              label='พิมพ์ใบสำคัญรับเงิน'
              icon={<PrinterOutlined />}
              className='w-[280px]'
              onClick={() => console.log('พิมพ์ใบสำคัญรับเงิน')}
            />
          </div>
        </div>
      </BaseForm>
      {dataHistory && (
        <PopUpHistory
          dataTestId={dataTestId}
          isOpen={isOpenHistoryModal}
          setIsOpen={setIsOpenHistoryModal}
          titleTable={titleHistoryModal}
          handleCancel={() => setIsOpenHistoryModal(false)}
          typeData={typeDataHistoryModal ?? 'string'}
          align='center'
          data={dataHistory}
        />
      )}
      <PopUpConfirmSave
        isOpen={isOpenConfirmSave}
        setIsOpen={setIsOpenConfirmSave}
        dataTestId={dataTestId}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
