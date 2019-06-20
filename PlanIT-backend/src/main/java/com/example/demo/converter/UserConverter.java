package com.example.demo.converter;

import com.example.demo.model.User;
import com.example.demo.model.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public User toUser (UserDto userDto){
        if (userDto == null){
            return null;
        }
        User user = new User();
        user.setPassword(userDto.getPassword());
        user.setUsername(userDto.getUsername());
        return user;
    }

    public UserDto toUserDto(User user){
        if (user == null){
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEventList(user.getEventList());
        return userDto;
    }
}
