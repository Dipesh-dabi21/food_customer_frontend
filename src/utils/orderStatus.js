export const ORDER_STAGES = [
    "Order Received",
    "Preparing",
    "Out for Delivery",
    "Delivered",
];

export function getOrderStageIndex(status) {
    return ORDER_STAGES.indexOf(status);
}
