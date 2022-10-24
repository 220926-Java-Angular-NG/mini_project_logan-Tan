package com.revature.Controller;

import com.revature.Model.User;
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
                    "UserName VARCHAR not NULL unique PRIMARY KEY,"+
                    "Passcode VARCHAR not NULL,"+
                    "Email VARCHAR not NULL,"+
                    "Sign VARCHAR not NULL,"+
                    "Mood VARCHAR,"+
                    "id serial)");
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

    public void adjustmood(int id, String mood) throws SQLException {
        Query = "Select * from users where id = ?;";
        act = connection.prepareStatement(Query);
        act.setInt(1,id);
        try {
            res = act.executeQuery();
        } catch (SQLException e){
            LOGGER.error(e.getMessage());
        }
        Query = "update users set mood = ? where id = ?";
        act = connection.prepareStatement(Query);
        act.setString(1,mood);
        act.setInt(2,id);
        act.execute();
    }

    public User getmood(int id){
        User out = new User();
        try {
            Query = "Select mood from users where id = ?;";
            act = connection.prepareStatement(Query);
            act.setInt(1,id);
            res = act.executeQuery();
            if(res.next()) {
                out.setMood(res.getString("mood"));
                return out;
            }
        } catch (SQLException e){
            LOGGER.error(e.getMessage());
        }
        return out;
    }

    public User login(String username, String passcode){
        try{
            Query = "Select * from users where username = ? and passcode = ?";
            act = connection.prepareStatement(Query);
            act.setString(1,username);
            act.setString(2,passcode);
            res = act.executeQuery();
            if(res.next()){
                User out = new User();
                out.setFirstname(res.getString("firstname"));
                out.setLastname(res.getString("lastname"));
                out.setUsername(res.getString("username"));
                out.setPasscode(res.getString("passcode"));
                out.setSign(res.getString("sign"));
                out.setId(res.getInt("id"));
                return out;
            }
        }catch (SQLException e){
            LOGGER.error((e.getMessage()));
        }
        return null;
    }
}
