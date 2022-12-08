package com.example.onlinebookstore.entity;

import lombok.Data;

@Data
public class User {
    String memberID;
    String password;
    String memberName;
    float balance;
    boolean isManager;

}
