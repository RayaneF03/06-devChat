/** formatar um valor numerico para moeda brasileira, se for dolar canadense por exemplo. */
/*@param {number} valor - 0 a ser formatado
@return {string} - 0 valor formatado no padrao real*/

export const formatar = (valor) => {
  return valor.toLocalString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};