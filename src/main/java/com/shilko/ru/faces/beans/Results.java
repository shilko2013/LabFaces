package com.shilko.ru.faces.beans;

import com.shilko.ru.faces.config.JDBCManager;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "results")
@ApplicationScoped
public class Results {
    private final Connection connection;
    private static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/postgres";
    private static final String USER = "shilko2013";
    private static final String PASS = "iaq150";
    private static final String TABLE_NAME = "results";

    {
        connection = new JDBCManager(DB_URL, USER, PASS, true).getConnection();
    }

    public int addResult(double x, double y, double r, boolean check) {
        StringBuilder result = new StringBuilder();
        result.append("INSERT INTO ");
        result.append(TABLE_NAME);
        result.append(" (x,y,r,checking) VALUES (");
        result.append(x);
        result.append(",");
        result.append(y);
        result.append(",");
        result.append(r);
        result.append(",");
        result.append(check);
        result.append(");");
        try {
            return connection.createStatement().executeUpdate(result.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public List<ResultRow> getAllResults() {
        List<ResultRow> resultRows = new ArrayList<>();
        try {
            ResultSet resultSet = connection.createStatement().executeQuery("SELECT * FROM " + TABLE_NAME + ";");
            while (resultSet.next()) {
                ResultRow resultRow = new ResultRow();
                resultRow.setX(resultSet.getString("x"));
                resultRow.setY(resultSet.getString("y"));
                resultRow.setR(resultSet.getString("r"));
                resultRow.setMatch(resultSet.getString("checking").contains("t"));
                resultRows.add(resultRow);
            }
            resultSet.close();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
        return resultRows;
    }
}
