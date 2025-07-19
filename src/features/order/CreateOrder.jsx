import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Ready to order your delicious pizza?
      </h2>

      <Form method="POST" className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Your Name</label>
          <input
            className="input w-full max-w-md"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Mobile Number
          </label>
          <input
            className="input w-full max-w-md"
            type="tel"
            name="phone"
            required
          />
          {formErrors?.phone && (
            <p className="mt-1 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="mb-1 block text-sm font-medium">
            Delivery Address
          </label>
          <input
            className="input w-full max-w-md"
            type="text"
            name="address"
            disabled={isLoadingAddress}
            defaultValue={address}
            required
          />
          {addressStatus === 'error' && (
            <p className="mt-1 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {errorAddress}
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span className="absolute right-2 top-8">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get My Location
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            className="h-5 w-5 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-sm">
            Need priority delivery for your order?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude},${position.longitude}`
              : ''
          }
        />

        <Button
          disabled={isSubmitting || isLoadingAddress}
          type="primary"
          className="w-full"
        >
          {isSubmitting
            ? 'Placing your order...'
            : `Pay ₹${totalPrice.toFixed(2)} & Place Order`}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please enter a valid mobile number so we can reach you if needed.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
