package com.ssafy.octopus.user.controller;

import com.ssafy.octopus.main.common.baseDto.BaseDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {
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
}
