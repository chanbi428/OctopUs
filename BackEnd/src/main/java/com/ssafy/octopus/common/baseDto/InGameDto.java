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
public class InGameDto {
    private String datatype;
    private String data;
    /*
     * chat message data : {
     * message, job, life or death
     * }
     * */
}
