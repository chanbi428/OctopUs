package com.ssafy.octopus.user.controller;

import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.entity.UserDto;
import com.ssafy.octopus.user.service.UserService;
import com.ssafy.octopus.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/*
 * Write by SJH
 * */

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service = new UserServiceImpl();

    @Operation(summary = "Sign Up/IN", description = "sign in / sign up api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping("/api")
    public void api(){

    }


    @GetMapping("/existName")
    public  ResponseEntity<String> existName(@RequestBody UserDto dto){
        if(service.nameOverlapCheck(dto.getUserName())){
            return new ResponseEntity<>("true", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("false", HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/SignIn") // 회원가입
    public ResponseEntity<User> signIn(@RequestBody UserDto dto){
        System.out.println("signin : " + dto);
        User user = service.save(dto);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/secession") // 회원 탈퇴
    public ResponseEntity<Boolean> secession(@RequestBody UserDto dto){
        boolean result = service.delete(dto.getIdx()); // fix here : jpa delete return void
        if(result) return new ResponseEntity<>(result, HttpStatus.OK);
        else return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
    }
}
