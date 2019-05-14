package com.example.demo.service;

import com.example.demo.converter.UserConverter;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.dto.UserDto;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserConverter userConverter;

    public List<UserDto> findall(){
        List<User> userList= userRepository.findAll();
        List<UserDto> userDtoList = new ArrayList<>();

        for (User user: userList){
            UserDto userDto = userConverter.toUserDto(user);
            userDtoList.add(userDto);
        }
        return userDtoList;
    }

    public List <Room> findRoomsForAUser(User user){
        return user.getRooms();
    }

    public User findById(int id) {
        return userRepository.findById(id);
    }

}
