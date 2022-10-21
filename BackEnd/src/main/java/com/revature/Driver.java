package com.revature;


import com.revature.Controller.dbController;
import com.revature.Model.User;
import io.javalin.Javalin;
import io.javalin.core.JavalinConfig;

import java.sql.SQLException;
public class Driver {
    public static void main(String[] args) throws SQLException {
        dbController db = new dbController(); // get a database controller running.
        Javalin app = Javalin.create(JavalinConfig::enableCorsForAllOrigins).start(8080); // start up a Javalin instance
        User Test = new User();
        Test.setFirstname("Logan");
        Test.setLastname("Tan");
        app.get("/test",context -> context.json(Test));
        app.post("/register",context -> {
            User input = context.bodyAsClass(User.class);
            db.registerUsr(input.getFirstname(),input.getLastname(),input.getUsername(),input.getPasscode(),input.getEmail(),input.getSign());
            context.json(input);
        });
    }
}