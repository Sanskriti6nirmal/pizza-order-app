import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  // Destructure pizza details
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Replace Western names with Indian names (example logic)
  const indianNamesMap = {
    Margherita: 'Classic Margherita',
    Capricciosa: 'Tandoori Paneer',
    Romana: 'Cheese Corn',
    'Prosciutto e Rucola': 'Veggie Delight',
    Diavola: 'Spicy Chicken',
  };

  const displayName = indianNamesMap[name] || name;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: displayName, // use updated name!
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={displayName}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />

      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{displayName}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-orange-600">₹{unitPrice}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Out of Stock
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Order
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
