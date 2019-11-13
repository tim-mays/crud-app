package com.aquent.crudapp.person;

import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Operations on the "person" table.
 */
@Repository
public interface PersonDao {

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
     * Deletes a people records by company ID.
     *
     * @param id the person ID
     */
    void deletePeopleInCompany(Integer id);
}
