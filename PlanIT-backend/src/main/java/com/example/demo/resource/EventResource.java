package com.example.demo.resource;

import com.example.demo.model.Event;
import com.example.demo.model.dto.EventDto;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/event")
public class  EventResource {

    @Autowired
    EventService eventService;

    @RequestMapping(value = "/all", method= RequestMethod.GET)
    public List<Event> findAllEvents(){
        return eventService.findAll();
    }

    @RequestMapping(value = "/subscribe/{username}/{eventId}", method= RequestMethod.POST)
    public void subscribe(@PathVariable String username, @PathVariable Integer eventId){
        eventService.subscribe(username,eventId);
    }

    @RequestMapping(value = "/unsubscribe/{username}/{eventId}", method= RequestMethod.POST)
    public void unsubscribe(@PathVariable String username, @PathVariable Integer eventId){
        eventService.unsubscribe(username,eventId);
    }

    @RequestMapping(value = "/createEvent", method= RequestMethod.POST)
    public void createEvent(@RequestBody EventDto eventDto){
        eventService.createEvent(eventDto);
    }

    @RequestMapping(value = "/deleteById/{id}", method= RequestMethod.POST)
    public void deleteById(@PathVariable Integer id){
        eventService.deleteById(id);
    }
}
