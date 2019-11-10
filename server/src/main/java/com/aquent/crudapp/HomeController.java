package com.aquent.crudapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Simple controller to redirect to GraphiQL. There is no other UI
 * in this GraphQL server.
 */
@Controller
public class HomeController {
    /**
     * Redirect to GraphiQL.
     *
     * @return redirect to GraphiQL
     */
    @GetMapping("/")
    public String index() {
        return "redirect:/graphiql";
    }
}
