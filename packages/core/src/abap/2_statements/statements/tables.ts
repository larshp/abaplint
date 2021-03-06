import {IStatement} from "./_statement";
import {verNot, seq} from "../combi";
import {Field} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class Tables implements IStatement {

  public getMatcher(): IStatementRunnable {
    const ret = seq("TABLES", Field);

    return verNot(Version.Cloud, ret);
  }

}