package com.ssafy.octopus.ingame.night.controller;

import com.ssafy.octopus.ingame.night.entity.Night;
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

    @Operation(summary = "조회", description = "이름으로 밤 테이블 조회")
    /** @brief : findByUserName, userName으로 Night 조회 (지목상대 알아낼 때 사용)
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : Night
     *  @author : BCB
     */
    @GetMapping("nights/{userName}")
    public ResponseEntity<Night> findByName(@PathVariable String userName){
        Night night = new Night();
        try {
            night = service.findByUserName(userName);
            return new ResponseEntity<>(night, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(night, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "밤 역할 수행", description = "밤 역할 수행 후 결과 조회 ")
    /** @brief : nightResult, 밤 역할 수행 수 결과 조회
     *  @date : 2022-08-01
     *  @param : roomId
     *  @return : Night
     *  @author : BCB
     */
    @GetMapping("nights/result/{roomId}")
    public ResponseEntity<Night> nightResult(@PathVariable String roomId){
        Night night = new Night();
        try{
            night.setUserName(service.nightResult(roomId));
            return new ResponseEntity<>(night, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(night, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
