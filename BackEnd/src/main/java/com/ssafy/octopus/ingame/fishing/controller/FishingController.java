package com.ssafy.octopus.ingame.fishing.controller;

import com.ssafy.octopus.ingame.fishing.entity.MiniGame;
import com.ssafy.octopus.ingame.fishing.service.MiniGameService;
import com.ssafy.octopus.ingame.fishing.service.MiniGameServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class FishingController {

    @Autowired
    MiniGameService service = new MiniGameServiceImpl();

    @PostMapping(value = "/games/mini/fish")
    public ResponseEntity<MiniGame> fishing(@RequestBody MiniGame game){
        System.out.println("fish result : " + game);
        MiniGame miniGame = null;
        int result = service.save(game);
        if(result == 1){
            miniGame = service.getResult(game.getRoomId());
            return new ResponseEntity<>(miniGame, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(miniGame, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/games/mini/fish/make")
    public ResponseEntity<Integer> makeDB(@RequestBody Map<String, String> roomId){
        System.out.println("make fish db : " + roomId.get("roomId"));
        int result = service.save(roomId.get("roomId"));

        if(result == 1){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/games/mini/fish/delete/{roomId}")
    public ResponseEntity<Void> deleteDB(@PathVariable String roomId){
        service.deleteByroomId(roomId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
