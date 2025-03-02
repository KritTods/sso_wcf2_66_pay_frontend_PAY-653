'use client';
import React, { useMemo, useEffect } from 'react';
import { Col, Row, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import {
  BaseForm,
  BaseItemInput,
  BaseItemDatePicker,
  BaseButton,
  BaseItemDropdown,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule, onlyNumberRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { BankItem, getBankList, bankSelector } from '@/redux/slices/mdm/bank';
import {
  cutOffPaymentDoctorSalarySelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cutOffPayment/doctor-salary';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';
import { SelectData } from 'wcf-component-lib/src/constants/interface';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cutOffPaymentDoctorSalarySelector);

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

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      transactionDate: values.transactionDate ? dayjs(values.transactionDate).format('YYYY-MM-DD') : '',
      accidentIssueCode: values.accidentIssueCode,
      employeeCitizenId: values.employeeCitizenId,
      chequeBankCode: values.chequeBankCode,
      payType: values.payType,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };

    void dispatch(setFilter(searchObj));
  };

  return (
    <div className='flex p-6 bg-white shadow-sm rounded-xl'>
      <BaseForm name='cutOffPaymentDoctorSalaryFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-documentNo-input-text`}
                    label='เลขที่เอกสาร'
                    itemName='documentNo'
                    placeholder='ระบุเลขที่เอกสาร'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-paymentNo-input-text`}
                    label='เลขที่ใบสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่ใบสั่งจ่าย'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-filter-transactionDate-input-date`}
                    itemName='transactionDate'
                    label='วันที่เตรียมจ่าย'
                    placeholder='เลือกวันที่เตรียมจ่าย'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-accidentIssueCode-input-text`}
                    label='เลขประสบอันตราย'
                    itemName='accidentIssueCode'
                    placeholder='ระบุเลขประสบอันตราย'
                    rules={[minRule('เลขประสบอันตราย', 13), maxRule('เลขประสบอันตราย', 13)]}
                  />
                </Col>

                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-employeeCitizenId-input-text`}
                    label='เลขบัตรประชาชน'
                    itemName='employeeCitizenId'
                    placeholder='เลขบัตรประชาชน'
                    rules={[
                      onlyNumberRule('เลขบัตรประชาชน'),
                      minRule('เลขบัตรประชาชน', 13),
                      maxRule('เลขบัตรประชาชน', 13),
                    ]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-bankCode-select`}
                    label='ธนาคาร (ที่ออกเช็ค)'
                    itemName='bankCode'
                    option={bankSelectData}
                    placeholder='เลือกธนาคาร'
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-payType-select`}
                    label='วิธีการชำระเงิน'
                    itemName='payType'
                    placeholder='เลือกวิธีการชำระเงิน'
                    option={[
                      { value: 'X', label: 'จ่ายเงิน ณ สำนักงาน' },
                      { value: 'T', label: 'โอนผ่านธนาคารโดยจังหวัด' },
                      { value: 'S', label: 'ส่งเช็คทางไปรษณีย์' },
                      { value: 'P', label: 'ธนาณัติ' },
                      //{ value: 'M', label: 'พร้อมเพย์' },
                    ]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <div className='grid place-items-end h-20'>
                    <BaseButton
                      id={`${dataTestId}-filter-button-search`}
                      className='!min-w-[200px]'
                      size='middle'
                      icon={<SearchOutlined />}
                      htmlType='submit'
                      label={'ค้นหา'}
                      loading={false}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
