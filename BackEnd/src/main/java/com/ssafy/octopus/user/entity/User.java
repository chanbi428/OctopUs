package com.ssafy.octopus.user.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/*
 * Write by SJH
 * */

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(
        name = "user"
)
public class User extends UserEntity{ // never use Setter
    @Column(name = "user_id")
    private String userId;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_pw")
    private String userPw;
//    @Column(name = "userId")
//    private String userId;
//    @Column(name = "useName")
//    private String userName;
//    @Column(name = "userPw")
//    private String userPw;
}
