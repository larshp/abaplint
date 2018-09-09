import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, opt, alt, IRunnable} from "../combi";

export class CallDatabase extends Statement {

  public static get_matcher(): IRunnable {
    let exporting = seq(str("EXPORTING"), new Reuse.ParameterListS());
    let importing = seq(str("IMPORTING"), new Reuse.ParameterListT());
    let expl = seq(opt(exporting), opt(importing));

    let tab = seq(str("PARAMETER-TABLE"), new Reuse.Source());

    let connection = seq(str("CONNECTION"), new Reuse.Dynamic());

    let ret = seq(str("CALL DATABASE PROCEDURE"),
                  new Reuse.Dynamic(),
                  opt(connection),
                  alt(expl, tab));

    return ret;
  }

}