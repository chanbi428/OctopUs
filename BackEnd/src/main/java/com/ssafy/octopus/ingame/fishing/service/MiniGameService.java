package com.ssafy.octopus.ingame.fishing.service;

import com.ssafy.octopus.ingame.fishing.entity.MiniGame;

public interface MiniGameService {
    public int save(MiniGame miniGame);
    public MiniGame getResult(String roomId);
    public int save(String roomId);
    public void deleteByroomId(String roomId);
}
