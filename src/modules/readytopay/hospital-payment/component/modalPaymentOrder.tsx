import React, { useState, useEffect, useMemo } from 'react';
import { BaseButton, BaseDialog, BaseForm, BaseItemDropdown, BaseItemInput } from 'wcf-component-lib/src/components';
import ModalTable from '@/modules/readytopay/hospital-payment/component/modalTable';
import { Col, Row, Form, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
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
  ReadyToPayDataType,
  GetFilterListServiceType,
} from '@/store-redux/slices/readytopay/hospital-payment';
import { PayType } from '@/types/payType';
import { PayloadAction } from '@reduxjs/toolkit';

interface Props {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  dataTestId: string;
  tabActive: PayType;
  data: ReadyToPayDataType[];
  setData: (data: ReadyToPayDataType[]) => void;
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
  const [filterResult, setFilterResult] = useState<ReadyToPayDataType[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);
  const [submitSearch, setSubmitSearch] = useState<boolean>(false);

  useEffect(() => {
    //case ถ้ามีการเลือกข้อมมูลรายการธนาคารมาอย่างน้อย 1 รายการ จะดึงข้อมูลตัวแรกมาตั้งค่า filter
    if (tabActive === 'T' && data.length > 0) {
      const bankCode = data[0].bank?.code;

      form.setFieldValue('bankCode', bankCode);
      setFilter(() => {
        return {
          ...filter,
          bankCode: bankCode,
        };
      });
    }
  }, [data, form, tabActive, filter]);

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
      paymentNo: values.paymentNo,
      accidentIssueCode: values.accidentIssueCode,
      hospitalName: values.hospitalName,
      bankCode: values.bankCode,
      fullName: values.fullName,
      employeeCitizenId: values.employeeCitizenId,
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
                        <p className='text-label mb-2 text-left'>เลขที่ใบสั่งจ่าย</p>
                        <div className='flex justify-between items-center gap-4'>
                          <BaseItemInput
                            id={`${dataTestId}-paymentNo-input-text`}
                            itemName={['paymentNo', 'start']}
                            placeholder='ระบุเลขเริ่มต้น'
                            rules={[
                              minRule('เลขที่ใบสั่งจ่าย', 15),
                              maxRule('เลขที่ใบสั่งจ่าย', 15),
                              ({
                                getFieldValue,
                              }: {
                                getFieldValue: (name: string | (string | number)[]) => string;
                              }): { validator(_: unknown, value: string): Promise<void> } => ({
                                validator(_: unknown, value: string): Promise<void> {
                                  if (!value && getFieldValue('paymentNo') && getFieldValue(['paymentNo', 'end'])) {
                                    return Promise.reject(
                                      new Error('โปรดระบุข้อมูล เลขที่ใบสั่งจ่าย เริ่ม - สิ้นสุด ให้ครบถ้วน'),
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          />
                          <div className='mb-[23px]'>ถึง</div>
                          <BaseItemInput
                            id={`${dataTestId}-paymentNo-input-text`}
                            itemName={['paymentNo', 'end']}
                            placeholder='สิ้นสุด'
                            rules={[
                              minRule('เลขที่ใบสั่งจ่าย', 15),
                              maxRule('เลขที่ใบสั่งจ่าย', 15),
                              ({
                                getFieldValue,
                              }: {
                                getFieldValue: (name: string | (string | number)[]) => string;
                              }): { validator(_: unknown, value: string): Promise<void> } => ({
                                validator(_: unknown, value: string): Promise<void> {
                                  if (!value && getFieldValue('paymentNo') && getFieldValue(['paymentNo', 'start'])) {
                                    return Promise.reject(
                                      new Error('โปรดระบุข้อมูล เลขที่ใบสั่งจ่าย เริ่ม - สิ้นสุด ให้ครบถ้วน'),
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          />
                        </div>
                      </Col>

                      <Col {...searchColumn}>
                        <BaseItemInput
                          label='เลขประสบอันตราย'
                          itemName='accidentIssueCode'
                          placeholder='ระบุเลขประสบอันตราย'
                          rules={[
                            onlyNumberRule('เลขประสบอันตราย'),
                            minRule('เลขประสบอันตราย', 13),
                            maxRule('เลขประสบอันตราย', 13),
                          ]}
                        />
                      </Col>
                      <Col lg={12} xl={12}>
                        <BaseItemDropdown
                          id={`${dataTestId}-hospitalName-selecter`}
                          className='text-left'
                          label='ชื่อโรงพยาบาล'
                          itemName='hospitalName'
                          placeholder='ค้นหาชื่อ หรือ รหัสโรงพยาบาล'
                          option={[]}
                          disabled={data.length > 0}
                          // rules={[requiredRule('ชื่อโรงพยาบาล')]}
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemDropdown
                          label='ธนาคาร'
                          itemName='bankCode'
                          className='text-left'
                          placeholder='เลือกธนาคาร'
                          id={`${dataTestId}-bankCode-selecter`}
                          option={bankSelectData}
                          loading={loadingBankData}
                          disabled={tabActive !== 'T' || data.length > 0}
                          rules={['T'].includes(tabActive) ? [requiredRule('ธนาคาร')] : []} // เพิ่ม rules เฉพาะ tab ที่กำหนด
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemInput label='ชื่อ - นามสกุล' itemName='fullName' placeholder='ระบุชื่อ - นามสกุล' />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemInput
                          label='เลขบัตรประชาชน'
                          itemName='employeeCitizenId'
                          placeholder='เลขบัตรประชาชน'
                          rules={[
                            onlyNumberRule('เลขบัตรประชาชน'),
                            maxRule('เลขบัตรประชาชน', 13),
                            minRule('เลขบัตรประชาชน', 13),
                          ]}
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <div className='grid place-items-end h-20'>
                          <BaseButton
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
