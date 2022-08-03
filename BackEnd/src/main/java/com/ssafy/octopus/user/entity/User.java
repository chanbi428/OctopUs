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
@Entity
@ToString
@Table(
        name = "user"
)
public class User extends UserEntity{ // never use Setter
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_pw")
    private String userPw;

    @Builder
    public User(String userName, String userPw){
        this.userName = userName;
        this.userPw = userPw;
    }
}
