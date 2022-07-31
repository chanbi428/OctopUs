package com.ssafy.octopus.ingame.vote.controller;

import com.ssafy.octopus.ingame.entity.Gamer;
import com.ssafy.octopus.ingame.vote.dto.VoteDto;
import com.ssafy.octopus.ingame.vote.entity.Vote;
import com.ssafy.octopus.ingame.vote.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Writer by BCB
 */
@RestController
@CrossOrigin(origins = "*")
public class VoteController {

    @Autowired
    VoteService service;

    @Operation(summary = "낮 투표(시장제외)", description = "낮투표 시 시장제외 1표 -> 10표로 처리")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PutMapping("/votes/daytime/etc")
    public ResponseEntity<Integer> daytimeVote(@RequestBody VoteDto vote){
        int result = 0;
        try{
            result = service.daytimeVote(vote.getUserName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "낮 투표(시장)", description = "낮투표 시 시장 1.5표 -> 15표로 처리")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PutMapping("/votes/daytime/mayor")
    public ResponseEntity<Integer> daytimeVoteMayor(@RequestBody VoteDto vote){
        int result = 0;
        try{
            result = service.daytimeVoteMayor(vote.getUserName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "찬반 투표(찬성)", description = "찬반 투표(찬성) 10표")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PutMapping("/votes/agree")
    public ResponseEntity<Integer> agreeVote(@RequestBody VoteDto vote){
        int result = 0;
        try{
            result = service.agreeVote(vote.getUserName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "찬반 투표(반대)", description = "찬반 투표(반대) -10표")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @PutMapping("/votes/disagree")
    public ResponseEntity<Integer> disagreeVote(@RequestBody VoteDto vote){
        int result = 0;
        try{
            result = service.disagreeVote(vote.getUserName());
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "투표 조회", description = "찬반 투표 결과 조회 시 사용")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/votes/{userName}")
    public ResponseEntity<Vote> findByUserName(@PathVariable String userName){
        Vote vote = new Vote();
        try{
            vote = service.findByUserName(userName);
            return new ResponseEntity<>(vote, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(vote, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "낮 투표 결과 조회", description = "낮 투표 결과 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/votes/max/{roomId}")
    public ResponseEntity<Vote> findMaxVote(@PathVariable String roomId){
        Vote vote = new Vote();
        try{
            vote = service.findMaxVote(roomId, roomId);
            return new ResponseEntity<>(vote, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(vote, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
