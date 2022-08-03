package com.ssafy.octopus.user.controller;

import com.ssafy.octopus.user.entity.User;
import com.ssafy.octopus.user.entity.UserDto;
import com.ssafy.octopus.user.jwt.JwtTokenProvider;
import com.ssafy.octopus.user.service.AuthService;
import com.ssafy.octopus.user.service.AuthServiceImpl;
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
@RequestMapping("/Auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService service = new AuthServiceImpl();

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "Auth", description = "auth / login api")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK !!"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })

    @PostMapping("/login") // 로그인
    public ResponseEntity<UserDto> login(@RequestBody UserDto dto){
        System.out.println("login : " + dto);
        User user = service.findByUserNameAndUserPw(dto.getUserName(), dto.getUserPW());
        UserDto result = new UserDto();

        if(user == null){ // 데이터가 없을 경우
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        else{ // 정상 처리 되었을 경우
            result.setIdx(user.getIdx());
            result.setUserName(user.getUserName());
            String token = jwtTokenProvider.createToken(user.getUserName());
            result.setToken(token);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/loginWithToken")
    public ResponseEntity<UserDto> loginWithToken(@RequestBody UserDto token){
        System.out.println("loginWithToken token : " + token.getToken());
        UserDto user = new UserDto();
        System.out.println("loginWithToken vaildate : " + jwtTokenProvider.validateToken(token.getToken()));
        if(jwtTokenProvider.validateToken(token.getToken())){
            String userPk = jwtTokenProvider.getUserPk(token.getToken());
            System.out.println("loginWithToken userPK : " + userPk);
            User userTmp = service.findById(userPk);
            if(userTmp != null){
                user.setIdx(userTmp.getIdx());
                user.setUserName(userTmp.getUserName());
//                user.setUserId(userTmp.getUserId());
                user.setToken(token.getToken());
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }
    }
}
