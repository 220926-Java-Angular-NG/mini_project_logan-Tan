package com.revature.Controller;

import com.revature.Utils.ConnectionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class dbController {
    private static final Logger LOGGER = LoggerFactory.getLogger(dbController.class);
    Connection connection = null;
    PreparedStatement act = null;
    String Query = null;
    ResultSet res = null;

    public dbController() {
        try {
            connection = ConnectionManager.getConn();
            act = connection.prepareStatement("create table if not exists Users(FirstName VARCHAR not NULL,"+
                    "LastName VARCHAR not NULL,"+
                    "UserName VARCHAR not NULL PRIMARY KEY,"+
                    "Passcode VARCHAR not NULL,"+
                    "Sign VARCHAR not NULL,"+
                    "Mood VARCHAR)");
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
