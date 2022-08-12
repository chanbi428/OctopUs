package com.ssafy.octopus.ingame.night.service;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.dao.GamerDao;
import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.night.dao.NightDao;
import com.ssafy.octopus.ingame.night.entity.Night;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NightServiceImpl implements NightService {

    @Autowired
    NightDao dao;
    @Autowired
    GamerDao gamerDao;

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

    /** @brief : findByUserName, userName으로 Night 조회 (지목상대 알아낼 때 사용)
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Night
     *  @author : BCB
     */
    @Override
    public Night findByUserName(String userName){
        return dao.findByUserName(userName);
    }

    /** @brief : nightResult, 밤 역할 수행 수 결과 조회
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : String
     *  @author : BCB
     */
    @Override
    public String nightResult(String roomId) {
        List<Gamer> mafias = gamerDao.findByGameJob("마피아", roomId);  // 마피아가 누군지
        List<Gamer> doctors = gamerDao.findByGameJob("의사", roomId);   // 의사가 누군지

        String mafia = "";  // 마피아 이름
        String doctor = doctors.get(0).getUserName();  // 의사 이름 (의사는 무조건 1명이므로)
        if (mafias.size() == 1) {
            mafia = mafias.get(0).getUserName();  // 마피아가 한명
        } else {  // 한명이 아니라는건 무조건 두명
            if (mafias.get(0).isDead()) {  // 첫번째 마피아가 죽었으면
                mafia = mafias.get(1).getUserName();  // 두번째 마피아
            } else {
                mafia = mafias.get(0).getUserName();  // 첫번째 마피아
            }
        }

        Night kill = dao.findByUserName(mafia);  // 마피아가 죽인 사람
        Night heal = dao.findByUserName(doctor);  // 의사가 살린 사람

        if (kill.getNomineeName().equals(heal.getNomineeName())) {  // 같으면 아무일도 일어나지 않는다.
            return "없음";
        } else {
            gamerDao.setDead(kill.getNomineeName());  // 죽었다고 바꿔준다.
            return kill.getNomineeName();  // 죽은 사람을 return
        }
    }

    /** @brief : 기자 조회
     *  @date : 2022-08-12
     *  @param : roomId, gameJob
     *  @return : Night
     *  @author : BCB
     */
    @Override
    public Gamer findByRoomIdAndGameJob(String roomId, String gameJob){
        Gamer gamer = gamerDao.findByRoomIdAndGameJob(roomId, gameJob);
        Night night = dao.findByUserName(gamer.getUserName());
        Gamer result = gamerDao.findByUserName(night.getNomineeName());
        return result;
    }
}
