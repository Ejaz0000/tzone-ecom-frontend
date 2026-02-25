'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { axiosInstance } from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

export default function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/orders/');
      
      if (response.data.status) {
        setOrders(response.data.data.items || []);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderNumber) => {
    try {
      setDetailsLoading(true);
      const response = await axiosInstance.get(`/orders/${orderNumber}/`);
      
      if (response.data.status) {
        setOrderDetails(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      toast.error('Failed to load order details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleOrderClick = (orderNumber) => {
    if (selectedOrderNumber === orderNumber) {
      setSelectedOrderNumber(null);
      setOrderDetails(null);
    } else {
      setSelectedOrderNumber(orderNumber);
      fetchOrderDetails(orderNumber);
    }
  };

  const closeModal = () => {
    setSelectedOrderNumber(null);
    setOrderDetails(null);
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return { bg: 'var(--accent-green)', text: 'white' };
      case 'processing':
        return { bg: 'var(--warning)', text: 'white' };
      case 'pending':
        return { bg: 'var(--warning)', text: 'white' };
      case 'cancelled':
        return { bg: 'var(--error)', text: 'white' };
      default:
        return { bg: 'var(--neutral-gray400)', text: 'white' };
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return { bg: 'var(--accent-green)', text: 'white' };
      case 'unpaid':
        return { bg: 'var(--error)', text: 'white' };
      default:
        return { bg: 'var(--neutral-gray400)', text: 'white' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-main)' }}>
          Orders
        </h1>
        <p style={{ color: 'var(--neutral-gray600)' }} className="mt-2">
          View and track your orders
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg border p-12 text-center" style={{ borderColor: 'var(--neutral-gray400)' }}>
          <p style={{ color: 'var(--neutral-gray600)' }}>Loading orders...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg border p-12 text-center" style={{ borderColor: 'var(--neutral-gray400)' }}>
          <p style={{ color: 'var(--error)' }}>{error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusColor = getStatusBadgeColor(order.status);
            
            return (
              <div
                key={order.id}
                className="bg-white rounded-lg border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--neutral-gray400)' }}
              >
                <button
                  onClick={() => handleOrderClick(order.order_number)}
                  className="w-full p-6 hover:bg-orange-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Order ID</p>
                        <p className="text-lg" style={{ color: 'var(--primary-main)' }}>{order.order_number}</p>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Date</p>
                        <p className="text-lg" style={{ color: 'var(--primary-main)' }}>
                          {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Total</p>
                        <p className="text-lg" style={{ color: 'var(--primary-main)' }}>Tk. {parseFloat(order.total_price).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Status</p>
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {selectedOrderNumber === order.order_number ? <ChevronUp className="w-5 h-5" style={{ color: 'var(--neutral-gray500)' }} /> : <ChevronDown className="w-5 h-5" style={{ color: 'var(--neutral-gray500)' }} />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm p-12 text-center" style={{ borderColor: 'var(--neutral-gray400)' }}>
          <p style={{ color: 'var(--neutral-gray600)' }} className="mb-4">No orders yet</p>
          <p style={{ color: 'var(--neutral-gray500)' }}>Start shopping to see your orders here</p>
        </div>
      )}

      {selectedOrderNumber && orderDetails && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.25)] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white" style={{ borderColor: 'var(--neutral-gray400)' }}>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--primary-main)' }}>Order {orderDetails.order_number}</h2>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition"><X className="w-6 h-6" /></button>
            </div>
            {detailsLoading ? (
              <div className="p-6 text-center"><p style={{ color: 'var(--neutral-gray600)' }}>Loading details...</p></div>
            ) : (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Order Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2" style={{ backgroundColor: getStatusBadgeColor(orderDetails.status).bg, color: getStatusBadgeColor(orderDetails.status).text }}>
                      {orderDetails.status?.charAt(0).toUpperCase() + orderDetails.status?.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Payment Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2" style={{ backgroundColor: getPaymentStatusBadgeColor(orderDetails.payment_status).bg, color: getPaymentStatusBadgeColor(orderDetails.payment_status).text }}>
                      {orderDetails.payment_status?.charAt(0).toUpperCase() + orderDetails.payment_status?.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>Order Date</p>
                    <p className="text-sm font-semibold mt-2" style={{ color: 'var(--primary-main)' }}>
                      {new Date(orderDetails.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--primary-main)' }}>Order Items ({orderDetails.total_items})</h3>
                  <div className="space-y-3">
                    {orderDetails.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                        {item.product?.primary_image && (
                          <img src={item.product.primary_image.startsWith('http') ? item.product.primary_image : `${process.env.NEXT_PUBLIC_BASE_URL}${item.product.primary_image}`} alt={item.product_title} className="w-16 h-16 rounded object-cover" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium" style={{ color: 'var(--primary-main)' }}>{item.product_title}</p>
                          {item.variant_attributes && <p className="text-xs" style={{ color: 'var(--neutral-gray600)' }}>{item.variant_attributes}</p>}
                          <p className="text-sm mt-1" style={{ color: 'var(--neutral-gray700)' }}>Qty: {item.quantity} � Tk. {parseFloat(item.unit_price).toFixed(2)}</p>
                        </div>
                        <div className="text-right font-semibold" style={{ color: 'var(--primary-main)' }}>Tk. {parseFloat(item.subtotal).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--primary-main)' }}>Shipping Address</h3>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <p style={{ color: 'var(--primary-main)' }}>{orderDetails.shipping_address?.label}</p>
                    <p style={{ color: 'var(--neutral-gray600)' }}>{orderDetails.shipping_address?.street}</p>
                    <p style={{ color: 'var(--neutral-gray600)' }}>{orderDetails.shipping_address?.city}, {orderDetails.shipping_address?.state} {orderDetails.shipping_address?.postal_code}</p>
                    <p style={{ color: 'var(--neutral-gray600)' }}>{orderDetails.shipping_address?.country}</p>
                    <p style={{ color: 'var(--neutral-gray600)' }}>Phone: {orderDetails.shipping_address?.phone}</p>
                  </div>
                </div>
                <div className="border-t pt-4" style={{ borderColor: 'var(--neutral-gray400)' }}>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--neutral-gray600)' }}>Subtotal</span>
                      <span style={{ color: 'var(--primary-main)' }}>Tk. {parseFloat(orderDetails.subtotal).toFixed(2)}</span>
                    </div>
                    {orderDetails.discount > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--accent-green)' }}>Discount</span>
                        <span style={{ color: 'var(--accent-green)' }}>-Tk. {parseFloat(orderDetails.discount).toFixed(2)}</span>
                      </div>
                    )}
                    {orderDetails.shipping_cost > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--neutral-gray600)' }}>Shipping</span>
                        <span style={{ color: 'var(--primary-main)' }}>+Tk. {parseFloat(orderDetails.shipping_cost).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t font-semibold" style={{ borderColor: 'var(--neutral-gray400)' }}>
                      <span style={{ color: 'var(--primary-main)' }}>Total</span>
                      <span style={{ color: 'var(--accent-brown)' }}>Tk. {parseFloat(orderDetails.total_price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--primary-main)' }}>Payment Method</h3>
                  <p style={{ color: 'var(--neutral-gray600)' }}>{orderDetails.payment_method}</p>
                </div>
                {orderDetails.notes && (
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--primary-main)' }}>Order Notes</h3>
                    <p style={{ color: 'var(--neutral-gray600)' }}>{orderDetails.notes}</p>
                  </div>
                )}
              </div>
            )}
            <div className="p-6 border-t flex gap-3 justify-end sticky bottom-0 bg-white" style={{ borderColor: 'var(--neutral-gray400)' }}>
              <button onClick={closeModal} className="px-6 py-2 rounded-lg font-semibold transition" style={{ backgroundColor: 'var(--neutral-gray300)', color: 'var(--primary-main)' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
