package com.example.demo.service;

import com.example.demo.converter.RoomConverter;
import com.example.demo.converter.UserConverter;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.dto.RoomDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

    public RoomDto findByName(String name) {
        RoomConverter roomConverter = new RoomConverter();
        Room room = roomRepository.findByRoomName(name);
        if (room != null) {
            return roomConverter.toRoomDto(room);
        }
        return null;
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

}
