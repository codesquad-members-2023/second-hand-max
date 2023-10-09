import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../src/utils/textValidators";

describe("validates nickname", () => {
  it("should not throw an error for a valid nickname", () => {
    expect(validateNickname("kakamotobi")).toBe(undefined);
  });
  it("should not throw an error for a valid nickname", () => {
    expect(validateNickname("카카모토비")).toBe(undefined);
  });
  it("should throw an error for an invalid nickname (too short)", () => {
    expect(() => validateNickname("k")).toThrowError();
  });
});

describe("validates email", () => {
  it("should not throw an error for a valid email", () => {
    expect(validateEmail("test@test.com")).toBe(undefined);
  });
  it("should throw an error for an invalid email", () => {
    expect(() => validateEmail("test@test")).toThrowError();
  });
});

describe("validates password", () => {
  it("should not throw an error for a valid email", () => {
    expect(validatePassword("iampassword7$")).toBe(undefined);
  });
  it("should throw an error for an invalid email (too short)", () => {
    expect(() => validatePassword("pass$")).toThrowError();
  });
  it("should throw an error for an invalid email (no special character)", () => {
    expect(() => validatePassword("iampassword")).toThrowError();
  });
});
