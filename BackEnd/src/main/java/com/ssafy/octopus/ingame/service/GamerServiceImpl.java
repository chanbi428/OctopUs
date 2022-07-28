package com.ssafy.octopus.ingame.service;

import com.ssafy.octopus.ingame.dao.GamerDao;
import com.ssafy.octopus.ingame.entity.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GamerServiceImpl implements GamerService {

    @Autowired
    GamerDao dao;

    @Override
    public Gamer findByUserName(String userName){
        Gamer gamer = new Gamer();
        try{
            gamer = dao.findByUserName(userName);
            //System.out.println(userName);
            String a = gamer == null? "없다" : userName;
            System.out.println(a);
            return gamer;
        } catch (Exception e){
            e.printStackTrace();
            return  gamer;
        }
    }

}
