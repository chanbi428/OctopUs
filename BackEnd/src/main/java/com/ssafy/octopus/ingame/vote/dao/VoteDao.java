package com.ssafy.octopus.ingame.vote.dao;

import com.ssafy.octopus.ingame.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteDao extends JpaRepository<Vote, Integer> {

}
