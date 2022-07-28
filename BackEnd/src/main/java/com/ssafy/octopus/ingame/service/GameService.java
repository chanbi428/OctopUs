package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.entity.Gamer;

import java.util.List;

public interface GameService {

    public List<Gamer> insert(List<String> users, String roomId);
}
