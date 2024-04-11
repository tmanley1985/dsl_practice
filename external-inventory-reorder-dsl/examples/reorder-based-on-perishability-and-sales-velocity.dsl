ReorderRule for: SKU 31415
When: StockLevel < MinStockLevel AND ItemCategory = 'Perishable'
OrderQuantity: 2 weeks sales velocity

Description: Specifically for perishable items (like SKU 31415), this rule reorders based on two weeks' sales velocity without an additional buffer. The condition also checks that the item category is 'Perishable', ensuring that stock levels are carefully managed to minimize waste.