export enum ProducerService {
  paymentManagementService = 'payment-management-service',
}

export enum PaymentManagementServiceEvents {
  FinePaidSuccess = 'fine-paid-success',
  FinePaymentFailed = 'fine-payment-failed',
  FinePaymentProcessing = 'fine-payment-processing',
}

export type ServiceEventMap = {
  [ProducerService.paymentManagementService]: PaymentManagementServiceEvents;
};
