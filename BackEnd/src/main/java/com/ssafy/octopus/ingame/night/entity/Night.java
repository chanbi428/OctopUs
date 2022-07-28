package com.ssafy.octopus.ingame.night.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "night")
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Night extends BaseEntity {

    @Column(name = "user_name", columnDefinition = "varchar(20) NOTNULL UNIQUE")
    String userName;
    @Column(name = "room_id", columnDefinition = "varchar(40) NOTNULL")
    String roomId;
    @Column(name = "nominee_name", columnDefinition = "varchar(20) NOTNULL")
    String nomineeName;
}
