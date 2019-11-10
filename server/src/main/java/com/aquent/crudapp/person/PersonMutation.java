package com.aquent.crudapp.person;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PersonMutation implements GraphQLMutationResolver {
    private Logger logger = LoggerFactory.getLogger(PersonMutation.class);
    private PersonService personService;

    @Autowired
    private void setPersonService(PersonService personService) {
        this.personService = personService;
    }

    public Person createPerson(
            final Integer companyId,
            final String firstName,
            final String lastName,
            final String emailAddress,
            final String streetAddress,
            final String city,
            final String state,
            final String zipCode
    ) {
        logger.info("createPerson was called");

        Person person = new Person();
        person.setCompanyId(companyId);
        person.setFirstName(firstName);
        person.setLastName(lastName);
        person.setEmailAddress(emailAddress);
        person.setStreetAddress(streetAddress);
        person.setCity(city);
        person.setState(state);
        person.setZipCode(zipCode);

        personService.validatePerson(person);
        return personService.createPerson(person);
    }

    public Person updatePerson(
            final Integer personId,
            final Integer companyId,
            final String firstName,
            final String lastName,
            final String emailAddress,
            final String streetAddress,
            final String city,
            final String state,
            final String zipCode
    ) {
        logger.info("updatePerson was called");

        Person person = new Person();
        person.setPersonId(personId);
        person.setCompanyId(companyId);
        person.setFirstName(firstName);
        person.setLastName(lastName);
        person.setEmailAddress(emailAddress);
        person.setStreetAddress(streetAddress);
        person.setCity(city);
        person.setState(state);
        person.setZipCode(zipCode);

        personService.validatePerson(person);
        personService.updatePerson(person);
        return person;
    }

    public Boolean deletePerson(Integer personId) {
        logger.info("deletePerson was called");
        personService.deletePerson(personId);
        return true;
    }
}
