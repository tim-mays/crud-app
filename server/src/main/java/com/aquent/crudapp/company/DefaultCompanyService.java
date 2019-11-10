package com.aquent.crudapp.company;

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

@Component
public class DefaultCompanyService implements CompanyService {

    private final CompanyDao companyDao;
    private final Validator validator;

    public DefaultCompanyService(CompanyDao companyDao, Validator validator) {
        this.companyDao = companyDao;
        this.validator = validator;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Company> listCompanies() { return companyDao.listCompanies(); }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Company readCompany(Integer id) {
        return companyDao.readCompany(id);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public Company createCompany(Company company) { return companyDao.createCompany(company); }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void updateCompany(Company company) {
        companyDao.updateCompany(company);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void deleteCompany(Integer companyId) {
        companyDao.deleteCompany(companyId);
    }

    @Override
    public void validateCompany(Company company) {
        Set<ConstraintViolation<Company>> violations = validator.validate(company);

        if(!violations.isEmpty()) {
            Map<String, GraphqlFieldException.Details> detailsMap = new HashMap<>();
            for (ConstraintViolation<Company> violation : violations) {
                String fieldName = violation.getPropertyPath().toString();
                GraphqlFieldException.Details detail = new GraphqlFieldException.Details();
                detail.message = violation.getMessage();
                detail.value = violation.getInvalidValue();
                detailsMap.put(fieldName, detail);
            }
            throw new GraphqlFieldException("Company is invalid", detailsMap);
        }
    }
}
