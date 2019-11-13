package com.aquent.crudapp.person;

import com.aquent.crudapp.GraphqlFieldException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Default implementation of {@link PersonService}.
 */
@Component
public class DefaultPersonService implements PersonService {

    private final PersonDao personDao;
    private final Validator validator;

    public DefaultPersonService(PersonDao personDao, Validator validator) {
        this.personDao = personDao;
        this.validator = validator;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Person> listPeople(Integer companyId) {
        return personDao.listPeople(companyId);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Person readPerson(Integer id) {
        return personDao.readPerson(id);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public Person createPerson(Person person) {
        return personDao.createPerson(person);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void updatePerson(Person person) {
        personDao.updatePerson(person);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void deletePerson(Integer id) {
        personDao.deletePerson(id);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void deletePeopleInCompany(Integer id) { personDao.deletePeopleInCompany(id); }

    @Override
    public void validatePerson(Person person) {
        Set<ConstraintViolation<Person>> violations = validator.validate(person);

        if(!violations.isEmpty()) {
            Map<String, GraphqlFieldException.Details> detailsMap = new HashMap<>();
            for (ConstraintViolation<Person> violation : violations) {
                String fieldName = violation.getPropertyPath().toString();
                GraphqlFieldException.Details detail = new GraphqlFieldException.Details();
                detail.message = violation.getMessage();
                detail.value = violation.getInvalidValue();
                detailsMap.put(fieldName, detail);
            }
            throw new GraphqlFieldException("Person is invalid", detailsMap);
        }
    }
}
