package com.ssafy.octopus.ingame.shark.controller;

import com.ssafy.octopus.ingame.shark.entity.Shark;
import com.ssafy.octopus.ingame.shark.service.SharkService;
import com.ssafy.octopus.ingame.shark.service.SharkServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class SharkController {

    @Autowired
    SharkService service = new SharkServiceImpl();

    /** @brief : createShark, shark table에 유저 저장
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : ResponseEntity<Shark>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PostMapping(value = "/games/mini/shark")
    public ResponseEntity<Shark> insert(@RequestBody Shark dto) {
        return new ResponseEntity<Shark>(service.insert(dto), HttpStatus.OK);
    }

    /** @brief : updateShark, shark 게임 시간 결과 저장
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/games/mini/shark")
    public ResponseEntity<Integer> updateByUserName(@RequestBody Shark dto) {
        return new ResponseEntity<Integer>(service.updateByUserName(dto), HttpStatus.OK);
    }


    /** @brief : getResult, 게임 결과 조회
     *  @date : 2022-08-07
     *  @param : Shark
     *  @return : ResponseEntity<Shark>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/games/mini/shark/result/{roomid}")
    public ResponseEntity<Shark> getResult(@PathVariable String roomid){
        return new ResponseEntity<Shark>(service.getResult(roomid), HttpStatus.OK);
    }
}
