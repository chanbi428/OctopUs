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
    @Query(value = "UPDATE gamer SET is_victory = 1 WHERE room_id = ? AND game_team = ?", nativeQuery = true)
    int updateByGameTeam(String roomId, String gameTeam);

    /** @brief : countAlive, 팀 내 살아있는 사람의 수
     *  @date : 2022-08-01
     *  @param : roomId, gameTeam
     *  @return : int
     *  @author : BCB
     */
    @Query(value = "SELECT count(*) FROM gamer WHERE is_dead = 0 AND room_id = ? AND game_team = ?", nativeQuery = true)
    public int countAlive(String roomId, String gameTeam);

    /** @brief : countAliveAll, 살아있는 사람의 수
     *  @date : 2022-08-14
     *  @param : roomId, gameTeam
     *  @return : int
     *  @author : BCB
     */
    @Query(value = "SELECT count(*) FROM gamer WHERE is_dead = 0 AND room_id = ?", nativeQuery = true)
    public int countAliveAll(String roomId);

    /** @brief : isMayorAlive, 시장 살아있는지 죽었는지
     *  @date : 2022-08-14
     *  @param : roomId
     *  @return : int
     *  @author : BCB
     */
    @Query(value = "SELECT is_dead FROM gamer WHERE room_id = ? AND game_job = '시장'", nativeQuery = true)
    public int isMayorAlive(String roomId);


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

    /** @brief : deleteByRoomId, 해당 roomId가진 night 삭제 (게임 종료시 사용)
     *  @date : 2022-08-02
     *  @param : roomId
     *  @return : Long
     *  @author : LDY
     */
    @Transactional
    Long deleteByRoomId(String roomId);

    /** @brief : 기자 조회
     *  @date : 2022-08-12
     *  @param : roomId, GameJob
     *  @return : Gamer
     *  @author : BCB
     */
    public Gamer findByRoomIdAndGameJob(String roomId, String gameJob);
}