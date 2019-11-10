package com.aquent.crudapp.company;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CompanyService {
    List<Company> listCompanies();

    Company readCompany(Integer companyId);

    Company createCompany(Company company);

    void updateCompany(Company company);

    void deleteCompany(Integer companyId);

    void validateCompany(Company company);
}
