package com.ssafy.octopus.ingame.dao;

import com.ssafy.octopus.ingame.entity.Gamer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamerDao extends JpaRepository<Gamer, Integer> {

    public Gamer findByUserName(String userName);

}
