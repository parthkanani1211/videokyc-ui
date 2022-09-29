import * as React from "react";

function CaptureIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 240 235" fill="none" {...props}>
      <path
        d="M67 10H40c-16.569 0-30 13.431-30 30v32.5M173 10h27c16.569 0 30 13.431 30 30v33M173 225h26.803c16.569 0 30-13.431 30-30v-33M66 225H40c-16.569 0-30-13.431-30-30v-33"
        stroke="currentColor"
        strokeWidth={20}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66.5 105V81.5c0-11.046 8.954-20 20-20H158c11.046 0 20 8.954 20 20V105"
        stroke="currentColor"
        strokeWidth={20}
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46 132c-5.523 0-10 4.477-10 10s4.477 10 10 10h10v22c0 11.046 8.954 20 20 20h93c11.046 0 20-8.954 20-20v-22h9.5c5.523 0 10-4.477 10-10s-4.477-10-10-10H46z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoCaptureIcon = React.memo(CaptureIcon);
export default MemoCaptureIcon;
