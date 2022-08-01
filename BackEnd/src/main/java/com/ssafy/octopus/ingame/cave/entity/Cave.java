package com.ssafy.octopus.ingame.cave.entity;

/**
 * @brief : Cave Dto
 * @details : DB에서 연결되는 Cave에 관련된 변수들 (JPA 사용하기 위해 ENTITY 정의 - DB table 과 key)
 * @date 2022-07-31
 * @author : LDY, 98dlstod@naver.com
 */

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(
        name="cave"
//        uniqueConstraints = {
//                @UniqueConstraint(name="UK_STUDENT_EMAIL", columnNames="address")
//        }
)
public class Cave {
    @Id
    @GeneratedValue
    @Column
    private int idx;

    @Column(name="cave_id")
    private int caveId;

    @Column(name="room_id", columnDefinition="varchar(40)")
    private String roomId;

    @Column(name="person_num")
    private int personNum;

    @Column(name="person_list", columnDefinition="varchar(60)")
    private String personList;
}

