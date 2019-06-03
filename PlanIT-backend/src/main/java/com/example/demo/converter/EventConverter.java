package com.example.demo.converter;

import com.example.demo.model.Event;
import com.example.demo.model.dto.EventDto;
import org.springframework.stereotype.Component;

@Component
public class EventConverter {

    public EventDto toEventDto(Event event) {
        if (event == null) {
            return null;
        }
        EventDto eventDto = new EventDto();

        eventDto.setCost(event.getCost());
        eventDto.setDateAndHour(event.getDateAndHour());
        eventDto.setDescription(event.getDescription());
        eventDto.setLocation(event.getLocation());
        eventDto.setMaximumPersons(event.getMaximumPersons());
        eventDto.setOwner(event.getOwner());
        eventDto.setSport(event.getSport());
        eventDto.setSubscribedPersons(event.getSubscribedPersons());
        eventDto.setUserList(event.getUserList());

        return eventDto;
    }

    public Event toEvent(EventDto eventDto) {
        if (eventDto == null) {
            return null;
        }
        Event event = new Event();

        event.setCost(eventDto.getCost());
        event.setDateAndHour(eventDto.getDateAndHour());
        event.setDescription(eventDto.getDescription());
        event.setLocation(eventDto.getLocation());
        event.setMaximumPersons(eventDto.getMaximumPersons());
        event.setOwner(eventDto.getOwner());
        event.setSport(eventDto.getSport());
        event.setSubscribedPersons(eventDto.getSubscribedPersons());
        event.setUserList(eventDto.getUserList());

        return event;
    }

}
