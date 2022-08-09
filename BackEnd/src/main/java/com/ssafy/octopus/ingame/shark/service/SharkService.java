package com.ssafy.octopus.ingame.shark.service;

import com.ssafy.octopus.ingame.shark.entity.Shark;

public interface SharkService {
    public Shark insert(Shark dto); // 게임 유저 저장

    public int updateByUserName(Shark dto); // 게임 결과 저장 (시간)

    public Shark getResult(String roomId); // 게임 결과 조회
}
