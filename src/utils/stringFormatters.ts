export function formatAsPrice(input: string) {
  const extractedDigits = input.replace(/[^0-9]/g, "");

  const formattedPrice = extractedDigits
    ? parseInt(extractedDigits).toLocaleString("en-US")
    : "";

  return formattedPrice;
}

export function parseNeighborhood(address: string): string | null {
  const regex = /(\S*동|\S*읍|\S*면)/;
  const match = address.match(regex);

  return match ? match[1] : null;
}

export function formatAsNumber(input: string) {
  return input.replace(/,/g, "");
}
