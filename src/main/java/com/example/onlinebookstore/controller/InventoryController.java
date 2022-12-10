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
import java.util.Map;

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
//        System.out.println(sql);
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
    @PostMapping("/deleteBook")
    @ResponseBody
    public void deleteBook(@RequestParam("BookID") String bookID){


        String deleteSQL = "DELETE FROM inventory WHERE BookID='"
                + bookID + "';";
        System.out.println(deleteSQL);
        jdbcTemplate.execute(deleteSQL);
    }
    @PostMapping("/allBooks")
    @ResponseBody

    public List<Map<String, Object>> getAllBooks() {
        String userSQL = "SELECT * FROM inventory" + ";";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(userSQL);
        return res;
    }

    @PostMapping("/certainClassBooks")
    @ResponseBody
    //查询特定种类的书籍
    public List<Map<String, Object>> classBooks(@RequestParam("ClassID") String classID) {
        String userSQL = "SELECT * FROM inventory WHERE ClassID='" + classID+"';";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(userSQL);
        return res;
    }

    @PostMapping("/oneBook")
    @ResponseBody
    //查询某本书的信息
    public List<Map<String, Object>> oneBook(@RequestParam("BookID") String bookID) {
        String userSQL = "SELECT * FROM inventory WHERE BookID='" + bookID+"';";
        List<Map<String, Object>> res = jdbcTemplate.queryForList(userSQL);
        return res;
    }

}
