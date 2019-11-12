package com.aquent.crudapp.util;

import com.aquent.crudapp.company.Company;
import com.aquent.crudapp.person.Person;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetRowMap {

    public static Person mapPerson(ResultSet rs) throws SQLException {
        Person person = new Person();
        person.setPersonId(rs.getInt("person_id"));
        person.setFirstName(rs.getString("first_name"));
        person.setLastName(rs.getString("last_name"));
        person.setEmailAddress(rs.getString("email_address"));
        person.setStreetAddress(rs.getString("street_address"));
        person.setCity(rs.getString("city"));
        person.setState(rs.getString("state"));
        person.setZipCode(rs.getString("zip_code"));
        person.setCompanyId(rs.getInt("company_id"));

        return person;
    }

    public static Company mapCompany(ResultSet rs) throws SQLException {
        Company company = new Company();
        company.setCompanyId(rs.getInt("company_id"));
        company.setCompanyName(rs.getString("company_name"));
        company.setWebsiteUri(rs.getString("website_uri"));
        company.setPhoneNumber(rs.getString("phone_number"));
        company.setStreetAddress(rs.getString("street_address"));
        company.setCity(rs.getString("city"));
        company.setState(rs.getString("state"));
        company.setZipCode(rs.getString("zip_code"));

        return company;
    }
}
