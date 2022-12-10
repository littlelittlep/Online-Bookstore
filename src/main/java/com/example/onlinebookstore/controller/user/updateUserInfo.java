package com.example.onlinebookstore.controller.user;


import com.example.onlinebookstore.entity.User;
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
public class updateUserInfo  {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/updateUserInfo")
    @ResponseBody
//  @RequestMapping(value = "/check")
    public void updateBal(@RequestParam("MemberID") String memberID,
                          @RequestParam("addBalance") float addBalance) {

        String updateSQL = "BEGIN;\n" +
                "SELECT Balance From users WHERE MemberID="+"\'"+memberID+"\'"+";\n" +
                "UPDATE users SET Balance = Balance+" + addBalance + " WHERE MemberID="+"\'"+memberID+"\'"+";\n" +
                "COMMIT;";
        System.out.println(updateSQL);
        jdbcTemplate.execute(updateSQL);
    }
}

