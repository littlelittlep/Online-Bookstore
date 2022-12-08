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
        List<User> userList = jdbcTemplate.query(sql1, new RowMapper<User>() {
            User user = null;

            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                user = new User();
                user.setMemberID(rs.getString("MemberID"));
                user.setMemberName(rs.getString("MemberName"));
                user.setPassword(rs.getString("Password"));
                return user;
            }
        });
        if (userList.isEmpty()){
            return "0";//用户不存在
        }else if(userList.get(0).getPassword()==password){
            return "1";//登陆成功
        }else{
            return "2";//密码错误
        }

    }
}

