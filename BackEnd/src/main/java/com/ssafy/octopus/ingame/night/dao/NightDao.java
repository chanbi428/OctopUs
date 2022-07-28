package com.ssafy.octopus.ingame.night.dao;

import com.ssafy.octopus.ingame.night.entity.Night;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NightDao extends JpaRepository<Night, Integer> {

}
