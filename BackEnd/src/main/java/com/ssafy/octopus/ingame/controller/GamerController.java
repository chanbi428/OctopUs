package com.ssafy.octopus.ingame.controller;

import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.service.GamerService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(tags = "Gamer Controller")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = {"GET"})
public class GamerController {

    @Autowired
    GamerService service;

    @GetMapping("/gamers/{userName}")
    public ResponseEntity<Gamer> findByUserName(@PathVariable String userName){
        Gamer gamer = new Gamer();
        try{
            gamer = service.findByUserName(userName);
            return new ResponseEntity<>(gamer, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(gamer, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
