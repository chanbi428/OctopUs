package com.ssafy.octopus.main.dao;
/**
 * @brief : Room Dao
 * @details : Service에서 호출, DB와 연결해 동작할 함수들 정의(JPA 에서는 기본 함수를 제공해줌)
 * @date 2022-07-26
 * @author : LDY, 98dlstod@naver.com
 */

import com.ssafy.octopus.main.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface RoomDao extends JpaRepository<Room, Integer> {

    // 상세조회 (roomId)
    Optional<Room> findByRoomId(String roomId);

    // 상세조회 (roomName)
    List<Room> findByRoomName(String roomName);

    // 상세조회 (roomName Like)
    List<Room> findByRoomNameLike(String roomName);

    // 상세조회 (empty room 찾음)
    List<Room> findByPersonNum(int i);

    // 방 설정 수정 (roomId)
    @Modifying
    @Transactional
    @Query(value = "UPDATE room SET room_chief = ? , is_private = ? , room_name = ? , person_limit = ? , room_pw = ? , game_time = ? WHERE room_id = ?", nativeQuery = true)
    int update(String roomChief, Boolean isPrivate, String roomName, int personLimit, String roomPw, int gameTime, String roomId);

    // 방 게임 중 상태 수정 (roomId)
    @Modifying
    @Transactional
    @Query(value = "UPDATE room SET game_status = 1 WHERE room_id = ?", nativeQuery = true)
    int updateStatusToStartByRoomId(String roomId);

    // 게임 종료 -> 방 대기 상태로 수정 (roomId)
    @Modifying
    @Transactional
    @Query(value = "UPDATE room SET game_status = 0 WHERE room_id = ?", nativeQuery = true)
    int updateStatusToEndByRoomId(String roomId);


    // 방 삭제 (roomId)
    @Transactional
    Long deleteByRoomId(String roomId);
}
