package com.ssafy.octopus.ingame.vote.service;

import com.ssafy.octopus.ingame.vote.entity.Vote;

import java.util.List;

public interface VoteService {

    public int daytimeVote(String userName); // 낮 투표 시장제외 나머지 (1표 -> 10표)
    public int daytimeVoteMayor(String userName); // 낮 투표 시장 (1.5표 -> 15표)
    public int agreeVote(String userName); // 찬반투표 (찬성 +10)
    public int disagreeVote(String userName); // 찬반투표 (반대 -10)
    public Vote findByUserName(String userName); // 투표 조회 (찬반 결과 조회)
    public Vote findMaxVote(String roomId1, String roomId2); // 투표 조회 (낮 투표 결과 조회)

}
