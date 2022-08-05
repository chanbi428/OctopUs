package com.ssafy.octopus.ingame.fishing.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "mini_fish")
public class MiniGame {
    @Id
    @Column(name = "room_id")
    private String roomId;
    @Column(name = "citizen")
    private int citizen;
    @Column(name = "mafia")
    private int mafia;
}
