package com.example.demo.service;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    public Room findByName(String name){
        return roomRepository.findByRoomName(name);
    }

    public List<Room> findAll(){
        return roomRepository.findAll();
    }
}
