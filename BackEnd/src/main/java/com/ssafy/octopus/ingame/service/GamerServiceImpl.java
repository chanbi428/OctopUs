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

    /** @brief : Gamer, userName이 같은 Gamer 반환
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Gamer
     *  @author : BCB
     */
    @Override
    public Gamer findByUserName(String userName){
        Gamer gamer = new Gamer();
        try{
            gamer = dao.findByUserName(userName);
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

    /** @brief : findByIsVictory, 승리한 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Gamer> findByIsVictory(){
        return dao.findByIsVictory(true);
    }


    /** @brief : isDead, userName에 해당하는 게이머의 생사 확인
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Gamer
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Gamer isDead(String userName) {
        Gamer gamer = new Gamer();
        try{
            gamer = dao.findByUserName(userName);
            return gamer;
        } catch (Exception e){
            e.printStackTrace();
            return  gamer;
        }
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
    public int updateByGameTeam(String roomId, String gameTeam) {
        return dao.updateByGameTeam(roomId, gameTeam);
    }

    /** @brief : isVictory, 마피아 vs 시민 승리 조건 확인
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : Gamer
     *  @author : BCB
     */
    @Override
    public Gamer isVictory(String roomId){
        Gamer gamer = new Gamer();

        int mafia = dao.countAlive(roomId, "마피아");  // 마피아 살아있는 사람 수
        int middle = dao.countAlive(roomId, "중립");  // 중립 살아있는 사람 수
        int citizen = dao.countAlive(roomId, "시민"); // 시민 살아있는 사람 수

        if(mafia == 0){  // 마피아가 다 죽었으면 시민 승리
            gamer.setGameTeam("시민");
            gamer.setVictory(true);
        } else if(mafia >= (middle + citizen)){  // 마피아가 같거나 많으면 승리
            gamer.setGameTeam("마피아");
            gamer.setVictory(true);
        } else{  // 아무도 승리한 사람이 없음
            gamer.setVictory(false);
        }
        return gamer;
    }

    /** @brief : isMafia, userName에 해당하는 게이머, 마피아 유무 확인
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public boolean isMafia(String userName) {
        Gamer gamer = findByUserName(userName);
        if(gamer == null) return false;
        return gamer.getGameJob().equals("마피아") ? true : false;
    }

    /** @brief : isMafia, userName에 해당하는 게이머, 마피아 유무 확인
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public String getJob(String userName) {
        Gamer gamer = findByUserName(userName);
        if(gamer == null) return "";
        return gamer.getGameJob();
    }

    /** @brief : setDead, 죽었을 때 처리
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : int
     *  @author : BCB
     */
    @Override
    public int setDead(String userName) {
        return dao.setDead(userName);
    }
}
