'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  BaseButton,
  BaseDialog,
  BaseForm,
  BaseItemDateRangePicker,
  BaseItemDropdown,
  BaseItemInput,
} from 'wcf-component-lib/src/components';
import ModalTable from '@/modules/readytopay/doctor-salary/component/modalTable';
import { Col, Row, Radio, FormProps, RadioChangeEvent } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { minRule, maxRule, onlyNumberRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import { useSelector } from 'react-redux';
import {
  readyToPayDoctorSalarySelector,
  FilterSearchType,
  ReadyToPayDataType,
  initialFilter,
  getDoctorSalalyListService,
  GetFilterListServiceType,
  setPagePaymentForm,
} from '@/store-redux/slices/readytopay/doctor-salary';
import { PayloadAction } from '@reduxjs/toolkit';
import { PayType } from '@/types/payType';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';

interface DataProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  dataTestId: string;
  tabActive: PayType;
}

export default function ModalPaymentOrder({
  tabActive,
  dataTestId,
  isOpenModal,
  setOpenModal,
}: DataProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(readyToPayDoctorSalarySelector);
  const [filterModal, setFilterModal] = useState<FilterSearchType>(filter || initialFilter);
  const [valueRadio, setValueRadio] = useState<string | number>(filter.payToCode || '1');
  const [filterResult, setFilterResult] = useState<ReadyToPayDataType[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const { pageDoctorSalalyForm } = useSelector(readyToPayDoctorSalarySelector);
  const [dataSelected, setDataSelected] = useState<ReadyToPayDataType[]>([]);

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

  //ดึงค่าจาก api ลง state
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resFilter = (await dispatch(
        getDoctorSalalyListService(filterModal),
      )) as PayloadAction<GetFilterListServiceType>;
      console.log('resFilter', resFilter);

      if (resFilter) {
        setFilterResult(resFilter.payload.content as ReadyToPayDataType[]);
        setTotalElements(resFilter.payload.totalElements);
      }
    };

    void fetchData();
  }, [dispatch, filterModal]);

  const handleConfirmCreateModal = (): void => {
    //close modal
    setOpenModal(false);
    //initFilter
    setFilterModal(initialFilter);
    //update dataSelected to slice pageForm.tableList
    void dispatch(setPagePaymentForm({ ...pageDoctorSalalyForm, selectList: dataSelected }));
  };

  const onChangeRadio = (e: RadioChangeEvent): void => {
    const value = e.target.value as string | number; // Explicitly cast the value type
    //console.log('radio checked', value);
    setValueRadio(value);
  };

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    console.log('values', values, valueRadio, tabActive);
    //TODO: Update object to match the type of the object (fix build error)
    
    // const searchObj = {
    //   paymentNo: values.paymentNo,
    //   payToCode: valueRadio,
    //   payType: tabActive,
    //   accidentIssueCode: values.accidentIssueCode,
    //   // startDate: values?.date ? dayjs(values.date[0]).format('YYYY-MM-DD') : '',
    //   // endDate: values?.date ? dayjs(values.date[1]).format('YYYY-MM-DD') : '',
    //   date: [dayjs(values.date[0]).format('YYYY-MM-DD'), dayjs(values.date[1]).format('YYYY-MM-DD')],
    //   fullName: values.fullName,
    //   employeeCitizenId: values.employeeCitizenId,
    //   hospitalLikeField: values.hospitalLikeField,
    //   bankCode: values.bankCode,
    //   operation: 'AND',
    //   pagination: {
    //     pageNumber: 0,
    //     pageSize: 10,
    //   },
    // };
    // console.log('searchObjModal', searchObj);
    // //updata filter state
    // setFilterModal(searchObj);

    // //เซ็ตค่า filter ที่ส่งเข้ามาจาก action
    // void dispatch(setFilterDoctorSalaly(searchObj));
  };

  return (
    <BaseDialog
      width='1500px'
      isOpen={isOpenModal}
      setIsOpen={setOpenModal}
      headerContent={<p className='page-title pt-4 text-left'>เพิ่มรายการใบสั่งจ่าย</p>}
      contentCenter={true}
      content={
        <>
          <BaseForm name='doctor-salary-filte' onFinish={onFinish} initialValues={{ filterModal }}>
            <div className='flex flex-col gap-4 '>
              <div className='w-full bg-white'>
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
                        id={`${dataTestId}-accidentIssueCode-input-text`}
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
                    <Col {...searchColumn}>
                      <BaseItemDateRangePicker
                        id={`${dataTestId}-date-input-date`}
                        rules={[requiredRule('วันที่คำสั่งจ่าย')]}
                        itemName='date'
                        label='วันที่คำสั่งจ่าย'
                        placeholder={['เริ่มต้น', 'สิ้นสุด']}
                      />
                    </Col>
                    <Col {...searchColumn}>
                      <BaseItemDropdown
                        className='text-left'
                        label='ธนาคาร'
                        itemName='bankCode'
                        placeholder='เลือกธนาคาร'
                        id={`${dataTestId}-bankCode-selecter`}
                        option={bankSelectData}
                        // option={[{ value: 1, label: 'ธนาคารกรุงเทพ', disabled: false }]}
                        // loading={loadingBankData}
                        disabled={tabActive !== 'T'}
                        rules={['T'].includes(tabActive) ? [requiredRule('ธนาคาร')] : []} // เพิ่ม rules เฉพาะ tab ที่กำหนด
                      />
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col {...searchColumn}>
                      <BaseItemInput
                        id={`${dataTestId}-fullName-input-text`}
                        label='ชื่อ - นามสกุล'
                        itemName='fullName'
                        placeholder='ระบุชื่อ - นามสกุล'
                      />
                    </Col>
                    <Col {...searchColumn}>
                      <BaseItemInput
                        label='เลขบัตรประชาชน'
                        itemName='employeeCitizenId'
                        id={`${dataTestId}-employeeCitizenId-input`}
                        placeholder='เลขบัตรประชาชน'
                        rules={
                          ['S'].includes(tabActive)
                            ? [
                                requiredRule('เลขบัตรประชาชน'),
                                onlyNumberRule('เลขบัตรประชาชน'),
                                minRule('เลขบัตรประชาชน', 13),
                                maxRule('เลขบัตรประชาชน', 13),
                              ]
                            : [
                                onlyNumberRule('เลขบัตรประชาชน'),
                                minRule('เลขบัตรประชาชน', 13),
                                maxRule('เลขบัตรประชาชน', 13),
                              ]
                        }
                      />
                    </Col>
                    <Col {...searchColumn}>
                      <div>
                        <p className='text-label mb-2 text-left' id={`${dataTestId}-advancePaymentType-label`}>
                          ประเภทเบิกเงินรองจ่าย
                        </p>

                        <Radio.Group
                          className='h-[48px]'
                          optionType='button'
                          text-lg
                          font-boldtyle='solid'
                          onChange={onChangeRadio}
                          value={valueRadio}
                          disabled={dataSelected.length > 0}
                        >
                          <div className='flex gap-4 h-full'>
                            <Radio.Button className='!h-full flex justify-center items-center' value={'1'}>
                              <div id={`${dataTestId}-advancePaymentType-radio-W`}> เงินทดแทน</div>
                            </Radio.Button>
                            <Radio.Button className='!h-full flex justify-center items-center' value={'8'}>
                              <div id={`${dataTestId}-advancePaymentType-radio-B`}> ค่าตอบแทนแพทย์</div>
                            </Radio.Button>
                          </div>
                        </Radio.Group>
                      </div>
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
            filter={filterModal}
            setFilter={(filterModal) => {
              setFilterModal(filterModal);
            }}
            totalElements={totalElements}
            dataTestId={dataTestId}
            tabActive={tabActive}
            dataRows={filterResult}
            callBackDataSelected={(data) => {
              // console.log('callBackDataSelected', data);
              setDataSelected(data);
            }}
          />
        </>
      }
      footer={
        <div className='flex justify-center gap-4'>
          <BaseButton size='middle' type='cancel' label='ยกเลิก' onClick={() => setOpenModal(false)} />
          <BaseButton size='middle' label='ยืนยัน' onClick={handleConfirmCreateModal} />
        </div>
      }
    />
  );
}
