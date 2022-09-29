import { KYC_STATUSES } from "../../store/constants/videoKyc";

const getBadge = (status) => {
  switch (status) {
    case KYC_STATUSES.PENDING:
    case KYC_STATUSES.INITIATED:
      return "#FF5722";
    case KYC_STATUSES.APPROVED:
      return "#4CAF50";
    case KYC_STATUSES.IN_PROGRESS:
    case KYC_STATUSES.COMPLETED:
      return "#03A9F4";
    case KYC_STATUSES.CANCELED:
    case KYC_STATUSES.TIMEOUT:
      return "#BDBDBD";
    case KYC_STATUSES.REJECTED:
      return "#F44336";
    case KYC_STATUSES.PENDING_APPROVAL:
      return "#303F9F";
    default:
      return "primary";
  }
};

export default {
  getBadge,
};
