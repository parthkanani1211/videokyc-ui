import moment from "moment";

import React, { useEffect, useState } from "react";
import { CPagination } from "@coreui/react";

import { CCard, CBadge, CDataTable, CircularProgress } from "../../components";

import MemoRefresh from "assets/icons/Refresh";
import { VideoKYCProcessModal } from "molecules";
import MemoSearchIcon from "assets/icons/SearchIcon";
import { KYC_STATUSES } from "store/constants/videoKyc";
import { BoxStyle, BoxTableStyle } from "atoms/TableBox";
import { Box, Button, Flex, Grid, SelectField, TableColumn, Text, NoItemComponent } from "atoms";

const fields = [
  { key: "id", label: "Id", _style: { width: "2%" } },
  { key: "createdOn", label: "Start time" },
  { key: "updatedOn", label: "Last updated on" },
  { key: "videoKYCRequestStatus", label: "Status" },
  // { key: "videoSessionAttendeesDto", label: "# of Sessions" },
  {
    key: "start_session",
    label: "Action",
    sorter: false,
    filter: false,
  },
];

const CustomerView = ({
  onStartNewVideoKycClick,
  requestListPending,
  requestListData,
  requestHelper,
  onRestartClick,
  onRefreshClick,
  pendingState,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState({});
  const [filterPageSize, setFilterPageSize] = useState(requestListData?.length || 0);

  useEffect(() => {
    setFilterPageSize(requestListData?.length);
   
    executeMobileTableView();
  }, [requestListData]);
  const executeMobileTableView = () => {
    if (requestListData?.length) {
      var headertext = [],
        headers = document.querySelectorAll(".customDataTable th"),
        tablebody = document.querySelector(".customDataTable tbody");
      for (var i = 0; i < headers.length; i++) {
        var current = headers[i];
        headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
      }
      for (var i = 0, row; row = tablebody.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
          col.setAttribute("data-th", headertext[j]);
          col.setAttribute("data-th", headertext[j]);
          let headertextTrim = headertext[j] ? headertext[j].toLocaleLowerCase() : "";
          switch (headertextTrim) {
            case "customer name":
              // code block
              headertextTrim = "CustomerName"
              break;
            case "id":
              headertextTrim = "Id"
              break;
            case "status":
              headertextTrim = "Status"
            case "action":
              headertextTrim = "Action"
              break;
            case "mobile number":
              headertextTrim = "MobileNumber"
              // code block
              break;
            case "start time":
              headertextTrim = "CustomerName"
              // headertextTrim = "StartTime"
              // code block
              break;
            case "last updated on":
              headertextTrim = "Lastupdatedon"
            // code block               
            default:
            // code block
          };
          col.setAttribute("class", "customDataTableRow" + headertextTrim);
        }
      }
      //AddExpand Functionality
      document.querySelectorAll('.customDataTable .customDataTableRowCustomerName')
        .forEach(e => {
          if (e.getAttribute("listener") != "true") {
            e.addEventListener("click", function () {
              if (this.className.indexOf("currentSelectedROW") < 0) {
                this.classList.add("currentSelectedROW");
                this.parentElement.querySelectorAll("td").forEach(e => {
                  if (e.className.indexOf("customDataTableRowMobileNumber") > -1) {
                    e.classList.add('displayEnableForTableRow')
                  }
                  if (e.className.indexOf("customDataTableRowStartTime") > -1) {
                    e.classList.add('displayEnableForTableRow')
                  }
                  if (e.className.indexOf("customDataTableRowLastupdatedon") > -1) {
                    e.classList.add('displayEnableForTableRow')
                  }
                });
              }
              else {
                this.classList.remove("currentSelectedROW");
                this.parentElement.querySelectorAll("td").forEach(e => {
                  if (e.className.indexOf("customDataTableRowMobileNumber") > -1) {
                    e.classList.remove("displayEnableForTableRow")
                  }
                  if (e.className.indexOf("customDataTableRowStartTime") > -1) {
                    e.classList.remove("displayEnableForTableRow")
                  }
                  if (e.className.indexOf("customDataTableRowLastupdatedon") > -1) {
                    e.classList.remove("displayEnableForTableRow")
                  }
                });
              }
            });
          }
          e.setAttribute("listener", "true");
        });
    }
  }
  const [isVisibleKYCModal, setVisibleKYCModal] = React.useState(false);

  React.useEffect(() => { }, [requestListData]);

  const renderContent = () => {
    if (requestListPending) {
      return (
        <Box textAlign="center">
          <CircularProgress color="primary" />
        </Box>
      );
    }

    return (
      <BoxTableStyle>
        {requestListData ? (
          <>
            <CDataTable
              addTableClasses="customDataTable"
              items={requestListData || []}
              fields={fields}
              columnFilter={false}
              itemsPerPage={pageSize}
              hover={requestListData && requestListData.length > 0}
              sorter
              onFilteredItemsChange={(list) => setFilterPageSize(list.length)}
              striped={requestListData && requestListData.length > 0}
              pagination={false}
              tableFilterValue={search}
              activePage={page}
              noItemsViewSlot={<NoItemComponent />}
              footer={false}
              columnFilterSlot={{
                id: (
                  <Box className="search-input">
                    <Box
                      as="input"
                      width="70px"
                      pl="10px !important"
                      type="text"
                      placeholder="ID"
                      onChange={(e) => {
                        const value = e.target.value;
                        setColumn((c) => ({ ...c, id: value }));
                      }}
                    />
                  </Box>
                ),
                createdOn: (
                  <TableColumn
                    onChange={(value) => setColumn((c) => ({ ...c, createdOn: value }))}
                    placeholder="Start Time"
                  />
                ),
                updatedOn: (
                  <TableColumn
                    onChange={(value) => setColumn((c) => ({ ...c, updatedOn: value }))}
                    placeholder="Last Update on"
                  />
                ),
                videoKYCRequestStatus: (
                  <TableColumn
                    onChange={(value) => setColumn((c) => ({ ...c, videoKYCRequestStatus: value }))}
                    placeholder="Status"
                  />
                ),
                videoSessionAttendeesDto: (
                  <TableColumn
                    onChange={(value) =>
                      setColumn((c) => ({ ...c, videoSessionAttendeesDto: value }))
                    }
                    placeholder="# of Sessions"
                  />
                ),
              }}
              columnFilterValue={{
                id: column.id || "",
                createOn: column.createOn || "",
                updatedOn: column.updatedOn || "",
                videoKYCRequestStatus: column.videoKYCRequestStatus || "",
                videoSessionAttendeesDto: column.videoSessionAttendeesDto || "",
              }}
              scopedSlots={{
                createdOn: (item) => (
                  <td>{moment(item.createdOn).format("DD/MM/YYYY HH:mm:ss")}</td>
                ),
                updatedOn: (item) => (
                  <td>{moment(item.updatedOn).format("DD/MM/YYYY HH:mm:ss")}</td>
                ),
                videoSessionAttendeesDto: (item) => (
                  <td>{item.videoSessionAttendeesDto?.length}</td>
                ),
                videoKYCRequestStatus: (item) => (
                  <td>
                    <CBadge color={requestHelper.getBadge(item.videoKYCRequestStatus)}>
                      {item.videoKYCRequestStatus?.replace("_", " ")?.toLowerCase()}
                    </CBadge>
                  </td>
                ),
                start_session: (item) => {
                  const { videoKYCRequestStatus } = item;
                  return (
                    <td className="py-2 last-col">
                      <Button
                        variant="primary"
                        width="fit-content"
                        type="submit"
                        height="28px"
                        px="10px"
                        disabled={
                          KYC_STATUSES.INITIATED !== videoKYCRequestStatus &&
                          KYC_STATUSES.PENDING !== videoKYCRequestStatus &&
                          KYC_STATUSES.IN_PROGRESS !== videoKYCRequestStatus
                        }
                        onClick={() => onRestartClick(item)}
                      >
                        Join
                      </Button>
                    </td>
                  );
                },
              }}
            />

            {filterPageSize > 0 && (
              <Box width="100%" pt={{ md: "20px" }} pr={{ xs: "15px", md: "unset" }}>
                <Flex
                  alignItems="center"
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                >
                  <Box alignItems="center" display={{ xs: "none", md: "flex" }}>
                    <Text as="h5" fontSize="14px" my="8px">
                      Showing {Math.min((page - 1) * pageSize + 1, filterPageSize)} to{" "}
                      {Math.min(pageSize * page, filterPageSize)} of {filterPageSize} enteries
                    </Text>

                    <Flex pl={{ md: "50px" }} alignItems="center">
                      <Text as="h5" fontSize="14px" my="8px">
                        Show
                      </Text>
                      <Box className="entry-input" px="5px" width="70px">
                        <SelectField
                          value={{ value: pageSize, label: pageSize }}
                          onChange={({ value }) => setPageSize(value)}
                          options={[
                            {
                              value: 5,
                              label: 5,
                            },
                            {
                              value: 10,
                              label: 10,
                            },
                            {
                              value: 20,
                              label: 20,
                            },
                          ]}
                          label=""
                          labelHide
                          noMargin
                          width="10px"
                          menuPlacement="top"
                          isSearchable={false}
                        />
                      </Box>
                      <Text as="h5" fontSize="14px" my="8px">
                        enteries
                      </Text>
                    </Flex>
                  </Box>
                  <Box justifySelf="flex-end">
                    <CPagination
                      onActivePageChange={setPage}
                      pages={
                        parseInt(filterPageSize / pageSize) +
                        (Boolean(filterPageSize % pageSize) ? 1 : 0)
                      }
                      activePage={page}
                    />
                  </Box>
                </Flex>
              </Box>
            )}
          </>
        ) : null}
      </BoxTableStyle>
    );
  };

  const onStartNewVideoKycClickHandler = () => {
    setVisibleKYCModal(true);
  };

  return (
    <>
      <BoxStyle mt={{ xs: "1rem", md: "3rem" }}>
        <CCard>
          <CCard.Header>
            <Flex
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ md: "center" }}
            >
              <Box py={1}>
                <Text
                  as="h5"
                  style={{ fontWeight: "500" }}
                  color="black"
                  fontSize="20px"
                  mb={{ xs: "20px", md: "unset" }}
                >
                  KYC requests
                </Text>
              </Box>
              <Grid gridAutoFlow={{ xs: "row", md: "column" }} gridGap="10px" gridRowGap="20px">
                <Flex order={{ xs: 1, md: 0 }}>
                  <Flex
                    borderRadius="4px"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(0, 108, 251, 0.1)"
                    border="1px solid rgba(0, 108, 251, 0.4)"
                    onClick={onRefreshClick}
                    color="primary"
                    px="15px"
                    cursor="pointer"
                    mr="10px"
                  >
                    <MemoRefresh height="20px" width="20px" />
                    <Text
                      as="h5"
                      style={{ fontWeight: "500" }}
                      color="blue.500"
                      fontSize="14px"
                      my={0}
                      ml="10px"
                    >
                      Refresh
                    </Text>
                  </Flex>
                  <Box className="search-input">
                    <Box position="absolute" top="9px" left="10px" zIndex={1}>
                      <MemoSearchIcon />
                    </Box>
                    <Box
                      as="input"
                      width="100%"
                      type="text"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Box>
                </Flex>
                <Box order={{ xs: 0, md: 1 }}>
                  <Button
                    variant="primary"
                    width="fit-content"
                    type="submit"
                    height="40px"
                    px="20px"
                    color="white"
                    onClick={onStartNewVideoKycClickHandler}
                  >
                    <Text as="h5" style={{ fontWeight: "500" }} fontSize="16px" my="8px">
                      START VIDEO KYC
                    </Text>
                  </Button>
                </Box>
              </Grid>
            </Flex>
          </CCard.Header>
          <CCard.Body>{renderContent()}</CCard.Body>
        </CCard>
      </BoxStyle>
      {isVisibleKYCModal && (
        <VideoKYCProcessModal
          isOpen
          onBackClick={() => setVisibleKYCModal(false)}
          onStartNewVideoKycClick={onStartNewVideoKycClick}
          pendingState={pendingState}
        />
      )}
    </>
  );
};

export default CustomerView;
