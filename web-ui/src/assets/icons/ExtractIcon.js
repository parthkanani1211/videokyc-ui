import * as React from "react";

function ExtractIcon(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 190 212" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C6.716 0 0 6.716 0 15v172c0 8.284 6.716 15 15 15h74.319C79.175 190.746 73 175.844 73 159.5c0-35.07 28.43-63.5 63.5-63.5 11.463 0 22.217 3.037 31.5 8.351V15c0-8.284-6.716-15-15-15H15z"
        fill="#0D71FF"
      />
      <path
        stroke="#fff"
        strokeWidth={13}
        strokeLinecap="round"
        d="M32.5 39.5h97M32.5 64.5h57M32.5 89.5h32"
      />
      <circle cx={140} cy={162} r={50} fill="#FD8D09" />
      <path
        d="M179 162l-40-23.094v46.188L179 162zm-79 4h43v-8h-43v8z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoExtractIcon = React.memo(ExtractIcon);
export default MemoExtractIcon;
