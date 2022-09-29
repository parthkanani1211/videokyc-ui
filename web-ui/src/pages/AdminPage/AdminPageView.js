import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { CPagination } from "@coreui/react";

import MemoRefresh from "assets/icons/Refresh";
import MemoSearchIcon from "assets/icons/SearchIcon";
import { BoxStyle, BoxTableStyle } from "atoms/TableBox";
import { Box, Button, Flex, Grid, SelectField, TableColumn, Text, NoItemComponent } from "atoms";

import { CircularProgress, CDataTable, CBadge, CCard } from "../../components";
import { KYC_STATUSES } from "store/constants/videoKyc";

const fields = [
  { key: "id", label: "Id", _style: { width: "2%" } },
  { key: "initiatedBy", label: "Customer Name" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "createdOn", label: "Start Time" },
  { key: "updatedOn", label: "Last updated on" },
  { key: "videoKYCRequestStatus", label: "Status" },
  {
    key: "start_session",
    label: "Action",
    sorter: false,
    filter: false,
  },
];

const AdminPageView = ({ onRefreshClick, requestListPending, requestListData, requestHelper }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterPageSize, setFilterPageSize] = useState(requestListData?.length || 0);
  const [column, setColumn] = useState({});

  useEffect(() => {
    setFilterPageSize(requestListData?.length);
    executeMobileTableView()
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
          //
          col.setAttribute("data-th", headertext[j]);
          let headertextTrim = headertext[j];
          switch (headertext[j]) {
            case "Customer Name":
              // code block
              headertextTrim = "CustomerName"
              break;
            case "Mobile Number":
              headertextTrim = "MobileNumber"
              // code block
              break;
            case "Start Time":
              headertextTrim = "StartTime"
              // code block
              break;
            case "Last updated on":
              headertextTrim = "Lastupdatedon"
            // code block               
            default:
            // code block
          };
          col.setAttribute("class", "customDataTableRow" + headertextTrim);

          //
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
              items={requestListData}
              fields={fields}
              columnFilter={false}
              itemsPerPage={pageSize}
              hover={requestListData.length > 0}
              sorter
              tableFilterValue={search}
              striped={requestListData.length > 0}
              pagination={false}
              activePage={page}
              noItemsViewSlot={<NoItemComponent />}
              footer={false}
              // noItemsViewSlot={<NoItem />}
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
                initiatedBy: (
                  <TableColumn
                    onChange={(value) => setColumn((c) => ({ ...c, initiatedBy: value }))}
                    placeholder="Customer Name"
                  />
                ),
                mobileNumber: (
                  <TableColumn
                    onChange={(value) => setColumn((c) => ({ ...c, mobileNumber: value }))}
                    placeholder="Mobile Number"
                  />
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
              }}
              onFilteredItemsChange={(list) => setFilterPageSize(list.length)}
              columnFilterValue={{
                id: column.id || "",
                initiatedBy: column.initiatedBy || "",
                mobileNumber: column.mobileNumber || "",
                createOn: column.createOn || "",
                updatedOn: column.updatedOn || "",
                videoKYCRequestStatus: column.videoKYCRequestStatus || "",
              }}
              scopedSlots={{
                createdOn: (item) => (
                  <td>{moment(item.createdOn).format("DD/MM/YYYY HH:mm:ss")}</td>
                ),
                updatedOn: (item) => (
                  <td>{moment(item.updatedOn).format("DD/MM/YYYY HH:mm:ss")}</td>
                ),
                videoKYCRequestStatus: (item) => (
                  <td>
                    <CBadge color={requestHelper.getBadge(item.videoKYCRequestStatus)}>
                      {item.videoKYCRequestStatus?.replace("_", " ")?.toLowerCase()}
                    </CBadge>
                  </td>
                ),
                start_session: (item) => (
                  <td className="py-2 last-col">
                    <Link
                      to={"/audit-report/" + item.id}
                      disabled={
                        KYC_STATUSES.CANCELED === item.videoKYCRequestStatus ||
                        KYC_STATUSES.TIMEOUT === item.videoKYCRequestStatus
                      }
                    >
                      <Button
                        color="blue.500"
                        variant="primary"
                        size="sm"
                        disabled={[
                          KYC_STATUSES.INITIATED,
                          KYC_STATUSES.CANCELED,
                          KYC_STATUSES.TIMEOUT,
                          KYC_STATUSES.IN_PROGRESS,
                          KYC_STATUSES.PENDING,
                        ].includes(item.videoKYCRequestStatus)}
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                ),
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

                    <Flex pl="50px" alignItems="center">
                      <Text as="h5" fontSize="14px" my="8px">
                        Show
                      </Text>
                      <Box className="entry-input" px="5px">
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
                          width="30px"
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
        ) : (
          "No data"
        )}
      </BoxTableStyle>
    );
  };

  return (
    <BoxStyle mt="3rem">
      {/* <CCard>
        <CCard.Header>
          <Box display="flex" justifyContent="space-between">
            <Box py={1}>
              <Typography variant="h6">Customer requests</Typography>
            </Box>
            <Box textAlign="right">
              <IconButton
                color="primary"
                size="xlarge"
                variant="contained"
                onClick={() => onRefreshClick()}
              >
                <Icon iconName="cached" />
              </IconButton>
            </Box>
          </Box>
        </CCard.Header>
        <CCard.Body>{renderContent()}</CCard.Body>
      </CCard> */}

      <CCard>
        <CCard.Header>
          <Grid
            gridTemplateColumns={{ xs: "1fr", md: "3fr 1fr" }}
            gridGap="20px"
            justifyContent="space-between"
            alignItems={{ md: "center" }}
          >
            <Flex my={{ md: 3 }}>
              <Text fontSize={{ xs: "18px", md: "20px" }} fontWeight="600">
                All Requests
              </Text>
            </Flex>
            <Grid gridAutoFlow="column" gridGap="10px" order={{ xs: 0, md: 1 }}>
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
                <Box position="absolute" top="9px" left="10px" zIndex="1">
                  <MemoSearchIcon />
                </Box>
                <Box
                  as="input"
                  type="text"
                  width="100%"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </CCard.Header>
        <CCard.Body>{renderContent()}</CCard.Body>
      </CCard>
    </BoxStyle>
  );
};

export default AdminPageView;
