import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useText from "../../src/hooks/useText";
import {
  validateEmail,
  validatePassword,
} from "../../src/utils/textValidators";

describe("useText hook", () => {
  it("should successfully change the value", () => {
    const { result } = renderHook(() => useText());
    const { onChange } = result.current;
    act(() => {
      onChange("hello");
    });
    expect(result.current.value).toBe("hello");
    expect(result.current.error).toBe("");
  });

  it("should throw an error for the first validator if multiple validators throw errors", () => {
    const { result } = renderHook(() =>
      useText({ validators: [validateEmail, validatePassword] })
    );
    const { onChange } = result.current;
    act(() => {
      onChange("hello");
    });
    expect(result.current.error).toBe("올바른 이메일을 입력해주세요");
  });
});
