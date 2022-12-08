package com.example.onlinebookstore.controller;

import com.example.onlinebookstore.entity.Inventory;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/inventory")
public class InventoryController {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/addBook")
    @ResponseBody
    public String addBook(@RequestParam("BookID") String bookID,
                          @RequestParam("BookName") String bookName,
                          @RequestParam("BookAuthor") String bookAuthor,
                          @RequestParam("ClassID") int classID,
                          @RequestParam("BookPrice") float bookPrice,
                          @RequestParam("BookSoldNum") int bookSoldNum,
                          @RequestParam("BookRemainNum") int bookRemainNum,
                          @RequestParam("BookShelfTime") String bookShelfTime,
                          @RequestParam("BookReleaseTime") String bookReleaseTime,
                          @RequestParam("BookActive") boolean bookActive,
                          @RequestParam("BookPicture") String bookPicture,
                          @RequestParam("BookNote") String bookNote) {
        String sql = "SELECT * FROM inventory WHERE BookID="+"\'"+bookID+"\'";
        System.out.println(sql);
        List<Inventory> inventoryList = jdbcTemplate.query(sql, new RowMapper<Inventory>() {
            Inventory inventory = null;

            @Override
            public Inventory mapRow(ResultSet rs, int rowNum) throws SQLException {
                inventory = new Inventory();
                inventory.setBookID(rs.getString("BookID"));
                return inventory;
            }
        });
        if (inventoryList.isEmpty()){
            String insertSQL = "INSERT INTO inventory Values( "
                    +"\'"+ bookID + "\'" + ", " + "\'" +  bookName +"\'" + ", "
                    +"\'" +  bookAuthor +"\'" + ", " + classID + "," + bookPrice + ", " + bookSoldNum +"," +
                    bookRemainNum + ", " +"\'" + bookShelfTime +"\'" + ", " +"\'" + bookReleaseTime +"\'" + "," + bookActive +
                    ", " + "\'" +  bookPicture +"\'" + ", " + "\'" +  bookNote +"\'" + ")";

            System.out.println(insertSQL);
            jdbcTemplate.execute(insertSQL);
            return "1"; //添加成功
        }
        else
            return "0";  //书籍ID已经存在
    }

    @PostMapping("/updateRemain")
    @ResponseBody
    public String updateRemain(@RequestParam("BookID") String bookID,
                               @RequestParam("AddNumber") int addNumber){
        if (addNumber<=0){
            return "0";   //不能非负
        }
        String sql = "BEGIN;\n" +
                "SELECT BookRemainNum From inventory WHERE BookID="+"\'"+bookID+"\'"+";\n" +
                "UPDATE Inventory SET BookRemainNum=BookRemainNum+" + addNumber + " WHERE BookID="+"\'"+bookID+"\'"+";\n" +
                "COMMIT;";
        System.out.println(sql);
        jdbcTemplate.execute(sql);
        return "1";     //更新成功
    }
}
