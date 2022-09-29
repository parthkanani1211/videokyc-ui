import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";

import {
  PREFIX,
  COMMUNITY,
  OCCUPATION,
  CONSTITUTION,
  FATHER_PREFIX,
  MOTHER_PREFIX,
  MARITAL_STATUS,
  RESIDENCY_STATUS,
} from "store/constants/roles";
import { hydrate } from "utils/persist";
import { fromLocalStorage } from "util/storage";
import { Box, Button, Flex, Grid, Text } from "atoms";
import { getOrganizationId } from "router/RouterHelpers";
import { FormInput, FormSelect } from "molecules/FormInput";
import { useLocationQueryValue } from "hooks/useLocationQuery";

import CustomerAgreementText from "./components/CustomerAgreementText";

const pinRegExp = /^[1-9][0-9]{5}$/;
const alphabeticRegExp = /^[a-zA-Z]*$/;

const validation = yup.object().shape({
  customerName: yup.object().shape({
    prefix: yup.string().required("Required"),
    firstName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid First Name")
      .min(3, "Min. 3 Characters")
      .required("First Name is Required"),
    middleName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid Middle Name")
      .min(3, "Min. 3 Characters")
      .required("Middle Name is Required"),
    lastName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid Last Name")
      .min(3, "Min. 3 Characters")
      .required("Last Name is Required"),
  }),
  motherName: yup.object().shape({
    prefix: yup.string().required("Required"),
    firstName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid First Name")
      .min(3, "Min. 3 Characters")
      .required("First Name is Required"),
    middleName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid Middle Name")
      .min(3, "Min. 3 Characters")
      .required("Middle Name is Required"),
    lastName: yup
      .string()
      .matches(alphabeticRegExp, "Invalid Last Name")
      .min(3, "Min. 3 Characters")
      .required("Last Name is Required"),
  }),
  // accountType: yup.string().required("Account Type is Required"),
  maritalStatus: yup.string().required("Marital Status is Required"),
  occupation: yup.string().required("Occupation is Required"),
  community: yup.string().required("Community is Required"),
  constitution: yup.string().required("Constitution is Required"),
  residency: yup.string().required("Residency is Required"),
});

const CustomerDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const refUrl = useLocationQueryValue("ref");

  const { push } = useHistory();

  const submit = useCallback(
    async ({ husbandName, fatherName, ...values }) => {
      const isHusband =
        values.maritalStatus === "01" && ["Miss.", "Mrs."].includes(values.customerName.prefix);

      console.log("husbandName", isHusband, { ...(isHusband ? { husbandName } : { fatherName }) });

      setLoading(true);
      try {
        await axios(process.env.REACT_APP_API_ENDPOINT + "/v1/customer/profile", {
          method: data?.customerName ? "put" : "post",
          data: {
            ...values,
            address: values.localAddressSameAsPermanent
              ? undefined
              : { ...values.address, county: "India" },
            refId: hydrate("refId"),
            ...(isHusband ? { husbandName } : { fatherName }),
          },
          headers: {
            "x-obvs-org": getOrganizationId(),
            "x-authorization": fromLocalStorage("authToken"),
          },
        });
        push("/videoKyc/Customer");
      } catch (e) {
        console.error("customer form", e);
      }
      setLoading(false);
    },
    [push, data]
  );

  const getData = useCallback(async () => {
    try {
      const { data } = await axios(process.env.REACT_APP_API_ENDPOINT + "/v1/customer/profile", {
        headers: {
          "x-obvs-org": getOrganizationId(),
          "x-authorization": fromLocalStorage("authToken"),
        },
      });
      setData(data);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Grid className="my-5 bg-white rounded elevated-2 " p={{ xs: "20px", md: "3rem" }}>
      <Text as="h2" style={{ fontWeight: "600" }}>
        Customer Details
      </Text>
      <Box as="span" fontSize="10px" className="ml-1 mt-2" fontWeight="600" color="red.500">
        Fields marked with (*) are mandatory.
      </Box>
      <Box as="span" fontSize="10px" className="mb-5 ml-1 mt-2" fontWeight="600" color="red.500">
        Customer's name should be as per AADHAR name.
      </Box>

      <Formik
        initialValues={{
          accountType: data?.accountType || "",
          address: data?.address || {
            county: "India",
            streetAddress: "",
            area: "",
            city: "",
            district: "",
            state: "",
            pincode: "",
          },
          community: data?.community || "",
          constitution: data?.constitution || "",
          customerName: data?.customerName || {
            prefix: "",
            firstName: "",
            middleName: "",
            lastName: "",
          },
          fatherName: data?.fatherName || {
            prefix: "",
            firstName: "",
            middleName: "",
            lastName: "",
          },
          // husbandName: data?.husbandName || {
          //   prefix: "",
          //   firstName: "",
          //   middleName: "",
          //   lastName: "",
          // },
          id: data?.id || "",
          localAddressSameAsPermanent: data?.localAddressSameAsPermanent || false,
          maritalStatus: data?.maritalStatus || "02",
          motherName: data?.motherName || {
            prefix: "",
            firstName: "",
            middleName: "",
            lastName: "",
          },
          occupation: data?.occupation || "",
          residency: data?.residency || "",
        }}
        onSubmit={submit}
        validationSchema={validation}
        enableReinitialize
      >
        {({ setFieldValue, values, handleSubmit, isValid }) => {
          const isHusband =
            values.maritalStatus === "01" && ["Miss.", "Mrs."].includes(values.customerName.prefix);
          return (
            <Form id="customer-form">
              <Box>
                <Grid
                  borderBottom="1px solid #ddd"
                  gridTemplateColumns={{ md: "1fr 1fr" }}
                  gridColumnGap={{ md: "50px" }}
                  fontWeight="600"
                  gridColumn="span 2"
                  mb="50px"
                >
                  <Grid>
                    <Text>Customer's Name*</Text>
                    <Grid
                      mt="10px"
                      gridColumnGap={{ xs: "20px", md: "5px" }}
                      gridTemplateColumns={{ xs: "1fr 1fr", md: "auto auto auto auto" }}
                    >
                      <Box width={{ xs: "100%", md: "100px" }}>
                        <FormSelect
                          label="Prefix*"
                          isSearchable={false}
                          name="customerName.prefix"
                          options={PREFIX.map((p) => ({ value: p, label: p }))}
                        />
                      </Box>
                      <FormInput name="customerName.firstName" label="First Name*" maxLength={50} />
                      <FormInput
                        maxLength={50}
                        label="Middle Name*"
                        name="customerName.middleName"
                      />
                      <FormInput name="customerName.lastName" label="Last Name*" maxLength={50} />
                    </Grid>
                  </Grid>
                  <Box alignSelf="flex-end">
                    <FormSelect
                      name="maritalStatus"
                      isSearchable={false}
                      label="Marital Status*"
                      onChange={(val) =>
                        val === "01" &&
                        setFieldValue("husbandName", {
                          prefix: "",
                          firstName: "",
                          middleName: "",
                          lastName: "",
                        })
                      }
                      options={MARITAL_STATUS}
                    />
                  </Box>
                  <Grid>
                    <Text>{isHusband ? "Husband" : "Father"}'s Name*</Text>
                    <Grid
                      mt="10px"
                      gridColumnGap={{ xs: "20px", md: "5px" }}
                      gridTemplateColumns={{ xs: "1fr 1fr", md: "auto auto auto auto" }}
                    >
                      <Box width={{ xs: "100%", md: "100px" }}>
                        <FormSelect
                          label="Prefix*"
                          isSearchable={false}
                          key={isHusband + ".prefix"}
                          name={`${isHusband ? "husbandName" : "fatherName"}.prefix`}
                          validate={(v) => (!v ? "Required" : "")}
                          options={FATHER_PREFIX.map((p) => ({ value: p, label: p }))}
                        />
                      </Box>
                      <FormInput
                        maxLength={50}
                        label="First Name*"
                        key={isHusband + ".firstName"}
                        name={`${isHusband ? "husbandName" : "fatherName"}.firstName`}
                        validate={(v) =>
                          !v ? "First Name is Required" : v.length < 3 ? "Min. 3 Required" : ""
                        }
                      />
                      <FormInput
                        maxLength={50}
                        label="Middle Name*"
                        key={isHusband + ".middleName"}
                        name={`${isHusband ? "husbandName" : "fatherName"}.middleName`}
                        validate={(v) =>
                          !v ? "Middle Name is Required" : v.length < 3 ? "Min. 3 Required" : ""
                        }
                      />
                      <FormInput
                        maxLength={50}
                        label="Last Name*"
                        key={isHusband + ".lastName"}
                        name={`${isHusband ? "husbandName" : "fatherName"}.lastName`}
                        validate={(v) =>
                          !v ? "Last Name is Required" : v.length < 3 ? "Min. 3 Required" : ""
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    fontWeight="600"
                    alignItems="center"
                    justifyContent="flex-start"
                    gridTemplateColumns="1fr"
                    alignContent="flex-end"
                  >
                    <Text>Mother's Name*</Text>
                    <Grid
                      mt="10px"
                      gridTemplateColumns={{ xs: "1fr 1fr", md: "auto auto auto auto" }}
                      gridColumnGap={{ xs: "20px", md: "5px" }}
                    >
                      <Box width={{ xs: "100%", md: "100px" }}>
                        <FormSelect
                          isSearchable={false}
                          name="motherName.prefix"
                          label="Prefix*"
                          options={MOTHER_PREFIX.map((p) => ({ value: p, label: p }))}
                        />
                      </Box>
                      <FormInput name="motherName.firstName" label="First Name*" maxLength={50} />
                      <FormInput name="motherName.middleName" label="Middle Name*" maxLength={50} />
                      <FormInput name="motherName.lastName" label="Last Name*" maxLength={50} />
                    </Grid>
                  </Grid>

                  <Text mb="15px" gridColumn={{ md: "span 2" }}>
                    Customer Information
                  </Text>
                  {/* <Grid gridTemplateColumns={{ md: "1fr 1fr" }} gridColumnGap="20px"> */}
                  <FormSelect
                    isSearchable={false}
                    name="occupation"
                    options={OCCUPATION}
                    label="Occupation*"
                  />
                  {/* <FormSelect
                    isSearchable={false}
                    name="maritalStatus"
                    options={MARITAL_STATUS}
                    label="Marital Status*"
                  /> */}
                  {/* </Grid> */}

                  <FormSelect
                    isSearchable={false}
                    name="community"
                    options={COMMUNITY}
                    label="Community*"
                  />
                  {/* <Grid gridTemplateColumns="1fr 1fr" gridGap="20px"> */}
                  {/* <FormSelect
                    isSearchable={false}
                    name="accountType"
                    options={[
                      { value: "Current", label: "Current Account" },
                      { value: "Saving", label: "Saving Account" },
                    ]}
                    label="Account Type*"
                  /> */}
                  <FormSelect
                    isSearchable={false}
                    name="constitution"
                    options={CONSTITUTION}
                    label="Constitution*"
                  />
                  <FormSelect
                    isSearchable={false}
                    name="residency"
                    options={RESIDENCY_STATUS}
                    label="Residency Status*"
                  />
                  {/* </Grid> */}
                </Grid>
                <div>
                  <Grid
                    gridTemplateColumns={{ xs: "1.2fr 2fr", md: "1fr 3fr" }}
                    gridGap="20px"
                    alignItems="center"
                    mb="20px"
                  >
                    <Text
                      as="h5"
                      className="font-weight-semibold"
                      fontSize={{ xs: "14px", md: "18px" }}
                    >
                      Local Address
                    </Text>
                    <Flex cursor="pointer" as="label">
                      <input
                        type="checkbox"
                        checked={values.localAddressSameAsPermanent}
                        onChange={() =>
                          setFieldValue(
                            "localAddressSameAsPermanent",
                            !values.localAddressSameAsPermanent
                          )
                        }
                      />

                      <Text as="h5" ml="5px" fontSize={{ xs: "12px", md: "14px" }}>
                        Same as AADHAR address
                      </Text>
                    </Flex>
                  </Grid>

                  {!values.localAddressSameAsPermanent && (
                    <Grid gridTemplateColumns={{ md: "1fr 1.4fr" }}>
                      <Box>
                        <Box gridColumn="span 3">
                          <FormInput
                            name="address.streetAddress"
                            label="Enter Street Address*"
                            maxLength={250}
                            validate={(v) =>
                              values.localAddressSameAsPermanent || v
                                ? ""
                                : "Stress Address is Required"
                            }
                          />
                        </Box>
                        <Grid
                          gridTemplateColumns={{ xs: "1fr 1fr", md: "1fr 1fr 1fr" }}
                          gridColumnGap="10px"
                        >
                          <FormInput
                            name="address.area"
                            label="Enter Area*"
                            maxLength={100}
                            validate={(v) =>
                              values.localAddressSameAsPermanent || v ? "" : "Area is Required"
                            }
                          />
                          <FormInput
                            name="address.city"
                            label="Enter City*"
                            maxLength={100}
                            validate={(v) =>
                              values.localAddressSameAsPermanent || v
                                ? /^[a-z]+([ ][a-z]+)?$/gi.test(v)
                                  ? ""
                                  : "Invalid City"
                                : "City is Required"
                            }
                          />
                          <FormInput
                            name="address.state"
                            label="Enter State*"
                            maxLength={100}
                            validate={(v) =>
                              values.localAddressSameAsPermanent || v
                                ? /^[a-z]+([ ][a-z]+)?$/gi.test(v)
                                  ? ""
                                  : "Invalid State"
                                : "State is Required"
                            }
                          />
                          <FormInput
                            name="address.pincode"
                            label="Enter Pincode*"
                            maxLength={6}
                            validate={(v) =>
                              values.localAddressSameAsPermanent || v
                                ? pinRegExp.test(v)
                                  ? ""
                                  : "Invalid Pincode"
                                : "Picode is Required"
                            }
                          />
                          <FormSelect
                            name="address.county"
                            label="Select Country*"
                            options={[{ value: "India", label: "India" }]}
                            value={{ value: "India", label: "India" }}
                            isDisabled
                          />
                        </Grid>
                      </Box>
                    </Grid>
                  )}
                  {/* <div
                      className="d-grid align-items-center justify-content-start mt-4"
                      style={{
                          gridGap: "30px",
                          fontWeight: "600",
                          gridTemplateColumns:
                              "auto auto",
                      }}
                  >
                      <div>Address Proof</div>
                      <div className="p-relative">
                          <Field name="add" type="file" />
                      </div>
                  </div> */}
                </div>
                {/* {!data?.prefix && ( */}
                <Box gridColumn="span 2">
                  <label className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={() => setFieldValue("consent", !values.consent)}
                    />
                    <Box as="span" className="ml-2" fontWeight="600" cursor="pointer">
                      I agree to the following points:
                    </Box>
                  </label>
                  <CustomerAgreementText />
                </Box>
                {/* )} */}
                <Box
                  mt={{ md: "2rem" }}
                  display="flex"
                  gridColumn="span 2"
                  justifySelf="flex-end"
                  justifyContent="flex-end"
                >
                  {data?.customerName && refUrl && (
                    <Link to="/profile">
                      <Button type="button" variant="secondary" height="100%">
                        Cancel
                      </Button>
                    </Link>
                  )}
                  <Button
                    p="0.3rem 1rem"
                    type="button"
                    color="primary"
                    variant="primary"
                    width="fit-content"
                    loading={loading}
                    disabled={!values.consent}
                    onClick={() => {
                      handleSubmit();
                      if (!isValid) {
                        window.scrollTo({
                          top:
                            document.getElementById("customer-form")?.getBoundingClientRect().top +
                            window.pageYOffset -
                            100,
                          behavior: "smooth",
                        });
                      }
                    }}
                    ml="1rem"
                  >
                    {data?.customerName ? "Update" : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default CustomerDetailsForm;
