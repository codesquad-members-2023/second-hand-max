package com.codesquad.secondhand.adapter.in.web.request.annotation;

import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ImagesIdValidator implements ConstraintValidator<ImagesId, List<Long>> {

    @Override
    public boolean isValid(List<Long> values, ConstraintValidatorContext context) {
        if (values == null) {
            return true;
        }
        return values.stream().allMatch(id -> id > 0);
    }
}

