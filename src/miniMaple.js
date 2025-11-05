class MiniMaple {
  static symbolicDiff(expr, variable) {
    if (/[^0-9a-zA-Z+\-*^()\s]/.test(expr)) {
      throw new Error("Недопустимые символы или операции");
    }

    let normalized = expr.replace(/\s+/g, '');
    if (!normalized.startsWith('+') && !normalized.startsWith('-')) {
      normalized = '+' + normalized;
    }

    const termRegex = /([+-])(\d*\*?)?([a-zA-Z])(?:\^(\d+))?/g;
    const terms = [];
    let match;

    while ((match = termRegex.exec(normalized)) !== null) {
      const [_, sign, coefPart, varName, powerStr] = match;
      terms.push({ sign, coefPart, varName, powerStr });
    }

    if (terms.length === 0) {
      if (/^[+-]?\d+$/.test(normalized)) return "0";
      throw new Error("Формат неверен");
    }

    const diffParts = [];

    for (const { sign, coefPart, varName, powerStr } of terms) {
      if (varName !== variable) continue;

      let coef = 1;
      if (coefPart) {
        const numPart = coefPart.replace('*', '');
        coef = numPart === '' ? 1 : parseFloat(numPart);
      }
      if (sign === '-') coef = -coef;

      const power = powerStr ? parseInt(powerStr) : 1;
      const newCoef = coef * power;
      const newPower = power - 1;

      if (newPower === 0) diffParts.push(`${newCoef}`);
      else if (newPower === 1) diffParts.push(`${newCoef}*${variable}`);
      else diffParts.push(`${newCoef}*${variable}^${newPower}`);
    }

    if (diffParts.length === 0) return "0";

    let result = diffParts.join(" + ");
    result = result.replace(/\+\s*-/g, " - ");
    if (result.startsWith("+ ")) result = result.slice(2);
    return result;
  }
}

export { MiniMaple };
