import React from 'react';
import { useSelector } from 'react-redux';
import "./NightOctopi.css"

export const NightOctopi = () => {
    const { userList } = useSelector((state) => state.gamer )
    const { userInfo } = useSelector((state) => state.user)

    return (
      <div className="col d-flex flex-column align-items-center mt-5">
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
               userInfo.userName === userList[1].userName ?
                (<img
                className="octopus"
                src="images/octopus/yellow.gif"
                alt="octopus1.gif"
								id="num_one"/> )
                : 
                (<img 
                className="sleep_octopus"
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
              userInfo.userName === userList[0].userName ?
               (<img
               className="octopus"
               src="images/octopus/red.gif"
               alt="octopus1.gif"
               id="num_zero"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[4].userName ?
               (<img
               className="octopus"
               src="images/octopus/purple.gif"
               alt="octopus1.gif"
               id="num_four"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[5].userName ?
               (<img
               className="octopus"
               src="images/octopus/babypink.gif"
               alt="octopus1.gif"
               id="num_five"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[2].userName ?
               (<img
               className="octopus"
               src="images/octopus/green.gif"
               alt="octopus1.gif"
               id="num_two"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[3].userName ?
               (<img
               className="octopus"
               src="images/octopus/mint.gif"
               alt="octopus1.gif"
               id="num_thr"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[7].userName ?
               (<img
               className="octopus"
               src="images/octopus/blue.gif"
               alt="octopus1.gif"
               id="num_svn"/> )
               : 
               (<img 
               className="sleep_octopus"
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
              userInfo.userName === userList[6].userName ?
               (<img
               className="octopus"
               src="images/octopus/violet.gif"
               alt="octopus1.gif"
               id="num_six"/> )
               : 
               (<img 
               className="sleep_octopus"
               src="images/octopus/cave_violet.png"
               alt="sleep_octopus1"
               />)
            )}
          </div>
        </div>
      </div>
    );
}

export default NightOctopi;