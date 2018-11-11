package com.shilko.ru.faces.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("XValidator")
public class XValidator implements Validator {
    private static final double[] possibleX = {-4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4};

    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        try {
            double x = Double.parseDouble(o.toString().replace(',', '.'));
            if (!matchX(x))
                throw new IllegalArgumentException();
        } catch (Exception e) {
            FacesMessage msg =
                    new FacesMessage("X validation failed.",
                            "Неверная координата Х, пожалуйста, повторите ввод.");
            msg.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(msg);
        }
    }

    private static boolean matchX(double x) {
        for (double aPossibleX : possibleX)
            if (x == aPossibleX)
                return true;
        return false;
    }
}
