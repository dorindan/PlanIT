package com.example.demo.resource;

import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/room")
public class RoomResource {

    @Autowired
    RoomRepository roomRepository;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public Room findRoomByUsername(@PathVariable String name) {
        return roomRepository.findByRoomName(name);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Room> findAll() {
        return roomRepository.findAll();
    }
}
