import {ExpressionNode, StatementNode} from "../../nodes";
import {CurrentScope} from "../_current_scope";
import {TypedIdentifier} from "../../types/_typed_identifier";
import {BasicTypes} from "../basic_types";
import * as Expressions from "../../2_statements/expressions";
import {UnknownType} from "../../types/basic";
import {ScopeType} from "../_scope_type";

export class TypeTable {
  public runSyntax(node: ExpressionNode | StatementNode, scope: CurrentScope, filename: string): TypedIdentifier | undefined {
    // todo, input is currently the statement, but should be the expression?
    let nameExpr = node.findFirstExpression(Expressions.DefinitionName);
    if (nameExpr === undefined) {
      nameExpr = node.findFirstExpression(Expressions.NamespaceSimpleName);
    }
    if (nameExpr === undefined) {
      return undefined;
    }
    const name = nameExpr.getFirstToken();

    let qualifiedName = "";
    if (node.getFirstToken().getStr().toUpperCase() === "TYPES") {
      qualifiedName = name.getStr();
      if (scope.getType() === ScopeType.ClassDefinition
          || scope.getType() === ScopeType.Interface) {
        qualifiedName = scope.getName() + "=>" + qualifiedName;
      }
    }

    const type = new BasicTypes(filename, scope).parseType(node, qualifiedName);
    if (type === undefined) {
      return new TypedIdentifier(name, filename, new UnknownType("TableType, fallback"));
    }
    return new TypedIdentifier(name, filename, type);
  }
}