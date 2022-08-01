package com.ssafy.octopus.ingame.controller;

import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.service.GamerService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "Gamer Controller")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = {"GET"})
public class GamerController {

    @Autowired
    GamerService service;

    /** @brief : userName, userName이 같은 Gamer 반환
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Gamer
     *  @author : BCB
     */
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

    /** @brief : Gamer List, 모든 Gamer List 반환
     *  @date : 2022-07-31
     *  @param
     *  @return : ResponseEntity<List<Gamer>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers")
    public ResponseEntity<List<Gamer>> list(){
        return new ResponseEntity<List<Gamer>>(service.list(), HttpStatus.OK);
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : roomId
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers/detail/roomid/{roomId}")
    public ResponseEntity<List<Gamer>> findByRoomId(@Parameter(description = "방 ID", required = true, example = "ABCDE12345ABCDE12345") @PathVariable String roomId) {
        return new ResponseEntity<List<Gamer>>(service.findByRoomId(roomId), HttpStatus.OK);
    }

    /** @brief : isDead, userName에 해당하는 게이머의 생사 확인
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers/isdead/{userName}")
    public ResponseEntity<Boolean> isDead(@Parameter(description = "userName", required = true, example = "가가") @PathVariable String userName) {
        return new ResponseEntity<Boolean>(service.isDead(userName), HttpStatus.OK);
    }

    /** @brief : getWinners, 승리한 게이머들 조회
     *  @date : 2022-07-31
     *  @param
     *  @return : ResponseEntity<List<Gamer>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers/winners")
    public ResponseEntity<List<Gamer>> getWinners() {
        return new ResponseEntity<List<Gamer>>(service.findByIsVictory(), HttpStatus.OK);
    }

    /** @brief : updateByUserName, userName에 해당하는 게이머 승리로 변경
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/gamers/isvictory/userName/{userName}")
    public ResponseEntity<Integer> updateByUserName(@Parameter(description = "userName", required = true, example = "가가")@PathVariable String userName) {
        return new ResponseEntity<Integer>(service.updateByUserName(userName), HttpStatus.OK);
    }

    /** @brief : updateByGameTeam, gameTeam에 해당하는 게이머들 승리로 변경
     *  @date : 2022-07-31
     *  @param : gameTeam
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/gamers/isvictory/gameTeam/{gameTeam}")
    public ResponseEntity<Integer> updateByGameTeam(@Parameter(description = "gameTeam", required = true, example = "마피아")@PathVariable String gameTeam) {
        return new ResponseEntity<Integer>(service.updateByGameTeam(gameTeam), HttpStatus.OK);
    }

    /** @brief : isVictory, 마피아 승리 조건 확인
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : Gamer
     *  @author : BCB
     */
    @GetMapping("gamers/victory/mafia")
    public  ResponseEntity<Gamer> isVictory(@RequestBody Gamer gamer){
        Gamer team = new Gamer();
        try{
            team = service.isVictory(gamer.getRoomId());
            return new ResponseEntity<>(team, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(team, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** @brief : isMafia, userName에 해당하는 게이머, 마피아 유무 확인
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers/ismafia/{userName}")
    public ResponseEntity<Boolean> isMafia(@Parameter(description = "userName", required = true, example = "가가") @PathVariable String userName) {
        return new ResponseEntity<Boolean>(service.isMafia(userName), HttpStatus.OK);
    }

    /** @brief : isMafia, userName에 해당하는 게이머, 마피아 유무 확인
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Boolean
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/gamers/getjob/{userName}")
    public ResponseEntity<String> getJob(@Parameter(description = "userName", required = true, example = "가가") @PathVariable String userName) {
        return new ResponseEntity<String>(service.getJob(userName), HttpStatus.OK);
    }

}
