package com.example.demo.model;

import com.example.demo.service.CustomDateDeserializer;
import com.example.demo.service.CustomDateSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String sport;

    private String location;

    private double cost;

    @JsonDeserialize(using = CustomDateDeserializer.class)
    @JsonSerialize(using = CustomDateSerializer.class)
    private Timestamp dateAndHour;

    private int subscribedPersons;

    private int maximumPersons;

    private String description;

    @ManyToOne
    @JoinColumn(name = "owner")
    private User owner;

    @ManyToMany
    @JoinTable(name = "user_event",
            joinColumns = {@JoinColumn(name = "event_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private List<User> userList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", sport='" + sport + '\'' +
                ", location='" + location + '\'' +
                ", cost=" + cost +
                ", dateAndHour=" + dateAndHour +
                ", subscribedPersons=" + subscribedPersons +
                ", maximumPersons=" + maximumPersons +
                ", description='" + description + '\'' +
                ", owner=" + owner +
                ", userList=" + userList +
                '}';
    }
}
