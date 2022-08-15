package com.ssafy.octopus.ingame.night.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.night.entity.Night;

public interface NightService {
    int updateByRoomIdForInitialization(String roomId); // roomId에 해당되는 night 테이블 초기화

    int updateByNomineeNameAndUserName(String nomineeName, String userName); // userName => 지명한 사람을 nomineeName에 저장

    public Night findByUserName(String userName);  // userName으로 Night 조회 (지목상대 알아낼 때 사용)

    public String nightResult(String roomId);  // 밤 역할 수행 후 결과 조회

    public Gamer findByRoomIdAndGameJob(String roomId, String gameJob);  // 기자 지목 조회
}
