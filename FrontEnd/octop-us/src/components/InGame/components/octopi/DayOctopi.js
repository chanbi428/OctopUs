import React from 'react';
import { useSelector } from 'react-redux';
import "./DayOctopi.css"

export const DayOctopi = () => {
    const { userList } = useSelector((state) => state.gamer )

    return (
      <div className="col d-flex flex-column align-items-center mt-5">
        <div className="row">
          <div className="container col" >
            <div className="nameBox">
              <span className="nameTag" >{userList[1].userName}</span>
            </div>
            {userList[1].isDead === true ? (
              <img 
				        className="dead_octopus"
				        src="images/dead_octo.gif"
							  alt="deadOctopus1" 
							/>
            ) : (
              <img
                className="octopus"
                src="images/octopus/yellow.gif"
                alt="octopus1.gif"
								id="num_one"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/red.gif"
                alt="octopus0.gif"
								id="num_zero"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/purple.gif"
                alt="octopus4.gif"
								id="num_four"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/babypink.gif"
                alt="octopus5.gif"
								id="num_five"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/green.gif"
                alt="octopus2.gif"
								id="num_two"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/mint.gif"
                alt="octopus3.gif"
								id="num_thr"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/blue.gif"
                alt="octopus7.gif"
								id="#num_svn"
              />
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
            ) : (
              <img
                className="octopus"
                src="images/octopus/violet.gif" 
                alt="octopus6.gif"
								id="num_six"
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default DayOctopi;