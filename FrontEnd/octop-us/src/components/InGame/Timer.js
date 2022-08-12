import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import clickBtnGame from "./InGame.js";
import { BASE_URL } from "../../api/BASE_URL";
export const Timer = async (time, user, page, flag, obj) => {
  // const { reporter } = useSelector((state) => state.gamer);
  console.log("타이머가 호출됨", page, obj);
  var tmp = time;
  var isChange = 0;
  const timerInterval = setInterval(() => {
    const data = {
      second: tmp,
    };
    tmp = tmp - 1;
    console.log(user);
    user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "timer",
    });
    var data2;
    if (tmp == -1) {
      // 대기실 -> 직업 카드 애니메이션
      if (page == 0) {
        console.log("타이머 작동했나 확인, 직업 카드 애니메이션")
        data2 = {
          page: 1,
          initTime: 5,
        };
        // 카드애니메이션 -> 밤 애니메이션
      } else if (page == 1) {
        data2 = {
          page: 2,
          initTime: 3,
        };
        console.log("제발,,,", user);
        // 밤 애니메이션 -> 밤
      } else if (page == 2) {
        // 죽은 사람
        if (obj.isDead) {
          data2 = {
            page: 6,
            initTime: 3,
          };
          // 밤 역할 수행x(시장, 재간둥이, 능력 쓴 기자)
        } else if (
          obj.job === "시장" ||
          obj.job === "재간둥이" ||
          (obj.job === "기자" && obj.hasSkill === false)
        ) {
          data2 = {
            page: 3,
            initTime: 3,
          };
          // 밤 역할 수행o(마피아)
        } else if (obj.job === "마피아") {
          data2 = {
            page: 4,
            initTime: 3,
          };
          // 밤 역할 수행o(의사, 경찰, 기자, 크레이지)
        } else {
          data2 = {
            page: 5,
            initTime: 3,
          };
          // 죽은사람
        }
        // 밤 -> 낮 애니메이션
      } else if (page == 3 || page == 4 || page == 5 || page == 6) {
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
        // 투표 -> 투표 결과 애니메이션
      } else if (page == 11) {
        data2 = {
          page: 12,
          initTime: 3,
        };
        // 투표결과 -> 최후변론 or 밤 애니메이션
      } else if (page == 12) {
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
        // 최후변론 + 찬반투표 -> 처형 or 밤 애니메이션
      } else if (page == 13) {
        // 찬반 투표 결과 처형으로
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
      } else if (page == 20){
        data2 = {
          page: 10,
          initTime: 3,
        };
        isChange = 0
      }
      if (isChange === 0) {
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
