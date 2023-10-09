import { convertPastTimestamp } from "../../src/utils/time";

describe("convertPastTimestamp", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-10-05 17:10:20"));
  });

  it("should convert to '방금 전'", () => {
    expect(convertPastTimestamp("2023-10-05 17:09:21")).toBe("방금 전");
  });

  it("should convert to '5분 전'", () => {
    expect(convertPastTimestamp("2023-10-05 17:05:20")).toBe("5분 전");
  });

  it("should convert to '5시간 전'", () => {
    expect(convertPastTimestamp("2023-10-05 11:30:40")).toBe("5시간 전");
  });

  it("should convert to '5일 전'", () => {
    expect(convertPastTimestamp("2023-09-30 11:30:40")).toBe("5일 전");
  });

  it("should convert to '3주 전'", () => {
    expect(convertPastTimestamp("2023-09-14 11:30:40")).toBe("3주 전");
  });

  it("should convert to '8/5'", () => {
    expect(convertPastTimestamp("2023-08-05 11:30:40")).toBe("8/5");
  });

  it("should convert to '2022/10/5'", () => {
    expect(convertPastTimestamp("2022-10-05 11:30:40")).toBe("2022/10/5");
  });

  it("should throw an error for an invalid timestamp", () => {
    expect(() => convertPastTimestamp("hi")).toThrowError();
  });

  it("should throw an error for a timestamp in the future", () => {
    expect(() => convertPastTimestamp("2023-10-05 17:10:21")).toThrowError();
  });

  it("should throw an error for an invalid timestamp", () => {
    expect(() => convertPastTimestamp("2023-10-10 17:10:20")).toThrowError();
  });
});
