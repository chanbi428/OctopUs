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
    @GeneratedValue
    @Column
    private int idx;

    @Column(name="roomId", columnDefinition="varchar(40)")
    private String roomId;

    @Column(name="roomChief", columnDefinition="varchar(20)")
    private String roomChief;

    @Column(name="isPrivate", columnDefinition="tinyint default '0' ")
    private boolean isPrivate;

    @Column(name="roomName", columnDefinition="varchar(20)")
    private String roomName;

    private int personLimit;

    @Column(name="roomPw", columnDefinition="varchar(20)")
    private String roomPw;

    @Column(name="gameStatus", columnDefinition="tinyint default '0' ")
    private boolean gameStatus;

    @Column(name="personNum", columnDefinition="int default '1' ")
    private int personNum;

    private int gameTime;

    @Column(name="userList")
    private String userList;
}

