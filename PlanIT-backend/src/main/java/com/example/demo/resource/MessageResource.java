package com.example.demo.resource;

import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/message")
public class MessageResource {

    @Autowired
    MessageService messageService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Message findById(@DestinationVariable String id){
        return messageService.findById(Integer.valueOf(id));
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Message> findAll(){
        return messageService.findAll();
    }
}
