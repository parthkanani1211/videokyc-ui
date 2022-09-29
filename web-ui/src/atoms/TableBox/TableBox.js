import styled from "styled-components";
import { Box } from "../Box";

export const BoxStyle = styled(Box)`
  .search-input {
    input {
      background: #f9f9f9;
      border: 1px solid rgba(17, 17, 17, 0.15);
      border-radius: 4px;
      height: 40px;
      padding-left: 30px;
      &:hover,
      :active,
      :focus {
        outline: none;
      }
    }
  }

  .card-header {
    border-bottom: none !important;
  }
  .card {
    padding-top: 20px;
    padding-bottom: 20px;
    border: none !important;
  }

  @media only screen and (max-width: 600px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const BoxTableStyle = styled(Box)`
  thead > :first-child {
    background-color: #f4f4f4;
    div {
      font-weight: 500 !important;
      white-space: nowrap;
    }
  }
  thead > :nth-child(2) {
    height: 60px;
    input {
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: white !important;
    }
  }
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #f5f7ff;
  }
  .table thead th,
  .table th,
  .table td {
    border-top: none !important;
    border-bottom: none !important;
  }
  table .badge {
    font-weight: 400 !important;
    text-transform: lowercase;
    font-size: 13px;
    ::first-letter {
      text-transform: uppercase;
    }
  }
  .pagination {
    margin-top: 30px;
    justify-content: flex-end !important;
  }
  .page-item.active .page-link {
    color: white;
    background-color: #006cfb;
    border-color: #006cfb;
  }
  .page-link {
    color: #006cfb;
  }
  .entry-input {
    input {
      background: white !important;
      border: 1px solid rgba(17, 17, 17, 0.15);
      border-radius: 4px;
      height: 40px;
      padding-left: 10px;
      &:hover,
      :active,
      :focus {
        outline: none;
      }
    }
  }
  .entry-input input {
    width: 60px;
  }
  input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
  }
  tbody tr td {
    white-space: nowrap;
  }
`;
