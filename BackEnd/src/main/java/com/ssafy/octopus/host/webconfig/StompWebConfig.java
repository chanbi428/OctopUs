package com.ssafy.octopus.host.webconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration // 설정파일(or Bean)을 만들기 위한 Annotation
@EnableWebSocketMessageBroker
public class StompWebConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/queue", "/topic");
        /*
         * /queue, /topic 이 두 경로가 prefix에 붙은 경우 messageBroker가 해당 토픽을 구독하고 있는 클라이언트에게 메세지 전달해줌
         * /queue는 주로 1:1, /topic 은 1:N 메세징에 주로 사용함
         * */
        registry.setApplicationDestinationPrefixes("/app");
        /*
         * 메세지 보낼 때 관련 경로 설정
         * 클라이언트가 메세지 보낼 때 경로 맨 앞에 /app 있으면 Broker로 보내짐
         * */
    }
}
