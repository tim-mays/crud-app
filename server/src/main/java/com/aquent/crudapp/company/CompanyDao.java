package com.aquent.crudapp.company;

import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Operations on the "company" table.
 */
@Repository
public interface CompanyDao {
    List<Company> listCompanies();

    Company createCompany(Company company);

    Company readCompany(Integer id);

    void updateCompany(Company company);

    void deleteCompany(Integer id);
}
