package com.ssafy.octopus.common.baseDto;

import lombok.*;

/*
 * Write by SJH
 * */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BaseDto {
    private String type;
    private String sender;
    private String sendername;
    private String gamerange;
    private InGameDto ingame;
    private OutGameDto outGameDto;
}
