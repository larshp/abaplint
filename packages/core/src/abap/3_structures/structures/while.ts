import * as Statements from "../../2_statements/statements";
import {IStructure} from "./_structure";
import {star, sta, beginEnd, sub} from "./_combi";
import {Normal} from "./normal";
import {IStructureRunnable} from "./_structure_runnable";

export class While implements IStructure {

  public getMatcher(): IStructureRunnable {
    return beginEnd(sta(Statements.While),
                    star(sub(Normal)),
                    sta(Statements.EndWhile));
  }

}