package com.ssafy.octopus.ingame.shark.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "mini_shark")
public class Shark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idx;
    @Column(name = "room_id")
    private String roomId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "game_team")
    private String gameTeam;
    @Column(name = "time")
    private float time;
}
