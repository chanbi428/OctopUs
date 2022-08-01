package com.ssafy.octopus.ingame.night.controller;

import com.ssafy.octopus.ingame.night.service.NightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(
        // localhost:3000 과 127.0.0.1 구분
        origins = "http://localhost:3000", //allowCredentials = "true" 인 경우, origins="*" 는 X
        allowCredentials = "true",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.HEAD, RequestMethod.OPTIONS}
)
public class NightController {

    @Autowired
    NightService service;

    /** @brief : Swagger responseCode 설정
     *  @date : 2022-07-25
     *  @author : LDY, 98dlstod@naver.com
     */
    @Operation(summary = "Room controller", description = "Room controller for Main page & Waitingroom Page")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    /** @brief : updateNight, roomId의 해당하는 night의 nominee_name 초기화
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/night/initialization/{roomId}")
    public ResponseEntity<Integer> updateByRoomIdForInitialization(@Parameter(description = "방 ID", required = true, example = "roomId")@PathVariable String roomId) {
        return new ResponseEntity<Integer>(service.updateByRoomIdForInitialization(roomId), HttpStatus.OK);
    }

    /** @brief : updateNight, night때 userName의 게이머가 지목한 nominee_name 저장
     *  @date : 2022-08-01
     *  @param : nomineeName, userName
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/night/update/{nomineeName}/{userName}")
    public ResponseEntity<Integer> updateByNomineeNameAndUserName(@Parameter(description = "지명된 게이머", required = true, example = "nomienee Name")@PathVariable String nomineeName,
                                                                  @Parameter(description = "게이머", required = true, example = "user Name")@PathVariable String userName) {
        return new ResponseEntity<Integer>(service.updateByNomineeNameAndUserName(nomineeName, userName), HttpStatus.OK);
    }
}
