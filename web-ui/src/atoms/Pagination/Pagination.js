import React, { useMemo, useCallback } from "react";
import css from "@styled-system/css";
import styled from "styled-components";

import { Box } from "atoms/Box";
import { Flex } from "atoms/Flex";
import { PAGE_SIZE } from "store/constants/pages";
import { usePageNumber } from "hooks/usePageNumber";
import MemoChevronLeft from "assets/icons/ChevronLeft";
import MemoChevronRight from "assets/icons/ChevronRight";
import { useLocationQuery, useLocationQuerySet } from "hooks/useLocationQuery";

import { RcPagination } from "./Pagination.style";

const variants = {
  default: css({
    "li.rc-pagination-item": {
      padding: "5px",
      borderRadius: "6px",
      "&:hover, &:focus": {
        border: "1px solid",
        borderColor: "black",
        outline: "0",
      },

      "&.rc-pagination-item-active": {
        bg: "black",
        borderColor: "black",
        a: {
          color: "white",
        },
      },
    },
    ".rc-pagination-jump-next, .rc-pagination-jump-prev": {
      border: 0,
      boxShadow: "none",
      button: {
        display: "none",
      },
    },
    ".rc-pagination-options": {
      display: "none",
    },
  }),
};

const StyledPagination = styled(RcPagination)`
  ${({ variant }) =>
    variants[
      variant && Object.keys(variants).includes(variant) ? variant : "default"
    ]}
`;

const getInt = (arg) => {
  if (arg) {
    if (typeof arg === "string") {
      return parseInt(arg, 10);
    }
    return arg;
  }
  return 0;
};

const prevIcon = (disabled) => (
  <MemoChevronLeft
    width="20px"
    height="20px"
    color={disabled ? "gray.200" : "gray.600"}
  />
);

const nextIcon = (disabled) => (
  <MemoChevronRight
    width="20px"
    height="20px"
    color={disabled ? "gray.200" : "gray.600"}
  />
);

export const Pagination = ({
  totalRecords,
  pageSize = PAGE_SIZE,
  pageSizeOptions,
  variant,
}) => {
  const setQuery = useLocationQuerySet();
  const currentPage = usePageNumber();
  const total = useMemo(() => getInt(totalRecords), [totalRecords]);
  const pageSizeInt = useMemo(() => getInt(pageSize), [pageSize]);
  const currentPageInt = useMemo(() => getInt(currentPage), [currentPage]);
  const searchParams = useLocationQuery();

  const onPageChangeHandler = useCallback(
    (page, take) => {
      if (page && take) {
        searchParams.page = `${page}`;
      } else {
        delete searchParams.page;
      }
      setQuery(searchParams);
    },
    [setQuery, searchParams]
  );

  const onChange = useCallback(
    (current, pageListLength) => {
      onPageChangeHandler(current, pageListLength);
    },
    [onPageChangeHandler]
  );

  return (
    <Flex justifyContent="center" alignItems="center" bg="white" height="5rem">
      <StyledPagination
        current={currentPageInt}
        total={total}
        onChange={onChange}
        pageSize={pageSizeInt}
        pageSizeOptions={pageSizeOptions}
        prevIcon={prevIcon(currentPageInt <= 1)}
        nextIcon={nextIcon(currentPageInt * pageSizeInt >= total)}
        showTitle={false}
        variant={variant}
        jumpNextIcon={
          <Box position="absolute" top="12px">
            ...
          </Box>
        }
        jumpPrevIcon={
          <Box position="absolute" top="12px">
            ...
          </Box>
        }
      />
    </Flex>
  );
};
