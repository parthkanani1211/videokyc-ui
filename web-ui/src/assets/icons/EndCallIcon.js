import * as React from "react";

function EndCallIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path d="M23.7 11.8l-1.4-1.4c-4.9-4.9-16.5-4.2-20.7 0L.2 11.8c-.4.4-.4 1 0 1.4L3 15.9c.4.4 1 .4 1.4 0L7 13.3V9.7c1-1 9.1-1 10 0v3.7l2.6 2.6c.4.4 1 .4 1.4 0l2.8-2.8c.3-.4.3-1.1-.1-1.4z" />
    </svg>
  );
}

const MemoEndCallIcon = React.memo(EndCallIcon);
export default MemoEndCallIcon;
