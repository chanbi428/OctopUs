package com.ssafy.octopus.ingame.night.service;

import com.ssafy.octopus.ingame.night.dao.NightDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NightServiceImpl implements NightService {

    @Autowired
    NightDao dao;
}
