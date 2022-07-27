package com.ssafy.octopus.user.service;

import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.entity.UserDto;
import com.ssafy.octopus.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 * Write by SJH
 * */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repository;

    @Override
    public User save(UserDto userDto) {
        System.out.println("UserService : " + userDto);
        User user = new User(userDto.getUserId(), userDto.getUserName(), userDto.getUserPW());
        return repository.save(user);
    }

    @Override
    public boolean delete(int idx) {
        return repository.deleteByIdx(idx);
    }

    @Override
    public boolean idOverlapCheck(String userId) {
        int result = repository.existsByUserId(userId);
        if(result != 0) return false;
        else return true;
    }

    @Override
    public boolean pwOverlapCheck(String userPw) {
        int result = repository.existsByUserPw(userPw);
        if(result != 0) return false;
        return true;
    }

    @Override
    public boolean nameOverlapCheck(String userName) {
        int result = repository.existsByUserName(userName);
        if(result != 0) return false;
        return true;
    }
}
