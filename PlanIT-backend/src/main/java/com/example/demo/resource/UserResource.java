package com.example.demo.resource;

import com.example.demo.model.Event;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.dto.EventDto;
import com.example.demo.model.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserResource {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public UserDto login(@NotNull @RequestBody UserDto userDto) {
        System.out.println(userDto);
        return userService.login(userDto);
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public UserDto signUp(@NotNull @RequestBody UserDto userDto) {
        return userService.register(userDto);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserDto> findall(){
        return userService.findall();
    }

    @RequestMapping(value = "/allll", method = RequestMethod.GET)
    public List<User> all(){
        return userService.all();
    }

    @RequestMapping(value = "/allRooms/{id}", method = RequestMethod.GET)
    public List<Room> findallRooms(@PathVariable Integer id){
        return userService.findRoomsForAUser(userService.findById(id));
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public UserDto findByUsername(@PathVariable String username){
        return userService.findUserDtoByUsername(username);
    }

    @RequestMapping(value = "/{username}/events", method = RequestMethod.GET)
    public List<Event> getEventsByUserId(@PathVariable String username){
        return userService.findUserDtoByUsername(username).getEventList();
    }
}
