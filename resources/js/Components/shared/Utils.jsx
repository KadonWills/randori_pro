export const classNames = (...classes) =>  {
    return classes.filter(Boolean).join(" ");
}

export const moneyFormat = ( {value}) => {
    return new Intl.NumberFormat('fr-FR', {
        style: "currency",
        currency: "EUR",
        notation: "standard",
    }).format(value);
}
