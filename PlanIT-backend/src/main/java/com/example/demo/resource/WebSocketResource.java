package com.example.demo.resource;

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

    @MessageMapping("/{roomId}")
    private void sendMessageToPrivateRoom(String message, @DestinationVariable String roomId) throws IOException {
        System.out.println(message);
        this.template.convertAndSend("/privateRoom/" + roomId, message);
    }

    @MessageMapping("/send/message")
    public void onReceivedMesage(String message){
        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "+message);
    }
}
