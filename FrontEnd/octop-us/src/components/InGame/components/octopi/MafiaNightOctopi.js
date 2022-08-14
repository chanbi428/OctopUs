import React from 'react';
import { useSelector } from 'react-redux';
import "./NightOctopi.css"

export const MafiaNightOctopi = () => {
    const { userList } = useSelector((state) => state.gamer )

    return (
      <div className="col d-flex flex-column align-items-center">
        <div className="row">
          <div className="container col" >
            <div className="nameBox">
              <span className="nameTag" >{userList[1].userName}</span>
            </div>
            {userList[1].isDead === true ? 
            (
              <img 
				        className="dead_octopus"
				        src="images/dead_octo.gif"
							  alt="deadOctopus1" 
							/>
            ) : 
            (
              userList[1].gameJob === "마피아" ?
                (<img
                className="octopus"
                src="images/octopus/yellow.gif"
                alt="octopus1.gif"
								id="num_one"/> )
                : 
                (<img 
                className="sleep_octopus_left"
                src="images/octopus/cave_yellow.png"
                alt="sleep_octopus1"
                />)
            )}
          </div>
					<div className="container col" >
            <div className="nameBox">
              <span className="nameTag" >{userList[0].userName}</span>
            </div>
            {userList[0].isDead === true ? (
              <img 
							className="dead_octopus"
							src="images/dead_octo.gif"
							alt="deadOctopus0" 
							/>
            ) : 
            (
              userList[0].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/red.gif"
               alt="octopus1.gif"
               id="num_zero"/> )
               : 
               (<img 
               className="sleep_octopus_left"
               src="images/octopus/cave_red.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
					<div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[4].userName}</span>
            </div>
            {userList[4].isDead === true ? (
              <img 
							className="dead_octopus"
							src="images/dead_octo.gif"
							alt="deadOctopus4" 
							/>
            ) : 
            (
              userList[4].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/purple.gif"
               alt="octopus1.gif"
               id="num_four"/> )
               : 
               (<img 
               className="sleep_octopus_right"
               src="images/octopus/cave_purple.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
					<div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[5].userName}</span>
            </div>
            {userList[5].isDead === true ? (
              <img 
								className="dead_octopus"
								src="images/dead_octo.gif"
								alt="deadOctopus5" 
							/>
            ) : 
            (
              userList[5].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/babypink.gif"
               alt="octopus1.gif"
               id="num_five"/> )
               : 
               (<img 
               className="sleep_octopus_right"
               src="images/octopus/cave_babypink.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
        </div>
				<div className="row">
          <div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[2].userName}</span>
            </div>
            {userList[2].isDead === true ? (
              <img 
								className="dead_octopus"
								src="images/dead_octo.gif"
								alt="deadOctopus2" 
							/>
            ) : 
            (
              userList[2].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/green.gif"
               alt="octopus1.gif"
               id="num_two"/> )
               : 
               (<img 
               className="sleep_octopus_left"
               src="images/octopus/cave_green.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
					<div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[3].userName}</span>
            </div>
            {userList[3].isDead === true ? (
              <img 
								className="dead_octopus"
								src="images/dead_octo.gif"
								alt="deadOctopus3" 
							/>
            ) : 
            (
              userList[3].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/mint.gif"
               alt="octopus1.gif"
               id="num_thr"/> )
               : 
               (<img 
               className="sleep_octopus_left"
               src="images/octopus/cave_mint.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
					<div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[7].userName}</span>
            </div>
            {userList[7].isDead === true ? (
              <img 
								className="dead_octopus"
								src="images/dead_octo.gif"
								alt="deadOctopus7" 
							/>
            ) : 
            (
              userList[7].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/blue.gif"
               alt="octopus1.gif"
               id="num_svn"/> )
               : 
               (<img 
               className="sleep_octopus_right"
               src="images/octopus/cave_blue.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
					<div className="container col">
            <div className="nameBox">
              <span className="nameTag">{userList[6].userName}</span>
            </div>
            {userList[6].isDead === true ? (
              <img 
								className="dead_octopus"
								src="images/dead_octo.gif"
								alt="deadOctopus6" 
							/>
            ) : 
            (
              userList[6].gameJob === "마피아" ?
               (<img
               className="octopus"
               src="images/octopus/violet.gif"
               alt="octopus1.gif"
               id="num_six"/> )
               : 
               (<img 
               className="sleep_octopus_right"
               src="images/octopus/cave_violet.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
        </div>
      </div>
    );
}

export default MafiaNightOctopi;