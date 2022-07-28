package com.ssafy.octopus.ingame.vote.controller;

import com.ssafy.octopus.ingame.vote.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteController {

    @Autowired
    VoteService service;

}
