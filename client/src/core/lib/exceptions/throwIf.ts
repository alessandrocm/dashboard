
function isNull(arg: any, name: string) {
  if (arg === null) {
    throw new Error(`Argument ${name} is null.`);
  }
}

function isUndefined(arg: any, name: string) {
  if (arg === undefined) {
    throw new Error(`Argument ${name} is undefined.`);
  }
}

function isNullOrUndefined(arg: any, name: string) {
  isNull(arg, name);
  isUndefined(arg, name);
}

const Argument = {

  isNull,
  isUndefined,
  isNullOrUndefined,

}

export class ThrowIf {

  public static Argument = Argument;

}
