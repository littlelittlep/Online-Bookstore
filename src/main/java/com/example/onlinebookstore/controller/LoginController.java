package com.example.onlinebookstore.controller;

import com.example.onlinebookstore.entity.User;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin
@Controller
public class LoginController  {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/login")
    @ResponseBody
    public String login(@RequestParam("MemberID") String memberID,
                        @RequestParam("Password") String password) {
        String sql1 = "SELECT * FROM users WHERE MemberID='"+memberID+"';";
        final boolean[] isAdmin = {false};
        List<User> userList = jdbcTemplate.query(sql1, new RowMapper<User>() {
            User user = null;
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                user = new User();
                user.setMemberID(rs.getString("MemberID"));
                user.setMemberName(rs.getString("MemberName"));
                user.setPassword(rs.getString("Password"));
                if(rs.getString("isManager").equals("1")){
                    isAdmin[0] =true;
                }
                return user;
            }
        });
        if (userList.isEmpty()){
            return "0";//用户不存在
        }else if(userList.get(0).getPassword().equals(password)){
<<<<<<< HEAD
            return "1";//登陆成功
=======
            if(isAdmin[0])return "4";//管理员
            else return "1";//登陆成功,普通用户
>>>>>>> 14410bcd4a24c6629fc4e82a492f914683dadc3e
        }else{
            return "2";//密码错误
        }

    }
}

