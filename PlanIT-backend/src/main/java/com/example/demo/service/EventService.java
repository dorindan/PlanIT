package com.example.demo.service;

import com.example.demo.converter.EventConverter;
import com.example.demo.model.Event;
import com.example.demo.model.dto.EventDto;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EventConverter eventConverter = new EventConverter();


    public List<EventDto> findAll(){
        List<EventDto> eventDtoList = new ArrayList<>();
        for (Event event : eventRepository.findAll()){
            eventDtoList.add(eventConverter.toEventDto(event));
        }
        return eventDtoList;
    }
}
