import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMPANY_MUTATION, EDIT_COMPANY_MUTATION } from 'graphqlTags';
import { ICompanyFormProps } from 'interfaces/companyInterface';
import Company from 'classes/companyClass';
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
import StateSelect from 'components/stateSelect';

const CompanyForm: React.FC<ICompanyFormProps> = props => {
  const [company, setCompany] = useState(new Company());

  const [companyNameIsInvalid, setCompanyNameIsInvalid] = useState();
  const [webUriIsInvalid, setWebUriIsInvalid] = useState();
  const [phoneNumberIsInvalid, setPhoneNumberIsInvalid] = useState();
  const [streetAddressIsInvalid, setStreetAddressIsInvalid] = useState();
  const [cityIsInvalid, setCityIsInvalid] = useState();
  const [stateIsInvalid, setStateIsInvalid] = useState();
  const [zipCodeIsInvalid, setZipCodIsInvalid] = useState();

  useEffect(() => {
    if (props.company) {
      setCompany({ ...props.company });
    }
  }, [props.company]);

  const [createCompany] = useMutation(CREATE_COMPANY_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const [editCompany] = useMutation(EDIT_COMPANY_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      if (company.companyId) {
        editCompany({
          variables: {
            ...company
          }
        });
      } else {
        createCompany({
          variables: {
            ...company
          }
        });
        setCompany(new Company());
      }
    }
  };

  const validateForm = () => {
    setCompanyNameIsInvalid(!validateField(company.companyName, 1, 50));
    setWebUriIsInvalid(!validateField(company.websiteUri, 1, 50));
    setPhoneNumberIsInvalid(!validateField(company.phoneNumber, 10, 50));
    setStreetAddressIsInvalid(!validateField(company.streetAddress, 1, 50));
    setCityIsInvalid(!validateField(company.city, 1, 50));
    setStateIsInvalid(!validateField(company.state, 2, 2));
    setZipCodIsInvalid(!validateField(company.zipCode, 5, 5));

    return (
      !companyNameIsInvalid &&
      !webUriIsInvalid &&
      !phoneNumberIsInvalid &&
      !streetAddressIsInvalid &&
      !cityIsInvalid &&
      !stateIsInvalid &&
      !zipCodeIsInvalid
    );
  };

  const validateField = (
    field: string,
    minLength: number,
    maxLength: number,
    regex?: RegExp
  ) => {
    const regexMatch = regex ? regex.test(field) : true;
    return (
      field !== undefined &&
      regexMatch &&
      field.length >= minLength &&
      field.length <= maxLength
    );
  };

  const handleFieldChange = (event: {
    target: { value: string; id: string };
  }) => {
    const value = event.target.value;
    switch (event.target.id) {
      case 'companyName':
        company.companyName = value;
        setCompanyNameIsInvalid(!validateField(value, 1, 50));
        break;
      case 'websiteUri':
        company.websiteUri = value;
        setWebUriIsInvalid(!validateField(value, 1, 50));
        break;
      case 'phoneNumber':
        company.phoneNumber = value;
        setPhoneNumberIsInvalid(!validateField(value, 1, 50));
        break;
      case 'streetAddress':
        company.streetAddress = value;
        setStreetAddressIsInvalid(!validateField(value, 1, 50));
        break;
      case 'city':
        company.city = value;
        setCityIsInvalid(!validateField(value, 1, 50));
        break;
      case 'state':
        company.state = value !== '-1' ? value : '';
        setStateIsInvalid(!validateField(value, 2, 2));
        break;
      case 'zipCode':
        company.zipCode = value;
        setZipCodIsInvalid(!validateField(value, 5, 5));
        break;
    }
  };

  const handleToggleModal = () => {
    props.onToggleModal();
    if (props.company && props.company.companyId && !validateForm()) {
      setCompany(props.company ? props.company : new Company());
    }
    setCompanyNameIsInvalid(false);
    setWebUriIsInvalid(false);
    setPhoneNumberIsInvalid(false);
    setStreetAddressIsInvalid(false);
    setCityIsInvalid(false);
    setStateIsInvalid(false);
    setZipCodIsInvalid(false);
  };

  return (
    <Modal isOpen={props.open} toggle={handleToggleModal}>
      <ModalHeader toggle={handleToggleModal}>
        {company && company.companyId ? 'Edit ' : 'Create '} A New Company
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input
              type="text"
              name="companyName"
              id="companyName"
              maxLength={50}
              required
              invalid={companyNameIsInvalid}
              onChange={handleFieldChange}
              defaultValue={company ? company.companyName : undefined}
            />
            <FormFeedback>Oops! Company Name is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="websiteUri">Website</Label>
            <Input
              type="text"
              name="websiteUri"
              id="websiteUri"
              maxLength={50}
              required
              invalid={webUriIsInvalid}
              onChange={handleFieldChange}
              defaultValue={company ? company.websiteUri : undefined}
            />
            <FormFeedback>Oops! Website URL is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              maxLength={10}
              required
              invalid={phoneNumberIsInvalid}
              onChange={handleFieldChange}
              defaultValue={company ? company.phoneNumber : undefined}
            />
            <FormFeedback>Oops! Phone Number is missing </FormFeedback>
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
              defaultValue={company ? company.streetAddress : undefined}
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
              defaultValue={company ? company.city : undefined}
            />
            <FormFeedback>Oops! City is missing</FormFeedback>
          </FormGroup>
          <StateSelect
            onChange={handleFieldChange}
            required
            invalid={stateIsInvalid}
            defaultValue={company ? company.state : undefined}
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
              defaultValue={company ? company.zipCode : undefined}
            />
            <FormFeedback>Oops! Zip Code is missing</FormFeedback>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save Company
        </Button>{' '}
        <Button color="secondary" onClick={handleToggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CompanyForm;
