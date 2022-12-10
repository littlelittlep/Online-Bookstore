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
public class userInfo  {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/userInfo")
    @ResponseBody
//  @RequestMapping(value = "/check")
    public float userInfo(@RequestParam("MemberID") String memberID) {
        String sql1 = "SELECT * FROM users WHERE MemberID='"+memberID+"';";
//        final boolean[] isAdmin = {false};
        List<User> userList = jdbcTemplate.query(sql1, new RowMapper<User>() {
            User user = null;
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                user = new User();
                user.setBalance(Float.parseFloat(rs.getString("Balance")));

//                if(rs.getString("isManager").equals("1")){
//                    isAdmin[0] =true;
//                }
                return user;
            }
        });
        return userList.get(0).getBalance();//返回用户余额

    }
}

