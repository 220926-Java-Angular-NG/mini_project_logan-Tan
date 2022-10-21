package com.revature.Model;

public class Horoscope {
    String sunsign;
    String horoscope;
    String[] meta;

    public Horoscope(){}





    //getter setter block
    public String getSunsign() {
        return sunsign;
    }

    public void setSunsign(String sunsign) {
        this.sunsign = sunsign;
    }

    public String getHoroscope() {
        return horoscope;
    }

    public void setHoroscope(String horoscope) {
        this.horoscope = horoscope;
    }

    public String[] getMeta() {
        return meta;
    }

    public void setMeta(String[] meta) {
        this.meta = meta;
    }
}
