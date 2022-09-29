export const LOGIN_TYPE = {
  ADMIN: "Admin",
  AUDITOR: "Auditor",
  AGENT: "Maker",
  CHECKER: "Checker",
  CUSTOMER: "Customer",
};

export const LOGIN_TYPE_LABEL = {
  [LOGIN_TYPE.AGENT]: "Maker",
  [LOGIN_TYPE.CUSTOMER]: "Customer",
  [LOGIN_TYPE.AUDITOR]: "Auditor",
  [LOGIN_TYPE.ADMIN]: "Admin",
  [LOGIN_TYPE.CHECKER]: "Checker",
};

export const KYC_DOCUMENT_TYPES = {
  PAN: "PAN",
  AADHAR: "AADHAR",
  FACE: "FACE",
  SIGN: "SIGN",
};

export const KYC_DOCUMENT_LIST = [
  {
    type: KYC_DOCUMENT_TYPES.PAN,
    label: "PAN",
    frontAndBack: false,
  },
  {
    type: KYC_DOCUMENT_TYPES.AADHAR,
    label: "Aadhaar",
    frontAndBack: true,
  },
  {
    type: KYC_DOCUMENT_TYPES.FACE,
    label: "Face",
    frontAndBack: true,
  },
  {
    type: KYC_DOCUMENT_TYPES.SIGN,
    label: "Signature",
    frontAndBack: false,
  },
];

export const CUSTOMER_DOCUMENT_STATUSES = {
  IN_PROGRESS: "IN_PROGRESS",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

export const KYC_STATUSES = {
  INITIATED: "INITIATED",
  IN_PROGRESS: "IN_PROGRESS",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
  TIMEOUT: "TIMEOUT",
};

export const KYC_STATUSES_LABEL = {
  INITIATED: "Initiated",
  IN_PROGRESS: "In Progress",
  PENDING: "Pending",
  COMPLETED: "Completed",
  PENDING_APPROVAL: "Approval Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CANCELED: "Canceled",
  TIMEOUT: "Timeout",
};

export const CUSTOMER_DOCUMENT_STATUS_LIST = {
  [CUSTOMER_DOCUMENT_STATUSES.IN_PROGRESS]: {
    label: "In-progress",
    color: "#FFDD2C",
  },
  [CUSTOMER_DOCUMENT_STATUSES.FAILED]: {
    label: "Failed",
    color: "red",
  },
  [CUSTOMER_DOCUMENT_STATUSES.SUCCESS]: {
    label: "Success",
    color: "#7FFF43",
  },
};
