import {Statement} from "./statement";
import {str, IRunnable} from "../combi";

export class EndTestInjection extends Statement {

  public static get_matcher(): IRunnable {
    return str("END-TEST-INJECTION");
  }

}