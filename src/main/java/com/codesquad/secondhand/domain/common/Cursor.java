package com.codesquad.secondhand.domain.common;

import com.codesquad.secondhand.exception.common.InvalidCursorException;

import lombok.Getter;

@Getter
public class Cursor {

	private final int cursor;

	public Cursor(String cursor) {
		this.cursor = validateCursorValue(cursor);
	}

	private int validateCursorValue(String cursor) {
		try {
			int value = Integer.parseInt(cursor);

			if (value < 0) {
				throw new InvalidCursorException();
			}

			return value;
		} catch (NumberFormatException e) {
			throw new InvalidCursorException();
		}
	}

}
