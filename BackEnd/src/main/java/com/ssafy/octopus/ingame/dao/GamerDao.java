package com.ssafy.octopus.ingame.dao;

import com.ssafy.octopus.ingame.entity.Gamer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface GamerDao extends JpaRepository<Gamer, Integer> {

    /** @brief : findByUserName, (userName)가 일치하는 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : Gamer
     *  @author : BCB
     */
    public Gamer findByUserName(String userName);


    /** @brief : findByRoomId, (roomId)가 일치하는 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : roomId
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    List<Gamer> findByRoomId(String roomId);

    /** @brief : findByIsVictory, 승리한 Gamer 들을 찾아줌
     *  @date : 2022-07-31
     *  @param : boolean
     *  @return : List<Gamer>
     *  @author : LDY, 98dlstod@naver.com
     */
    List<Gamer> findByIsVictory(boolean is_victory);


    /** @brief : updateByUserName, userName에 해당하는 게이머 승리로 변경
     *  @date : 2022-07-31
     *  @param : userName
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE gamer SET is_victory = 1 WHERE user_name = ?", nativeQuery = true)
    int updateByUserName(String userName);

    /** @brief : updateByGameTeam, gameTeam에 해당하는 게이머들 승리로 변경
     *  @date : 2022-07-31
     *  @param : gameTeam
     *  @return : int
     *  @author : LDY, 98dlstod@naver.com
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE gamer SET is_victory = 1 WHERE game_team = ?", nativeQuery = true)
    int updateByGameTeam(String gameTeam);


//    /** @brief : Gamer List, 모든 Gamer List 반환
//     *  @date : 2022-07-31
//     *  @param
//     *  @return : ResponseEntity<List<Cave>>
//     *  @author : LDY, 98dlstod@naver.com
//     */
//    @Transactional
//    Long deleteByRoomId(String roomId);

    /** @brief : countAlive, 팀 내 살아있는 사람의 수
     *  @date : 2022-08-01
     *  @param : roomId, gameTeam
     *  @return : int
     *  @author : BCB
     */
    @Query(value = "SELECT count(*) FROM gamer WHERE is_dead = 0 AND room_id = ? AND game_team = ?", nativeQuery = true)
    public int countAlive(String roomId, String gameTeam);


    /** @brief : setDead, 죽었을 때 처리
     *  @date : 2022-08-01
     *  @param : userName
     *  @return : int
     *  @author : BCB
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE gamer SET is_dead = 1 WHERE user_name = ?", nativeQuery = true)
    public int setDead(String userName);

    /** @brief : findByGameJob, 직업으로 Gamer 조회
     *  @date : 2022-08-01
     *  @param : gameJob, roomId
     *  @return : Gamer
     *  @author : BCB
     */
    @Query(value = "SELECT * FROM gamer WHERE game_job = ? AND room_Id = ?", nativeQuery = true)
    public List<Gamer> findByGameJob(String gameJob, String roomId);
}