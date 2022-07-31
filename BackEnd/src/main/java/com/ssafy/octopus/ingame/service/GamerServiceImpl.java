package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.dao.GamerDao;
import com.ssafy.octopus.ingame.entity.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamerServiceImpl implements GamerService {

    @Autowired
    GamerDao dao;

    @Override
    public Gamer findByUserName(String userName){
        Gamer gamer = new Gamer();
        try{
            gamer = dao.findByUserName(userName);
            //System.out.println(userName);
            String a = gamer == null? "없다" : userName;
            System.out.println(a);
            return gamer;
        } catch (Exception e){
            e.printStackTrace();
            return  gamer;
        }
    }

    /** @brief : Gamer List, 모든 Gamer List 반환
     *  @date : 2022-07-31
     *  @param
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    public  List<Gamer> list(){
        return dao.findAll();
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : roomId
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Gamer> findByRoomId(String roomId){
        return dao.findByRoomId(roomId);
    }


    /** @brief : isDead, userName에 해당하는 게이머의 생사 확인
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Boolean isDead(String userName) {
        Gamer gamer = findByUserName(userName);
        if(gamer == null) return false;
        return gamer.isDead() ? true : false;
    }

    /** @brief : updateByUserName, userName에 해당하는 게이머 승리로 변경
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateByUserName(String userName) {
        return dao.updateByUserName(userName);
    }

    /** @brief : updateByGameTeam, gameTeam에 해당하는 게이머들 승리로 변경
     *  @date : 2022-07-31
     *  @param : gameTeam
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateByGameTeam(String gameTeam) {
        return dao.updateByGameTeam(gameTeam);
    }

//    /** @brief : deleteCaves, 해당하는 roomId를 가진 cave들 삭제
//     *  @date : 2022-07-31
//     *  @param : RoomId
//     *  @return : ResponseEntity<Long>
//     *  @author : LDY, 98dlstod@naver.com
//     */
//    @Override
//    public Long deleteByRoomId(String roomId) {return dao.deleteByRoomId(roomId);}

}
