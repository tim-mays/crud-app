package com.aquent.crudapp;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphqlFieldException extends RuntimeException implements GraphQLError {
    private Map<String, Object> extensions = new HashMap<>();
    private String message;

    public GraphqlFieldException(String message, Map<String, Details> detailsMap) {
        this.message = message;
        detailsMap.forEach((key, value) -> extensions.put(key, value));
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return extensions;
    }

    @Override
    public ErrorType getErrorType() {
        return null;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public static class Details {
        public String message;
        public Object value;
    }
}
