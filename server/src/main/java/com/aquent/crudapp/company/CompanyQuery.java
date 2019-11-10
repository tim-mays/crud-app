package com.aquent.crudapp.company;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompanyQuery implements GraphQLQueryResolver {
    private Logger logger = LoggerFactory.getLogger(CompanyQuery.class);
    private CompanyService companyService;

    @Autowired
    private void setCompanyService(CompanyService companyService) { this.companyService = companyService; }

    public List<Company> getCompanies() {
        logger.info("getCompanies was called");
        return this.companyService.listCompanies();
    }

    public Company getCompany(final int id) {
        logger.info("getCompany was called");
        return this.companyService.readCompany(id);
    }

}
