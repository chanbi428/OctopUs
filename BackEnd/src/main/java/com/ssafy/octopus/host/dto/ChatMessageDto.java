package com.ssafy.octopus.host.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 생성함 : public ChatMessage(){};
@AllArgsConstructor
// 모든 파라미터가 있는 생성자 생성 : public ChatMessage(MessageType type, String roomId ...) {this.type = type; ....}
public class ChatMessageDto { // fix structure
    public enum MessageType{
        ENTER, TALK, SYSTEM
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
}
