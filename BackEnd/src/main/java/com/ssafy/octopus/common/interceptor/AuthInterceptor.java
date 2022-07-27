package com.ssafy.octopus.common.interceptor;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.ssafy.octopus.user.entity.UserDto;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/*
 * Write by SJH
 * */

@Configuration
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Interceptor preHandle");
        //async
        String async = request.getHeader("async");

        HttpSession session = request.getSession();
        UserDto userDto = (UserDto) session.getAttribute("userDto");
        if( userDto == null ) {

            if("true".equals(async)) {
                System.out.println("async");
                Gson gson = new Gson();

                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("result", "login");

                String jsonStr = gson.toJson(jsonObject);
                response.getWriter().write(jsonStr);
            }else {
                response.sendRedirect("/login");
            }

            return false;
        }

        return true;
    }
}
