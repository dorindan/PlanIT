package com.example.demo.resource;

import com.sun.corba.se.spi.ior.ObjectId;
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
    WebSocketResource(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void onReceivedMessage(String message){
        this.template.convertAndSend("/chat", new SimpleDateFormat("HH:mm:ss")
                     .format(new Date())+"- "+message);
    }

    @MessageMapping("/{roomId}")
    private void sendMessageTpPrivateRoom(String message, @DestinationVariable ObjectId roomId) throws IOException {
        this.template.convertAndSend("/privateRoom/" + roomId, message);
    }
}
