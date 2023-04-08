export interface Complaint {
  category: string;
  createdBy: string;
  createdOn: string;
  id: number;
  reference: string;
  resolution: any;
  resolvedOn: any;
  status: string;
  updatedOn: any;
  commentViewModel?: any[];
  disputeAttachmentViewModel?: any[];
  disputeHistoryViewModel?: any[];
}
