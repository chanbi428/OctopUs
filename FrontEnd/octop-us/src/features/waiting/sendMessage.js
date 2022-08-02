import React from 'react';

export const sendMessage = (userInfo, message) => {
    const data = {
      type: "system",
      sender: "FE",
      senderName: "server",
      gameRange: "ingame",
      dataType: "order",
      data: message,
    };
    userInfo.userId.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
    console.log("sendMessage : " + JSON.stringify(data));
    // this.sendMessage(JSON.stringify(data));
    // console.log(this.state.message);
    // if (this.props.user && this.state.message) {
    //     let message = this.state.message.replace(/ +(?= )/g, '');
    //     if (message !== '' && message !== ' ') {
    //         const data = {
    //             type : 'system',
    //             sender : 'FE',
    //             senderName : 'server',
    //             gameRange : 'ingame',
    //             dataType : 'order',
    //             data : {
    //                 datatype : "slot",
    //                 data : "night"
    //             }
    //         }
    //         this.props.user.getStreamManager().stream.session.signal({
    //             data: JSON.stringify(data),
    //             type: 'chat',
    //         });
    //         console.log("sendMessage : " + JSON.stringify(data));
    //         // this.sendMessage(JSON.stringify(data));
    //     }
    // }
    // this.setState({ message: "" });
};

export default sendMessage;