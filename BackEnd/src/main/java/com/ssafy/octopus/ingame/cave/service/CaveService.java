package com.ssafy.octopus.ingame.cave.service;
/**
 * @brief : Cave Service
 * @details : Controller에서 호출, 요청을 처리하기 위한 service 로직 정의
 * @date 2022-07-31
 * @author : LDY, 98dlstod@naver.com
 */

import com.ssafy.octopus.ingame.cave.entity.Cave;

import java.util.List;
import java.util.Optional;

public interface CaveService {
    List<Cave> list(); // 전체 굴 목록

    List<Cave> findByRoomId(String roomId);  // 방 ID에 따른 상세 조회

    Optional<Cave> findByCaveIdAndRoomId(int caveId, String roomId); // cave id, 방 id 에 따른 상세 조회

    Cave insert(Cave dto); // 공용 굴 생성

    int update(Cave room); // 공용 굴 수정

    Long deleteByRoomId(String roomId); // 공용 굴 들 삭제
}
