ReorderRule for SKU 67890
When StockLevel < (MinStockLevel + 1 month restocking velocity)
OrderQuantity: 1 month restocking velocity + 20%

Description: For an item with a longer restocking lead time (SKU 67890), this rule takes into account not just the current stock level but also the velocity at which the item is restocked. The order quantity is based on one month's restocking velocity, with an additional 20% to cover unexpected delays or demand increases.