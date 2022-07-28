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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
