package com.example.onlinebookstore.controller.orderCart;

import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
public class GetMyOrdersController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/order/myOrders")
    @ResponseBody
    public List<Map<String, Object>> getOrders(@RequestParam("MemberID") String MemberID) {
        String sql_query="SELECT * FROM orders WHERE MemberID='"+MemberID+"' and OrderState=1;";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(sql_query);
        return res;
    }
}
