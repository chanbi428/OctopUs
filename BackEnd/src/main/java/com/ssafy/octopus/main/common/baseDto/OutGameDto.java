package com.ssafy.octopus.main.common.baseDto;

import lombok.*;

/*
 * Write by SJH
 * */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OutGameDto {
    private String datatype;
    private String data;
    /*
    *
    login {
            id
            pw
    },
	sign in{
        id(not overlap, pk)
        pw
        nickname(not overlap)
	},
	enter room {
	    roomid
	},
	make room{
        roomid?
        room name
        public/private
        pw
        user count
        time
	},
	setting{
        mute
        video off
	}
	* */
}
