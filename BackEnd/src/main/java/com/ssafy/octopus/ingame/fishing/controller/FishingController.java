package com.ssafy.octopus.ingame.fishing.controller;

import com.ssafy.octopus.ingame.fishing.entity.MiniGame;
import com.ssafy.octopus.ingame.fishing.service.MiniGameService;
import com.ssafy.octopus.ingame.fishing.service.MiniGameServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class FishingController {

    @Autowired
    MiniGameService service = new MiniGameServiceImpl();

    @PostMapping(value = "/games/mini/fish")
    public ResponseEntity<MiniGame> fishing(@RequestBody MiniGame game){
        int result = service.save(game);
        MiniGame miniGame = null;
        System.out.println("fish result : " + result + " game : " + game);
        if(result == 1){
            miniGame = service.getResult(game.getRoomId());
            return new ResponseEntity<>(miniGame, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(miniGame, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/games/mini/fish/make")
    public ResponseEntity<Integer> makeDB(@RequestBody String roomId){
        int result = service.save(roomId);
        if(result == 1){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}
