package com.example.onlinebookstore.entity;

import lombok.Data;

@Data
public class Inventory {
    String bookID;
    String bookName;
    String bookAuthor;
    int classID;
    float bookPrice;
    int bookSoldNum;
    int bookRemainNum;
    String bookShelfTime;
    String bookReleaseTime;
    boolean bookActive;
    String bookPicture;
    String bookNote;
}
