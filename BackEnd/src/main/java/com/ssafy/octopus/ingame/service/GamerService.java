package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.entity.Gamer;

import java.util.List;
import java.util.Optional;

public interface GamerService {

    public Gamer findByUserName(String userName);

    List<Gamer> list(); // 전체 게이머 목록

    List<Gamer> findByRoomId(String roomId);  // 방 ID에 따른 gamer들 조회

    List<Gamer> findByIsVictory(); // 승리한 gamer들 조회

    Gamer isDead(String userName); // userName에 해당하는 게이머의 생사 확인

    int updateByUserName(String userName); // userName에 해당하는 게이머 승리로 변경

    int updateByGameTeam(String gameTeam); // gameTeam에 해당하는 게이머들 승리로 변경

    public Gamer isVictory(String roomId); // 마피아 vs 시민 승리 조건 확인

    boolean isMafia(String userName); // 마피아 유무 확인

    String getJob(String userName); // 해당 게이머 직업 확인

    public int setDead(String userName); // 죽었을 때 처리
}
