import {Statement} from "./statement";
import {Try} from "./try";
import {str, seq, opt, IRunnable} from "../combi";
import * as Reuse from "./reuse";

export class Cleanup extends Statement {

  public static get_matcher(): IRunnable {
    let into = seq(str("INTO"), new Reuse.Target());

    return seq(str("CLEANUP"), opt(into));
  }

  public isStructure() {
    return true;
  }

  public isValidParent(s) {
    return s instanceof Try;
  }

  public indentationStart() {
    return -2;
  }

  public indentationEnd() {
    return 2;
  }

}