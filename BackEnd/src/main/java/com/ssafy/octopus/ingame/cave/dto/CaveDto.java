package com.ssafy.octopus.ingame.cave.dto;
/**
 * @brief : Cave Dto
 * @details : DB에서 연결되는 Cave에 관련된 변수들 (JPA 사용하기 위해 ENTITY 정의)
 * @date 2022-07-31
 * @author : LDY, 98dlstod@naver.com
 */
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CaveDto {
    private int idx;
    private int caveId;
    private String roomId;
    private int personNum;
    private String personList;
}
