import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../../api/BASE_URL";
import {
  updateRoomId,
  updateUserList,
  updateRoomChief,
} from "../../../../features/waiting/waitSlice";
import Swal from "sweetalert2";

function ErrorGuildComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.wait);

  async function goToMain() {
    Swal.fire({
        icon: "warning",
        text: "에러가 발생하였습니다. 확인을 누르면 메인으로 이동합니다.",
        background: "#fdfcdc",
        showCancelButton: false,
        confirmButtonColor: "#f4d35e",
        cancelButtonColor: "#f4d35e",
        confirmButtonText: "확인",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          cancelButton: "swalBtnColor",
          popup: "popUp",
        },
      }).then((result) => {
        if (result.isConfirmed) {
            console.log("방 나가기 버튼 누르고 절차 시작");
            axios.get(`${BASE_URL}/rooms/detail/roomid/${roomId}`).then((res) => {
              if (res !== null && res !== undefined) {
                axios
                  .delete(`${BASE_URL}/rooms/${roomId}`)
                  .then(() => console.log("혼자일 때 방 나가기 완료"));
              }
            });
            navigate("/main");
            console.log("navigate로 방 나가기 완전 종료");
            dispatch(updateRoomId(""));
            dispatch(updateRoomChief(""));
            dispatch(updateUserList([]));
        }
      });
  }
  goToMain();
  return (
    <div>
    </div>
  );
}
export default ErrorGuildComponent;
