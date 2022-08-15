import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import clickBtnGame from "./InGame.js";

export const Timer = (time, user, page, flag, obj) => {
  console.log("제발 timer 안 1");
  // const { minigameResult, job, hasSkill, isDead, shark, fisher, reporter } = useSelector((state) => state.gamer)
  console.log("제발 timer 안 2");
  var tmp = time;
  var isChange = 0;
  const timerInterval = setInterval(() => {
    const data = {
      second: tmp,
    };
    tmp = tmp - 1;
    console.log("유저정보", user, obj);
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "timer",
    });
    var data2;
    if (tmp == -1) {
      // 대기실 -> 직업 카드 애니메이션
      if (page == 0) {
        console.log("타이머 작동했나 확인, 직업 카드 애니메이션");
        data2 = {
          page: 1,
          initTime: 5,
        };
        if (flag.gameEnd) {
          isChange = 1;
        }
        // 카드애니메이션 -> 밤 애니메이션
      } else if (page == 1) {
        data2 = {
          page: 2,
          initTime: 3,
        };
        console.log("제발,,,", user);
        // 밤 애니메이션 -> 밤
      } else if (page == 2) {
        data2 = {
          page: 3,
          initTime: 3,
        };
        // 밤 -> 낮 애니메이션
      } else if (page == 3) {
        data2 = {
          page: 7,
          initTime: 3,
        };
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data2),
          type: "nightEnd",
        });
        // 낮 애니메이션 -> 죽음 결과 창
      } else if (page == 7) {
        data2 = {
          page: 8,
          initTime: 3,
        };
        // 죽음결과창 -> 최종결과창 or 기자 결과 창 or 낮
      } else if (page == 8) {
        // 게임 종료됨
        if (flag.gameEnd) {
          data2 = {
            page: 15,
            initTime: 3,
          };
          // 기자가 능력 사용
        } else if (obj.reporter !== "") {
          data2 = {
            page: 9,
            initTime: 3,
          };
          // 안씀
        } else {
          // 상어 미니게임 발생
          if (obj.shark) {
            data2 = {
              page: 20,
              initTime: 0,
              gameChoice: 2,
            };
            user.getStreamManager().stream.session.signal({
              data: JSON.stringify(data2),
              type: "changeToGame",
            });
            isChange = 1;
            // 낚시 미니게임 발생
          } else if (obj.fisher) {
            data2 = {
              page: 30,
              initTime: 0,
              gameChoice: 1,
            };
            user.getStreamManager().stream.session.signal({
              data: JSON.stringify(data2),
              type: "changeToGame",
            });
            isChange = 1;
            // 미니게임 없음
          } else {
            data2 = {
              page: 10,
              initTime: 3,
            };
          }
        }
        // 기자 결과창 -> 미니게임들 or 낮
      } else if (page == 9) {
        // 상어 미니게임 발생
        if (obj.shark) {
          data2 = {
            page: 20,
            initTime: 0,
            gameChoice: 2,
          };
          user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data2),
            type: "changeToGame",
          });
          isChange = 1;
          // 낚시 미니게임 발생
        } else if (obj.fisher) {
          data2 = {
            page: 20,
            initTime: 0,
            gameChoice: 1,
          };
          user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data2),
            type: "changeToGame",
          });
          isChange = 1;
          // 미니게임 없음
        } else {
          data2 = {
            page: 10,
            initTime: 3,
          };
        }
        // 낮 -> 밤 애니메이션(미니게임 마피아 승) or 투표
      } else if (page == 10) {
        // 마피아가 미니게임 이겨서 투표 스킵 (밤 애니메이션)
        if (obj.minigameResult) {
          data2 = {
            page: 2,
            initTime: 3,
          };
          // 투표로 이동
        } else {
          data2 = {
            page: 11,
            initTime: 3,
          };
        }
        // 투표 -> 투표 집계 애니메이션
      } else if (page == 11) {
        console.log("Timer : VOTE");
        data2 = {
          page: 12,
          initTime: 3,
        };
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data2),
          type: "voteEnd",
        });
        console.log("VOTE SEND SIGNAL : voteEnd");
        // 투표 집계 애니메이션 => 투표 결과 애니메이션
      } else if (page == 12) {
        console.log("Timer : VOTE RESULT ANIMATION");
        data2 = {
          page: 16,
          initTime: 3,
        };
        // 투표 결과 애니메이션 -> 최후변론 or 밤 애니메이션
      } else if (page == 16) {
        // 투표결과 있어서 최후변론으로 감
        if (flag.voteGo) {
          data2 = {
            page: 13,
            initTime: 3,
          };
          // 투표결과 없어서 밤으로 이동
        } else {
          data2 = {
            page: 2,
            initTime: 3,
          };
        }
        // 최후변론 + 찬반투표 -> 처형 집계 애니메이션
      } else if (page == 13) {
        data2 = {
          page: 17,
          initTime: 3,
        };
        console.log("Timer : VOTE AGREE");
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data2),
          type: "agreeVoteEnd",
        });
        console.log("VOTE SEND SIGNAL : agreeVoteEnd");
        // 처형 집계 애니메이션 -> 처형 결과 애니메이션
      } else if (page == 17) {
        data2 = {
          page: 18,
          initTime: 3,
        };
      } else if (page == 18) {
        // 재간둥이는 게임 종료
        // if (flag.gameEnd) {
        //   data2 = {
        //     page: 15,
        //     initTime: 3,
        //   };
        // }
        // 처형페이지로
        if (flag.agreeVoteGo) {
          data2 = {
            page: 14,
            initTime: 3,
          };
          // 처형x
        } else {
          data2 = {
            page: 2,
            initTime: 3,
          };
        }
        // 처형 -> 밤 애니메이션 or 최종결과창
      } else if (page == 14) {
        console.log("VOTE : 처형 PAGE");
        // 처형 후 게임 종료
        if (flag.gameEnd) {
          data2 = {
            page: 15,
            initTime: 3,
          };
          // 밤 애니메이션
        } else {
          data2 = {
            page: 2,
            initTime: 3,
          };
        }
        // 최종 결과창 -> 대기실
      } else if (page == 15) {
        data2 = {
          page: 0,
          initTime: 0,
        };
      } else if (page == 20) {
        isChange = 0;
        data2 = {
          page: 10,
          initTime: 3,
        };
      }
      if (isChange === 0 && obj.roomChief === user.nickname) {
        user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data2),
          type: "change",
        });
      } else {
        isChange = 0;
      }
      clearInterval(timerInterval);
    }
  }, 1000);
};
export default Timer;
