package com.ssafy.octopus.main.controller;

import com.ssafy.octopus.main.entity.Room;
import com.ssafy.octopus.main.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @brief : Main Page Controller & Waiting Room Page Controller
 * @details : Main Page 와 Waiting Room Page 에서 사용되는 Room에 관련된 호출을 처리해주는 Controller
 * @date 2022-07-25
 * @author : LDY, 98dlstod@naver.com
 */

@RestController
@CrossOrigin(
        // localhost:3000 과 127.0.0.1 구분
        origins = "http://localhost:3000", //allowCredentials = "true" 인 경우, origins="*" 는 X
        allowCredentials = "true",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.HEAD, RequestMethod.OPTIONS}
)
public class RoomController {

    @Autowired
    RoomService service;

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

    /** @brief : Room List, 모든 Room List 반환
     *  @date : 2022-07-25
     *  @param
     *  @return : ResponseEntity<List<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/rooms")
    public ResponseEntity<List<Room>> list(){
        return new ResponseEntity<List<Room>>(service.list(), HttpStatus.OK);
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Room 찾아줌
     *  @date : 2022-07-25
     *  @param : roomId
     *  @return : ResponseEntity<Optional<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/rooms/detail/roomid/{roomId}")
    public  ResponseEntity<Optional<Room>> findByRoomId(@Parameter(description = "방 ID", required = true, example = "ABCDE12345ABCDE12345") @PathVariable String roomId) {
        return new ResponseEntity<Optional<Room>>(service.findByRoomId(roomId), HttpStatus.OK);
    }

    /** @brief : findByRoomName, (roomName)이 일치하는 Room 찾아줌
     *  @date : 2022-07-25
     *  @param : roomName
     *  @return : ResponseEntity<Optional<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/rooms/detail/roomname/{roomName}")
    public ResponseEntity<List<Room>> findByRoomName(@Parameter(description = "방 제목", required = true, example = "고고") @PathVariable String roomName) {
        return new ResponseEntity<List<Room>> (service.findByRoomName(roomName), HttpStatus.OK);
    }

    /** @brief : findByRoomNameLike, (roomName)을 포함하는 Room 찾아줌
     *  @date : 2022-07-26
     *  @param : roomName
     *  @return : ResponseEntity<List<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/rooms/detail/roomnamelike/{roomName}")
    public ResponseEntity<List<Room>> findByRoomNameLike(@Parameter(description = "방 제목", required = true, example = "고고") @PathVariable String roomName) {
        return new ResponseEntity<List<Room>> (service.findByRoomNameLike(roomName), HttpStatus.OK);
    }

    /** @brief : checkRoom, empty Room을 찾아줌 (방 인원수가 0명인 room 반환)
     *  @date : 2022-07-25
     *  @param
     *  @return : ResponseEntity<List<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/rooms/emptyroom")
    public ResponseEntity<List<Room>> checkRoom() {
        return new ResponseEntity<List<Room>> (service.checkRoom(), HttpStatus.OK);
    }

    /** @brief : createRoom, room 생성
     *  @date : 2022-07-25
     *  @param : Room
     *  @return : ResponseEntity<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PostMapping(value ="/rooms")
    public ResponseEntity<Room> insert(@Parameter(description = "방 생성", required = true, example = "Room dto")  Room dto) {
        return new ResponseEntity<Room>(service.insert(dto), HttpStatus.OK);
    }

    /** @brief : updateRoom, room 수정
     *  @date : 2022-07-26
     *  @param : Room
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/rooms")
    public ResponseEntity<Integer> updateByRoomId(@Parameter(description = "방 설정 수정", required = true, example = "Room dto") Room dto) {
        return new ResponseEntity<Integer>(service.update(dto), HttpStatus.OK);
    }

    /** @brief : update status to start , 해당하는 roomId를 가진 room을 게임 진행 중 상태로 변경
     *  @date : 2022-07-27
     *  @param : RoomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value = "/rooms/update/status/start/{roomId}")
    public ResponseEntity<Integer> updateStatusToStartByRoomId(@PathVariable String roomId) {
        return new ResponseEntity<Integer>(service.updateStatusToStartByRoomId(roomId), HttpStatus.OK);
    }

    /** @brief : update status to end , 해당하는 roomId를 가진 room을 게임 대기 중 상태로 변경
     *  @date : 2022-07-27
     *  @param : RoomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value = "/rooms/update/status/end/{roomId}")
    public ResponseEntity<Integer> updateStatusToEndByRoomId(@PathVariable String roomId) {
        return new ResponseEntity<Integer>(service.updateStatusToEndByRoomId(roomId), HttpStatus.OK);
    }

    /** @brief : deleteRoom, 해당하는 roomId를 가진 room 삭제
     *  @date : 2022-07-26
     *  @param : RoomId
     *  @return : ResponseEntity<Long>
     *  @author : LDY, 98dlstod@naver.com
     */
    @DeleteMapping(value = "/rooms/{roomId}")
    public ResponseEntity<Long> deleteByRoomId(@PathVariable String roomId) {
        return new ResponseEntity<Long>(service.deleteByRoomId(roomId), HttpStatus.OK);
    }


}
