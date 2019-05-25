package com.example.demo.service;

import com.example.demo.model.Message;
import com.example.demo.model.Room;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    RoomRepository roomRepository;

    public Message findById(int id){
        return messageRepository.findById(id);
    }

    public List<Message> findAll(){
        return messageRepository.findAll();
    }

    public void save(String message, String roomName, String username){
        Room room = roomRepository.findByRoomName(roomName);
        Message message1 = new Message(message, room,username);
        messageRepository.save(message1);
    }
}
