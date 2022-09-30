export function formatPrice(price){
    return (price/100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
}