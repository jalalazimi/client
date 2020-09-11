import numeral from "numeral";

// This converts a number such as 4200 to 4k
const format = "0a";

export default function humanizedNumber (value) { return numeral(value).format(format) }
