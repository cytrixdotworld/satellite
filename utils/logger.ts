import colors from "ansi-colors";

const dateTimeFormat = new Intl.DateTimeFormat("en", {
  timeStyle: "medium",
  dateStyle: "short",
  hour12: false,
});

const logger = (name: string) => ({
  info: (msg: string) =>
    console.log(
      `${colors.gray(dateTimeFormat.format(Date.now()))} ${name} [ ${
        colors.green("OK")
      } ]    ${msg}`,
    ),
  warn: (msg: string) =>
    console.warn(
      `${colors.gray(dateTimeFormat.format(Date.now()))} ${name} [ ${
        colors.yellow("WARN")
      } ]  ${msg}`,
    ),
  error: (msg: string) =>
    console.error(
      `${colors.gray(dateTimeFormat.format(Date.now()))} ${name} [ ${
        colors.red("FAIL")
      } ]  ${msg}`,
    ),
});

export default {
  main: logger("main "),
  routes: logger("routes"),
  serve: logger("serve "),
};
