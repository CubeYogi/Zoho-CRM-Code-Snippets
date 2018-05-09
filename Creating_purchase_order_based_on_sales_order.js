sales_info = zoho.crm.getRecordById("Sales_Orders",salesid);  //Get the Sales Order Information based on the Sales order record ID
purchasemap = Map();
purchasemap.put("Subject",sales_info.get("Subject"));    
purchasemap.put("Product_Details",sales_info.get("Product_Details"));   //Get the relevant Product Details of the Sales Order
product_line_items = sales_info.get("Product_Details");
if(product_line_items != "")
{
 for each  item in product_line_items
 {
  Product_details = item.get("product");
  if(Product_details != null)
  {
   product_id = Product_details.get("id");
   if(product_id != null)
   {
    available_quantity = item.get("quantity");      //Get the ordered quantity of the product
    product_info = zoho.crm.getRecordById("Products",product_id);
    if(product_info.get("Vendor_Name") != null)
    {
     vendor_name = product_info.get("Vendor_Name");   //Associate the "Vendor" with the "Products" to get the vendor Detai
     vendor_id = vendor_name.get("id");
     }
     stock = product_info.get("Qty_in_Stock");      //Get the "Stock in Hand" values for that item in "Products" Module
     
     if(stock <= available_quantity)               //Calculate whether the Stock Availabilty is lesser than the ordered quantity, 
                                                   //if so then create a Purchase order 
     {
      order_quantity = available_quantity - stock;
      product_list = list();
      purchase_order_subject = sales_info.get("Subject").toString();
      Vendor_Name_map = Map();
      Vendor_Name_map.put("id",vendor_id);       //Vendor Info
      
      product_map = Map();
      product_map.put("id",product_id);         //Product Info
      
      product_details_map = Map();
      product_details_map.put("product",product_map);
      product_details_map.put("quantity",order_quantity);  
      product_list.add(product_details_map);
      
      purchase_order_map = Map();                  //Creating Purchase Order
      purchase_order_map.put("Vendor_Name",Vendor_Name_map);
      purchase_order_map.put("Subject",purchase_order_subject);
      purchase_order_map.put("Product_Details",product_list);
      purchase_order_creation =  zoho.crm.create("Purchase_Orders",purchase_order_map);
      
     }
    }
   }
  }
 }
