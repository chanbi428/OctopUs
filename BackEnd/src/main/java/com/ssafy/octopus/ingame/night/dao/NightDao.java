package com.ssafy.octopus.ingame.night.dao;

import com.ssafy.octopus.ingame.night.entity.Night;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface NightDao extends JpaRepository<Night, Integer> {

    // 밤 테이블 초긱화  (roomId)
    @Modifying
    @Transactional
    @Query(value = "UPDATE night SET nominee_name = '' WHERE room_id = ?", nativeQuery = true)
    int updateByRoomIdForInitialization(String roomId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE night SET nominee_name = ? WHERE user_name = ?", nativeQuery = true)
    int updateByNomineeNameAndUserName(String nomineeName, String userName);
    
}
