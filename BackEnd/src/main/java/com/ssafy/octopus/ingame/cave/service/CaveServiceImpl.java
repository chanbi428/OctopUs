package com.ssafy.octopus.ingame.cave.service;

/**
 * @brief : Cave Service Impl
 * @details : 요청을 처리하기 위한 service 비즈니스 로직을 구현한 class
 * @date 2022-07-31
 * @author : LDY, 98dlstod@naver.com
 */

import com.ssafy.octopus.ingame.cave.dao.CaveDao;
import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.dao.GamerDao;
import com.ssafy.octopus.ingame.entity.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CaveServiceImpl implements CaveService {

    @Autowired
    CaveDao dao;

    @Autowired
    GamerDao gamerDao;

    /** @brief : Cave List, 모든 Cave List 반환
     *  @date : 2022-07-25
     *  @param
     *  @return : List<Cave>
     *  @author : LDY, 98dlstod@naver.com
     */
    public List<Cave> list(){
        return dao.findAll();
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Cave 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : roomId
     *  @return : List<Cave>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Cave> findByRoomId(String roomId){
        return dao.findByRoomId(roomId);
    }


    /** @brief : findByCaveIdAndRoomId, (caveId, roomId)가 일치하는 Cave 찾아줌
     *  @date : 2022-07-31
     *  @param : caveId, roomId
     *  @return : Optional<Cave>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Optional<Cave> findByCaveIdAndRoomId (int caveId, String roomId){
        return dao.findByCaveIdAndRoomId(caveId, roomId);
    }

    /** @brief : createCave, cave 생성
     *  @date : 2022-07-31
     *  @param : Cave
     *  @return : Cave
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Cave insert(Cave cave) {
        return dao.save(cave);
    }

    /** @brief : updateCave, cave 수정
     *  @date : 2022-07-31
     *  @param : Cave
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int update(Cave cave) {
        return dao.update(cave.getPersonNum(), cave.getPersonList(), cave.getCaveId(), cave.getRoomId());
    }

    /** @brief : deleteCaves, 해당하는 roomId를 가진 cave들 삭제
     *  @date : 2022-07-31
     *  @param : RoomId
     *  @return : ResponseEntity<Long>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Long deleteByRoomId(String roomId) {return dao.deleteByRoomId(roomId);}

    /** @brief : isOurTeam, 탐사가 - 탐사가가 들어간 굴에 다른 팀 있는지 없는지 여부 확인 API
     *  @date : 2022-08-01
     *  @param : caveId, roomId
     *  @return : ResponseEntity<Boolean>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Boolean isOurTeam(int caveId, String roomId){
        Optional<Cave> tmp = findByCaveIdAndRoomId(caveId, roomId);
        Cave cave = tmp.get();
        String[] personList = cave.getPersonList().split(", ");

        for ( String person: personList) {
            Gamer gamer = gamerDao.findByUserName(person);
            if(!gamer.getGameTeam().equals("시민")) return false;
        }
        return true;
    }



}
