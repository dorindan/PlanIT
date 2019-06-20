package com.example.demo.service;

import com.example.demo.converter.EventConverter;
import com.example.demo.converter.UserConverter;
import com.example.demo.exception.ForbiddenException;
import com.example.demo.model.Event;
import com.example.demo.model.User;
import com.example.demo.model.dto.EventDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserConverter userConverter;

    @Autowired
    EventConverter eventConverter = new EventConverter();

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Optional<Event> findById(Integer id){
        return eventRepository.findById(id);
    }


    public void subscribe(String username, Integer eventId){

        User user = userService.findUserByUsername(username);
        Event event = findById(eventId).get();
        if (event.getSubscribedPersons() == event.getMaximumPersons()){
            throw new ForbiddenException("Limit of persons exceeded!");
        }
//        user.getEventList().add(event);
        event.getUserList().add(user);
        event.setSubscribedPersons(event.getSubscribedPersons() + 1);
        userService.saveUser(user);
        eventRepository.save(event);
    }

    public void unsubscribe(String username, Integer eventId){
        User user = userService.findUserByUsername(username);
        Event event = findById(eventId).get();
        System.out.println(user);
        System.out.println(event);
        user.getEventList().remove(event);
        event.getUserList().remove(user);
        event.setSubscribedPersons(event.getSubscribedPersons() - 1);
        userService.saveUser(user);
        eventRepository.save(event);
    }

    public void createEvent(EventDto eventDto){
        System.out.println(eventDto);
        Event event = eventConverter.toEvent(eventDto);
        User user = userService.findUserByUsername(event.getOwner().getUsername());
        event.setOwner(user);
        event.setSubscribedPersons(1);
        List<User> userList = new ArrayList<>();
        userList.add(user);
        event.setUserList(userList);
        eventRepository.save(event);
    }

    public void deleteById(Integer id){
        eventRepository.deleteById(id);
    }

}
