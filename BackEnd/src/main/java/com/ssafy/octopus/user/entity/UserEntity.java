package com.ssafy.octopus.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/*
 * Write by SJH
 * */

@Getter
@Setter
@MappedSuperclass
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;
}
