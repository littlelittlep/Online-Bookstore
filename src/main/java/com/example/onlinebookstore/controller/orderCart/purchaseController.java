package com.example.onlinebookstore.controller.orderCart;

import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@CrossOrigin
@Controller
public class purchaseController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/order/purchase")
    @ResponseBody
    public String purchase(@RequestParam("MemberID") String MemberID,
                           @RequestParam("OrderID") int OrderID,
                           @RequestParam("BookID") String BookID,
                           @RequestParam("OrderNote") String OrderNote,
                           @RequestParam("Address") String Address) {
        //查order表中的price和orderNum
        double totalPrice=0;
        int orderNum=0;
        String sql_queryOrder="SELECT * FROM orders WHERE OrderID='"+OrderID+"';";
        Map<String, Object> res_order = jdbcTemplate.queryForMap(sql_queryOrder);
        for (Map.Entry<String, Object> entry : res_order.entrySet()) {
            if(entry.getKey().equals("OrderNum")) orderNum = Integer.parseInt((String) entry.getValue().toString());
            if(entry.getKey().equals("TotalPrice")) totalPrice = Double.parseDouble(entry.getValue().toString());
        }
        //查inventory表中的remainNum和soldNum和price
        int remainNum=0;
        int soldNum=0;
        String sql_queryInv="SELECT * FROM inventory WHERE BookID='"+BookID+"';";
        Map<String, Object> res_inv = jdbcTemplate.queryForMap(sql_queryInv);
        for (Map.Entry<String, Object> entry : res_inv.entrySet()) {
            if(entry.getKey().equals("BookSoldNum"))remainNum=Integer.parseInt(entry.getValue().toString());
            if(entry.getKey().equals("BookRemainNum")) soldNum = Integer.parseInt((String) entry.getValue().toString());
        }
        //判断库存是否足够
        if(orderNum>remainNum)return "0";//库存不够，支付失败
        //库存够的话执行以下代码
        soldNum+=1;
        remainNum-=1;
        //更新inventory表中的remainNum和soldNum和其它
        String sql_inv="UPDATE inventory SET BookSoldNum='"
                +soldNum+"',BookRemainNum='" +remainNum+"' WHERE BookID='"+BookID+"';";
        jdbcTemplate.execute(sql_inv);
        //更新订单状态
        SimpleDateFormat sdf = new SimpleDateFormat();// 格式化时间
        sdf.applyPattern("yyyy-MM-dd-HH:mm:ss");
        Date date = new Date();// 获取当前时间
        String orderTime=sdf.format(date);
        String sql_order="UPDATE orders SET OrderTime='"+orderTime+"',OrderState=1,Address='"+Address
                +"',OrderNote='"+OrderNote+"' WHERE OrderID='"+OrderID+"';";
        jdbcTemplate.execute(sql_order);
        //查余额
        double balance=0;
        String sql_queryBalance="SELECT * FROM users WHERE MemberID='"+MemberID+"';";
        Map<String, Object> res_bal = jdbcTemplate.queryForMap(sql_queryBalance);
        for (Map.Entry<String, Object> entry : res_bal.entrySet()) {
            if(entry.getKey().equals("Balance"))balance=Double.parseDouble(entry.getValue().toString());
        }
        //判断余额是否足够支付
        if(balance<totalPrice)return "1";//余额不足，支付失败
        //够的话，更新余额
        balance-=totalPrice;
        String sql_updateBal="UPDATE users SET Balance='"+balance+"' WHERE MemberID='"+MemberID+"';";
        jdbcTemplate.execute(sql_updateBal);
        return "2";//支付成功
    }
}
