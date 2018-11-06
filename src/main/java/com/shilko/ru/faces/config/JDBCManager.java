package com.shilko.ru.faces.config;

import java.sql.Connection;
import java.sql.*;

public class JDBCManager {
    static {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

    }

    private Connection connection = null;

    public JDBCManager(String dataBaseURL, String user, String password, boolean autoCommit) {
        try {
            setConnection(DriverManager.getConnection(dataBaseURL, user, password));
            getConnection().setAutoCommit(autoCommit);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        return connection;
    }

    private void setConnection(Connection connection) {
        this.connection = connection;
    }
}
