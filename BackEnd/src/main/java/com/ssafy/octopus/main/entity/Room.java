package com.ssafy.octopus.main.entity;

/**
 * @brief : Room Dto
 * @details : DB에서 연결되는 Room에 관련된 변수들 (JPA 사용하기 위해 ENTITY 정의 - DB table 과 key)
 * @date 2022-07-25
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
        name="room"
//        uniqueConstraints = {
//                @UniqueConstraint(name="UK_STUDENT_EMAIL", columnNames="address")
//        }
)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int idx;

    @Column(name="room_id", columnDefinition="varchar(40)")
    private String roomId;

    @Column(name="room_chief", columnDefinition="varchar(20)")
    private String roomChief;

    @Column(name="is_private", columnDefinition="tinyint default '0' ")
    private boolean isPrivate;

    @Column(name="room_name", columnDefinition="varchar(20)")
    private String roomName;

    @Column(name="person_limit")
    private int personLimit;

    @Column(name="room_pw", columnDefinition="varchar(20)")
    private String roomPw;

    @Column(name="game_status", columnDefinition="tinyint default '0' ")
    private boolean gameStatus;

    @Column(name="person_num", columnDefinition="int default '1' ")
    private int personNum;

    @Column(name="game_time")
    private int gameTime;

    @Column(name="user_list")
    private String userList;
}

