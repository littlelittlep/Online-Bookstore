package com.example.onlinebookstore.entity;

import lombok.Data;

@Data
public class Order {
    int OrderID;
    String BookID;
    String MemberID;
    int OrderNum;
    String OrderTime;
    int OrderState;
    double TotalPrice;
    String OrderNote;
    String Address;
}
