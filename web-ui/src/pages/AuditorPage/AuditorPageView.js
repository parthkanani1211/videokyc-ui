import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { CPagination } from "@coreui/react";

import MemoRefresh from "assets/icons/Refresh";
import MemoSearchIcon from "assets/icons/SearchIcon";
import { KYC_STATUSES } from "store/constants/videoKyc";
import { BoxStyle, BoxTableStyle } from "atoms/TableBox";
import { Box, Button, Flex, Grid, SelectField, TableColumn, Text, NoItemComponent } from "atoms";

import { CircularProgress, CDataTable, CBadge, CCard } from "../../components";

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

const ONGOING_REQUEST = [KYC_STATUSES.COMPLETED, KYC_STATUSES.PENDING_APPROVAL];
const COMPLETED_REQUEST = [KYC_STATUSES.APPROVED, KYC_STATUSES.REJECTED];

const AuditorPageView = ({
  onRefreshClick,
  requestListPending,
  requestListData,
  requestHelper,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterPageSize, setFilterPageSize] = useState(requestListData?.length || 0);
  const [column, setColumn] = useState({});
  const [currentTab, setCurrentTab] = useState(0);

  const listData = useMemo(
    () =>
      requestListData?.filter((data) =>
        (currentTab === 0 ? ONGOING_REQUEST : COMPLETED_REQUEST).includes(
          data.videoKYCRequestStatus
        )
      ) || [],
    [requestListData, currentTab]
  );

  useEffect(() => {
    setFilterPageSize(listData?.length);
    executeMobileTableView();
  }, [listData]);
  const executeMobileTableView = () => {
    if (listData?.length) {
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
              items={listData}
              fields={fields}
              columnFilter={false}
              itemsPerPage={pageSize}
              hover={listData.length > 0}
              sorter
              tableFilterValue={search}
              striped={listData.length > 0}
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
                    <Link to={"/audit-report/" + item.id}>
                      <Button color="blue.500" variant="primary" size="sm">
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
                    {console.log(filterPageSize, pageSize)}
                    <CPagination
                      onActivePageChange={setPage}
                      pages={
                        parseInt(filterPageSize / pageSize) +
                        Number(Boolean(filterPageSize % pageSize))
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
            <Flex
              my={3}
              pb={{ md: "20px" }}
              borderBottom="1px solid"
              order={{ xs: 1, md: 0 }}
              borderColor="rgba(17, 17, 17, 0.1)"
            >
              <Box
                pl="10px"
                cursor="pointer"
                onClick={() => {
                  setCurrentTab(0);
                }}
              >
                <Text
                  as="h5"
                  style={{ fontWeight: "500" }}
                  color={currentTab === 0 ? "blue.500" : "black"}
                  fontSize={{ xs: "12px", md: "16px" }}
                  mb={{ xs: "20px", md: "unset" }}
                >
                  Ongoing Requests
                </Text>
                {/* {currentTab === 0 && (
                  <Box
                    position="absolute"
                    bottom="-1px"
                    left={currentTab === 0 ? 0 : "20rem"}
                    height="5px"
                    width="100%"
                    bg="blue.500"
                  />
                )} */}
              </Box>
              <Box
                ml="20px"
                cursor="pointer"
                pl="10px"
                onClick={() => {
                  setCurrentTab(1);
                }}
              >
                <Text
                  as="h5"
                  style={{ fontWeight: "500" }}
                  color={currentTab === 1 ? "blue.500" : "black"}
                  fontSize={{ xs: "12px", md: "16px" }}
                  mb={{ xs: "20px", md: "unset" }}
                >
                  Completed Requests
                </Text>
                {/* {isCompletedActive && (
                  <Box
                    position="absolute"
                    bottom="-1px"
                    left={0}
                    height="5px"
                    width="100%"
                    bg="blue.500"
                  />
                )} */}
              </Box>

              <Box
                position="absolute"
                bottom="-1px"
                left={{
                  xs: currentTab === 0 ? 0 : "39vw",
                  md: currentTab === 0 ? 0 : "180px",
                  sm: currentTab === 0 ? 0 : "150px",
                }}
                height="5px"
                width={{
                  xs: currentTab === 0 ? "37vw" : "45vw",
                  md: currentTab === 0 ? "170px" : "200px",
                  sm: currentTab === 0 ? "130px" : "130px",
                }}
                bg="blue.500"
                transition="all .3s"
              />
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
                <Box position="absolute" top="10px" left="10px">
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

export default AuditorPageView;
