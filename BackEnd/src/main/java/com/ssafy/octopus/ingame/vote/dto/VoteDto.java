package com.ssafy.octopus.ingame.vote.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteDto {

    int idx;
    String userName;
    String roomId;
    int vote;
}
