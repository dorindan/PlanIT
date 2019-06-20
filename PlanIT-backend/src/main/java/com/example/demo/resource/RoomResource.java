package com.example.demo.resource;

import com.example.demo.model.Room;
import com.example.demo.model.dto.RoomDto;
import com.example.demo.repository.RoomRepository;
import com.example.demo.service.RoomService;
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
    RoomService roomService;

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public RoomDto findRoomByUsername(@PathVariable String name) {
        return roomService.findByName(name);
    }
}
