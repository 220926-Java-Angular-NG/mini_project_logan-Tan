package com.revature;


import com.revature.Controller.dbController;
import com.revature.Model.User;
import io.javalin.Javalin;
import io.javalin.core.JavalinConfig;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Driver {
    public static void main(String[] args) throws SQLException {
        dbController db = new dbController(); // get a database controller running.
        Javalin app = Javalin.create(JavalinConfig::enableCorsForAllOrigins).start(8080); // start up a Javalin instance
        User Test = new User();
        Test.setFirstname("Logan");
        Test.setLastname("Tan");
        app.get("/test",context -> context.json(Test));
        List<User> users = new ArrayList<>();

        app.post("/register",context -> {
            User input = context.bodyAsClass(User.class);
            if(db.registerUsr(input.getFirstname(),input.getLastname(),input.getUsername(),input.getPasscode(),input.getEmail(),input.getSign())){
                context.json(input); // return what was sent to signify you registered
            } else{
                context.json(new User()); // return an empty user to inform the browser nothing happened
            }
        });
        app.post("/login",context -> {
            User input = context.bodyAsClass(User.class);
            User out = input;
            boolean loggedin = false;
            for (User usr:users) {
                if(usr.getUsername().equals(input.getUsername()) && usr.getPasscode().equals(input.getPasscode())){ // check currently logged in
                    loggedin = true;
                    out = usr;
                    context.json(out);
                    break;
                }
            }
            if(!loggedin) {
                out = db.login(input.getUsername(), input.getPasscode()); // returns a user or null
                if (out != null) { // check db to see if cradentials are correct
                    users.add(out);
                    context.json(out); // return the found user from the database
                } else{
                    context.json(input); //return input
                }
            } else{
                context.json(out); // return the credtials to signify that nothing was found
            }

        });
        app.post("/logout",context -> {
            User input = context.bodyAsClass(User.class);
            User out = new User();
            for (User usr:users) {
                if(usr.getUsername().equals(input.getUsername()) && usr.getId() == input.getId()){ // check currently logged in
                    out = usr;
                    users.remove(usr);
                    context.json(out);
                    break;
                }
            }
            context.json(out);
        });
        app.post("/adjustmood", context -> {
            User input = context.bodyAsClass(User.class);
            db.adjustmood(input.getId(),input.getMood());
            context.json(input);
        });
        app.post("/getmood", context -> {
            User input = context.bodyAsClass(User.class);
            User output = db.getmood(input.getId());
            context.json(output);
        });
    }
}