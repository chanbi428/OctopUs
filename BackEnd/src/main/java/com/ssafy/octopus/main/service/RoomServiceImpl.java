package com.ssafy.octopus.main.service;

/**
 * @brief : Room Service Impl
 * @details : 요청을 처리하기 위한 service 비즈니스 로직을 구현한 class
 * @date 2022-07-26
 * @author : LDY, 98dlstod@naver.com
 */

import com.ssafy.octopus.main.dao.RoomDao;
import com.ssafy.octopus.main.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomDao dao;

    /** @brief : Room List, 모든 Room List 반환
     *  @date : 2022-07-25
     *  @param
     *  @return : List<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    public List<Room> list(){
        return dao.findAll();
    }

    /** @brief : findByRoomId, (roomId)가 일치하는 Room 찾아줌
     *  @date : 2022-07-25
     *  @param : roomId
     *  @return : Optional<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Optional<Room> findByRoomId(String roomId){
        return dao.findByRoomId(roomId);
    }

    /** @brief : findByRoomName, (roomName)이 일치하는 Room 찾아줌
     *  @date : 2022-07-25
     *  @param : roomName
     *  @return : Optional<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Room> findByRoomName(String roomName){
        return dao.findByRoomName(roomName);
    }

    /** @brief : findByRoomNameLike, (roomName)을 포함하는 Room 찾아줌
     *  @date : 2022-07-26
     *  @param : roomName
     *  @return : List<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Room> findByRoomNameLike(String roomName) {
        return dao.findByRoomNameLike("%" + roomName + "%");
    }

    /** @brief : checkRoom, empty Room을 찾아줌 (방 인원수가 0명인 room 반환)
     *  @date : 2022-07-25
     *  @param
     *  @return : List<Room>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public List<Room> checkRoom(){
        return dao.findByPersonNum(0);
    }

    /** @brief : createRoom, room 생성
     *  @date : 2022-07-25
     *  @param : Room
     *  @return : Room
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Room insert(Room room) {
        room.setRoomId(UUID.randomUUID().toString());
        room.setPersonNum(1);
        return dao.save(room);
    }

    /** @brief : updateRoom, room 수정
     *  @date : 2022-07-26
     *  @param : Room
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int update(Room room) {
        return dao.update(room.getRoomChief(), room.isPrivate(), room.getRoomName(), room.getPersonLimit(), room.getRoomPw(), room.getGameTime(), room.getPersonNum(), room.getUserList(), room.getRoomId());
    }


    /** @brief : update status to start , 해당하는 roomId를 가진 room을 게임 진행 중 상태로 변경
     *  @date : 2022-07-27
     *  @param : RoomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateStatusToStartByRoomId(String roomId) {
        return dao.updateStatusToStartByRoomId(roomId);
    }

    /** @brief : update status to end , 해당하는 roomId를 가진 room을 게임 대기 중 상태로 변경
     *  @date : 2022-07-27
     *  @param : RoomId
     *  @return : ResponseEntity<Integer>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public int updateStatusToEndByRoomId(String roomId) {
        return dao.updateStatusToEndByRoomId(roomId);
    }

    /** @brief : deleteRoom, 해당하는 roomId를 가진 room 삭제
     *  @date : 2022-07-26
     *  @param : RoomId
     *  @return : ResponseEntity<Long>
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Long deleteByRoomId(String roomId) {
        return dao.deleteByRoomId(roomId);
    }


    /** @brief : findRoomIdForFastStart , 빠른 시작 클릭 => roomId 리턴
     *  @date : 2022-07-27
     *  @param
     *  @return : Room
     *  @author : LDY, 98dlstod@naver.com
     */
    @Override
    public Room findRoomIdForFastStart(){
        Room room = new Room();
        room.setRoomId(dao.findRoomIdForFastStart());
        return room;
    }
}
