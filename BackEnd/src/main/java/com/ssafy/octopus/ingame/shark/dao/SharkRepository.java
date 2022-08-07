package com.ssafy.octopus.ingame.shark.dao;

import com.ssafy.octopus.ingame.shark.entity.Shark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface SharkRepository extends JpaRepository<Shark, Integer> {
    // 게임 시간 저장
    @Modifying
    @Transactional
    @Query(value = "UPDATE mini_shark SET time = ? WHERE user_name = ?", nativeQuery = true)
    int updateByUserName(float time, String userName);

    // 게임 결과 조회
    @Query(value = "SELECT * FROM mini_shark WHERE room_id = ? ORDER BY time LIMIT 1", nativeQuery = true)
    Shark findByRoomId(String roomId);
}
