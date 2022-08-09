package com.ssafy.octopus.ingame.fishing.dao;

import com.ssafy.octopus.ingame.fishing.entity.MiniGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface FishingRepository extends JpaRepository<MiniGame, Integer> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE mini_fish SET citizen = ?+citizen, mafia = ?+mafia WHERE room_id = ?", nativeQuery = true)
    int update(int citizen, int mafia, String roomId);
    MiniGame findByRoomId(String roomId);
    MiniGame save(MiniGame miniGame);
}
