package com.shilko.ru.faces.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("com.shilko.ru.faces.validator.RValidator")
public class RValidator implements Validator {
    private static final double minR = 1;
    private static final double maxR = 4;

    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        try {
            double r = Double.parseDouble(o.toString().replace(',', '.'));
            if (!(r >= minR && r <= maxR))
                throw new IllegalArgumentException();
        } catch (Exception e) {
            FacesMessage msg =
                    new FacesMessage("R validation failed.",
                            "Неверный параметр R, пожалуйста, повторите ввод.");
            msg.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(msg);
        }
    }
}