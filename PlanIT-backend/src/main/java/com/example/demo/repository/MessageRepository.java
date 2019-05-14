package com.example.demo.repository;

import com.example.demo.model.Message;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    public Message findById(int id);
}
