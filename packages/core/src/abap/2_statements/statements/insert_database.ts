import {IStatement} from "./_statement";
import {str, seq, alt, opt, tok} from "../combi";
import {DatabaseTable, Dynamic, SQLSource, Select, DatabaseConnection} from "../expressions";
import {WParenLeftW, WParenRightW} from "../../1_lexer/tokens";
import {IStatementRunnable} from "../statement_runnable";

export class InsertDatabase implements IStatement {

  public getMatcher(): IStatementRunnable {
    const target = alt(DatabaseTable, Dynamic);

    const client = str("CLIENT SPECIFIED");

    const sub = seq(tok(WParenLeftW), Select, tok(WParenRightW));

    const f = seq(opt(client),
                  opt(DatabaseConnection),
                  "FROM",
                  opt("TABLE"),
                  alt(SQLSource, sub),
                  opt("ACCEPTING DUPLICATE KEYS"));

    const from = seq(target,
                     opt(alt(f, client, DatabaseConnection)));

    const into = seq("INTO",
                     target,
                     opt("CLIENT SPECIFIED"),
                     opt(DatabaseConnection),
                     "VALUES",
                     SQLSource);

    return seq("INSERT", alt(from, into));
  }

}