import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField,  } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";

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

// And now we can use these
const SignupForm = () => {

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
          supervisor: "" // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/ , {message: "Please enter only alphabetical characters for first names."})
            .required("Required"),
          lastName: Yup.string()
            .matches(/^[a-zA-Z]+$/ , {message: "Please enter only alphabetical characters for last names."})
            .required("Required"),
          emailCheck: Yup.boolean()
            .oneOf([false], "Please enter an email address."),
          email: Yup.string()
            .email("Please enter a valid email address."),
          phoneCheck: Yup.boolean()
            .oneOf([false], "Please enter a phone number."),
          phone: Yup.string()
            .matches(/^([0-9]{10})+$/, {message: "Please enter a valid 10 digit phone number without () or -."}),
          supervisor: Yup.string()
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
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
            <option value="john">John</option>
          </MySelect>

         

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function checkEmail() {
  return this.email;
}
function checkPhone() {
  return this.phone;
}

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

