package com.example.demo.converter;

import com.example.demo.model.Message;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.dto.MessageDto;
import com.example.demo.model.dto.RoomDto;
import com.example.demo.model.dto.UserDto;

import java.util.ArrayList;
import java.util.List;

public class RoomConverter {

    public RoomDto toRoomDto(Room room){
        String roomName = room.getRoomName();
        List<UserDto> users = new ArrayList<>();
        List<MessageDto> messages = new ArrayList<>();
        UserConverter userConverter = new UserConverter();
        MessageConverter messageConverter = new MessageConverter();

        for (User user: room.getUsers()){
            UserDto userDto = userConverter.toUserDto(user);
            users.add(userDto);
        }

        for (Message message: room.getMessages()){
            messages.add(messageConverter.toMessageDto(message));
        }

        return new RoomDto(roomName,users,messages);
    }
}
