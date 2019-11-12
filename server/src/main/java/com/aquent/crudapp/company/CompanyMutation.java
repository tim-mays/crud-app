package com.aquent.crudapp.company;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyMutation implements GraphQLMutationResolver {
    private Logger logger = LoggerFactory.getLogger(CompanyMutation.class);
    private CompanyService companyService;

    @Autowired
    private void setCompanyService(CompanyService companyService) {
        this.companyService = companyService;
    }

    public Company createCompany(
            final String companyName,
            final String websiteUri,
            final String phoneNumber,
            final String streetAddress,
            final String city,
            final String state,
            final String zipCode
    ) {
        logger.info("createCompany was called");

        Company company = new Company();
        company.setCompanyName(companyName);
        company.setWebsiteUri(websiteUri);
        company.setPhoneNumber(phoneNumber);
        company.setStreetAddress(streetAddress);
        company.setCity(city);
        company.setState(state);
        company.setZipCode(zipCode);

        companyService.validateCompany(company);
        return companyService.createCompany(company);
    }

    public Company updateCompany(
            final Integer companyId,
            final String companyName,
            final String websiteUri,
            final String phoneNumber,
            final String streetAddress,
            final String city,
            final String state,
            final String zipCode
    ) {
        logger.info("updateCompany was called");

        Company company = new Company();
        company.setCompanyId(companyId);
        company.setCompanyName(companyName);
        company.setWebsiteUri(websiteUri);
        company.setPhoneNumber(phoneNumber);
        company.setStreetAddress(streetAddress);
        company.setCity(city);
        company.setState(state);
        company.setZipCode(zipCode);

        companyService.validateCompany(company);
        companyService.updateCompany(company);
        return company;
    }

    public Boolean deleteCompany(Integer companyId) {
        logger.info("deleteCompany was called");
        companyService.deleteCompany(companyId);
        return true;
    }
}
