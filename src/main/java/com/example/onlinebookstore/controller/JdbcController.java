package com.example.onlinebookstore.controller;

import com.example.onlinebookstore.entity.User;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Controller
@RequestMapping("/jdbc")
public class JdbcController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @RequestMapping("/login")
    @ResponseBody
    public List<User> list(ModelMap map) {
        String sql = "SELECT * FROM users";
        List<User> userList = jdbcTemplate.query(sql, new RowMapper<User>() {
            User user = null;

            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                user = new User();
                user.setUserName(rs.getString("userName"));
                user.setPassword(rs.getString("password"));
                return user;
            }
        });
        return userList;
    }
}
