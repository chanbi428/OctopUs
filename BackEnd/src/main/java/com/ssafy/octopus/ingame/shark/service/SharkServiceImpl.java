package com.ssafy.octopus.ingame.shark.service;

import com.ssafy.octopus.ingame.shark.dao.SharkRepository;
import com.ssafy.octopus.ingame.shark.entity.Shark;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SharkServiceImpl implements SharkService {

    @Autowired
    SharkRepository dao;

    /** @brief : createShark, shark table에 유저 저장
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : Shark
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Shark insert(Shark dto) {
        return dao.save(dto);
    }

    /** @brief : updateShark, 게임 결과 시간 저장
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : Shark
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateByUserName(Shark dto) {
        return dao.updateByUserName(dto.getTime(), dto.getUserName());
    }

    /** @brief : getResult, 게임 결과 조회
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : Shark
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Shark getResult(String roomId) {
        return dao.findByRoomId(roomId);
    }
}
