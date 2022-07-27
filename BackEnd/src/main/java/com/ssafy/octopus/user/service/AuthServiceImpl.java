package com.ssafy.octopus.user.service;

import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Write by SJH
 * */
@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByIdx(int idx) {
        return userRepository.findByIdx(idx);
    }

    @Override
    public User findById(String id) {
        return userRepository.findByUserId(id);
    }

    @Override
    public User findByUserIdAndUserPw(String id, String pw) {
        System.out.println("serviceImpl : " + id + " : " + pw);
        return userRepository.findByUserIdAndUserPw(id, pw);
    }

}
