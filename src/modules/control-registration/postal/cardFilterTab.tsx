'use client';
import React, { useEffect, useMemo } from 'react';
import { searchColumn } from '@/constants/layoutColumn';
import { FilterSearchType, setFilter } from '@/store-redux/slices/control-registration/postal';
import { SelectData } from 'wcf-component-lib/src/constants/interface';
import { getBankList, bankSelector, BankItem } from '@/redux/slices/mdm/bank';
import { useAppDispatch } from '@/store-redux/store';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Form, Col, FormProps, Row } from 'wcf-component-lib/node_modules/antd';
import {
  BaseButton,
  BaseForm,
  BaseItemDropdown,
  BaseItemInput,
  BaseItemDateRangePicker,
} from 'wcf-component-lib/src/components';
import { maxRule, minRule } from 'wcf-component-lib/src/rules/FormRulesFunction';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
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

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    // console.log('chequeStampDate', values.chequeStampDate, dayjs(values.chequeStampDate[0]).format('YYYY-MM-DD'));

    const searchObj = {
      documentNo: values.documentNo,
      receiptNo: values.receiptNo,
      significantHandNo: values.significantHandNo,
      payDate: [dayjs(values.payDate[0]).format('YYYY-MM-DD'), dayjs(values.payDate[1]).format('YYYY-MM-DD')],
      postalNo: values.postalNo,
      bankCode: values.bankCode,
      chequeNo: values.chequeNo,
      status: values.status,
      payType: values.payType,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };
    console.log('searchObj', searchObj);
    void dispatch(setFilter(searchObj));
    form.resetFields();
  };

  return (
    <div className='flex p-6 bg-white shadow-sm rounded-xl'>
      <BaseForm name='controlRegistrationChequeFilter' onFinish={onFinish} extraForm={form}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[324px] bg-[#1C4651] rounded-full'></div>
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
                    id={`${dataTestId}-filter-receiptNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงิน'
                    itemName='receiptNo'
                    placeholder='ระบุเลขที่ใบสำคัญรับเงิน'
                    rules={[minRule('เลขที่ใบสำคัญรับเงิน', 15), maxRule('เลขที่ใบสำคัญรับเงิน', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-significantHandNo-input-text`}
                    label='เลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    itemName='significantHandNo'
                    placeholder='เลขที่ใบสำคัญรับเงินชนิดเล่ม'
                    rules={[minRule('เลขที่ใบสำคัญรับเงินชนิดเล่ม', 15), maxRule('เลขที่ใบสำคัญรับเงินชนิดเล่ม', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDateRangePicker
                    id={`${dataTestId}-filter-payDate-input-date`}
                    itemName='payDate'
                    label='วันที่ตัดจ่าย'
                    placeholder={['เริ่มต้น', 'สิ้นสุด']}
                    minDate={dayjs().startOf('year')}
                    maxDate={dayjs().endOf('year')}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-postalNo-input-text`}
                    label='เลขที่ธนาณัติ'
                    itemName='postalNo'
                    placeholder='ระบุเลขที่ธนาณัติ'
                    rules={[minRule('เลขที่ธนาณัติ', 20), maxRule('เลขที่ธนาณัติ', 20)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    label='ธนาคาร'
                    itemName='bankCode'
                    placeholder='เลือกธนาคาร'
                    id={`${dataTestId}-bankCode-selecter`}
                    option={bankSelectData}
                    loading={loadingBankData}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-chequeNo-input-text`}
                    label='เลขที่เช็ค'
                    itemName='chequeNo'
                    placeholder='ระบุเลขที่เช็ค'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>

                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-filter-status-select`}
                    label='สถานะ'
                    itemName='status'
                    option={[
                      {
                        label: 'จ่ายแล้ว',
                        value: 'A',
                      },
                      {
                        label: 'ยกเลิก',
                        value: 'U',
                      },
                    ]}
                    placeholder='เลือกสถานะ'
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemDropdown
                    id={`${dataTestId}-payType-selecter`}
                    label='ช่องทางชำระเงิน'
                    itemName='payType'
                    placeholder='เลือกช่องทางชำระเงิน'
                    option={[
                      { value: 'T1', label: 'จ่ายเงินทดแทน/ค่าตอบแทนแพทย์' },
                      { value: 'S1', label: 'จ่ายคืนเงินสมทบให้นายจ้าง' },
                      { value: 'E1', label: 'จ่ายเงินประเภทอื่น' },
                      { value: 'P1', label: 'จ่ายเงินผิดกองทุนเงินทดแทน' },
                      { value: 'TX', label: 'นำส่งภาษีหัก ณ ที่จ่าย' },
                    ]}
                  />
                </Col>

                <Col span={18}>
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
