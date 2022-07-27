package com.ssafy.octopus.main.dto;
/**
 * @brief : Room Dto
 * @details : DB에서 연결되는 Room에 관련된 변수들 (JPA 사용하기 위해 ENTITY 정의)
 * @date 2022-07-25
 * @author : LDY, 98dlstod@naver.com
 */
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomDto {
    private int idx;
    private String roomId;
    private String roomChief;
    private boolean isPrivate;
    private String roomName;
    private int personLimit;
    private String roomPw;
    private boolean gameStatus;
    private int personNum;
    private int gameTime;
    private String userList;
}
