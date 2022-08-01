package com.ssafy.octopus.ingame.night.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;

public interface NightService {
    int updateByRoomIdForInitialization(String roomId); // roomId에 해당되는 night 테이블 초기화

    int updateByNomineeNameAndUserName(String nomineeName, String userName); // userName => 지명한 사람을 nomineeName에 저장
}
