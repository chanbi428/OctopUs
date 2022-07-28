package com.ssafy.octopus.ingame.dto;

import lombok.*;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GamerDto {

    int idx;
    String userName;
    String roomId;
    String gameTeam;
    boolean isDead;
    String gameJob;
    boolean isVictory;
}
