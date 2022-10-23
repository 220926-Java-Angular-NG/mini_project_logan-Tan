package com.revature.Model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;

public class User {
    String firstname;
    String lastname;
    String username;
    String passcode;
    String email;
    String sign;
    String mood;

    public User(){}; // Empty constructor for Javalin


    // Getter and Setter block
    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getUsername() {
        return username;
    }

    public String getPasscode() {
        return passcode;
    }
    public String getEmail() {
        return email;
    }
    public String getSign() {
        return sign;
    }

    public String getMood() {
        return mood;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasscode(String passcode) {
        this.passcode = passcode;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setSign(String sign) {
        this.sign = sign;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }
}
