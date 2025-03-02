'use client';
import React from 'react';
import { Col, Row } from 'wcf-component-lib/node_modules/antd';
import { threeColumn, singleColumn, formColumn } from '@/constants/layoutColumn';
import CardMoneyOrderTable from './cardMoneyOrderTable';
import { SpinLoading } from '@/components/common';
import { AccidentIssueDetailServiceType } from '@/store-redux/slices/readytopay/doctor-salary';
import { formatCurrency, formatDayThai } from '@/utils/formatGeneral';

interface AccidentIssueCodeProps {
  dataTestId: string;
  type: string;
  data: AccidentIssueDetailServiceType | undefined;
}

export default function CardAllDetail({ dataTestId, data, type }: AccidentIssueCodeProps): React.ReactElement {
  //สำหรับ Loading Table รอข้อมูล
  if (data === undefined) {
    return (
      <div className='h-[800px] bg-white shadow-sm rounded-xl flex justify-center items-center'>
        <SpinLoading />
      </div>
    );
  }
  const { payment, medicalAssessment, accidentInformation, details, investigate, approval } = data;

  return (
    <div className='flex flex-col gap-4'>
      {/* รายละเอียดการจ่ายเงินทดแทน = 1 */}
      {type === '1' && (
        <>
          {/* ข้อมูลรายละเอียด */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-b-lg'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>รายละเอียด</p>
                <Row key={payment.paymentNo} gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-investigatedLogCode-label-title`} className='text-label-info'>
                        รหัสเจ้าหน้าที่วินิจฉัย
                      </p>
                      <p id={`${dataTestId}-investigatedLogCode-label-value`} className='text-display'>
                        {details.investigatedLogCode}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-companyName-label-title`} className='text-label-info'>
                        ชื่อสถานประกอบการ
                      </p>
                      <p id={`${dataTestId}-companyName-label-value`} className='text-display'>
                        {details.companyName}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentIssuesCode-label-title`} className='text-label-info'>
                        เลขที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentIssuesCode-label-value`} className='text-display'>
                        {details.accidentIssuesCode}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-businessType-label-title`} className='text-label-info'>
                        ประเภทกิจการ
                      </p>
                      <p id={`${dataTestId}-businessType-label-value`} className='text-display'>
                        {details.businessType}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accountNo-label-title`} className='text-label-info'>
                        เลขที่บัญชีนายจ้าง
                      </p>
                      <p id={`${dataTestId}-accountNo-label-value`} className='text-display'>
                        {details.accountNo}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-businessGroup-label-title`} className='text-label-info'>
                        รหัสกิจการ
                      </p>
                      <p id={`${dataTestId}-businessGroup-label-value`} className='text-display'>
                        {details.businessGroup}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentDate-label-title`} className='text-label-info'>
                        วันที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentDate-label-value`} className='text-display'>
                        {formatDayThai(details.accidentDate)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-tsicCode-label-title`} className='text-label-info'>
                        รหัส TSIC
                      </p>
                      <p id={`${dataTestId}-tsicCode-label-value`} className='text-display'>
                        {details.tsic.code}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-informDate-label-title`} className='text-label-info'>
                        วันที่รับแจ้ง
                      </p>
                      <p id={`${dataTestId}-informDate-label-value`} className='text-display'>
                        {formatDayThai(details.informDate)}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...singleColumn}>
                    <div>
                      <p id={`${dataTestId}-tsicDescription-label-title`} className='text-label-info'>
                        รายละเอียด TSIC
                      </p>
                      <p id={`${dataTestId}-tsicDescription-label-value`} className='text-display'>
                        {details.tsic.description}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* ข้อมูลประสบอันตราย */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>ข้อมูลการประสบอันตราย</p>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-employeeName-label-title`} className='text-label-info'>
                        ผู้ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-employeeName-label-value`} className='text-display'>
                        {accidentInformation.employeeName}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-careerPosition-label-title`} className='text-label-info'>
                        รหัสตำแหน่งหน้าที่
                      </p>
                      <p id={`${dataTestId}-careerPosition-label-value`} className='text-display'>
                        {accidentInformation.careerPosition.code} - {accidentInformation.careerPosition.description}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-employeeCid-label-title`} className='text-label-info'>
                        เลขที่บัตรประชาชน
                      </p>
                      <p id={`${dataTestId}-employeeCid-label-value`} className='text-display'>
                        {accidentInformation.employeeCid}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentOrgan-label-title`} className='text-label-info'>
                        รหัสอวัยวะที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentOrgan-label-value`} className='text-display'>
                        {accidentInformation.accidentOrgan.code} - {accidentInformation.accidentOrgan.description}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-position-label-title`} className='text-label-info'>
                        ตำแหน่ง
                      </p>
                      <p id={`${dataTestId}-position-label-value`} className='text-display'>
                        {accidentInformation.position}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentItem-label-title`} className='text-label-info'>
                        รหัสสิ่งของที่ทำให้ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentItem-label-value`} className='text-display'>
                        {accidentInformation.accidentItem.code} - {accidentInformation.accidentItem.description}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentCauseText-label-title`} className='text-label-info'>
                        สาเหตุที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentCauseText-label-value`} className='text-display'>
                        {accidentInformation.accidentCauseText}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentCase-label-title`} className='text-label-info'>
                        รหัสสาเหตุที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentCase-label-value`} className='text-display'>
                        {accidentInformation.accidentCase.code} - {accidentInformation.accidentCase.description}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentInjuryText-label-title`} className='text-label-info'>
                        ผลของการประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentInjuryText-label-value`} className='text-display'>
                        {accidentInformation.accidentInjuryText}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...singleColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentInjury-label-title`} className='text-label-info'>
                        รหัสผลของการประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentInjury-label-value`} className='text-display'>
                        {accidentInformation.accidentInjury.code} - {accidentInformation.accidentInjury.description}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* ข้อมูลการวินิจฉัย */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>คำวินิจฉัย / เปลี่ยนแปลงคำวินิจฉัย</p>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-treatmentDescription-label-title`} className='text-label-info'>
                        ครั้งที่
                      </p>
                      <p id={`${dataTestId}-treatmentDescription-label-value`} className='text-display'>
                        {investigate.treatmentDescription}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-investigateType-label-title`} className='text-label-info'>
                        ระดับความรุนแรง
                      </p>
                      <p id={`${dataTestId}-investigateType-label-value`} className='text-display'>
                        {investigate.investigateType.code} - {investigate.investigateType.description}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-result-label-title`} className='text-label-info'>
                        ผลการวินิจฉัย
                      </p>
                      <p id={`${dataTestId}-result-label-value`} className='text-display'>
                        {investigate.result}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-amount-label-title`} className='text-label-info'>
                        เงินค่าจ้าง (บาท)
                      </p>
                      <p id={`${dataTestId}-amount-label-value`} className='text-display'>
                        {formatCurrency(investigate.amount)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-expiryDate-label-title`} className='text-label-info'>
                        วันที่เปลี่ยนแปลงคำวินิจฉัย
                      </p>
                      <p id={`${dataTestId}-expiryDate-label-value`} className='text-display'>
                        {formatDayThai(investigate.expiryDate)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-compensationFee-label-title`} className='text-label-info'>
                        ค่าทดแทนรายเดือน (บาท)
                      </p>
                      <p id={`${dataTestId}-compensationFee-label-value`} className='text-display'>
                        {formatCurrency(investigate.compensationFee)}
                      </p>
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
                      <p id={`${dataTestId}-paymentCode-label-title`} className='text-label-info'>
                        เลขที่ใบสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentCode-label-value`} className='text-display'>
                        {payment.paymentCode}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentStatus-label-title`} className='text-label-info'>
                        สถานะใบสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentStatus-label-value`} className='text-display'>
                        {payment.paymentStatus}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payTo-label-title`} className='text-label text-[#F56C1F]'>
                        จ่ายให้
                      </p>
                      <p id={`${dataTestId}-payTo-label-value`} className='text-display'>
                        {payment.payTo}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payBy-label-title`} className='text-label text-[#F56C1F]'>
                        จ่ายโดย
                      </p>
                      <p id={`${dataTestId}-payBy-label-value`} className='text-display'>
                        {payment.payBy}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payIndex-label-title`} className='text-label text-[#F56C1F]'>
                        ลำดับที่
                      </p>
                      <p id={`${dataTestId}-payIndex-label-value`} className='text-display'>
                        {payment.payIndex}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-destinationPortal-label-title`} className='text-label text-[#F56C1F]'>
                        ไปรษณีย์ปลายทาง
                      </p>
                      <p id={`${dataTestId}-destinationPortal-label-value`} className='text-display'>
                        {payment.destinationPortal}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentDate-label-title`} className='text-label-info'>
                        วันที่สั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentDate-label-value`} className='text-display'>
                        {formatDayThai(payment.paymentDate)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-createdBy-label-title`} className='text-label-info'>
                        ผู้บันทึกใบสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-createdBy-label-value`} className='text-display'>
                        {payment.createdBy}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* ข้อมูลตารางรายการจ่ายเงิน */}
          <CardMoneyOrderTable dataTestId={dataTestId} data={data} />
          {/* ข้อมูลการอนุมัติใบสั่งจ่าย */}
          {/* อนุมัติใบสั่งจ่าย */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>อนุมัติใบสั่งจ่าย</p>
                <Row gutter={[16, 16]}>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-status-label-title`} className='text-label-info'>
                        สถานะการอนุมัติ
                      </p>
                      <p id={`${dataTestId}-status-label-value`} className='text-display'>
                        {approval.status}
                      </p>
                    </div>
                  </Col>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-date-label-title`} className='text-label-info'>
                        วันที่อนุมัติ
                      </p>
                      <p id={`${dataTestId}-date-label-value`} className='text-display'>
                        {formatDayThai(approval.date)}
                      </p>
                    </div>
                  </Col>
                  <Col {...formColumn}>
                    <div>
                      <p id={`${dataTestId}-approver-label-title`} className='text-label-info'>
                        ผู้อนุมัติ
                      </p>
                      <p id={`${dataTestId}-approver-label-value`} className='text-display'>
                        {approval.approver}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      )}

      {/* รายละเอียดการจ่ายค่าตอบแทนแพทย์ = 8 */}
      {type === '8' && (
        <>
          {/* ข้อมูลใบสั่งจ่าย */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>ข้อมูลใบสั่งจ่าย</p>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentCode-label-title`} className='text-label-info'>
                        เลขที่ใบสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentCode-label-value`} className='text-display'>
                        {payment.paymentCode}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentDate-label-title`} className='text-label-info'>
                        วันที่สั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentDate-label-value`} className='text-display'>
                        {formatDayThai(payment.paymentDate)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payBy-label-title`} className='text-label text-[#F56C1F]'>
                        จ่ายโดย
                      </p>
                      <p id={`${dataTestId}-payBy-label-value`} className='text-display'>
                        {payment.payBy}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentStatus-label-title`} className='text-label text-[#F56C1F]'>
                        สถานะใบสั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentStatus-label-value`} className='text-display'>
                        {payment.paymentStatus}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentOrderer-label-title`} className='text-label '>
                        ผู้สั่งจ่าย
                      </p>
                      <p id={`${dataTestId}-paymentOrderer-label-value`} className='text-display'>
                        {payment.paymentOrderer}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payStatus-label-title`} className='text-label text-[#F56C1F]'>
                        สถานะการจ่าย
                      </p>
                      <p id={`${dataTestId}-payStatus-label-value`} className='text-display'>
                        {payment.payStatus}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-payAmount-label-title`} className='text-label-info'>
                        จำนวนเงิน
                      </p>
                      <p id={`${dataTestId}-payAmount-label-value`} className='text-display'>
                        {formatCurrency(payment.payAmount)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-paymentNo-label-title`} className='text-label-info'>
                        เลขที่ใบสำคัญรับเงิน
                      </p>
                      <p id={`${dataTestId}-paymentNo-label-value`} className='text-display'>
                        {payment.paymentNo}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          {/* ข้อมูลการตรวจประเมิน */}
          <div className='flex flex-col justify-center items-center'>
            <div className='w-full bg-white p-6 shadow-sm rounded-xl'>
              <div className='flex flex-col gap-4'>
                <p className='header-card'>ข้อมูลการตรวจประเมิน</p>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-assessmentRequestNo-label-title`} className='text-label-info'>
                        เลขที่ใบคำขอค่าตรวจประเมิน
                      </p>
                      <p id={`${dataTestId}-assessmentRequestNo-label-value`} className='text-display'>
                        {medicalAssessment.assessmentRequestNo}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-assessingDoctor-label-title`} className='text-label-info'>
                        แพทย์ผู้ประเมิน
                      </p>
                      <p id={`${dataTestId}-assessingDoctor-label-value`} className='text-display'>
                        {medicalAssessment.assessingDoctor}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-assessmentDate-label-title`} className='text-label-info'>
                        วันที่ตรวจ
                      </p>
                      <p id={`${dataTestId}-assessmentDate-label-value`} className='text-display'>
                        {formatDayThai(medicalAssessment.assessmentDate)}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-assessmentLocation-label-title`} className='text-label-info'>
                        ทำการตรวจ ณ
                      </p>
                      <p id={`${dataTestId}-assessmentLocation-label-value`} className='text-display'>
                        {medicalAssessment.assessmentLocation}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-requestIssuer-label-title`} className='text-label-info'>
                        ผู้ออกใบคำขอ
                      </p>
                      <p id={`${dataTestId}-requestIssuer-label-value`} className='text-display'>
                        {medicalAssessment.requestIssuer}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-approvalStatus-label-title`} className='text-label-info'>
                        สถานะการอนุมัติ
                      </p>
                      <p id={`${dataTestId}-approvalStatus-label-value`} className='text-display'>
                        {medicalAssessment.approvalStatus}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-approver-label-title`} className='text-label-info'>
                        ผู้อนุมัติ
                      </p>
                      <p id={`${dataTestId}-approver-label-value`} className='text-display'>
                        {medicalAssessment.approver}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-approvalDate-label-title`} className='text-label-info'>
                        วันที่อนุมัติ
                      </p>
                      <p id={`${dataTestId}-approvalDate-label-value`} className='text-display'>
                        {formatDayThai(medicalAssessment.approvalDate)}
                      </p>
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
                      <p id={`${dataTestId}-accidentNumber-label-title`} className='text-label-info'>
                        เลขประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentNumber-label-value`} className='text-display'>
                        {accidentInformation.accidentNumber}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-accidentDate-label-title`} className='text-label-info'>
                        วันที่ประสบอันตราย
                      </p>
                      <p id={`${dataTestId}-accidentDate-label-value`} className='text-display'>
                        {formatDayThai(accidentInformation.accidentDate)}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-severityLevel-label-title`} className='text-label-info'>
                        ระดับความรุนแรง
                      </p>
                      <p id={`${dataTestId}-severityLevel-label-value`} className='text-display'>
                        {accidentInformation.severityLevel}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-fullName-label-title`} className='text-label-info'>
                        ชื่อ - นามสกุล
                      </p>
                      <p id={`${dataTestId}-fullName-label-value`} className='text-display'>
                        {accidentInformation.fullName}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-addressNumber-label-title`} className='text-label-info'>
                        ที่อยู่เลขที่
                      </p>
                      <p id={`${dataTestId}-addressNumber-label-value`} className='text-display'>
                        {accidentInformation.addressNumber}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-villageNumber-label-title`} className='text-label-info'>
                        หมู่ที่
                      </p>
                      <p id={`${dataTestId}-villageNumber-label-value`} className='text-display'>
                        {accidentInformation.villageNumber}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-road-label-title`} className='text-label-info'>
                        ถนน
                      </p>
                      <p id={`${dataTestId}-road-label-value`} className='text-display'>
                        {accidentInformation.road}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-alley-label-title`} className='text-label-info'>
                        ซอย
                      </p>
                      <p id={`${dataTestId}-alley-label-value`} className='text-display'>
                        {accidentInformation.alley}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-subDistrict-label-title`} className='text-label-info'>
                        ตำบล
                      </p>
                      <p id={`${dataTestId}-subDistrict-label-value`} className='text-display'>
                        {accidentInformation.subDistrict}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-district-label-title`} className='text-label-info'>
                        อำเภอ
                      </p>
                      <p id={`${dataTestId}-district-label-value`} className='text-display'>
                        {accidentInformation.district}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-province-label-title`} className='text-label-info'>
                        จังหวัด
                      </p>
                      <p id={`${dataTestId}-province-label-value`} className='text-display'>
                        {accidentInformation.province}
                      </p>
                    </div>
                  </Col>
                  <Col {...threeColumn}>
                    <div>
                      <p id={`${dataTestId}-postalCode-label-title`} className='text-label-info'>
                        รหัสไปรษณีย์
                      </p>
                      <p id={`${dataTestId}-postalCode-label-value`} className='text-display'>
                        {accidentInformation.postalCode}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col lg={12}>
                    <div>
                      <p id={`${dataTestId}-employer-label-title`} className='text-label-info'>
                        นายจ้าง
                      </p>
                      <p id={`${dataTestId}-employer-label-value`} className='text-display'>
                        {accidentInformation.employer}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
