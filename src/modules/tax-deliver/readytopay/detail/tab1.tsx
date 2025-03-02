'use client';
import React from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import CardMoneyOrderTable from '@/modules/tax-deliver/readytopay/detail/cardMoneyOrderTable';
import CardMoneyOrderHospitalTable from '@/modules/tax-deliver/readytopay/detail/cardMoneyOrderHospitalTable';
import { GetPaymentDetailsServiceType } from '@/store-redux/slices/tax-deliver/readytopay';
import { threeColumn, singleColumn, formColumn } from '@/constants/layoutColumn';
import SpinLoading from '@/components/common/SpinLoading';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

interface Tab1Props {
  dataTestId: string;
  data: GetPaymentDetailsServiceType | undefined;
}

export default function Tab1({ dataTestId, data }: Tab1Props): React.ReactElement {
  //สำหรับ Loading Table รอข้อมูล
  if (data === undefined) {
    return (
      <div className='h-[800px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }

  const { details, accidentInformation, investigate, payment, approval } = data;

  return (
    <div className='flex flex-col gap-4'>
      {/* รายละเอียด */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-b-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>รายละเอียด</p>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสเจ้าหน้าที่วินิจฉัย</p>
                  <p className='text-display'>{details.investigatedLogCode}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ชื่อสถานประกอบการ</p>
                  <p className='text-display'>{details.companyName}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เลขที่ประสบอันตราย</p>
                  <p className='text-display'>{details.accidentIssuesCode}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ประเภทกิจการ</p>
                  <p className='text-display'>{details.businessType}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เลขที่บัญชีนายจ้าง</p>
                  <p className='text-display'>{details.accountNo}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสกิจการ</p>
                  <p className='text-display'>{details.businessGroup}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>วันที่ประสบอันตราย</p>
                  <p className='text-display'>{formatDayThai(details.accidentDate)}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัส TISC</p>
                  <p className='text-display'>{details.tsic.code}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>วันที่รับแจ้ง</p>
                  <p className='text-display'>{formatDayThai(details.informDate)}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...singleColumn}>
                <div>
                  <p className='text-label-info'>รายละเอียด TSIC</p>
                  <p className='text-display'>{details.tsic.description}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* ข้อมูลการประสบอันตราย */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>ข้อมูลการประสบอันตราย</p>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ผู้ประสบอันตราย</p>
                  <p className='text-display'>{accidentInformation.employeeName}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสตำแหน่งหน้าที่</p>
                  <p className='text-display'>
                    {accidentInformation.careerPosition.code} - {accidentInformation.careerPosition.description}
                  </p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เลขที่บัตรประชาชน</p>
                  <p className='text-display'>{accidentInformation.employeeCid}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสอวัยวะที่ประสบอันตราย</p>
                  <p className='text-display'>
                    {accidentInformation.accidentOrganSubGroup.code} -
                    {accidentInformation.accidentOrganSubGroup.description}
                  </p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ตำแหน่ง</p>
                  <p className='text-display'>{accidentInformation.position}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสสิ่งของที่ทำให้ประสบอันตราย</p>
                  <p className='text-display'>
                    {accidentInformation.accidentItem.code} - {accidentInformation.accidentItem.description}
                  </p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>สาเหตุที่ประสบอันตราย</p>
                  <p className='text-display'>{accidentInformation.accidentCauseText}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>รหัสสาเหตุที่ประสบอันตราย</p>
                  <p className='text-display'>
                    {accidentInformation.accidentCase.code} - {accidentInformation.accidentCase.description}
                  </p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ผลของการประสบอันตราย</p>
                  <p className='text-display'>{accidentInformation.accidentInjuryText}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...singleColumn}>
                <div>
                  <p className='text-label-info'>รหัสผลของการประสบอันตราย</p>
                  <p className='text-display'>
                    {accidentInformation.accidentInjury.code} - {accidentInformation.accidentInjury.description}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* คำวินิจฉัย / เปลี่ยนแปลงคำวินิจฉัย */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>คำวินิจฉัย / เปลี่ยนแปลงคำวินิจฉัย</p>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ครั้งที่</p>
                  <p className='text-display'>{investigate.treatmentDescription}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ระดับความรุนแรง</p>
                  <p className='text-display'>
                    {investigate.investigateType.code} - {investigate.investigateType.description}
                  </p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ผลการวินิจฉัย</p>
                  <p className='text-display'>{investigate.result}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เงินค่าจ้าง (บาท)</p>
                  <p className='text-display'>{formatCurrency(investigate.amount)}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>วันที่เปลี่ยนแปลงคำวินิจฉัย</p>
                  <p className='text-display'>{formatDayThai(investigate.expiryDate)}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ค่าทดแทนรายเดือน (บาท)</p>
                  <p className='text-display'>{formatCurrency(investigate.compensationFee)}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* ข้อมูลใบสั่งจ่าย */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>ข้อมูลใบสั่งจ่าย</p>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เลขที่ใบสั่งจ่าย</p>
                  <p className='text-display'>{payment.paymentNo}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>สถานะใบสั่งจ่าย</p>
                  <p className='text-display'>{payment.paymentStatus}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label text-[#F56C1F]'>จ่ายให้</p>
                  <p className='text-display'>{payment.payTo}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label text-[#F56C1F]'>จ่ายโดย</p>
                  <p className='text-display'>{payment.payBy}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label text-[#F56C1F]'>ลำดับที่</p>
                  <p className='text-display'>{payment.payIndex}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label text-[#F56C1F]'>ไปรษณีย์ปลายทาง</p>
                  <p className='text-display'>{payment.destinationPortal}</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>วันที่สั่งจ่าย</p>
                  <p className='text-display'>{payment.paymentDate}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>ผู้บันทึกใบสั่งจ่าย</p>
                  <p className='text-display'>{payment.createdBy}</p>
                </div>
              </Col>
              <Col {...threeColumn}>
                <div>
                  <p className='text-label-info'>เลขที่ใบสำคัญรับเงิน</p>
                  <p className='text-display'>{payment.paymentNo}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* รายการใบแจ้งหนี้ค่ารักษาพยาบาล */}
      <CardMoneyOrderHospitalTable dataTestId={dataTestId} data={data} />
      {/* รายการใบสั่งจ่าย */}
      <CardMoneyOrderTable dataTestId={dataTestId} data={data} />
      {/* อนุมัติใบสั่งจ่าย */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
          <div className='flex flex-col gap-4'>
            <p className='header-card'>อนุมัติใบสั่งจ่าย</p>
            <Row gutter={[16, 16]}>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>สถานะการอนุมัติ</p>
                  <p className='text-display'>{approval.status}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>วันที่อนุมัติ</p>
                  <p className='text-display'>{formatDayThai(approval.date)}</p>
                </div>
              </Col>
              <Col {...formColumn}>
                <div>
                  <p className='text-label-info'>ผู้อนุมัติ</p>
                  <p className='text-display'>{approval.approver}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
