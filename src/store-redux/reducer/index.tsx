import { reserve } from './reserve';
import { masterData } from './masterData';
import { readytopay } from './readytopay';
import { cancelPayment } from './cancelPayment';
import { cutOffPaymentDoctor } from './cutOffPayment';
import { cancelCutOffPayment } from './cancelCutOffPayment';
import { taxDeliverCutOffPayment } from './taxDeliver';
import { receiptManualTaxDeliver } from './receiptManual';
import { controlRegistration } from './control-registration';

const reducer = {
  ...reserve,
  ...masterData,
  ...readytopay,
  ...cancelPayment,
  ...controlRegistration,
  ...cutOffPaymentDoctor,
  ...cancelCutOffPayment,
  ...taxDeliverCutOffPayment,
  ...receiptManualTaxDeliver,
};

export default reducer;
