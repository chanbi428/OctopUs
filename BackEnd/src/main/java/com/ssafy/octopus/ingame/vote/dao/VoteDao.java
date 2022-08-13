package com.ssafy.octopus.ingame.vote.dao;

import com.ssafy.octopus.ingame.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Writer by BCB
 */
@Repository
public interface VoteDao extends JpaRepository<Vote, Integer> {

    // 낮 투표 시장제외 나머지 (1표 -> 10표)
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = vote + 10 WHERE user_name = ?", nativeQuery = true)
    public int daytimeVote(String userName);

    // 낮 투표 시장 (1.5표 -> 15표)
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = vote + 15 WHERE user_name = ?", nativeQuery = true)
    public int daytimeVoteMayor(String userName);

    // 찬반투표 (찬성 +10)
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = vote + 10 WHERE user_name = ?", nativeQuery = true)
    public int agreeVote(String userName);

    // 찬반투표 (반대 -10)
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = vote - 10 WHERE user_name = ?", nativeQuery = true)
    public int disagreeVote(String userName);

    // 투표 조회 (찬반 결과 조회)
    public Vote findByUserName(String userName);

    // 투표 조회 (낮 투표 결과 조회)
    @Modifying
    @Query(value = "SELECT * FROM vote WHERE room_id = ? AND vote = (SELECT max(vote) FROM vote WHERE room_id = ?);", nativeQuery = true)
    public List<Vote> findMaxVote(String roomId1, String roomId2);

    // 투표 초기화
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = 0 WHERE room_id = ?", nativeQuery = true)
    public int resetVote(String roomId);

    // skip 표 세기
    @Query(value = "SELECT (count(vote)*10+5)-sum(vote) FROM vote WHERE room_id = ?", nativeQuery = true)
    public int selectSkip(String roomId);

    /** @brief : deleteByRoomId, 해당 roomId가진 night 삭제 (게임 종료시 사용)
     *  @date : 2022-08-02
     *  @param : roomId
     *  @return : Long
     *  @author : LDY
     */
    @Transactional
    Long deleteByRoomId(String roomId);

    /** @brief : updateVote, roomId의 해당하는 vote의 vote 초기화
     *  @date : 2022-08-13
     *  @param : roomId
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE vote SET vote = 0 WHERE room_id = ?", nativeQuery = true)
    int updateByRoomIdForInitialization(String roomId);
}
