package com.example.demo.resource;

import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.service.MessageService;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketResource {

    private final SimpMessagingTemplate template;

    @Autowired
    MessageService messageService;

    @Autowired
    WebSocketResource(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/{roomName}/{username}")
    private void sendMessageToPrivateRoom(String message,
                                          @DestinationVariable String roomName,
                                          @DestinationVariable String username) {
        messageService.save(message,roomName,username);
        this.template.convertAndSend("/privateRoom/" + roomName, new Message(message,username));
    }
}
