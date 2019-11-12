package com.aquent.crudapp.person;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PersonQuery implements GraphQLQueryResolver {
    private Logger logger = LoggerFactory.getLogger(PersonQuery.class);
    private PersonService personService;

    @Autowired
    private void setPersonService(PersonService personService) {
        this.personService = personService;
    }

    public List<Person> getPeople(final int id) {
        logger.info("getPeople was called");
        return this.personService.listPeople(id);
    }

    public Person getPerson(final int id) {
        logger.info("getPerson was called");
        return this.personService.readPerson(id);
    }
}
