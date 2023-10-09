import {
  formatAsPrice,
  parseNeighborhood,
} from "../../src/utils/stringFormatters";

describe("formatAsPrice", () => {
  it("should format a price with a comma every three digits", () => {
    expect(formatAsPrice("1000")).toBe("1,000");
  });
  it("should format a price with a comma every three digits", () => {
    expect(formatAsPrice("1000000")).toBe("1,000,000");
  });
  it("should format a price with a comma every three digits", () => {
    expect(formatAsPrice("1000000000")).toBe("1,000,000,000");
  });
});

describe("parseNeighborhood function", () => {
  it('should return "동" containing word from address string', () => {
    const address = "서울시 강남구 역삼동";
    const result = parseNeighborhood(address);
    expect(result).toBe("역삼동");
  });

  it('should return "면" containing word from address string', () => {
    const address = "강원도 정선군 여량면";
    const result = parseNeighborhood(address);
    expect(result).toBe("여량면");
  });

  it('should return "읍" containing word from address string', () => {
    const address = "충청남도 아산시 배방읍";
    const result = parseNeighborhood(address);
    expect(result).toBe("배방읍");
  });

  it("should return null if no matching region is found", () => {
    const address = "서울시 강남구";
    const result = parseNeighborhood(address);
    expect(result).toBeNull();
  });
});
