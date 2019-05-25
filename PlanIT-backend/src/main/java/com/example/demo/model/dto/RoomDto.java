package com.example.demo.model.dto;

import java.util.List;

public class RoomDto {

    private String roomName;
    List<UserDto> users;
    List<MessageDto> messages;

    public RoomDto(String roomName, List<UserDto> users, List<MessageDto> messages) {
        this.roomName = roomName;
        this.users = users;
        this.messages = messages;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public List<UserDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserDto> users) {
        this.users = users;
    }

    public List<MessageDto> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDto> messages) {
        this.messages = messages;
    }
}
