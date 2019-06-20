package com.example.demo.model.dto;

import com.example.demo.model.User;
import com.example.demo.service.CustomDateDeserializer;
import com.example.demo.service.CustomDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.sql.Timestamp;
import java.util.List;

public class EventDto {

    private String sport;

    private String location;

    private double cost;

    @JsonDeserialize(using = CustomDateDeserializer.class)
    @JsonSerialize(using = CustomDateSerializer.class)
    private Timestamp dateAndHour;

    private int subscribedPersons;

    private int maximumPersons;

    private String description;

    private User owner;

    public EventDto() {
    }

    public EventDto(String sport, String location, double cost, Timestamp dateAndHour, int maximumPersons, String description, User owner) {
        this.sport = sport;
        this.location = location;
        this.cost = cost;
        this.dateAndHour = dateAndHour;
        this.maximumPersons = maximumPersons;
        this.description = description;
        this.owner = owner;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Timestamp getDateAndHour() {
        return dateAndHour;
    }

    public void setDateAndHour(Timestamp dateAndHour) {
        this.dateAndHour = dateAndHour;
    }

    public int getSubscribedPersons() {
        return subscribedPersons;
    }

    public void setSubscribedPersons(int subscribedPersons) {
        this.subscribedPersons = subscribedPersons;
    }

    public int getMaximumPersons() {
        return maximumPersons;
    }

    public void setMaximumPersons(int maximumPersons) {
        this.maximumPersons = maximumPersons;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "EventDto{" +
                "sport='" + sport + '\'' +
                ", location='" + location + '\'' +
                ", cost=" + cost +
                ", dateAndHour=" + dateAndHour +
                ", subscribedPersons=" + subscribedPersons +
                ", maximumPersons=" + maximumPersons +
                ", description='" + description + '\'' +
                ", owner=" + owner +
                '}';
    }
}
