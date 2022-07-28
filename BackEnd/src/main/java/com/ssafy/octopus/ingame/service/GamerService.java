package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.entity.Gamer;

public interface GamerService {

    public Gamer findByUserName(String userName);

}
