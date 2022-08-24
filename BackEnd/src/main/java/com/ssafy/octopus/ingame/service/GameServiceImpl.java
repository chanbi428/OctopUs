package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.dao.GamerDao;
import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.night.dao.NightDao;
import com.ssafy.octopus.ingame.night.entity.Night;
import com.ssafy.octopus.ingame.vote.dao.VoteDao;
import com.ssafy.octopus.ingame.vote.entity.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/*
    Write by BCB
 */

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    VoteDao voteDao;
    @Autowired
    NightDao nightDao;
    @Autowired
    GamerDao gamerDao;

    @Override
    @Transactional
    public List<Gamer> insert(List<String> users, String roomId) {
//        System.out.println(users.size());
//        List<String[]> jobs = combJobs();  // 현재 게임에서 등장하는 직업들을 저장할 리스트
//        if(users.size() == 7){  // 7명일때는 공통에 중립 추가
//            jobs.add(new String[]{(int)((Math.random()*1)+1) == 1 ? "재간둥이" : "데스노트", "중립"});
//        } else if(users.size() == 8){  // 8명일때는 공통에 중립, 마피아 추가
//            jobs.add(new String[]{(int)((Math.random()*1)+1) == 1 ? "재간둥이" : "데스노트", "중립"});
//            jobs.add(new String[]{"마피아", "마피아"});
//        }
        /**
         * 무조건 고정 (마피아, 마피아, 의사, 경찰, 크레이지경찰, 시장, 재간둥이, 기자)
         */
//        users = new ArrayList<String>();
//        users.add("문어숙회");
//        users.add("오하민");
//        users.add("나마피아임");
//        users.add("닥터배사부");
//        users.add("해삼말미잘");
//        users.add("소리질러");
//        users.add("용용용용용");
//        users.add("재간둥스");
//
//        List<String[]> jobs = new ArrayList<>();
//        for(int i=0; i<8; i++){
//            if(users.get(i).equals("문어숙회")){
//                jobs.add(new String[]{"크레이지경찰", "시민"});
//            } else if (users.get(i).equals("오하민")){
//                jobs.add(new String[]{"경찰", "시민"});
//            } else if (users.get(i).equals("나마피아임")){
//                jobs.add(new String[]{"마피아", "마피아"});
//            } else if (users.get(i).equals("닥터배사부")){
//                jobs.add(new String[]{"마피아", "마피아"});
//            } else if (users.get(i).equals("해삼말미잘")){
//                jobs.add(new String[]{"시장", "시민"});
//            } else if (users.get(i).equals("용용용용용")){
//                jobs.add(new String[]{"의사", "시민"});
//            } else if (users.get(i).equals("소리질러")){
//                jobs.add(new String[]{"기자", "시민"});
//            } else if (users.get(i).equals("재간둥스")){
//                jobs.add(new String[]{"재간둥이", "중립"});
//            }
//        }

        List<String[]> jobs = new ArrayList<>();
        jobs.add(new String[]{"마피아", "마피아"});
        jobs.add(new String[]{"마피아", "마피아"});
        jobs.add(new String[]{"경찰", "시민"});
        jobs.add(new String[]{"의사", "시민"});
        jobs.add(new String[]{"크레이지경찰", "시민"});
        jobs.add(new String[]{"시장", "시민"});
        jobs.add(new String[]{"기자", "시민"});
        jobs.add(new String[]{"재간둥이", "중립"});
        /**
         * 고정값 설명 끝
         */
        Collections.shuffle(jobs);  // 직업리스트 무작위 배치(섞어서 랜덤 효과)

        // gamer 테이블에 넣을 데이터
        List<Gamer> gamers = new ArrayList<>();
        for(int i=0; i<users.size(); i++){
            gamers.add(new Gamer(users.get(i), roomId, jobs.get(i)[1], false, jobs.get(i)[0], false));
        }

        // vote 테이블에 넣을 데이터
        List<Vote> votes = new ArrayList<>();
        for(int i=0; i<users.size(); i++){
            votes.add(new Vote(users.get(i), roomId, 0));
        }

        // night 테이블에 넣을 데이터
        List<Night> nights = new ArrayList<>();
        for(int i=0; i<users.size(); i++){
            nights.add(new Night(users.get(i), roomId, ""));
        }


        // 하나라도 문제 발생 시에 ROLLBACK
        try{
            gamerDao.saveAll(gamers);
            voteDao.saveAll(votes);
            nightDao.saveAll(nights);
            return gamers;
        } catch (Exception e){
            e.printStackTrace();
            return gamers;
        }

    }

    public List<String[]> combJobs(){
        // 6, 7, 8명 공통으로 마피아, 경찰, 의사, (크레이지 택 1), (나머지 시민 택 2)
        List<String[]> jobs = new ArrayList<>();
        jobs.add(new String[]{"마피아", "마피아"});
        jobs.add(new String[]{"경찰", "시민"});
        jobs.add(new String[]{"의사", "시민"});
        jobs.add(new String[]{(int)((Math.random()*1)+1) == 1 ? "크레이지경찰" : "크레이지의사", "시민"});  // 크레이지 랜덤

        String[] citizenArray = {"영매", "기자", "시장", "탐사가"};
        List<String> citizenList = Arrays.asList(citizenArray);
        Collections.shuffle(citizenList);  // 나머지 시민 직업 4개 배열을 무작위 배치 하여 1, 2번째만 뽑으면 랜덤 효과

        jobs.add(new String[]{citizenList.get(0), "시민"});
        jobs.add(new String[]{citizenList.get(1), "시민"});

        return jobs;

        /*
            6인 - 마피아1, 중립0, 시민5
            7인 - 마피아1, 중립1, 시민5
            8인 - 마피아2, 중립1, 시민5

            마피아 - 마피아
            중립 - 재간둥이, 데스노트
            시민 - 의사, 경찰, 크레이지의사, 크레이지경찰, 기자, 시장, 탐사가, 영매
        */
    }

    /** @brief : delete, 해당하는 roomId를 가진 gamer, night, vote 삭제
     *  @date : 2022-08-02
     *  @param : RoomId
     *  @return : Long
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Long deleteByRoomId(String roomId) {
        try{
            voteDao.deleteByRoomId(roomId);
            nightDao.deleteByRoomId(roomId);
            gamerDao.deleteByRoomId(roomId);
            return 1L;
        }catch (Exception e){
            e.printStackTrace();
            return -1L;
        }
    }


}
