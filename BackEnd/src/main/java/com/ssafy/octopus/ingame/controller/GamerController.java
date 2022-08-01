package com.ssafy.octopus.ingame.controller;

import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.service.GamerService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "Gamer Controller")
@RestController
@CrossOrigin(origins = "*")
public class GamerController {

    @Autowired
    GamerService service;

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

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

    /** @brief : isVictory, 마피아 vs 시민 승리 조건 확인
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : Gamer
     *  @author : BCB
     */
    @Operation(summary = "일반 승리 조건 확인", description = "마피아와 시민, 중립의 수를 세서 승리 조건 확인")
    @GetMapping("gamers/victory/team/{roomId}")
    public  ResponseEntity<Gamer> isVictory(@PathVariable String roomId){
        Gamer team = new Gamer();
        try{
            team = service.isVictory(roomId);
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

    @Operation(summary = "죽음 처리", description = "죽은 사람을 처리해주는 api")
    /** @brief : setDead, 죽었을 때 처리
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : int
     *  @author : BCB
     */
    @PutMapping("gamers/dead")
    public ResponseEntity<Integer> setDead(@RequestBody Gamer gamer){
        int result = 0;
        try {
            result = service.setDead(gamer.getUserName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
