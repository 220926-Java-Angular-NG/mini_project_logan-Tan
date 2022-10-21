package com.revature.Model;

public class User {
    String firstname;
    String lastname;
    String username;
    String passcode;
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

    public void setSign(String sign) {
        this.sign = sign;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }
}