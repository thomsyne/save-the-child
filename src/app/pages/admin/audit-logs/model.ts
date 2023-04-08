export interface AuditLogDetails {
    id: number;
    actionType: number;
    severityLevel: string;
    functionType: number;
    modifiedBy: number;
    affectedUser: string;
    oldValue: string;
    newValue: string;
    lastLogin: string;
    ipAddress: number;
    sourceAgent: number;
    createdOn: string;
    modifiedOn: number;
    lastModifiedOn: string;
    periodStart: string;
    periodEnd: string;
  }
