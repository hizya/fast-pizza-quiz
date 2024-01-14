import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button"
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form className="text-right" method="PATCH">
      <Button type='primary'>mark priority</Button>
    </fetcher.Form>
  )
}

export async function action({ request, params }) {
  const data = { priority: true };
  console.log(params)
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder
