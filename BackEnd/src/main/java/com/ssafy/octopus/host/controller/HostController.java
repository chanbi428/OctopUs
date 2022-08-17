package com.ssafy.octopus.host.controller;

import com.ssafy.octopus.host.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HostController {

    @Autowired
    private final SimpMessagingTemplate template;

    @MessageMapping("/inGame/host")
    public void order(ChatMessageDto message){
        template.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
    }

    @PostMapping("/inGame/toHost")
    public void fromFE(@RequestBody ChatMessageDto message){
        System.out.println("interval : " + message);
        String state = "";
        switch (message.getMessage()){
            case "0":
                state = "vote";
                break;
            case "1":
                state = "discussion";
                break;
            case "2":
                state = "night";
                break;
            case "3":
                state = "day";
                break;
            default:
                System.out.println("Something wrong");
                break;
        }
        message.setMessage(state);
        message.setSender("host");
        order(message);
    }
}
