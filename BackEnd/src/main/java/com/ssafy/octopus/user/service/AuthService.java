package com.ssafy.octopus.user.service;

import com.ssafy.octopus.user.entity.User;

/*
 * Write by SJH
 * */
public interface AuthService {
    User findByIdx(int idx);
    User findById(String id);
    User findByUserIdAndUserPw(String userId, String userPw);
}
