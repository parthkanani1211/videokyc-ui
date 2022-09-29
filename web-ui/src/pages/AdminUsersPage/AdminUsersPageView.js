import React, { useEffect, useState } from "react";
import { CPagination } from "@coreui/react";

import MemoRefresh from "assets/icons/Refresh";
import MemoSearchIcon from "assets/icons/SearchIcon";
import { BoxStyle, BoxTableStyle } from "atoms/TableBox";
import { Box, Button, Flex, Grid, SelectField, Text, NoItemComponent } from "atoms";

import { CircularProgress, CDataTable, CCard } from "../../components";
import DeleteUserModal from "molecules/DeleteUserModal";

const fields = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "role", label: "Role" },
  { key: "emailAddress", label: "Email Address" },
  {
    key: "start_session",
    label: "Action",
    sorter: false,
    filter: false,
  },
];

const AdminUserPageView = ({
  onUserEdit,
  onNewClick,
  onDeleteUser,
  onRefreshClick,
  requestListData,
  requestListPending,
  requestDeletePending,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filterPageSize, setFilterPageSize] = useState(requestListData?.length || 0);
  // const [column, setColumn] = useState({});

  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    if (!requestDeletePending) {
      setDeleteUser(null);
    }
  }, [requestDeletePending]);

  useEffect(() => {
    setFilterPageSize(requestListData?.length);
   
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
              sorter
              footer={false}
              fields={fields}
              activePage={page}
              pagination={false}
              columnFilter={false}
              items={requestListData}
              itemsPerPage={pageSize}
              tableFilterValue={search}
              hover={requestListData.length > 0}
              striped={requestListData.length > 0}
              noItemsViewSlot={<NoItemComponent />}
              // noItemsViewSlot={<NoItem />}
              // columnFilterSlot={{
              //   id: (
              //     <Box className="search-input">
              //       <Box
              //         as="input"
              //         width="70px"
              //         pl="10px !important"
              //         type="text"
              //         placeholder="ID"
              //         onChange={(e) => {
              //           const value = e.target.value;
              //           setColumn((c) => ({ ...c, id: value }));
              //         }}
              //       />
              //     </Box>
              //   ),
              //   mobileNumber: (
              //     <TableColumn
              //       onChange={(value) => setColumn((c) => ({ ...c, mobileNumber: value }))}
              //       placeholder="Mobile Number"
              //     />
              //   ),
              //   videoKYCRequestStatus: (
              //     <TableColumn
              //       onChange={(value) => setColumn((c) => ({ ...c, videoKYCRequestStatus: value }))}
              //       placeholder="Status"
              //     />
              //   ),
              // }}
              onFilteredItemsChange={(list) => setFilterPageSize(list.length)}
              // columnFilterValue={{
              //   firstName: column.firstName || "",
              //   lastName: column.lastName || "",
              //   mobileNumber: column.mobileNumber || "",
              //   emailAddress: column.emailAddress || "",
              // }}
              scopedSlots={{
                lastName: (item) => {
                  return <td>{item.lastName || ""}</td>;
                },
                emailAddress: (item) => {
                  return <td>{item.emailAddress || ""}</td>;
                },
                role: (item) => {
                  return <td>{item.roles?.[0]?.name || ""}</td>;
                },
                start_session: (item) => {
                  return (
                    <td className="py-2 last-col">
                      <Flex maxWidth="200px">
                        <Button
                          size="sm"
                          color="blue.500"
                          variant="secondary"
                          onClick={() => onUserEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          ml="10px"
                          variant="error"
                          color="blue.500"
                          onClick={() => setDeleteUser(item)}
                          pr={{ xs: "22px !important", md: "10px !important" }}
                        >
                          Delete
                        </Button>
                      </Flex>
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
        ) : null}
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
            gridGap="20px"
            gridAutoFlow={{ md: "column" }}
            justifyContent="space-between"
            alignItems={{ md: "center" }}
          >
            <Flex my={{ md: 3 }}>
              <Text fontSize={{ xs: "18px", md: "20px" }} fontWeight="600">
                User Management
              </Text>
            </Flex>
            <Flex flexDirection={{ xs: "column-reverse", md: "row" }}>
              <Grid gridAutoFlow="column" gridGap="10px" mr={{ md: "10px" }}>
                <Flex
                  px="15px"
                  color="primary"
                  cursor="pointer"
                  borderRadius="4px"
                  alignItems="center"
                  justifyContent="center"
                  onClick={onRefreshClick}
                  bg="rgba(0, 108, 251, 0.1)"
                  border="1px solid rgba(0, 108, 251, 0.4)"
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
                  <Box position="absolute" top="8px" left="10px" zIndex="3">
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
              <Box mb={{ xs: "10px", md: "0" }}>
                <Button
                  px="20px"
                  type="submit"
                  height="40px"
                  color="white"
                  variant="primary"
                  width="max-content"
                  onClick={onNewClick}
                >
                  <Text as="h5" fontWeight="500" fontSize="16px" my="8px">
                    ADD NEW USER
                  </Text>
                </Button>
              </Box>
            </Flex>
          </Grid>
        </CCard.Header>
        <CCard.Body>{renderContent()}</CCard.Body>
      </CCard>
      {deleteUser && (
        <DeleteUserModal
          isOpen
          onClose={() => setDeleteUser(null)}
          onConfirm={() => onDeleteUser(deleteUser)}
          loading={requestDeletePending}
        />
      )}
    </BoxStyle>
  );
};

export default AdminUserPageView;
