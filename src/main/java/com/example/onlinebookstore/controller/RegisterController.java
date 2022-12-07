package com.example.onlinebookstore.controller;

import com.example.onlinebookstore.entity.User;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Controller
public class RegisterController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/register")
    @ResponseBody
    public String login(@RequestParam("MemberID") String memberID,
                        @RequestParam("Password") String password,
                        @RequestParam("MemberName") String memberName) {
        String sql = "SELECT * FROM users WHERE MemberID="+memberID;
        List<User> userList = jdbcTemplate.query(sql, new RowMapper<User>() {
            User user = null;

            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                user = new User();
                user.setMemberID(rs.getString("MemberID"));
                user.setMemberName(rs.getString("MemberName"));
                user.setPassword(rs.getString("password"));
                user.setManager(false);
                user.setBalance(0);
                return user;
            }
        });
        if (userList.isEmpty()){
            String insertSQL = "INSERT INTO users Values( "
                    +"\'"+ memberID + "\'" + ", " + "\'" + password +"\'" + ", " +"\'" + memberName +"\'" + ", " + "0" + "," + "0" +")";

            System.out.println(insertSQL);
            jdbcTemplate.execute(insertSQL);
            return "1";
        }
        else
            return "0";
    }
}