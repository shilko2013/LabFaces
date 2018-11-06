package com.shilko.ru.faces.beans;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name = "match")
@ApplicationScoped
public final class MatchingManager {
    private static final double[] possibleX = {-4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4};
    private static final double minY = -3;
    private static final double maxY = 3;
    private static final double minR = 1;
    private static final double maxR = 4;

    public static boolean valid(String xstr, String ystr, String rstr) {
        double x, y, r;
        try {
            x = Double.parseDouble(xstr.replace(',', '.'));
            y = Double.parseDouble(ystr.replace(',', '.'));
            r = Double.parseDouble(rstr.replace(',', '.'));
        } catch (Exception e) {
            return false;
        }
        return matchX(x) &&
                y >= minY && y <= maxY &&
                r >= minR && r <= maxR;
    }

    public static boolean match(String xstr, String ystr, String rstr) {
        if (!valid(xstr, ystr, rstr))
            return false;
        double x, y, r;
        x = Double.parseDouble(xstr.replace(',', '.'));
        y = Double.parseDouble(ystr.replace(',', '.'));
        r = Double.parseDouble(rstr.replace(',', '.'));
        return (y > 0 && x < 0 && x > -r / 2 && y < r) ||
                (x >= 0 && y > 0 && y < -x / 2 + r / 2) ||
                (y <= 0 && x > 0 && x * x + y * y < r * r / 4);
    }

    private static boolean matchX(double x) {
        for (double aPossibleX : possibleX)
            if (x == aPossibleX)
                return true;
        return false;
    }
}
