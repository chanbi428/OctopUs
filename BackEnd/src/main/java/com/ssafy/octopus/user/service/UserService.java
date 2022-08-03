package com.ssafy.octopus.user.service;

import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.entity.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Write by SJH
 * */
public interface UserService {
    User save(UserDto userDto);
    boolean delete(int idx);
    boolean nameOverlapCheck(String userName);
}
