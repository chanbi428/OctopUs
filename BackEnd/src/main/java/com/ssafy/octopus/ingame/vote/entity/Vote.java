package com.ssafy.octopus.ingame.vote.entity;

import com.ssafy.octopus.ingame.entity.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "vote")
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vote extends BaseEntity {

    @Column(name = "user_name", columnDefinition = "varchar(20) NOTNULL UNIQUE")
    String userName;
    @Column(name = "room_id", columnDefinition = "varchar(40) NOTNULL")
    String roomId;
    @Column(name = "vote", columnDefinition = "int default 0")
    int vote;
}
