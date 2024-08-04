import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";
import { IOrderTableDetails } from "@/interfaces/order.interfaces";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OrdersTable = ({
  orderDetails,
}: {
  orderDetails: IOrderTableDetails[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderDetails.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell>
              <Link to={`/orders/${order.orderId}`} className="font-medium">
                #{order.orderId}
              </Link>
            </TableCell>
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <LazyLoadImage
                  className="h-14 w-14 rounded-md object-cover"
                  src={order.orderItems[0].variant.images[0].url}
                  alt={`Product image for ${order.orderItems[0].size.size}`}
                />
                <div className="ml-4">
                  <p className="font-medium">{order.orderItems[0].size.size}</p>
                  {order.orderItems.length > 1 && (
                    <p className="text-sm text-gray-500">
                      +{order.orderItems.length - 1} more item(s)
                    </p>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>NPR {order.totalPrice.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant="secondary">{order.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="icon">
                <ChevronRightIcon className="h-4 w-4" />
                <span className="sr-only">View Order</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
