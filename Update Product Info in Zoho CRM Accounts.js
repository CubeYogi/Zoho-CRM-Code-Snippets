/*STEP 1: Get the invoice id and organization id */
invoiceID = invoice.get("invoice_id");
organizationID = organization.get("organization_id");
if(invoiceID != null)
{
	/*STEP 2: Intergration function to fetch Account and Product details from Invoice */
	invoice_details = zoho.books.getRecordsByID("Invoices",organizationID,invoiceID);
	/*STEP 3: Parsing the Invoice response to get the Account and Product details from Invoice   */
	invoice_response = invoice_details.getJson("invoice");
	line_item_response = invoice_response.getJSON("line_items");
	book_account_detail = invoice_response.getJSON("customer_id");
	/**STEP 4: Integration fucntion to get the Zoho CRM Account ID based on the Zoho Books Contact ID*/
	accountdetails = zoho.books.getRecordsByID("contacts",organizationID,book_account_detail);
	contact_details = accountdetails.getJSON("contact");
	crm_account_id = contact_details.getJSON("zcrm_account_id");
	/*STEP 5: XML Formation to send the Product info to Zoho CRM */
	products_info = Map();
	xml_data = "<Products>";
	row_Val = 1;
	/*STEP 6: Loop to get all the Line Item Products */
	for each  item_id in line_item_response
	{
		item_response = item_id.getJSON("item_id");
		/**STEP 7.B: Integration fucntion to get get the Zoho CRM Product ID based on the Zoho Books Item ID*/
		product_details = zoho.books.getRecordsByID("Items",organizationID,item_response);
		item_res = product_details.getJson("item");
		product_ID = item_res.getJSON("zcrm_product_id");
		/*STEP 7.A: XML Formation to send the Product info to Zoho CRM */
		xml_data = xml_data + "<row no = \"" + row_Val + "\"><FL val =\"PRODUCTID\" >" + product_ID + "</FL></row>";
		row_Val = row_Val + 1;
	}
	xml_data = xml_data + "</Products>";
	/*STEP 9: Map formation to store the Zoho CRM authtoken and other info*/
	/**** NOTE: Please replace the 'Your ZOHO CRM AUHTOKEN' by the Zoho CRM Authtoken 
	Refer this Link: https://www.zoho.com/crm/help/api/using-authentication-token.html
	to get your CRM account Authoken ***/
	products_info.put("authtoken",YOUR ZOHO CRM AUTHTOKEN);
	products_info.put("scope","crmapi");
	products_info.put("relatedModule","Products");
	products_info.put("id",crm_account_id);
	products_info.put("xmlData",xml_data);
	/*STEP 10: API call to update the Product Info into the Zoho CRM Accounts*/
	update_accounts = postUrl("https://crm.zoho.com/crm/private/xml/Accounts/updateRelatedRecords",products_info);
}
