package com.revature.Service;


import com.revature.Controller.dbController;
import com.revature.Model.User;
import io.javalin.Javalin;

// Table Declaration statement
// create table User(	FirstName VARCHAR not NULL,
//					LastName VARCHAR not NULL,
//					UserName VARCHAR not NULL,
//					Passcode VARCHAR not NULL,
//					Sign VARCHAR not NULL,
//					Mood VARCHAR);
public class Driver {
    public static void main(String[] args) {
        dbController db = new dbController(); // get a database controller running.
        Javalin app = Javalin.create().start(8080); // start up a Javalin instance
        User Test = new User();
        Test.setFirstname("Logan");
        Test.setLastname("Tan");
        app.get("/test",context -> context.json(Test));
    }
}