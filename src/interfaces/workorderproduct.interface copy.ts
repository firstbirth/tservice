// workorderproduct.interface.ts

export interface WorkOrderProduct {
    workOrderId: number;
    rowId: number;
    product: string;
    quantity: number;
    price: number;
    amount: number;
    storagePlace: string;
    status: 'NOTISSUED' | 'ISSUED' | 'INPROCESS';
    dateIssued: number; 
    performerId: number;
    performer: string;
}

