package com.example.onlinebookstore.controller.orderCart;

import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@CrossOrigin
@Controller
public class CancelOrderController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/order/cancelOrder")
    @ResponseBody
    public String cancelOrder(@RequestParam("OrderID") int orderID) {
        //查order表中的price和orderNum
        double totalPrice = 0;
        int orderNum = 0;
        String memberID = null;
        String bookID = null;
        String sql_queryOrder = "SELECT * FROM orders WHERE OrderID='" + orderID + "';";
        Map<String, Object> res_order = jdbcTemplate.queryForMap(sql_queryOrder);
        for (Map.Entry<String, Object> entry : res_order.entrySet()) {
            if (entry.getKey().equals("OrderNum")) orderNum = Integer.parseInt((String) entry.getValue().toString());
            if (entry.getKey().equals("TotalPrice")) totalPrice = Double.parseDouble(entry.getValue().toString());
            if (entry.getKey().equals("MemberID")) memberID = entry.getValue().toString();
            if (entry.getKey().equals("BookID")) bookID = entry.getValue().toString();
        }
        String sql_orders_update = "UPDATE orders SET OrderState=0 WHERE OrderID="+orderID+";";
        jdbcTemplate.execute(sql_orders_update);
        String sql_inventory_update = "BEGIN;\n" +
                "SELECT BookRemainNum, BookSoldNum From inventory WHERE BookID="+"\'"+bookID+"\'"+";\n" +
                "UPDATE Inventory SET BookRemainNum=BookRemainNum+" + orderNum + ", BookSoldNum=BookSoldNum-" + orderNum + " WHERE BookID="+"\'"+bookID+"\'"+";\n" +
                "COMMIT;";
        jdbcTemplate.execute(sql_inventory_update);
        String sql_users_update = "BEGIN;\n" +
                "SELECT Balance From users WHERE MemberID=\'" + memberID + "\';"+
                "UPDATE users SET Balance=Balance+" + totalPrice + " WHERE MemberID=\'" + memberID + "\';"+
                "COMMIT;";
        jdbcTemplate.execute(sql_users_update);
        return "1";     //成功
    }
}
