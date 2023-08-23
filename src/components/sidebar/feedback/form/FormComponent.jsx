import React, { useState } from "react";
import styled from "styled-components";
import SuccessToast from "../../../success/SuccessToast";
import { db } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAllCountries } from "react-country-list";

const FormComponent = () => {
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [toast, setToast] = useState(false);

  const [countryList] = useState(getAllCountries());

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    country: "",
    email: "",
    country_code: "",
    phone_number: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    const numberRegex = /^[0-9]{10}$/; // Assumes a 10-digit number
    return numberRegex.test(number);
  };

  const validateCountryCode = (code) => {
    const countryCodeRegex = /^\+[0-9]{1,4}$/; // Assumes country code format like +91
    return countryCodeRegex.test(code);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, country_code, phone_number } = formData;

    const isEmailValid = validateEmail(email);
    const isCountryCodeValid = validateCountryCode(country_code);
    const isPhoneNumberValid = validatePhoneNumber(phone_number);

    setEmailError(!isEmailValid);
    setCodeError(!isCountryCodeValid);
    setNumberError(!isPhoneNumberValid);

    if (isEmailValid && isCountryCodeValid && isPhoneNumberValid) {
      // Submit the form data
      // ...
      await setDoc(
        doc(db, "feedback", formData.country_code + formData.phone_number),
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address: formData.address,
          country: formData.country,
          country_code: formData.country_code,
          phone_number: formData.phone_number,
        }
      );

      setEmailError(false);
      setCodeError(false);
      setNumberError(false);
      setToast(true);

      setFormData({
        first_name: "",
        last_name: "",
        address: "",
        country: "",
        email: "",
        country_code: "",
        phone_number: "",
      });
    }
  };

  const handleSelectCountry = (country) => {
    setFormData({ ...formData, country });
  };

  return (
    <>
      {toast && <SuccessToast message={"Feedback submitted successfully!"} />}
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label>First Name</Label>
          <Input
            name="first_name"
            onChange={handleInputChange}
            className="focusText"
            type="text"
            placeholder="John"
            value={formData.first_name}
            required
          />
        </FormField>
        <FormField>
          <Label>Last Name</Label>
          <Input
            name="last_name"
            onChange={handleInputChange}
            className="focusText"
            type="text"
            placeholder="Doe"
            value={formData.last_name}
            required
          />
        </FormField>
        <FormField>
          <Label>Address</Label>
          <Textarea
            name="address"
            onChange={handleInputChange}
            required
            rows="4"
            value={formData.address}
            placeholder="Enter your full postal address"
          />
        </FormField>

        <FormField
          style={{
            marginTop: "15px",
          }}
        >
          <Label>Country</Label>
          <Input
            className="focusText"
            list="countries"
            name="country"
            type="text"
            placeholder="India"
            value={formData.country}
            required
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          <CountryDropdown id="countries">
            {countryList
              .filter((country) =>
                country.name
                  .toLowerCase()
                  .includes(formData.country.toLowerCase())
              )
              .map((country) => (
                <option
                  style={{
                    color: "white",
                  }}
                  key={country.code}
                  onClick={() => handleSelectCountry(country.name)}
                >
                  {country.name}
                </option>
              ))}
          </CountryDropdown>
        </FormField>

        <FormField>
          <Label>Email Id</Label>
          <Input
            name="email"
            onChange={handleInputChange}
            className="focusText"
            type="text"
            placeholder="example@sample.com"
            value={formData.email}
            required
          />
          {emailError && (
            <ErrorSpan
              style={{
                position: "absolute",
                top: "515px",
                left: "420px",
              }}
            >
              {" "}
              Please Enter a valid email
            </ErrorSpan>
          )}
        </FormField>
        <FormField>
          <Label>Phone Number</Label>
          <PhoneNumberField>
            <CountryCodeInput
              name="country_code"
              onChange={handleInputChange}
              type="text"
              placeholder="+91"
              value={formData.country_code}
              required
            />
            <PhoneNumberInput
              name="phone_number"
              onChange={handleInputChange}
              type="text"
              placeholder="123456789"
              value={formData.phone_number}
              required
            />
          </PhoneNumberField>

          {codeError && (
            <ErrorSpan
              style={{
                position: "absolute",
                top: "595px",
                left: "420px",
              }}
            >
              {" "}
              Please Enter a valid code
            </ErrorSpan>
          )}
          {numberError && (
            <ErrorSpan
              style={{
                position: "absolute",
                top: "610px",
                left: "420px",
                // marginBottom: "-50px",
              }}
            >
              {" "}
              Please Enter a valid number
            </ErrorSpan>
          )}
        </FormField>

        <SubmitButton type="submit">Submit Feedback</SubmitButton>
      </Form>
    </>
  );
};

const Form = styled.form`
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-left: 0;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  color: black;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;

  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 5px #719ece;
  }
`;

const Textarea = styled.textarea`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  color: black;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 5px #719ece;
  }
`;

const PhoneNumberField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CountryCodeInput = styled.input`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  color: black;
  width: 80px;
  padding: 10px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 5px #719ece;
  }
`;

const PhoneNumberInput = styled.input`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;

  font-size: 14px;
  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 5px #719ece;
  }
`;

const SubmitButton = styled.button`
  background-color: #5bc8a1;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #82e3b9;
  }
`;

const ErrorSpan = styled.span`
  position: relative;
  top: -30px;
  justify-content: center;
  align-items: center;
  display: flex;
  left: 330px;
  color: red;
`;

const CountryDropdown = styled.datalist`
  position: absolute;
  right: 10px;
  top: calc(50% - 8px); /* Vertically center the icon */

  /* Set the size of the custom icon */
  width: 16px;
  height: 16px;

  /* Set the background image */
  background-image: url("https://img.icons8.com/search"); /* Update the path */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  /* Hide the default dropdown arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  border: none;
  outline: none;
`;
export default FormComponent;
