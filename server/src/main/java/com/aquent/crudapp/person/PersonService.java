package com.aquent.crudapp.person;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Person operations.
 */
@Service
public interface PersonService {

    /**
     * Retrieves all of the person records.
     *
     * @return list of person records
     */
    List<Person> listPeople(Integer companyId);

    /**
     * Creates a new person record.
     *
     * @param person the values to save
     * @return the new person
     */
    Person createPerson(Person person);

    /**
     * Retrieves a person record by ID.
     *
     * @param id the person ID
     * @return the person record
     */
    Person readPerson(Integer id);

    /**
     * Updates an existing person record.
     *
     * @param person the new values to save
     */
    void updatePerson(Person person);

    /**
     * Deletes a person record by ID.
     *
     * @param id the person ID
     */
    void deletePerson(Integer id);

    /**
     * Validates populated person data.
     *
     * @param person the values to validate
     */
    void validatePerson(Person person);
}
