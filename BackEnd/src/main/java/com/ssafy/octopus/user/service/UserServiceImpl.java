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
        User user = new User(userDto.getUserName(), userDto.getUserPW());
        return repository.save(user);
    }

    @Override
    public boolean delete(int idx) {
        return repository.deleteByIdx(idx);
    }

    @Override
    public boolean nameOverlapCheck(String userName) {
        return repository.existsByUserName(userName);
    }
}
