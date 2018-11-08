package com.shilko.ru.faces.beans;

import com.shilko.ru.faces.config.JDBCManager;

import javax.annotation.PreDestroy;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "results")
@SessionScoped
public class Results {
    private final Connection connection;
    private static final String DB_URL = "jdbc:postgresql://127.0.0.1:5432/postgres";
    private static final String USER = "postgres";
    private static final String PASS = "iaq150";
    private static final String TABLE_NAME = "results";
    private final String sessionID;

    {
        connection = new JDBCManager(DB_URL, USER, PASS, true).getConnection();
        FacesContext fCtx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) fCtx.getExternalContext().getSession(false);
        sessionID = session.getId();
    }

    public int addResult(double x, double y, double r, boolean check) {
        StringBuilder result = new StringBuilder();
        result.append("INSERT INTO ");
        result.append(TABLE_NAME);
        result.append(" (x,y,r,checking,sessionID) VALUES (");
        result.append(x);
        result.append(",");
        result.append(y);
        result.append(",");
        result.append(r);
        result.append(",");
        result.append(check);
        result.append(",");
        result.append(sessionID);
        result.append(");");
        try {
            return connection.createStatement().executeUpdate(result.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public List<ResultRow> getAllResults() {
        List<ResultRow> resultRows = new ArrayList<ResultRow>();
        try {
            ResultSet resultSet = connection.createStatement().executeQuery("SELECT * FROM " + TABLE_NAME +
                    " WHERE sessionID = " + sessionID + ";");
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

    @PreDestroy
    private void clearResults() {
        try {
            connection.createStatement().executeUpdate("DELETE FROM " + TABLE_NAME +
                    " WHERE sessionID = " + sessionID + ";");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
