package com.revature.Controller;

import com.revature.Utils.ConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class dbController {
    private static final Logger LOGGER = LoggerFactory.getLogger(dbController.class);
    public Connection connection;
    public PreparedStatement act;
    public String Query;
    public ResultSet res;

    public dbController() {
        try {
            connection = ConnectionManager.getConn();
            act = connection.prepareStatement("create table if not exists users(FirstName VARCHAR not NULL,"+
                    "LastName VARCHAR not NULL,"+
                    "UserName VARCHAR not NULL PRIMARY KEY,"+
                    "Passcode VARCHAR not NULL,"+
                    "Email VARCHAR not NULL,"+
                    "Sign VARCHAR not NULL,"+
                    "Mood VARCHAR)");
            act.execute();
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
    }

    public boolean registerUsr(String firstName, String lastName, String userName,String Password,String Email,String sign) throws SQLException {
        Query = "Select * from users where username = ?;";
        act = connection.prepareStatement(Query);
        act.setString(1,userName);
        try {
            res = act.executeQuery();
            System.out.println("search");
        } catch (SQLException e){
            LOGGER.error(e.getMessage());
            return false;
        }
        if(!res.next()){
            Query = ("INSERT INTO users (firstname,lastname,username,passcode,email,sign) VALUES (?,?,?,?,?,?);");
            act = connection.prepareStatement(Query);
            act.setString(1,firstName);
            act.setString(2,lastName);
            act.setString(3,userName);
            act.setString(4,Password);
            act.setString(5,Email);
            act.setString(6,sign);
            act.execute();
            return true; // The Username doesn't already exist adding to DB
        }
        return false; // The name exists was not added returing now
    }
}
