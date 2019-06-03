package com.example.demo.resource;

import com.example.demo.model.Event;
import com.example.demo.model.dto.EventDto;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/event")
public class EventResource {

    @Autowired
    EventService eventService;

    @RequestMapping(value = "/all", method= RequestMethod.GET)
    public List<EventDto> findAllEvents(){
        return eventService.findAll();
    }
}
