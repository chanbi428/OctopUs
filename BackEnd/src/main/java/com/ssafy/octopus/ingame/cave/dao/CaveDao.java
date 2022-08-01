package com.ssafy.octopus.ingame.cave.dao;
/**
 * @brief : Cave Dao
 * @details : Service에서 호출, DB와 연결해 동작할 함수들 정의(JPA 에서는 기본 함수를 제공해줌)
 * @date 2022-07-31
 * @author : LDY, 98dlstod@naver.com
 */

import com.ssafy.octopus.ingame.cave.entity.Cave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface CaveDao extends JpaRepository<Cave, Integer> {

    // 상세조회 (roomId)
    List<Cave> findByRoomId(String roomId);

    // 상세조회 (caveId, roomId)
    Optional<Cave> findByCaveIdAndRoomId(int caveId, String roomId);

    // 굴 수정 (caveId, roomId)
    @Modifying
    @Transactional
    @Query(value = "UPDATE cave SET person_num = ? , person_list = ? WHERE cave_id = ? AND room_id = ?", nativeQuery = true)
    int update(int personNum, String personList, int cave_id, String roomId);

    // 굴 삭제 (roomId)
    @Transactional
    Long deleteByRoomId(String roomId);


}
