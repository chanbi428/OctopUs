package com.ssafy.octopus.user.controller;

import com.ssafy.octopus.common.baseDto.BaseDto;
import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.jwt.JwtTokenProvider;
import com.ssafy.octopus.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class SampleController {

    @Autowired
    private UserRepository repository;

    @Autowired
//    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/baseDto")
    public void test(@RequestBody BaseDto baseDto){
        System.out.println(baseDto);
    }
    /*
    * baseDto request data like this
    {
        "type": "chat",
        "sender": "me",
        "sendername":"my",
        "gamerange":"in",
        "ingame":{
            "datatype": null,
            "data":null
        },
        "outGameDto":{
            "datatype": "datatype",
            "data": "data"
        }
    }
    * */
    @PostMapping("/loginJwt")
    public String jwttest(@RequestBody Map<String, String> map){
        User user = repository.findByUserName(map.get("userID"));
//        if(!passwordEncoder.matches(map.get("userPw"), user.getUserPw())){
//            return "Wrong Data";
//        }
        System.out.println("user : " + user + " map : " + map);
        System.out.println(jwtTokenProvider.createToken(user.getUserName()));
        if(!user.getUserPw().equals(map.get("userPw"))){
            return "Wrong Data";
        }
        else{
            return jwtTokenProvider.createToken(user.getUserName());
        }
    }
    @GetMapping("/AuthJwt")
    public String authJwt(@RequestParam String token){
        System.out.println("here token : " + token);
        return jwtTokenProvider.getUserPk(token);
    }

    @GetMapping("/login")
    public String testLogin(){
        return "here... hello?";
    }
}
