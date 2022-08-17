package com.ssafy.octopus.ingame.fishing.service;

import com.ssafy.octopus.ingame.fishing.dao.FishingRepository;
import com.ssafy.octopus.ingame.fishing.entity.MiniGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class MiniGameServiceImpl implements MiniGameService{

    @Autowired
    FishingRepository repository;

    @Override
    public int save(MiniGame miniGame) {
        System.out.println("MiniGameServiceImpl : " + miniGame);
        return repository.update(miniGame.getCitizen(), miniGame.getMafia(), miniGame.getRoomId());
    }

    @Override
    public MiniGame getResult(String roomId) {
        return repository.findByRoomId(roomId);
    }

    @Override
    public int save(String roomId) {
        MiniGame miniGame = new MiniGame();
        miniGame.setRoomId(roomId);
        miniGame.setCitizen(0);
        miniGame.setMafia(0);
        MiniGame game = repository.save(miniGame);
        if(game != null) return 1;
        else return 0;
    }

    @Override
    public void deleteByroomId(String roomId) {
        repository.deleteByRoomId(roomId);
    }
}
