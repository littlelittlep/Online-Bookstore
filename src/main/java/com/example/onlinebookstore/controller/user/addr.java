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
public class addr  {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/addAddr")
    @ResponseBody
//  @RequestMapping(value = "/check")
    public String addAddr(@RequestParam("MemberID") String memberID,
                          @RequestParam("Address") String address) {
        String sql1 = "SELECT * FROM address WHERE MemberID='"+memberID+"'AND Address ='"+address+"';";
//        final boolean[] isAdmin = {false};
        List<Address> addrList = jdbcTemplate.query(sql1, new RowMapper<Address>() {
            Address address = null;
            @Override
            public Address mapRow(ResultSet rs, int rowNum) throws SQLException {
                address = new Address();
                address.setMemberID(rs.getString("MemberID"));
                return address;
            }
        });
        if (addrList.isEmpty()){
            String insertSQL = "INSERT INTO address Values( "
                    +"\'"+ memberID + "\'" + ", " + "\'" +  address +"\'" + ",0)";

            System.out.println(insertSQL);
            jdbcTemplate.execute(insertSQL);
            return "1"; //添加地址成功
        }
        else
            return "0";  //地址已经存在
    }

    @PostMapping("/deleteAddr")
    @ResponseBody

    public void deleteAddr(@RequestParam("MemberID") String memberID,
                          @RequestParam("Address") String address) {

        String deleteSQL = "DELETE FROM address WHERE MemberID='"
                + memberID + "'AND Address ='"+address+"';";

        System.out.println(deleteSQL);
        jdbcTemplate.execute(deleteSQL);
    }
    @PostMapping("/myAddress")
    @ResponseBody


    public List<Map<String, Object>> getAddress(@RequestParam("MemberID") String MemberID) {
        String addressSQL = "SELECT * FROM address WHERE MemberID='" + MemberID + "';";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(addressSQL);
        return res;
    }
}

