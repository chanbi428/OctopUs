package com.ssafy.octopus.ingame.vote.service;

import com.ssafy.octopus.ingame.vote.dao.VoteDao;
import com.ssafy.octopus.ingame.vote.entity.Vote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Writer by BCB
 */
@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    VoteDao dao;

    // 낮 투표 시장 제외 (1표 -> 10표)
    @Override
    public int daytimeVote(String userName){
        return dao.daytimeVote(userName);
    }

    // 낮 투표 시장 (1.5표 -> 15표)
    @Override
    public int daytimeVoteMayor(String userName) {
        return dao.daytimeVoteMayor(userName);
    }

    // 찬반투표 (찬성 -> +10표)
    @Override
    public int agreeVote(String userName) {
        return dao.agreeVote(userName);
    }

    // 찬반투표 (반대 -> -10표)
    @Override
    public int disagreeVote(String userName) {
        return dao.disagreeVote(userName);
    }

    // 찬반투표 결과 조회
    @Override
    @Transactional
    public Vote findByUserName(String userName) {
        Vote vote = dao.findByUserName(userName);
        dao.resetVote(vote.getRoomId());
        return vote;
    }

    // 낮 투표 결과 조회
    @Override
    @Transactional
    public Vote findMaxVote(String roomId1, String roomId2) {
        int skip = dao.selectSkip(roomId1);  // skip 수
        Vote vote = new Vote("skip", roomId1, 0);  // 기본을 skip으로 설정한다.
        List<Vote> list = dao.findMaxVote(roomId1, roomId2);

        if (list.size() == 1 && list.get(0).getVote()>skip) {  // 최댓값이 한명이고 skip보다 수가 많으면 대상을 확정한다.
            vote = list.get(0);
        }
        dao.resetVote(vote.getRoomId());
        return vote;
    }
}
