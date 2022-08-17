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
    public User findByName(String name) {
        return userRepository.findByUserName(name);
    }

    @Override
    public User findByUserNameAndUserPw(String id, String pw) {
        System.out.println("serviceImpl : " + id + " : " + pw);
        return userRepository.findByUserNameAndUserPw(id, pw);
    }

}
