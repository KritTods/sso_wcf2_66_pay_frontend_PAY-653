import { DataStructureURL } from 'wcf-component-lib/src/provider/LayoutProvider/type';
export const URL: DataStructureURL = {
  reserve: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    prepare: {
      url: '/reserve/prepare',
      text: 'เบิกเงินทดรองจ่าย - เตรียมจ่าย',
      breadcrumb: ['root', 'prepare'],
      pageLevel: { form: [2] },
    },
    cutOffPay: {
      url: '/reserve/cut-off-pay',
      text: 'เบิกเงินทดรองจ่าย - ตัดจ่าย',
      breadcrumb: ['root', 'cutOffPay'],
      pageLevel: { form: [2] },
    },
    cutOffPayForm: {
      url: '/reserve/cut-off-pay/form',
      text: 'บันทึกข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cutOffPay', 'cutOffPayForm'],
      pageLevel: { form: [2] },
    },
    cutOffPayDetail: {
      url: '/reserve/cut-off-pay/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cutOffPay', 'cutOffPayDetail'],
      pageLevel: { form: [2] },
    },
    cashCalanceDaily: {
      url: '/reserve/cash-balance-daily',
      text: 'ปรับปรุงรายงานเงินคงเหลือประจำวัน',
      breadcrumb: ['root', 'cashCalanceDaily'],
      pageLevel: { form: [2] },
    },
    dailyPaymentControl: {
      url: '/reserve/daily-payment-control',
      text: 'ทะเบียนคุมทดรองจ่ายประจำวัน',
      breadcrumb: ['root', 'dailyPaymentControl'],
      pageLevel: { form: [2] },
    },
    bankDeposit: {
      url: '/reserve/bank-deposit',
      text: 'นำเงินทดรองจ่ายฝากธนาคาร',
      breadcrumb: ['root', 'bankDeposit'],
      pageLevel: { form: [2] },
    },
    bankDepositForm: {
      url: '/reserve/bank-deposit/form',
      text: 'บันทึกข้อมูลนำเงินรองจ่ายฝากธนาคาร',
      breadcrumb: ['root', 'bankDeposit', 'bankDepositForm'],
      pageLevel: { form: [2] },
    },
    bankDepositDetail: {
      url: '/reserve/bank-deposit/detail',
      text: 'รายละเอียดข้อมูลนำเงินรองจ่ายฝากธนาคาร',
      breadcrumb: ['root', 'bankDeposit', 'bankDepositDetail'],
      pageLevel: { form: [2] },
    },
    findbankDeposit: {
      url: '/reserve/find-bank-deposit',
      text: 'สืบค้นนำเงินทดรองจ่ายฝากธนาคาร',
      breadcrumb: ['root', 'findbankDeposit'],
      pageLevel: { form: [2] },
    },
    findbankDepositDetail: {
      url: '/reserve/find-bank-deposit/detail',
      text: 'รายละเอียดข้อมูลนำเงินรองจ่ายฝากธนาคาร',
      breadcrumb: ['root', 'findbankDeposit', 'findbankDepositDetail'],
      pageLevel: { form: [2] },
    },
  },

  readytopay: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    readyToPay: {
      url: '/readytopay',
      text: 'เตรียมจ่าย',
      breadcrumb: ['root', 'readyToPay'],
      pageLevel: { form: [2] },
    },
    //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์
    doctorSalary: {
      url: '/readytopay/doctor-salary',
      text: 'จ่ายเงินทดแทน/ค่าตอบแทนแพทย์',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary'],
      pageLevel: { form: [2] },
    },
    doctorSalaryDetail: {
      url: '/readytopay/doctor-salary/detail',
      text: 'รายละเอียด',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'doctorSalaryDetail'],
      pageLevel: { form: [2] },
    },
    paymentOffice: {
      url: '/readytopay/doctor-salary/payment-office',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentOffice'],
      pageLevel: { form: [2] },
    },
    paymentOfficeDetail: {
      url: '/readytopay/doctor-salary/payment-office/detail',
      text: 'รายละเอียดข้อมูลจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentOffice', 'paymentOfficeDetail'],
      pageLevel: { form: [2] },
    },
    paymentBank: {
      url: '/readytopay/doctor-salary/payment-bank',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentBank'],
      pageLevel: { form: [2] },
    },
    paymentBankDetail: {
      url: '/readytopay/doctor-salary/payment-bank/detail',
      text: 'รายละเอียดข้อมูลจ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentBank', 'paymentBankDetail'],
      pageLevel: { form: [2] },
    },
    paymentCheck: {
      url: '/readytopay/doctor-salary/payment-check',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentCheck'],
      pageLevel: { form: [2] },
    },
    paymentCheckDetail: {
      url: '/readytopay/doctor-salary/payment-check/detail',
      text: 'รายละเอียดข้อมูลจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentCheck', 'paymentCheckDetail'],
      pageLevel: { form: [2] },
    },
    paymentMoney: {
      url: '/readytopay/doctor-salary/payment-money',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentMoney'],
      pageLevel: { form: [2] },
    },
    paymentMoneyDetail: {
      url: '/readytopay/doctor-salary/payment-money/detail',
      text: 'รายละเอียดข้อมูลจ่าย - ธนาณัติ',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentMoney', 'paymentMoneyDetail'],
      pageLevel: { form: [2] },
    },
    paymentPromptPay: {
      url: '/readytopay/doctor-salary/payment-promptpay',
      text: 'จ่าย - พร้อมเพย์',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentPromptPay'],
      pageLevel: { form: [2] },
    },
    paymentPromptPayDetail: {
      url: '/readytopay/doctor-salary/payment-promptpay/detail',
      text: 'รายละเอียดข้อมูลจ่าย - พร้อมเพย์',
      breadcrumb: ['root', 'readyToPay', 'doctorSalary', 'paymentPromptPay', 'paymentPromptPayDetail'],
      pageLevel: { form: [2] },
    },

    //จ่ายโรงพยาบาล
    hospitalPayment: {
      url: '/readytopay/hospital-payment',
      text: 'จ่ายโรงพยาบาล',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentDetail: {
      url: '/readytopay/hospital-payment/detail',
      text: 'รายละเอียด',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentDetail'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentOffice: {
      url: '/readytopay/hospital-payment/payment-office',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentOffice'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentOfficeDetail: {
      url: '/readytopay/hospital-payment/payment-office/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentOfficeDetail'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentBank: {
      url: '/readytopay/hospital-payment/payment-bank',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentBank'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentBankDetail: {
      url: '/readytopay/hospital-payment/payment-bank/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentBankDetail'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentCheck: {
      url: '/readytopay/hospital-payment/payment-cheque',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentCheck'],
      pageLevel: { form: [2] },
    },
    hospitalPaymentCheckDetail: {
      url: '/readytopay/hospital-payment/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'hospitalPayment', 'hospitalPaymentCheckDetail'],
      pageLevel: { form: [2] },
    },

    //จ่ายคืนเงินสมทบให้นายจ้าง
    refundToEmployer: {
      url: '/readytopay/refund-to-employer',
      text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer'],
      pageLevel: { form: [2] },
    },
    refundToEmployerOffice: {
      url: '/readytopay/refund-to-employer/payment-office',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerOffice'],
      pageLevel: { form: [2] },
    },
    refundToEmployerOfficeDetail: {
      url: '/readytopay/refund-to-employer/payment-office/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerOffice', 'refundToEmployerOfficeDetail'],
      pageLevel: { form: [2] },
    },
    refundToEmployerBank: {
      url: '/readytopay/refund-to-employer/payment-bank',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerBank'],
      pageLevel: { form: [2] },
    },
    refundToEmployerBankDetail: {
      url: '/readytopay/refund-to-employer/payment-bank/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerBank', 'refundToEmployerBankDetail'],
      pageLevel: { form: [2] },
    },
    refundToEmployerCheck: {
      url: '/readytopay/refund-to-employer/payment-check',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerCheck'],
      pageLevel: { form: [2] },
    },
    refundToEmployerCheckDetail: {
      url: '/readytopay/refund-to-employer/payment-check/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerCheck', 'refundToEmployerCheckDetail'],
      pageLevel: { form: [2] },
    },
    refundToEmployerMoney: {
      url: '/readytopay/refund-to-employer/payment-money',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerMoney'],
      pageLevel: { form: [2] },
    },
    refundToEmployerMoneyDetail: {
      url: '/readytopay/refund-to-employer/payment-money/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'refundToEmployer', 'refundToEmployerMoney', 'refundToEmployerMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //จ่ายเงินประเภทอื่น
    otherPayment: {
      url: '/readytopay/other-payment',
      text: 'จ่ายเงินประเภทอื่น',
      breadcrumb: ['root', 'readyToPay', 'otherPayment'],
      pageLevel: { form: [2] },
    },
    otherPaymentDetail: {
      url: '/readytopay/other-payment/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'otherPayment', 'otherPaymentDetail'],
      pageLevel: { form: [2] },
    },
    //จ่ายเงินกองทุนเพื่อบริหารสำนักงาน
    officeFundPayment: {
      url: '/readytopay/officefund-payment',
      text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'officeFundPayment'],
      pageLevel: { form: [2] },
    },
    officeFundPaymentDetail: {
      url: '/readytopay/officefund-payment/detail',
      text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'readyToPay', 'officeFundPayment', 'officeFundPaymentDetail'],
      pageLevel: { form: [2] },
    },

    //จ่ายเงินผิดกองทุนเงินทดแทน
    wrongfundPayment: {
      url: '/readytopay/wrongfund-payment',
      text: 'จ่ายผิดกองทุนเงินทดแทน',
      breadcrumb: ['root', 'readyToPay', 'wrongfundPayment'],
      pageLevel: { form: [2] },
    },
    wrongfundPaymentPayDetail: {
      url: '/readytopay/wrongfund-payment/pay/detail',
      text: 'รายละเอียดข้อมูลจ่าย',
      breadcrumb: ['root', 'readyToPay', 'wrongfundPayment', 'wrongfundPaymentPayDetail'],
      pageLevel: { form: [2] },
    },
  },

  //ยกเลิกเตรียมจ่ายเงิน
  cancelPayment: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    cancelPaymentMenu: {
      url: '/cancel-payment',
      text: 'ยกเลิกการเตรียมจ่ายเงิน',
      breadcrumb: ['root', 'cancelPaymentMenu'],
      pageLevel: { form: [2] },
    },
    //ยกเลิกจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
    cancelPaymentDoctorSalary: {
      url: '/cancel-payment/doctor-salary',
      text: 'ยกเลิกการเตรียมจ่ายเงินทดแทน/ค่าตอบแทนแพทย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary'],
      pageLevel: { form: [2] },
    },
    cancelPaymentOfficeDetail: {
      url: '/cancel-payment/doctor-salary/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary', 'cancelPaymentOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelPaymentBankeDetail: {
      url: '/cancel-payment/doctor-salary/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary', 'cancelPaymentBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelPaymentChequeDetail: {
      url: '/cancel-payment/doctor-salary/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary', 'cancelPaymentChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelPaymentMoneyDetail: {
      url: '/cancel-payment/doctor-salary/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary', 'cancelPaymentMoneyDetail'],
      pageLevel: { form: [2] },
    },
    cancelPaymentPromptPayDetail: {
      url: '/cancel-payment/doctor-salary/payment-promptpay-detail',
      text: 'จ่าย - พร้อมเพย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelPaymentDoctorSalary', 'cancelPaymentPromptPayDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกการจ่ายโรงพยาบาล
    cancelHospitalPayment: {
      url: '/cancel-payment/hospital-payment',
      text: 'การจ่ายโรงพยาบาล',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelHospitalPayment'],
      pageLevel: { form: [2] },
    },
    cancelHospitalPaymentOfficeDetail: {
      url: '/cancel-payment/hospital-payment/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelHospitalPayment', 'cancelHospitalPaymentOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelHospitalPaymentBankeDetail: {
      url: '/cancel-payment/hospital-payment/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelHospitalPayment', 'cancelHospitalPaymentBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelHospitalPaymentChequeDetail: {
      url: '/cancel-payment/hospital-payment/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelHospitalPayment', 'cancelHospitalPaymentChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelHospitalPaymentMoneyDetail: {
      url: '/cancel-payment/hospital-payment/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelHospitalPayment', 'cancelHospitalPaymentMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกเตรียมจ่ายเงินสมทบให้นายจ้าง
    cancelRefundToEmployer: {
      url: '/cancel-payment/refund-to-employer',
      text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelRefundToEmployer'],
      pageLevel: { form: [2] },
    },
    cancelRefundToEmployerOfficeDetail: {
      url: '/cancel-payment/refund-to-employer/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelRefundToEmployer', 'cancelRefundToEmployerOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelRefundToEmployerBankeDetail: {
      url: '/cancel-payment/refund-to-employer/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelRefundToEmployer', 'cancelRefundToEmployerBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelRefundToEmployerChequeDetail: {
      url: '/cancel-payment/refund-to-employer/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelRefundToEmployer', 'cancelRefundToEmployerChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelRefundToEmployerMoneyDetail: {
      url: '/cancel-payment/refund-to-employer/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelRefundToEmployer', 'cancelRefundToEmployerMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกเตรียมจ่ายเงินประเภทอื่น
    cancelOtherPayment: {
      url: '/cancel-payment/other-payment',
      text: 'การจ่ายเงินประเภทอื่น',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOtherPayment'],
      pageLevel: { form: [2] },
    },
    cancelOtherPaymentOfficeDetail: {
      url: '/cancel-payment/other-payment/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOtherPayment', 'cancelOtherPaymentOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelOtherPaymentBankeDetail: {
      url: '/cancel-payment/other-payment/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOtherPayment', 'cancelOtherPaymentBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelOtherPaymentChequeDetail: {
      url: '/cancel-payment/other-payment/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOtherPayment', 'cancelOtherPaymentChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelOtherPaymentMoneyDetail: {
      url: '/cancel-payment/other-payment/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOtherPayment', 'cancelOtherPaymentMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกการจ่ายเงินกองทุนเพื่อบริหารสำนักงาน
    cancelOfficeFundPayment: {
      url: '/cancel-payment/officefund-payment',
      text: 'การจ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOfficeFundPayment'],
      pageLevel: { form: [2] },
    },
    cancelOfficeFundPaymentDetail: {
      url: '/cancel-payment/officefund-payment/detail',
      text: 'ตัดจ่าย',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelOfficeFundPayment', 'cancelOfficeFundPaymentDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกการจ่ายผิดกองทุนเงินทดแทน
    cancelWrongfundPayment: {
      url: '/cancel-payment/wrongfund-payment',
      text: 'จ่ายผิดกองทุนเงินทดแทน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelWrongfundPayment'],
      pageLevel: { form: [2] },
    },
    cancelWrongfundOfficeDetail: {
      url: '/cancel-payment/wrongfund-payment/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelWrongfundPayment', 'cancelWrongfundOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelWrongfundBankeDetail: {
      url: '/cancel-payment/wrongfund-payment/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelWrongfundPayment', 'cancelWrongfundBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelWrongfundChequeDetail: {
      url: '/cancel-payment/wrongfund-payment/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelWrongfundPayment', 'cancelWrongfundChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelWrongfundMoneyDetail: {
      url: '/cancel-payment/wrongfund-payment/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelWrongfundPayment', 'cancelWrongfundMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกนำส่งรายการหักภาษี ณ ที่จ่าย
    cancelTaxDeliver: {
      url: '/cancel-payment/tax-deliver',
      text: 'นำส่งรายการหักภาษี ณ ที่จ่าย',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelTaxDeliver'],
      pageLevel: { form: [2] },
    },
    cancelTaxOfficeDetail: {
      url: '/cancel-payment/tax-deliver/payment-office-detail',
      text: 'จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelTaxDeliver', 'cancelTaxOfficeDetail'],
      pageLevel: { form: [2] },
    },
    cancelTaxBankeDetail: {
      url: '/cancel-payment/tax-deliver/payment-bank-detail',
      text: 'จ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelTaxDeliver', 'cancelTaxBankeDetail'],
      pageLevel: { form: [2] },
    },
    cancelTaxChequeDetail: {
      url: '/cancel-payment/tax-deliver/payment-cheque-detail',
      text: 'จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelTaxDeliver', 'cancelTaxChequeDetail'],
      pageLevel: { form: [2] },
    },
    cancelTaxMoneyDetail: {
      url: '/cancel-payment/tax-deliver/payment-money-detail',
      text: 'จ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelTaxDeliver', 'cancelTaxMoneyDetail'],
      pageLevel: { form: [2] },
    },

    //เบิกเงินทดรองจ่าย
    cancelReservePayment: {
      url: '/cancel-payment/reserve-payment',
      text: 'เบิกเงินทดรองจ่าย',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelReservePayment'],
      pageLevel: { form: [2] },
    },
    //รายละเอียดเบิกเงินทดลองจ่าย
    cancelReservePaymentDetail: {
      url: '/cancel-payment/reserve-payment/detail',
      text: 'รายละเอียดเบิกเงินทดลองจ่าย',
      breadcrumb: ['root', 'cancelPaymentMenu', 'cancelReservePayment', 'cancelReservePaymentDetail'],
      pageLevel: { form: [2] },
    },
  },

  //ตัดจ่าย
  cutOffPayment: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    cutOffPaymentMenu: {
      url: '/cut-off-payment',
      text: 'ตัดจ่าย',
      breadcrumb: ['root', 'cutOffPaymentMenu'],
      pageLevel: { form: [2] },
    },
    //ตัดจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
    cutOffPaymentDoctorSalary: {
      url: '/cut-off-payment/doctor-salary',
      text: 'เงินทดแทน/ค่าตอบแทนแพทย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentDoctorSalary'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryOffice: {
      url: '/cut-off-payment/doctor-salary/payment-office',
      text: 'ตัดจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentDoctorSalary', 'cutOffPaymentDoctorSalaryOffice'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryOfficeDetail: {
      url: '/cut-off-payment/doctor-salary/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentDoctorSalary',
        'cutOffPaymentDoctorSalaryOffice',
        'cutOffPaymentDoctorSalaryOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryBank: {
      url: '/cut-off-payment/doctor-salary/payment-bank',
      text: 'ตัดจ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentDoctorSalary', 'cutOffPaymentDoctorSalaryBank'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryBankDetail: {
      url: '/cut-off-payment/doctor-salary/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentDoctorSalary',
        'cutOffPaymentDoctorSalaryBank',
        'cutOffPaymentDoctorSalaryBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryCheque: {
      url: '/cut-off-payment/doctor-salary/payment-cheque',
      text: 'ตัดจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentDoctorSalary', 'cutOffPaymentDoctorSalaryCheque'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryChequeDetail: {
      url: '/cut-off-payment/doctor-salary/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentDoctorSalary',
        'cutOffPaymentDoctorSalaryCheque',
        'cutOffPaymentDoctorSalaryChequeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryMoney: {
      url: '/cut-off-payment/doctor-salary/payment-money',
      text: 'ตัดจ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentDoctorSalary', 'cutOffPaymentDoctorSalaryMoney'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentDoctorSalaryMoneyDetail: {
      url: '/cut-off-payment/doctor-salary/payment-money/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentDoctorSalary',
        'cutOffPaymentDoctorSalaryMoney',
        'cutOffPaymentDoctorSalaryMoneyDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายโรงพยาบาล
    cutOffHospitalPayment: {
      url: '/cut-off-payment/hospital-payment',
      text: 'จ่ายโรงพยาบาล',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffHospitalPayment'],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentOffice: {
      url: '/cut-off-payment/hospital-payment/payment-office',
      text: 'ตัดจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffHospitalPayment', 'cutOffHospitalPaymentOffice'],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentOfficeDetail: {
      url: '/cut-off-payment/hospital-payment/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffHospitalPayment',
        'cutOffHospitalPaymentOffice',
        'cutOffHospitalPaymentOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentBank: {
      url: '/cut-off-payment/hospital-payment/payment-bank',
      text: 'ตัดจ่าย - โอนผ่านธนาคารจังหวัด',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffHospitalPayment', 'cutOffHospitalPaymentBank'],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentBankDetail: {
      url: '/cut-off-payment/hospital-payment/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffHospitalPayment',
        'cutOffHospitalPaymentBank',
        'cutOffHospitalPaymentBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentCheque: {
      url: '/cut-off-payment/hospital-payment/payment-cheque',
      text: 'ตัดจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffHospitalPayment', 'cutOffHospitalPaymentCheque'],
      pageLevel: { form: [2] },
    },
    cutOffHospitalPaymentChequeDetail: {
      url: '/cut-off-payment/hospital-payment/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffHospitalPayment',
        'cutOffHospitalPaymentCheque',
        'cutOffHospitalPaymentChequeDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายคืนเงินสมทบให้นายจ้าง
    cutOffPaymentRefundToEmployer: {
      url: '/cut-off-payment/refund-to-employer',
      text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentRefundToEmployer'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerOffice: {
      url: '/cut-off-payment/refund-to-employer/payment-office',
      text: 'ตัดจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentRefundToEmployer', 'cutOffPaymentRefundToEmployerOffice'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerOfficeDetail: {
      url: '/cut-off-payment/refund-to-employer/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentRefundToEmployer',
        'cutOffPaymentRefundToEmployerOffice',
        'cutOffPaymentRefundToEmployerOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerBank: {
      url: '/cut-off-payment/refund-to-employer/payment-bank',
      text: 'ตัดจ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentRefundToEmployer', 'cutOffPaymentRefundToEmployerBank'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerBankDetail: {
      url: '/cut-off-payment/refund-to-employer/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentRefundToEmployer',
        'cutOffPaymentRefundToEmployerBank',
        'cutOffPaymentRefundToEmployerBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerCheque: {
      url: '/cut-off-payment/refund-to-employer/payment-cheque',
      text: 'ตัดจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentRefundToEmployer', 'cutOffPaymentRefundToEmployerCheque'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerChequeDetail: {
      url: '/cut-off-payment/refund-to-employer/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentRefundToEmployer',
        'cutOffPaymentRefundToEmployerCheque',
        'cutOffPaymentRefundToEmployerChequeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerMoney: {
      url: '/cut-off-payment/refund-to-employer/payment-money',
      text: 'ตัดจ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentRefundToEmployer', 'cutOffPaymentRefundToEmployerMoney'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentRefundToEmployerMoneyDetail: {
      url: '/cut-off-payment/refund-to-employer/payment-money/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentRefundToEmployer',
        'cutOffPaymentRefundToEmployerMoney',
        'cutOffPaymentRefundToEmployerMoneyDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายเงินประเภทอื่น
    cutOffOtherPayment: {
      url: '/cut-off-payment/other-payment',
      text: 'จ่ายคืนเงินประเภทอื่น',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOtherPayment'],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentOffice: {
      url: '/cut-off-payment/other-payment/payment-office',
      text: 'ตัดจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOtherPayment', 'cutOffOtherPaymentOffice'],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentOfficeDetail: {
      url: '/cut-off-payment/other-payment/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffOtherPayment',
        'cutOffOtherPaymentOffice',
        'cutOffOtherPaymentOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentBank: {
      url: '/cut-off-payment/other-payment/payment-bank',
      text: 'ตัดจ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOtherPayment', 'cutOffOtherPaymentBank'],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentBankDetail: {
      url: '/cut-off-payment/other-payment/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffOtherPayment',
        'cutOffOtherPaymentBank',
        'cutOffOtherPaymentBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentCheque: {
      url: '/cut-off-payment/other-payment/payment-cheque',
      text: 'ตัดจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOtherPayment', 'cutOffOtherPaymentCheque'],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentChequeDetail: {
      url: '/cut-off-payment/other-payment/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffOtherPayment',
        'cutOffOtherPaymentCheque',
        'cutOffOtherPaymentChequeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentMoney: {
      url: '/cut-off-payment/other-payment/payment-money',
      text: 'ตัดจ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOtherPayment', 'cutOffOtherPaymentMoney'],
      pageLevel: { form: [2] },
    },
    cutOffOtherPaymentMoneyDetail: {
      url: '/cut-off-payment/other-payment/payment-money/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffOtherPayment',
        'cutOffOtherPaymentMoney',
        'cutOffOtherPaymentMoneyDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายเงินกองทุนเพื่อบริหารสำนักงาน
    cutOffOfficeFundPayment: {
      url: '/cut-off-payment/officefund-payment',
      text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOfficeFundPayment'],
      pageLevel: { form: [2] },
    },
    cutOffOfficeFundPaymentForm: {
      url: '/cut-off-payment/officefund-payment/form',
      text: 'ตัดจ่าย - จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffOfficeFundPayment', 'cutOffOfficeFundPaymentForm'],
      pageLevel: { form: [2] },
    },
    cutOffOfficeFundPaymentDetail: {
      url: '/cut-off-payment/officefund-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffOfficeFundPayment',
        'cutOffOfficeFundPaymentForm',
        'cutOffOfficeFundPaymentDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายเงินผิดกองทุนเงินทดแทน
    cutOffPaymentWrongFund: {
      url: '/cut-off-payment/wrongfund-payment',
      text: 'ตัดจ่ายเงินผิดกองทุนเงินทดแทน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentWrongFund'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundOffice: {
      url: '/cut-off-payment/wrongfund-payment/payment-office',
      text: 'ตัดจ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentWrongFund', 'cutOffPaymentWrongFundOffice'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundOfficeDetail: {
      url: '/cut-off-payment/wrongfund-payment/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentWrongFund',
        'cutOffPaymentWrongFundOffice',
        'cutOffPaymentWrongFundOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundBank: {
      url: '/cut-off-payment/wrongfund-payment/payment-bank',
      text: 'ตัดจ่าย - โอนผ่านธนาคารโดยจังหวัด',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentWrongFund', 'cutOffPaymentWrongFundBank'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundBankDetail: {
      url: '/cut-off-payment/wrongfund-payment/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentWrongFund',
        'cutOffPaymentWrongFundBank',
        'cutOffPaymentWrongFundBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundCheque: {
      url: '/cut-off-payment/wrongfund-payment/payment-cheque',
      text: 'ตัดจ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentWrongFund', 'cutOffPaymentWrongFundCheque'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundChequeDetail: {
      url: '/cut-off-payment/wrongfund-payment/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentWrongFund',
        'cutOffPaymentWrongFundCheque',
        'cutOffPaymentWrongFundChequeDetail',
      ],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundMoney: {
      url: '/cut-off-payment/wrongfund-payment/payment-money',
      text: 'ตัดจ่าย - ธนาณัติ',
      breadcrumb: ['root', 'cutOffPaymentMenu', 'cutOffPaymentWrongFund', 'cutOffPaymentWrongFundMoney'],
      pageLevel: { form: [2] },
    },
    cutOffPaymentWrongFundMoneyDetail: {
      url: '/cut-off-payment/wrongfund-payment/payment-money/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cutOffPaymentMenu',
        'cutOffPaymentWrongFund',
        'cutOffPaymentWrongFundMoney',
        'cutOffPaymentWrongFundMoneyDetail',
      ],
      pageLevel: { form: [2] },
    },
  },

  //**********ยกเลิกการตัดจ่าย**********//
  cancelCutOffPayment: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    cancelCutOffPaymentMenu: {
      url: '/cancel-cut-off-payment',
      text: 'ยกเลิกการจ่ายเงิน',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu'],
      pageLevel: { form: [2] },
    },
    //ยกเลิกตัดจ่ายเงินทดแทน/ค่าตอบแทนแพทย์
    cancelCutOffPaymentDoctorSalary: {
      url: '/cancel-cut-off-payment/doctor-salary',
      text: 'จ่ายเงินทดแทน/ค่าตอบแทนแพทย์',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffPaymentDoctorSalary'],
      pageLevel: { form: [2] },
    },
    //ยกเลิกตัดจ่ายเงินทดแทน/ค่าตอบแทนแพทย์ รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffPaymentDoctorSalaryDetail: {
      url: '/cancel-cut-off-payment/doctor-salary/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cancelCutOffPaymentMenu',
        'cancelCutOffPaymentDoctorSalary',
        'cancelCutOffPaymentDoctorSalaryDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายโรงพยาบาล
    cancelCutOffHospitalPayment: {
      url: '/cancel-cut-off-payment/hospital-payment',
      text: 'จ่ายโรงพยาบาล',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffHospitalPayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายเงินทดแทน/ค่าตอบแทนแพทย์ รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffHospitalDetail: {
      url: '/cancel-cut-off-payment/hospital-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffHospitalPayment', 'cancelCutOffHospitalDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายคืนเงินสมทบให้นายจ้าง
    cancelCutOffRefundToEmployer: {
      url: '/cancel-cut-off-payment/refund-to-employer',
      text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffRefundToEmployer'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายคืนเงินสมทบให้นายจ้าง  รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffRefundToEmployerDetail: {
      url: '/cancel-cut-off-payment/refund-to-employer/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cancelCutOffPaymentMenu',
        'cancelCutOffRefundToEmployer',
        'cancelCutOffRefundToEmployerDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายเงินประเภทอื่น
    cancelCutOffOtherPayment: {
      url: '/cancel-cut-off-payment/other-payment',
      text: 'จ่ายเงินประเภทอื่น',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffOtherPayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายเงินประเภทอื่น รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffOtherPaymentDetail: {
      url: '/cancel-cut-off-payment/other-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffOtherPayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายเงินกองทุนเพื่อบริหารสำนักงาน
    cancelCutOffOfficeFundPayment: {
      url: '/cancel-cut-off-payment/officefund-payment',
      text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffOfficeFundPayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายเงินกองทุนเพื่อบริหารสำนักงาน รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffOfficeFundPaymentDetail: {
      url: '/cancel-cut-off-payment/officefund-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cancelCutOffPaymentMenu',
        'cancelCutOffOfficeFundPayment',
        'cancelCutOffOfficeFundPaymentDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายผิดกองทุนเงินทดแทน
    cancelCutOffWrongfundPayment: {
      url: '/cancel-cut-off-payment/wrongfund-payment',
      text: 'จ่ายผิดกองทุนเงินทดแทน',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffWrongfundPayment'],
      pageLevel: { form: [2] },
    },
    //ยกเลิกตัดจ่ายผิดกองทุนเงินทดแทน รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffWrongfundPaymentDetail: {
      url: '/cancel-cut-off-payment/wrongfund-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'cancelCutOffPaymentMenu',
        'cancelCutOffWrongfundPayment',
        'cancelCutOffWrongfundPaymentDetail',
      ],
      pageLevel: { form: [2] },
    },

    //ยกเลิกตัดจ่ายคืนกองทุน UCEP
    cancelCutOffRefundToUCEP: {
      url: '/cancel-cut-off-payment/refund-to-ucep',
      text: 'จ่ายคืนกองทุน UCEP',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffRefundToUCEP'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกเบิกเงินทดลองจ่าย
    cancelCutOffReservePayment: {
      url: '/cancel-cut-off-payment/reserve-payment',
      text: 'เบิกเงินทดลองจ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffReservePayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกเบิกเงินทดลองจ่าย รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffReservePaymentDetail: {
      url: '/cancel-cut-off-payment/reserve-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffReservePayment', 'cancelCutOffReservePaymentDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกนำส่งรายการหักภาษี ณ ที่จ่าย
    cancelCutOffTaxDeliverPayment: {
      url: '/cancel-cut-off-payment/tax-deliver-payment',
      text: 'นำส่งรายการหักภาษี ณ ที่จ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffTaxDeliverPayment'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกนำส่งรายการหักภาษี ณ ที่จ่าย รายละเอียดข้อมูลตัดจ่าย
    cancelCutOffTaxDeliverPaymentDetail: {
      url: '/cancel-cut-off-payment/tax-deliver-payment/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffTaxDeliverPaymentDetail'],
      pageLevel: { form: [2] },
    },

    //ยกเลิกรายงานเงินคงเหลือประจำวัน
    cancelCutOffSummaryBudgetRequest: {
      url: '/cancel-cut-off-payment/summary-budget-request',
      text: 'รายงานเงินคงเหลือประจำวัน',
      breadcrumb: ['root', 'cancelCutOffPaymentMenu', 'cancelCutOffSummaryBudgetRequest'],
      pageLevel: { form: [2] },
    },
  },

  cutReview: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
  },

  taxDeliver: {
    root: {
      url: '#',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    //ตัดจ่ายนำส่งรายการหักภาษี ณ ที่จ่าย
    taxDeliverReadyToPay: {
      url: '/tax-deliver/readytopay',
      text: 'บันทึกเตรียมจ่าย',
      breadcrumb: ['root', 'taxDeliverReadyToPay'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayOffice: {
      url: '/tax-deliver/readytopay/payment-office',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayOffice'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayOfficeDetail: {
      url: '/tax-deliver/readytopay/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayOffice', 'taxDeliverReadyToPayOfficeDetail'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayBank: {
      url: '/tax-deliver/readytopay/payment-bank',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - โอนผ่านธนาคารจังหวัด',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayBank'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayBankDetail: {
      url: '/tax-deliver/readytopay/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayBank', 'taxDeliverReadyToPayBankDetail'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayCheque: {
      url: '/tax-deliver/readytopay/payment-cheque',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayCheque'],
      pageLevel: { form: [2] },
    },
    taxDeliverReadyToPayChequeDetail: {
      url: '/tax-deliver/readytopay/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'taxDeliverReadyToPay', 'taxDeliverReadyToPayCheque', 'taxDeliverReadyToPayChequeDetail'],
      pageLevel: { form: [2] },
    },

    //ตัดจ่ายนำส่งรายการหักภาษี ณ ที่จ่าย
    taxDeliverCutOffPayment: {
      url: '/tax-deliver/cut-off-payment',
      text: 'บันทึกตัดจ่าย',
      breadcrumb: ['root', 'taxDeliverCutOffPayment'],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentOffice: {
      url: '/tax-deliver/cut-off-payment/payment-office',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - รับเงิน ณ สำนักงาน',
      breadcrumb: ['root', 'taxDeliverCutOffPayment', 'taxDeliverCutOffPaymentOffice'],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentOfficeDetail: {
      url: '/tax-deliver/cut-off-payment/payment-office/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'taxDeliverCutOffPayment',
        'taxDeliverCutOffPaymentOffice',
        'taxDeliverCutOffPaymentOfficeDetail',
      ],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentBank: {
      url: '/tax-deliver/cut-off-payment/payment-bank',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - โอนผ่านธนาคารจังหวัด',
      breadcrumb: ['root', 'taxDeliverCutOffPayment', 'taxDeliverCutOffPaymentBank'],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentBankDetail: {
      url: '/tax-deliver/cut-off-payment/payment-bank/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'taxDeliverCutOffPayment',
        'taxDeliverCutOffPaymentBank',
        'taxDeliverCutOffPaymentBankDetail',
      ],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentCheque: {
      url: '/tax-deliver/cut-off-payment/payment-cheque',
      text: 'นำส่งภาษีหัก​ ณ ที่จ่าย - ส่งเช็คทางไปรษณีย์',
      breadcrumb: ['root', 'taxDeliverCutOffPayment', 'taxDeliverCutOffPaymentCheque'],
      pageLevel: { form: [2] },
    },
    taxDeliverCutOffPaymentChequeDetail: {
      url: '/tax-deliver/cut-off-payment/payment-cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: [
        'root',
        'taxDeliverCutOffPayment',
        'taxDeliverCutOffPaymentCheque',
        'taxDeliverCutOffPaymentChequeDetail',
      ],
      pageLevel: { form: [2] },
    },
  },

    //บันทึกใบสำคัญรับเงินชนิดเล่ม
    receiptManual: {
      root: {
        url: '#',
        text: 'งานการเงินจ่าย',
        breadcrumb: ['root'],
        pageLevel: { list: [2] },
      },
      receiptManualMenu: {
        url: '/receipt-manual',
        text: 'บันทึกใบสำคัญรับเงินชนิดเล่ม',
        breadcrumb: ['root', 'receiptManualMenu'],
        pageLevel: { form: [2] },
      },
      //จ่ายเงินทดแทน/ค่าตอบแทนแพทย์
      receiptManualDoctorSalary: {
        url: '',
        text: 'จ่ายเงินทดแทน/ค่าตอบแทนแพทย์',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualDoctorSalary'],
        pageLevel: { form: [2] },
      },


      //จ่ายโรงพยาบาล
      receiptManualHospitalPayment: {
        url: '',
        text: 'จ่ายโรงพยาบาล',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualHospitalPayment'],
        pageLevel: { form: [2] },
      },


      //จ่ายคืนเงินสมทบให้นายจ้าง
      receiptManualRefundToEmployer: {
        url: '',
        text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualRefundToEmployer'],
        pageLevel: { form: [2] },
      },


      //จ่ายเงินประเภทอื่น
      receiptManualOtherPayment: {
        url: '',
        text: 'จ่ายเงินประเภทอื่น',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualOtherPayment'],
        pageLevel: { form: [2] },
      },


      //จ่ายเงินกองทุนเพื่อบริหารสำนักงาน
      receiptManualOfficeFundPayment: {
        url: '',
        text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualOfficeFundPayment'],
        pageLevel: { form: [2] },
      },
      

      //จ่ายเงินผิดกองทุนเงินทดแทน : งานเงินจ่าย/งานเงินรับ
      receiptManualWrongfundPayment: {
        url: '',
        text: 'จ่ายเงินผิดกองทุนเงินทดแทน',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualWrongfundPayment'],
        pageLevel: { form: [2] },
      },


      //นำส่งภาษีหัก ณ ที่จ่าย TaxDeliverPayment
      receiptManualTaxDeliverPayment: {
        url: '/receipt-manual/tax-deliver',
        text: 'นำส่งภาษีหัก ณ ที่จ่าย',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPayment'],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentDetail: {
        url: '/receipt-manual/tax-deliver/detail',
        text: 'รายละเอียดข้อมูลตัดจ่าย',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPaymentDetail'],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentOffice: {
        url: '/receipt-manual/tax-deliver/payment-office',
        text: 'บันทึกข้อมูลใบสำคัญรับเงินชนิดเล่ม - รับเงิน ณ สำนักงาน',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPaymentOffice'],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentOfficeDetail: {
        url: '/receipt-manual/tax-deliver/payment-office/detail',
        text: 'รายละเอียดข้อมูลตัดจ่าย',
        breadcrumb: [
          'root',
          'receiptManualTaxDeliverPayment',
          'receiptManualTaxDeliverPaymentOffice',
          'receiptManualTaxDeliverPaymentOfficeDetail',
        ],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentBank: {
        url: '/receipt-manual/tax-deliver/payment-bank',
        text: 'บันทึกข้อมูลใบสำคัญรับเงินชนิดเล่ม - รับเงิน ณ สำนักงาน',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPaymentBank'],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentBankDetail: {
        url: '/receipt-manual/tax-deliver/payment-bank/detail',
        text: 'รายละเอียดข้อมูลตัดจ่าย',
        breadcrumb: [
          'root',
          'receiptManualTaxDeliverPayment',
          'receiptManualTaxDeliverPaymentBank',
          'receiptManualTaxDeliverPaymentBankDetail',
        ],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentCheque: {
        url: '/receipt-manual/tax-deliver/payment-cheque',
        text: 'บันทึกข้อมูลใบสำคัญรับเงินชนิดเล่ม - รับเงิน ณ สำนักงาน',
        breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPaymentCheque'],
        pageLevel: { form: [2] },
      },
      receiptManualTaxDeliverPaymentChequeDetail: {
        url: '/receipt-manual/tax-deliver/payment-cheque/detail',
        text: 'รายละเอียดข้อมูลตัดจ่าย',
        breadcrumb: [
          'root',
          'receiptManualTaxDeliverPayment',
          'receiptManualTaxDeliverPaymentCheque',
          'receiptManualTaxDeliverPaymentChequeDetail',
        ],
        pageLevel: { form: [2] },
      },
    },

  //   //จ่ายโรงพยาบาล
  //   receiptManualHospitalPayment: {
  //     url: '',
  //     text: 'จ่ายโรงพยาบาล',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualHospitalPayment'],
  //     pageLevel: { form: [2] },
  //   },

  //   //จ่ายคืนเงินสมทบให้นายจ้าง
  //   receiptManualRefundToEmployer: {
  //     url: '',
  //     text: 'จ่ายคืนเงินสมทบให้นายจ้าง',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualRefundToEmployer'],
  //     pageLevel: { form: [2] },
  //   },

  //   //จ่ายเงินประเภทอื่น
  //   receiptManualOtherPayment: {
  //     url: '',
  //     text: 'จ่ายเงินประเภทอื่น',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualOtherPayment'],
  //     pageLevel: { form: [2] },
  //   },

  //   //จ่ายเงินกองทุนเพื่อบริหารสำนักงาน
  //   receiptManualOfficeFundPayment: {
  //     url: '',
  //     text: 'จ่ายเงินกองทุนเพื่อบริหารสำนักงาน',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualOfficeFundPayment'],
  //     pageLevel: { form: [2] },
  //   },

  //   //จ่ายเงินผิดกองทุนเงินทดแทน : งานเงินจ่าย/งานเงินรับ
  //   receiptManualWrongfundPayment: {
  //     url: '',
  //     text: 'จ่ายเงินผิดกองทุนเงินทดแทน',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualWrongfundPayment'],
  //     pageLevel: { form: [2] },
  //   },

  //   //นำส่งภาษีหัก ณ ที่จ่าย TaxDeliverPayment
  //   receiptManualTaxDeliverPayment: {
  //     url: '',
  //     text: 'นำส่งภาษีหัก ณ ที่จ่าย',
  //     breadcrumb: ['root', 'receiptManualMenu', 'receiptManualTaxDeliverPayment'],
  //     pageLevel: { form: [2] },
  //   },
  // },

  controlRegistration: {
    root: {
      url: '#',
      text: 'งานการเงินจ่าย',
      breadcrumb: ['root'],
      pageLevel: { list: [2] },
    },
    controlRegistrationHospital: {
      url: '/control-registration/hospital',
      text: 'ทะเบียนคุมจ่ายเงินโรงพยาบาล',
      breadcrumb: ['root', 'controlRegistrationHospital'],
      pageLevel: { form: [2] },
    },
    controlRegistrationHospitalDetail: {
      url: '/control-registration/hospital/detail',
      text: 'รายละเอียดข้อมูลทะเบียนคุมจ่ายเงินโรงพยาบาล',
      breadcrumb: ['root', 'controlRegistrationHospital', 'controlRegistrationHospitalDetail'],
      pageLevel: { form: [2] },
    },
    controlRegistrationMed: {
      url: '/control-registration/med',
      text: 'ทะเบียนคุมจ่ายค่าตอบแทนแพทย์',
      breadcrumb: ['root', 'controlRegistrationMed'],
      pageLevel: { form: [2] },
    },
    controlRegistrationMedDetail: {
      url: '/control-registration/med/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'controlRegistrationMed', 'controlRegistrationMedDetail'],
      pageLevel: { form: [2] },
    },
    controlRegistrationCheque: {
      url: '/control-registration/cheque',
      text: 'ทะเบียนคุมเช็ค',
      breadcrumb: ['root', 'controlRegistrationCheque'],
      pageLevel: { form: [2] },
    },
    controlRegistrationChequeDetail: {
      url: '/control-registration/cheque/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'controlRegistrationCheque', 'controlRegistrationChequeDetail'],
      pageLevel: { form: [2] },
    },
    controlRegistrationPostal: {
      url: '/control-registration/postal',
      text: 'ทะเบียนคุมธนาณัติ',
      breadcrumb: ['root', 'controlRegistrationPostal'],
      pageLevel: { form: [2] },
    },
    controlRegistrationPostalDetail: {
      url: '/control-registration/postal/detail',
      text: 'รายละเอียดข้อมูลตัดจ่าย',
      breadcrumb: ['root', 'controlRegistrationPostal', 'controlRegistrationPostalDetail'],
      pageLevel: { form: [2] },
    },
  },
};
