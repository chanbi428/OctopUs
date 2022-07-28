package com.ssafy.octopus.ingame.night.controller;

import com.ssafy.octopus.ingame.night.service.NightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NightController {

    @Autowired
    NightService service;

}
