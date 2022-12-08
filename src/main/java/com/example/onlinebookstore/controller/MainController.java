package com.example.onlinebookstore.controller;

import com.example.onlinebookstore.entity.Book;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Controller
public class MainController {
    @RequestMapping("/index")
    @ResponseBody
    public String index(){
        return "你好，欢迎访问主页！";
    }

    @RequestMapping("/book")
    @ResponseBody
    public Book displayBooks(){
        Book books = new Book();
        books.setISBN("This is ISBN");
        books.setName("This is book name");
        books.setNumber(1207);
        return books;
    }

}
