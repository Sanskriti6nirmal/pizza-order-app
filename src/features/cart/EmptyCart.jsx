import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to Menu</LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is empty. Order some delicious pizzas and enjoy! 🍕
      </p>
    </div>
  );
}

export default EmptyCart;
