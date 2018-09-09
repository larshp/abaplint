import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, per, IRunnable} from "../combi";

export class GetCursor extends Statement {

  public static get_matcher(): IRunnable {
    let line = seq(str("LINE"), new Reuse.Target());
    let field = seq(str("FIELD"), new Reuse.Target());
    let offset = seq(str("OFFSET"), new Reuse.Target());
    let value = seq(str("VALUE"), new Reuse.Target());
    let length = seq(str("LENGTH"), new Reuse.Target());
    let area = seq(str("AREA"), new Reuse.Target());

    let ret = seq(str("GET CURSOR"),
                  per(line, field, offset, value, length, area));

    return ret;
  }

}