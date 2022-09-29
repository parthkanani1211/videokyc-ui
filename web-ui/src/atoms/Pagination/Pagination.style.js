import styled from "styled-components";
import Pagination from "rc-pagination";

export const RcPagination = styled(Pagination)`
  padding: 10px;
  list-style: none;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  li {
    width: 30px;
    height: 30px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #fff;
  }
  .rc-pagination-prev,
  .rc-pagination-next {
    padding: 4px;
  }
  li.rc-pagination-item-active {
    border: 1px solid #000;
    background: #000;
    color: #fff;
  }
  .rc-pagination-item:hover {
    border: 1px solid #000;
  }
`;
