package com.example.demo.converter;

import com.example.demo.model.Message;
import com.example.demo.model.dto.MessageDto;

public class MessageConverter {

    public MessageDto toMessageDto(Message message){
        String messageText = message.getMessage();
        String username = message.getUsername();
        return new MessageDto(messageText,username);
    }


}
