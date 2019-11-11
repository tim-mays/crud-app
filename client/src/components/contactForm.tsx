import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import CompanySelect from 'components/companySelect';
import StateSelect from 'components/stateSelect';

interface IContactForm {
  open: boolean;
  onToggleModal: any;
  refetchQueries: any;
  person?: IPerson;
}

interface IPerson {
  personId: number;
  companyId?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $companyId: Int
  ) {
    createPerson(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
      companyId: $companyId
    ) {
      personId
    }
  }
`;

const EDIT_PERSON_MUTATION = gql`
  mutation EditPerson(
    $personId: Int
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $companyId: Int
  ) {
    updatePerson(
      personId: $personId
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
      companyId: $companyId
    ) {
      personId
    }
  }
`;

const ContactForm: React.FC<IContactForm> = props => {
  const { person } = props;
  const [firstName, setFirstName] = useState(person ? person.firstName : '');
  const [lastName, setLastName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [streetAddress, setStreetAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [companyId, setCompanyId] = useState();

  const [firstNameIsInvalid, setFirstNameIsInvalid] = useState();
  const [lastNameIsInvalid, setLastNameIsInvalid] = useState();
  const [emailAddressIsInvalid, setEmailAddressIsInvalid] = useState();
  const [streetAddressIsInvalid, setStreetAddressIsInvalid] = useState();
  const [cityIsInvalid, setCityIsInvalid] = useState();
  const [stateIsInvalid, setStateIsInvalid] = useState();
  const [zipCodeIsInvalid, setZipCodIsInvalid] = useState();

  const [createPerson] = useMutation(CREATE_PERSON_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const [editPerson] = useMutation(EDIT_PERSON_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validateForm()) {
      if (props.person && props.person.personId) {
        editPerson({
          variables: {
            personId: props.person.personId,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode,
            companyId: companyId
          }
        });
      } else {
        createPerson({
          variables: {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode,
            companyId: companyId
          }
        });
      }
    }
  };

  const validateForm = () => {
    setFirstNameIsInvalid(!validateField(firstName, 1, 50));
    setLastNameIsInvalid(!validateField(lastName, 1, 50));
    setEmailAddressIsInvalid(!validateField(emailAddress, 1, 50));
    setStreetAddressIsInvalid(!validateField(streetAddress, 1, 50));
    setCityIsInvalid(!validateField(city, 1, 50));
    setStateIsInvalid(!validateField(state, 2, 2));
    setZipCodIsInvalid(!validateField(zipCode, 5, 5));

    return (
      !firstNameIsInvalid &&
      !lastNameIsInvalid &&
      !emailAddressIsInvalid &&
      !streetAddressIsInvalid &&
      !cityIsInvalid &&
      !stateIsInvalid &&
      !zipCodeIsInvalid
    );
  };

  const validateField = (
    field: string,
    minLength: number,
    maxLength: number
  ) => {
    return (
      field !== undefined &&
      field.length >= minLength &&
      field.length <= maxLength
    );
  };

  const handleFieldChange = (event: {
    target: { value: string; id: string };
  }) => {
    const value = event.target.value;
    switch (event.target.id) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'streetAddress':
        setStreetAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value !== '-1' ? value : undefined);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'company':
        setCompanyId(value);
        break;
    }
  };

  const handleToggleModal = () => {
    props.onToggleModal();
    setFirstNameIsInvalid(false);
    setLastNameIsInvalid(false);
    setEmailAddressIsInvalid(false);
    setStreetAddressIsInvalid(false);
    setCityIsInvalid(false);
    setStateIsInvalid(false);
    setZipCodIsInvalid(false);

    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setStreetAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setCompanyId('');
  };

  return (
    <Modal isOpen={props.open} toggle={handleToggleModal}>
      <ModalHeader toggle={handleToggleModal}>Create A New Contact</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              maxLength={50}
              required
              invalid={firstNameIsInvalid}
              onChange={handleFieldChange}
              value={firstName}
            />
            <FormFeedback>Oops! First Name is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              maxLength={50}
              required
              invalid={lastNameIsInvalid}
              onChange={handleFieldChange}
              value={lastName}
            />
            <FormFeedback>Oops! Last Name is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="emailAddress">Email Address</Label>
            <Input
              type="email"
              name="emailAddress"
              id="emailAddress"
              maxLength={50}
              required
              invalid={emailAddressIsInvalid}
              onChange={handleFieldChange}
              value={emailAddress}
            />
            <FormFeedback>Oops! Email Address is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Street Address</Label>
            <Input
              type="text"
              name="streetAddress"
              id="streetAddress"
              maxLength={50}
              required
              invalid={streetAddressIsInvalid}
              onChange={handleFieldChange}
              value={streetAddress}
            />
            <FormFeedback>Oops! Street Address is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              maxLength={50}
              required
              invalid={cityIsInvalid}
              onChange={handleFieldChange}
              value={city}
            />
            <FormFeedback>Oops! City is missing</FormFeedback>
          </FormGroup>
          <StateSelect
            onChange={handleFieldChange}
            required
            invalid={stateIsInvalid}
            value={state}
          />
          <FormGroup>
            <Label for="zipCode">Zip Code</Label>
            <Input
              type="text"
              name="zipCode"
              id="zipCode"
              maxLength={5}
              required
              invalid={zipCodeIsInvalid}
              onChange={handleFieldChange}
              value={zipCode}
            />
            <FormFeedback>Oops! Zip Code is missing</FormFeedback>
          </FormGroup>
          <CompanySelect onChange={handleFieldChange} value={companyId} />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save Contact
        </Button>{' '}
        <Button color="secondary" onClick={handleToggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ContactForm;
