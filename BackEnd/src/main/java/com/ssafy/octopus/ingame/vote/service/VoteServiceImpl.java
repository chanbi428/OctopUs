package com.ssafy.octopus.ingame.vote.service;

import com.ssafy.octopus.ingame.vote.dao.VoteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    VoteDao dao;
}
