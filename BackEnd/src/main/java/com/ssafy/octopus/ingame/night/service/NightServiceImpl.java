package com.ssafy.octopus.ingame.night.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.night.dao.NightDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NightServiceImpl implements NightService {

    @Autowired
    NightDao dao;

    /** @brief : updateNight, roomId의 해당하는 night의 nominee_name 초기화
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateByRoomIdForInitialization(String roomId) {
        return dao.updateByRoomIdForInitialization(roomId);
    }

    /** @brief : updateNight, night때 userName의 게이머가 지목한 nominee_name 저장
     *  @date : 2022-08-01
     *  @param : nomineeName, userName
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateByNomineeNameAndUserName(String nomineeName, String userName) {
        return dao.updateByNomineeNameAndUserName(nomineeName, userName);
    }
}
