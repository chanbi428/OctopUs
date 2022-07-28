package com.ssafy.octopus.ingame.entity;

import com.ssafy.octopus.ingame.night.entity.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "gamer")
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Gamer extends BaseEntity {

    @Column(name = "user_name", columnDefinition = "varchar(20) NOTNULL UNIQUE")
    String userName;
    @Column(name = "room_id", columnDefinition = "varchar(40) NOTNULL")
    String roomId;
    @Column(name = "game_team", columnDefinition = "varchar(20) NOTNULL")
    String gameTeam;
    @Column(name = "is_dead", columnDefinition = "tinyint NOTNULL")
    boolean isDead;
    @Column(name = "game_job", columnDefinition = "varchar(20) NOTNULL")
    String gameJob;
    @Column(name = "is_victory", columnDefinition = "tinyint NOTNULL")
    boolean isVictory;
}
