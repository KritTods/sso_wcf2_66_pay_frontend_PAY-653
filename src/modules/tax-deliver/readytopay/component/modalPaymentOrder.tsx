import React, { useState, useEffect } from 'react';
import { BaseButton, BaseDialog, BaseForm, BaseItemDropdown, BaseItemDatePicker } from 'wcf-component-lib/src/components';
import ModalTable from '@/modules/tax-deliver/readytopay/component/modalTable';
import { Col, Row, Form, FormProps } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store-redux/store';
import { getBankList } from '@/redux/slices/mdm/bank';
import {
  FilterSearchType,
  getFilterListService,
  initFilter,
  ReadyToPayDataType,
  GetFilterListServiceType,
} from '@/store-redux/slices/tax-deliver/readytopay';
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

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //     console.log(date, dateString);
  //   };

  return (
    <>
      <BaseDialog
        width='1500px'
        isOpen={isOpenModal}
        setIsOpen={setOpenModal}
        headerContent={<p className='page-title pt-4 text-left'> เพิ่มรายการนำส่งภาษีหัก ณ ที่จ่าย</p>}
        contentCenter={true}
        content={
          <>
            <BaseForm name='filter' extraForm={form} onFinish={onFinish} initialValues={{ filter }}>
              <div className='w-full bg-white shadow-sm rounded-xl flex flex-row gap-4'>
                <div className='w-full'>
                  <div className='flex flex-col gap-4'>
                    <Row gutter={[16, 16]}>
                      {/* <Col {...searchColumn}>
                        <BaseItemDatePicker
                          label='วันที่ตัดจ่าย'
                          onChange={onChange} 
                          picker="month" 
                          placeholder="เลือกเดือน"
                          format='MMMM'
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemDatePicker
                          label='เลือกปี'
                          onChange={onChange} 
                          picker="year" 
                          placeholder="เลือกปี"
                          format='YYYY'
                        />
                      </Col> */}
                      <Col {...searchColumn}>
                        <BaseItemDatePicker
                          id={`${dataTestId}-filter-transactionDate-input-date`}
                          itemName='transactionDate'
                          label='วันที่เตรียมจ่าย'
                          placeholder='เลือกวันที่เตรียมจ่าย'
                        />
                      </Col>
                      <Col {...searchColumn}>
                        <BaseItemDropdown
                          id={`${dataTestId}-filter-payType-select`}
                          label='วิธีการชำระเงิน'
                          itemName='payType'
                          placeholder='เลือกวิธีการชำระเงิน'
                          value={tabActive}  // ตั้งค่าเริ่มต้นให้ตรงกับสถานะ tabActive
                          option={[
                            { value: 'X', label: 'จ่ายเงิน ณ สำนักงาน', disabled: tabActive !== 'X' }, // ปิดการเลือกถ้าไม่ใช่ 'X'
                            { value: 'T', label: 'โอนผ่านธนาคารโดยจังหวัด', disabled: tabActive !== 'T' }, // ปิดการเลือกถ้าไม่ใช่ 'T'
                            { value: 'S', label: 'ส่งเช็คทางไปรษณีย์', disabled: tabActive !== 'S' }, // ปิดการเลือกถ้าไม่ใช่ 'S'
                          ]}
                          style={{ textAlign: 'left' }} // เพิ่มการจัดตำแหน่งข้อความ
                        />
                      </Col>    
                      <Col {...searchColumn}>
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
