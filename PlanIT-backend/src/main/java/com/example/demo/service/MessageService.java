package com.example.demo.service;

import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    public Message findById(int id){
        return messageRepository.findById(id);
    }

    public List<Message> findAll(){
        return messageRepository.findAll();
    }
}
