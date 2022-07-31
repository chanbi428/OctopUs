package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.entity.Gamer;

import java.util.List;
import java.util.Optional;

public interface GamerService {

    public Gamer findByUserName(String userName);

    List<Gamer> list(); // 전체 게이머 목록

    List<Gamer> findByRoomId(String roomId);  // 방 ID에 따른 gamer들 조회

    Boolean isDead(String userName); // userName에 해당하는 게이머의 생사 확인

//    Cave insert(Cave dto); // 공용 굴 생성

    int updateByUserName(String userName); // userName에 해당하는 게이머 승리로 변경

    int updateByGameTeam(String gameTeam); // gameTeam에 해당하는 게이머들 승리로 변경

//    Long deleteByRoomId(String roomId); // 공용 굴 들 삭제

}
