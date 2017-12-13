/** Custom function to copy the conatct info of Parent Account to is associated Member Accounts (Child Accounts) **/

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
/** IMPORTANT NOTE!!!  "input." are the fields that are mapped from Edit_Arguments.
  Please click on edit argumnets in the ustom function and do the mapping as below:
 1. "input.parent_account_id" is mapped to "Account ID" of Accounts
 2. "input.parent_phone" is mapped to "Phone" of Accounts
 3. "input.parent_fax" is mapped to "Fax" of Accounts
 4. "input.parent_website" is mapped to "Webiste" of Accounts **/

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
/** Parent Account identifier **/
parent_account_identifer = (input.parent_account_id).toString();

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
/** STEP 1: Function Call to get the associated Member Account of a Parent Account **/
related_member_accounts = zoho.crm.getRelatedRecords(("Accounts"),("Accounts"),parent_account_identifer);
info related_member_accounts;

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
/** STEP 2: loop for updating all the Member Account under a Parent Account **/
for each member_account_info in related_member_accounts
{
	member_account_id = (member_account_info).get("ACCOUNTID");
	
	/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
	/** STEP 2.1: map creation to update the details in memeber account**/
	changes_to_update = map();
	changes_to_update.put("Phone",input.parent_phone);
	changes_to_update.put("Fax",input.parent_fax);
	changes_to_update.put("Website",input.parent_website);
	
	/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
	/** STEP 2.2: Function Call to update the associated Member Account of a Parent Account **/
	update_member_account_response = zoho.crm.updateRecord(("Accounts"),member_account_id,changes_to_update);
	info update_member_account_response;
}

