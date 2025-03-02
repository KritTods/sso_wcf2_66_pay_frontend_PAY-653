import React, { useState, useEffect, useMemo } from 'react';
import { BaseButton, BaseDialog, BaseForm, BaseItemDropdown, BaseItemInput } from 'wcf-component-lib/src/components';
import ModalTable from '@/modules/readytopay/refund-to-employer/component/modalTable';
import { Col, Row, Form, FormProps } from 'wcf-component-lib/node_modules/antd';
import { column12, searchColumn } from '@/constants/layoutColumn';
import { minRule, maxRule, requiredRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import { getBankList, bankSelector, BankItem } from '@/redux/slices/mdm/bank';
import { useSelector } from 'react-redux';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import {
  FilterSearchType,
  getFilterListService,
  initFilter,
  RefundToEmploerDataType,
  GetFilterListServiceType,
} from '@/store-redux/slices/readytopay/refund-to-employer';
import { PayType } from '@/types/payType';
import { PayloadAction } from '@reduxjs/toolkit';
import { useLayout } from 'wcf-component-lib/src/provider/LayoutProvider';

interface Props {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  dataTestId: string;
  tabActive: PayType;
  data: RefundToEmploerDataType[];
  setData: (data: RefundToEmploerDataType[]) => void;
}

export default function ModalPaymentOrder({
  tabActive,
  dataTestId,
  isOpenModal,
  setOpenModal,
  data,
  setData,
}: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [filter, setFilter] = useState<FilterSearchType>(initFilter);
  const [filterResult, setFilterResult] = useState<RefundToEmploerDataType[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [dataSelected, setDataSelected] = useState<RefundToEmploerDataType[]>([]);
  const [submitSearch, setSubmitSearch] = useState<boolean>(false);
  const {
    stateLayout: { branch },
  } = useLayout();

  useEffect(() => {
    //case ถ้ามีการเลือกข้อมมูลรายการธนาคารมาอย่างน้อย 1 รายการ จะดึงข้อมูลตัวแรกมาตั้งค่า filter
    if (tabActive === 'T' && data.length > 0) {
      const bankCode = data[0].bank.code;

      form.setFieldValue('bankCode', bankCode);
      const newData = {
        ...filter,
        bankCode: bankCode,
      };

      if (JSON.stringify(newData) !== JSON.stringify(filter)) {
        setFilter(newData);
      }
    }

    //case ส่งเช็คทางไปรษณีย์
    if (tabActive === 'S' && data.length > 0) {
      const employerAccountNumber = data[0].employerAccountNumber;
      form.setFieldValue('employerAccountNumber', employerAccountNumber);

      const newData = {
        ...filter,
        employerAccountNumber: employerAccountNumber,
      };
      if (JSON.stringify(newData) !== JSON.stringify(filter)) {
        setFilter(newData);
      }
    }

    //first load set ssoCode from user login branch
    if (!branch) return;
    form.setFieldsValue({ ssoCode: branch });
  }, [data, form, tabActive, filter, branch]);

  const { list: bankList, loading: loadingBankData } = useSelector(bankSelector);
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

  useEffect(() => {
    if (!submitSearch) return;

    const fetchData = async (): Promise<void> => {
      // อัปเดทข้อมูล filter ที่เป็น tab ที่เลือก
      const updatedFilter = { ...filter, paymentType: tabActive };
      const resFilter = (await dispatch(
        getFilterListService(updatedFilter),
      )) as PayloadAction<GetFilterListServiceType>;
      if (resFilter) {
        setFilterResult(resFilter.payload.content);
        setTotalElements(resFilter.payload.totalElements);
      }
    };

    void fetchData();
  }, [filter, dispatch, tabActive, submitSearch]);

  const handleConfirmCreateModal = (): void => {
    //close modal
    setOpenModal(false);
    //initFilter
    setFilter(initFilter);
    //update dataSelected
    setData(dataSelected);
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    // เมื่อกดค้นหา จะ set submitSearch เป็น true เพื่อดึงข้อมูลใหม่
    setSubmitSearch(true);

    // สร้าง object สำหรับค้นหา
    const searchObj = {
      ssoCode: values.ssoCode,
      paymentNo: values.paymentNo,
      employerAccountNumber: values.employerAccountNumber,
      branchSequence: values.branchSequence, //values.payDate ? dayjs(values.payDate[0]).format('YYYY-MM-DD') : '',
      companyName: values.companyName,
      bankCode: values.bankCode,
      paymentType: tabActive,
      operation: 'AND',
      pagination: {
        pageNumber: filter.pagination.pageNumber,
        pageSize: filter.pagination.pageSize,
        orders: undefined,
      },
    };
    //updata filter state
    setFilter(searchObj);
  };

  return (
    <>
      <BaseDialog
        width='1500px'
        isOpen={isOpenModal}
        setIsOpen={setOpenModal}
        headerContent={<p className='page-title pt-4 text-left'>เพิ่มรายการใบสั่งจ่าย</p>}
        contentCenter={true}
        content={
          <>
            <BaseForm name='filter' extraForm={form} onFinish={onFinish} initialValues={{ filter }}>
              <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
                <div className='w-full'>
                  <div className='flex flex-col gap-4'>
                    <Row gutter={[16, 16]}>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          id={`${dataTestId}-ssoCode-input-text`}
                          itemName='ssoCode'
                          label='รหัส สปส.'
                          placeholder='ระบุรหัส สปส.'
                          disabled
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          id={`${dataTestId}-paymentNo-input-text`}
                          label='เลขที่ใบสั่งจ่าย'
                          itemName='paymentNo'
                          placeholder='ระบุเลขที่ใบสั่งจ่าย'
                          rules={[minRule('เลขที่ใบสั่งจ่าย', 15), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          id={`${dataTestId}-employerAccountNumber-input-text`}
                          label='เลขที่บัญชีนายจ้าง'
                          itemName='employerAccountNumber'
                          placeholder='ระบุเลขที่บัญชีนายจ้าง'
                          disabled={tabActive === 'S' && data.length > 0}
                          rules={
                            ['S'].includes(tabActive)
                              ? [
                                  requiredRule('เลขที่บัญชีนายจ้าง'),
                                  onlyNumberRule('เลขที่บัญชีนายจ้าง'),
                                  minRule('เลขที่บัญชีนายจ้าง', 10),
                                  maxRule('เลขที่บัญชีนายจ้าง', 10),
                                ]
                              : [
                                  onlyNumberRule('เลขที่บัญชีนายจ้าง'),
                                  minRule('เลขที่บัญชีนายจ้าง', 10),
                                  maxRule('เลขที่บัญชีนายจ้าง', 10),
                                ]
                          }
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          id={`${dataTestId}-branchSequence-input-text`}
                          label='ลำดับที่สาขา'
                          itemName='branchSequence'
                          placeholder='ระบุลำดับที่สาขา'
                          rules={[
                            onlyNumberRule('ลำดับที่สาขา'),
                            minRule('ลำดับที่สาขา', 4),
                            maxRule('ลำดับที่สาขา', 4),
                          ]}
                        />
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          id={`${dataTestId}-companyName-input-text`}
                          label='ชื่อสถานประกอบการ'
                          itemName='companyName'
                          placeholder='ระบุชื่อสถานประกอบการ'
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemDropdown
                          id={`${dataTestId}-bankCode-selecter`}
                          label='ธนาคาร'
                          itemName='bankCode'
                          placeholder='เลือกธนาคาร'
                          className='text-center'
                          rules={tabActive === 'T' ? [requiredRule('ธนาคาร')] : []}
                          loading={loadingBankData}
                          disabled={tabActive !== 'T' || data.length > 0}
                          option={bankSelectData}
                        />
                      </Col>
                      <Col {...column12}>
                        <div className='grid place-items-end h-20'>
                          <BaseButton
                            id={`${dataTestId}-search-button`}
                            className='!min-w-[200px]'
                            size='middle'
                            icon={<SearchOutlined />}
                            htmlType='submit'
                            label={'ค้นหา'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </BaseForm>

            <ModalTable
              filter={filter}
              setFilter={(filter) => {
                setFilter(filter);
              }}
              totalElements={totalElements}
              dataTestId={dataTestId}
              tabActive={tabActive}
              filterResult={filterResult}
              dataCurrent={data}
              callBackDataSelected={(data) => {
                setDataSelected(data);
              }}
            />
          </>
        }
        footer={
          <div className='flex justify-center gap-4'>
            <BaseButton size='large' type='cancel' label='ยกเลิก' onClick={() => setOpenModal(false)} />
            <BaseButton size='large' label='ยืนยัน' onClick={handleConfirmCreateModal} />
          </div>
        }
      />
    </>
  );
}
