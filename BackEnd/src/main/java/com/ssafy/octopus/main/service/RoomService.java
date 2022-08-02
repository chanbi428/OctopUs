package com.ssafy.octopus.main.service;
/**
 * @brief : Room Service
 * @details : Controller에서 호출, 요청을 처리하기 위한 service 로직 정의
 * @date 2022-07-26
 * @author : LDY, 98dlstod@naver.com
 */
import com.ssafy.octopus.main.entity.Room;

import java.util.List;
import java.util.Optional;

public interface RoomService {
    List<Room> list(); // 전체 방 목록

    Optional<Room> findByRoomId(String roomId);  // 방 ID 상세 조회

    List<Room> findByRoomName(String roomName); // 방 제목 상세 조회

    List<Room> findByRoomNameLike(String roomName); // 방 제목 like 상세 조회

    List<Room> checkRoom(); // 빈 방 조회

    Room insert(Room dto); // 방 생성
    int update(Room room); // 방 수정

    int updateStatusToStartByRoomId(String RoomId); // 방 게임 상태로 수정

    int updateStatusToEndByRoomId(String roomId); // 방 대기 상태로 수정

    Long deleteByRoomId(String roomId); // 방 삭제

    Room findRoomIdForFastStart(); // 빠른 시작 시 Room 정보 return
}
