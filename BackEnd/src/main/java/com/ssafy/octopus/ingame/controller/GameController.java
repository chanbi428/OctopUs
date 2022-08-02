package com.ssafy.octopus.ingame.controller;

import com.ssafy.octopus.ingame.dto.GameDto;
import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.service.GameService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/*
    Write by BCB
 */
@Api(tags = "Game Controller")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = {"POST"})
public class GameController {

    @Autowired
    GameService service;

    // 게임 시작을 눌렀을 때 오는 요청 (테이블 초기화 데이터 insert)
    @Operation(summary = "게임시작", description = "게임 시작 시에 night, vote, gamer table insert")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PostMapping("/games")
    public ResponseEntity<List<Gamer>> start(@RequestBody GameDto gameStartDto){
        List<Gamer> gamers = new ArrayList<>();
        try {
            gamers = service.insert(gameStartDto.users, gameStartDto.roomId);
            return new ResponseEntity<>(gamers, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(gamers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /** @brief : delete, 해당하는 roomId를 가진 gamer, night, vote 삭제
     *  @date : 2022-08-02
     *  @param : RoomId
     *  @return : ResponseEntity<Long>
     *  @author : LDY, 98dlstod@naver.com
     */
    @DeleteMapping(value = "/games/end/{roomId}")
    public ResponseEntity<Long> deleteByRoomId(@PathVariable String roomId) {
        return new ResponseEntity<Long>(service.deleteByRoomId(roomId), HttpStatus.OK);
    }
}
