// workorderservice.interface.ts

export interface WorkOrderService {
    workOrderId: number;
    rowId: number;
    service: string;
    quantity: number;
    price: number;
    amount: number;
    status: string;
    state: string;
    dateState: number;
    duration: number;
    performerId: number;
    performer: string;
    dateDone: number;
  }
  