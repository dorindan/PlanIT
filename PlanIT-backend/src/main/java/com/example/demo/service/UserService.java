package com.example.demo.service;

import com.example.demo.converter.UserConverter;
import com.example.demo.exception.ForbiddenException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Event;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.dto.UserDto;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserConverter userConverter;

    @Autowired
    RoomService roomService;

    public List<UserDto> findall(){
        List<User> userList= userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();

        for (User user: userList){
            UserDto userDto = userConverter.toUserDto(user);
            userDtoList.add(userDto);
        }
        return userDtoList;
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public List<User> all(){
        return userRepository.findAll();
    }

    public List <Room> findRoomsForAUser(User user){
        return user.getRooms();
    }

    public User findById(int id) {
        return userRepository.findById(id);
    }

    public UserDto login(UserDto userDto) {
        User convertedUser = userConverter.toUser(userDto);
        User user = userRepository.findAll().stream()
                .filter(filteredUser -> convertedUser.getPassword().equals(filteredUser.getPassword()) &&
                        convertedUser.getUsername().equals(filteredUser.getUsername()))
                .findFirst().orElse(null);

        if (user == null) {
            throw new ForbiddenException("Username or password are wrong");
        }
        return new UserDto(user.getUsername(), user.getPassword());

    }

    public UserDto register(UserDto userDto) {
        if (findUserDtoByUsername(userDto.getUsername()) != null)
            throw new ForbiddenException("Username is taken");
        User user = userConverter.toUser(userDto);
        List <Room> rooms = new ArrayList<>();
        for (User user1 : userRepository.findAll()){
            List <String> users = new ArrayList<>();
            users.add(userDto.getUsername());
            users.add(user1.getUsername());
            Collections.sort(users);

            Room room = new Room(users.get(0) + "_" + users.get(1));

            user1.getRooms().add(room);
            room.getUsers().add(user);
            room.getUsers().add(user1);
            rooms.add(room);
        }
        User newUser = userRepository.save(user);
        for (Room room : rooms){
            roomService.saveRoom(room);
        }
        return new UserDto(newUser.getUsername());
    }

    public UserDto findUserDtoByUsername(String username){
        UserConverter userConverter = new UserConverter();
        UserDto userDto = userConverter.toUserDto(userRepository.findByUsername(username));
        if (userDto != null)
            return userDto;
        return null;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
