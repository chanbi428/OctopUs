package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.entity.Gamer;

import java.util.List;

public interface GameService {

    public List<Gamer> insert(List<String> users, String roomId);

    /** @brief : delete, 해당하는 roomId를 가진 gamer, night, vote 삭제
     *  @date : 2022-08-02
     *  @param : RoomId
     *  @return : Long
     *  @author : LDY, 98dlstod@naver.com
     */
    Long deleteByRoomId(String roomId); // gamer, vote, night들 삭제
}
