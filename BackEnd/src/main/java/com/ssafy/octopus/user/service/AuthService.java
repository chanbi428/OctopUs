package com.ssafy.octopus.user.service;

import com.ssafy.octopus.user.entity.User;

/*
 * Write by SJH
 * */
public interface AuthService {
    User findByIdx(int idx);
    User findByName(String name);
    User findByUserNameAndUserPw(String userId, String userPw);
}
