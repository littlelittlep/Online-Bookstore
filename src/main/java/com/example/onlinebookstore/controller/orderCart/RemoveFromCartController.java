package com.example.onlinebookstore.controller.orderCart;

import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin
@Controller
public class RemoveFromCartController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/order/removeFromCart")
    @ResponseBody
    public void removeFromCart(@RequestParam("OrderID") String orderID){
        String deleteSQL = "DELETE FROM orders WHERE OrderID="
                + orderID + ";";
        System.out.println(deleteSQL);
        jdbcTemplate.execute(deleteSQL);
    }
}
