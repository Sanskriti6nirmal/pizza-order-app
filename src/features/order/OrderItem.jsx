function OrderItem({ item, isLoadingIngredients, ingredients }) {
  return (
    <li className="mb-3 rounded-md bg-stone-50 px-4 py-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-xs text-stone-500">Quantity: {item.quantity}</p>
          {!isLoadingIngredients && ingredients.length > 0 && (
            <p className="text-xs text-stone-500">
              Ingredients: {ingredients.join(', ')}
            </p>
          )}
        </div>
        <p className="font-bold">₹{item.totalPrice}</p>
      </div>
    </li>
  );
}

export default OrderItem;
