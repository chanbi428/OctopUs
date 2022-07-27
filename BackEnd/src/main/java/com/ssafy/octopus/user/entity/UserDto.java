package com.ssafy.octopus.user.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto { // can use @Setter
    private int idx;
    private String userName;
    private String userId;
    private String userPW;
}
