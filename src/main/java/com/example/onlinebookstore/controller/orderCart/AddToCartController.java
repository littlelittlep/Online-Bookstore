package com.example.onlinebookstore.controller.orderCart;

import com.example.onlinebookstore.entity.Inventory;
import com.example.onlinebookstore.entity.Order;
import com.example.onlinebookstore.entity.User;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
public class AddToCartController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/order/addToCart")
    @ResponseBody
    public String addToCart(@RequestParam("BookID") String BookID,
                            @RequestParam("MemberID") String MemberID,
                            @RequestParam("OrderNum") int OrderNum) {
        SimpleDateFormat sdf = new SimpleDateFormat();// 格式化时间
        sdf.applyPattern("yyyy-MM-dd-HH:mm:ss");
        Date date = new Date();// 获取当前时间
        String orderTime=sdf.format(date);
        double price=0;//调用inventory和class表做一下计算
        double bookPrice=0;
        int classID=0;
        //查inventory中书籍price
        String sql_queryPrice="SELECT * FROM inventory WHERE BookID='"+BookID+"';";
        Map<String, Object> res = jdbcTemplate.queryForMap(sql_queryPrice);
        for (Map.Entry<String, Object> entry : res.entrySet()) {
            if(entry.getKey().equals("BookPrice"))bookPrice=Double.parseDouble(entry.getValue().toString());
            if(entry.getKey().equals("ClassID")) classID = Integer.parseInt((String) entry.getValue().toString());
        }
        //拿classID去class表里查折扣
        int discountNum=0;
        double discountRate=0;
        String sql_queryDiscount="SELECT * FROM class WHERE ClassID='"+classID+"';";
        Map<String, Object> resClass = jdbcTemplate.queryForMap(sql_queryDiscount);
        for (Map.Entry<String, Object> entry : resClass.entrySet()) {
            if(entry.getKey().equals("DiscountRate"))discountRate=Double.parseDouble(entry.getValue().toString());
            if(entry.getKey().equals("DiscountNum")) discountNum = Integer.parseInt((String) entry.getValue().toString());
        }
        //计算订单的总额
        if(OrderNum>=discountNum)price=OrderNum*bookPrice*discountRate;
        else price=OrderNum*bookPrice;
        String sql = "INSERT INTO orders (BookID,MemberID,OrderNum,OrderTime,OrderState," +
                "TotalPrice,OrderNote,Address)" +
                " Values( " +"\'"+ BookID + "\'" + ", " + "\'" + MemberID +"\'" + ", " +"\'" +
                OrderNum +"\'" + ", " +"\'" + orderTime +"\'"+ "," + 0 + "," +"\'" + price +"\'"
                + ", "+ "\'" + "订单备注" +"\'"+ ", "+ "\'" + "待选择地址" +"\'" +");";
        jdbcTemplate.execute(sql);
        return ""+price;//返回此次交易的总额
    }
}

