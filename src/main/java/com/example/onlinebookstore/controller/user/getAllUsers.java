package com.example.onlinebookstore.controller.user;


import com.example.onlinebookstore.entity.Address;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
public class getAllUsers  {
    @Resource
    private JdbcTemplate jdbcTemplate;


    @PostMapping("/getAllUsers")
    @ResponseBody

    public List<Map<String, Object>> getAllUsers() {
        String userSQL = "SELECT * FROM users" + ";";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(userSQL);
        return res;
    }
}


