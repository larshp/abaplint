import {Statement} from "./statement";
import * as Reuse from "./reuse";
import {str, seq, IRunnable} from "../combi";

export class Fields extends Statement {

  public static get_matcher(): IRunnable {
    return seq(str("FIELDS"), new Reuse.FieldSub());
  }

}