package com.ssafy.octopus.ingame.cave.controller;

import com.ssafy.octopus.ingame.cave.entity.Cave;
import com.ssafy.octopus.ingame.cave.service.CaveService;
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
 * @brief : In Game Page Controller
 * @details : In Game Page 에서 사용되는 cave에 관련된 호출을 처리해주는 Controller
 * @date 2022-07-31
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
public class CaveController {

    @Autowired
    CaveService service;

    /** @brief : Swagger responseCode 설정
     *  @date : 2022-07-31
     *  @author : LDY, 98dlstod@naver.com
     */
    @Operation(summary = "Cave controller", description = "Cave controller for In Game Page")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    /** @brief : Cave List, 모든 Cave List 반환
     *  @date : 2022-07-31
     *  @param
     *  @return : ResponseEntity<List<Cave>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/caves")
    public ResponseEntity<List<Cave>> list(){
        return new ResponseEntity<List<Cave>>(service.list(), HttpStatus.OK);
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Cave들을 찾아줌
     *  @date : 2022-07-31
     *  @param : roomId
     *  @return : ResponseEntity<List<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/caves/detail/roomid/{roomId}")
    public  ResponseEntity<List<Cave>> findByRoomId(@Parameter(description = "방 ID", required = true, example = "ABCDE12345ABCDE12345") @PathVariable String roomId) {
        return new ResponseEntity<List<Cave>>(service.findByRoomId(roomId), HttpStatus.OK);
    }

    /** @brief : findByCaveIdAndRoomId, (caveId, roomId)가 일치하는 Cave 찾아줌
     *  @date : 2022-07-31
     *  @param : roomName
     *  @return : ResponseEntity<Optional<Room>>
     *  @author : LDY, 98dlstod@naver.com
     */
    @GetMapping(value = "/caves/detail/caveidandroomid/{caveId}/{roomId}")
    public ResponseEntity<Optional<Cave>> findByCaveIdAndRoomId(@Parameter(description = "공용 굴 id", required = true, example = "1") @PathVariable int caveId,
                                                     @Parameter(description = "방 id", required = true, example = "ABCDE12345ABCDE12345") @PathVariable String roomId) {
        return new ResponseEntity<Optional<Cave>> (service.findByCaveIdAndRoomId(caveId, roomId), HttpStatus.OK);
    }

    /** @brief : createCave, cave 생성
     *  @date : 2022-07-31
     *  @param : Cave
     *  @return : ResponseEntity<Cave>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PostMapping(value ="/caves")
    public ResponseEntity<Cave> insert(@Parameter(description = "공용 굴 생성", required = true, example = "Cave dto")@RequestBody Cave dto) {
        return new ResponseEntity<Cave>(service.insert(dto), HttpStatus.OK);
    }

    /** @brief : updateRoom, cave 수정
     *  @date : 2022-07-31
     *  @param : Cave
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @PutMapping(value="/caves")
    public ResponseEntity<Integer> updateByRoomId(@Parameter(description = "공용 굴 수정", required = true, example = "Cave dto")@RequestBody Cave dto) {
        return new ResponseEntity<Integer>(service.update(dto), HttpStatus.OK);
    }

    /** @brief : deleteCaves, 해당하는 roomId를 가진 cave 들 삭제
     *  @date : 2022-07-31
     *  @param : RoomId
     *  @return : ResponseEntity<Long>
     *  @author : LDY, 98dlstod@naver.com
     */
    @DeleteMapping(value = "/caves/{roomId}")
    public ResponseEntity<Long> deleteByRoomId(@PathVariable String roomId) {
        return new ResponseEntity<Long>(service.deleteByRoomId(roomId), HttpStatus.OK);
    }
}
