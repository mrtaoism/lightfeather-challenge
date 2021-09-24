import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField,  } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import SupervisorComponent from "./api/supervisors";
// import handleSubmit from "./api/submit";


// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};




// And now we can use these
const NotifyForm = () => {

  return (
    <>
      <h1>Notification Form</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          emailCheck: false,
          email: "",
          phoneCheck: false,
          phone: "",
          supervisor: "" 
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/ , {message: "Please enter only alphabetical characters for your first name"})
            .required("Required"),
          lastName: Yup.string()
            .matches(/^[a-zA-Z]+$/ , {message: "Please enter only alphabetical characters for your last name"})
            .required("Required"),
          emailCheck: Yup.boolean(),
          email: Yup.string()
            .email("Please enter a valid email address"),
          phoneCheck: Yup.boolean(),
          phone: Yup.string()
            .matches(
              /(^(((1\-)?\d{3}\-\d{3}\-\d{4})|(\(\d{3}\)\s\d{3}\-\d{4})|(\d{3}\.\d{3}\.\d{4}))(\s[x][0-9]+)?)+$/, {message: "Please enter a valid phone number"}),
          supervisor: Yup.string()
            .required("Required")
        })}
        onSubmit= {values => {
          alert(JSON.stringify(values));
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
          />
          <br></br>
          <h4>How would you prefer to be notifed?</h4>
          <MyCheckbox name = "emailCheck">

          </MyCheckbox>
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
          />
          <MyCheckbox name = "phoneCheck">

          </MyCheckbox>
          <MyTextInput 
          label="Phone"
          name="phone"
          type="text"
          />
          <MySelect label="Supervisor" name="supervisor">
            <option value="">Select...</option>
            <SupervisorComponent />
          </MySelect>

         

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};



function App() {
  return <NotifyForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

