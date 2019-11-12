package com.aquent.crudapp.company;

import com.aquent.crudapp.person.Person;
import com.aquent.crudapp.util.ResultSetRowMap;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
public class JdbcCompanyDao implements CompanyDao {
    private static final String SQL_LIST_COMPANIES = "SELECT * FROM company ORDER BY company_name, company_id";
    private static final String SQL_READ_COMPANY = "SELECT * FROM company WHERE company.company_id = :companyId";
    private static final String SQL_DELETE_COMPANY = "DELETE FROM company WHERE company_id = :companyId";
    private static final String SQL_UPDATE_COMPANY = "UPDATE company SET (company_name, website_uri, phone_number, street_address, city, state, zip_code)"
                                                   + " = (:companyName, :websiteUri, :phoneNumber, :streetAddress, :city, :state, :zipCode)"
                                                   + " WHERE company_id = :companyId";
    private static final String SQL_CREATE_COMPANY = "INSERT INTO company (company_name, website_uri, phone_number, street_address, city, state, zip_code)"
                                                   + " VALUES (:companyName, :websiteUri, :phoneNumber, :streetAddress, :city, :state, :zipCode)";

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcCompanyDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Company> listCompanies() {
        return namedParameterJdbcTemplate.getJdbcOperations().query(SQL_LIST_COMPANIES, new CompanyRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public Company createCompany(Company company) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(SQL_CREATE_COMPANY, new BeanPropertySqlParameterSource(company), keyHolder);
        return readCompany(Objects.requireNonNull(keyHolder.getKey()).intValue());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Company readCompany(Integer companyId) {
        return namedParameterJdbcTemplate.queryForObject(SQL_READ_COMPANY, Collections.singletonMap("companyId", companyId), new CompanyRowMapper());
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void updateCompany(Company company) {
        namedParameterJdbcTemplate.update(SQL_UPDATE_COMPANY, new BeanPropertySqlParameterSource(company));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS)
    public void deleteCompany(Integer companyId) {
        namedParameterJdbcTemplate.update(SQL_DELETE_COMPANY, Collections.singletonMap("companyId", companyId));
    }

    private static final class CompanyRowMapper implements RowMapper<Company> {
        @Override
        public Company mapRow(@NotNull ResultSet rs, int rowNum) throws SQLException {
            return ResultSetRowMap.mapCompany(rs);
        }
    }
}
