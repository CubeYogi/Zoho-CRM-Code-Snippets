/* 
* Zoho CRM Custom Function For Lead Phone Num Country Code Updation
* This Custom Function is for the Leads module in Zoho CRM.
* This code is in Deluge scripting language.
* This is used to check an incoming lead to see if their phone num has the country dialing code.
* If not, then this code would fetch the appropriate code based on the'Country' field value from the Lead.
* Then this would update the 'Phone' field in the CRM Lead to reflect the new number which has the country code prefixed.
*
* Note : We added a JS extension to this file so you could see some markup! :) But this is a Deluge file. Nothing Javascript about it! ;)
*
* Crafted with ♥ from India, iKosmik
* 
* Got something to say? write to us at guru@zoho.academy
*/

// initialize an empty map
update_phone_no_map=map();

// Map of countires along with their international dialing code
data_set_extension_code={ "Afghanistan" : "93", "Albania" : "355", "Algeria" : "213", "American Samoa" : "1-684", "Andorra" : "376", "Angola" : "244", "Anguilla" : "1-264", "Antarctica" : "672", "Antigua and Barbuda" : "1-268", "Argentina" : "54", "Armenia" : "374", "Aruba" : "297", "Australia" : "61", "Austria" : "43", "Azerbaijan" : "994", "Bahamas" : "1-242", "Bahrain" : "973", "Bangladesh" : "880", "Barbados" : "1-246", "Belarus" : "375", "Belgium" : "32", "Belize" : "501", "Benin" : "229", "Bermuda" : "1-441", "Bhutan" : "975", "Bolivia" : "591", "Bosnia and Herzegowina" : "387", "Botswana" : "267", "Bouvet Island" : "47", "Brazil" : "55", "British Indian Ocean Territory" : "246", "Brunei Darussalam" : "673", "Bulgaria" : "359", "Taiwan" : "886", "Tajikistan" : "992", "United Republic of" : "255", "Thailand" : "66", "Togo" : "228", "Tokelau" : "690", "Tonga" : "676", "Tuvalu" : "688", "Uganda" : "256", "Ukraine" : "380", "United Arab Emirates" : "971", "United Kingdom" : "44", "United States" : "1", "United States Minor Outlying Islands" : "246", "Uruguay" : "598", "Uzbekistan" : "998", "Vanuatu" : "678", "Vatican City State" : "379", "Venezuela" : "58", "Vietnam" : "84", "Virgin Islands" : "1-284", "Virgin Islands" : "1-340", "Wallis and Futuna Islands" : "681", "Western Sahara" : "212", "Yemen" : "967", "Serbia" : "381", "Zambia" : "260", "Zimbabwe" : "263", "Aaland Islands" : "358", "Palestine" : "970", "Montenegro" : "382", "Guernsey" : "44-1481", "Isle of Man" : "44-1624", "Jersey" : "44-1534", "Curaçao" : "599", "Ivory Coast" : "225", "Kosovo" : "383", "Canada" : "1", "Cape Verde" : "238", "Cayman Islands" : "1-345", "Central African Republic" : "236", "Chad" : "235", "Chile" : "56", "China" : "86", "Christmas Island" : "61", "Palestine" : "970", "Madagascar" : "261", "Malawi" : "265", "Malaysia" : "60", "Maldives" : "960", "Mali" : "223", "Malta" : "356", "Spain" : "34", "Sri Lanka" : "94" };
phone_number_sign=("+");

//Fetching Lead information based on input Lead ID
get_lead_data = zoho.crm.getRecordById("Leads",input.lead_id);
phone=ifnull((get_lead_data).get("Phone"),"");
country=ifnull((get_lead_data).get("Country"),"");

if((phone  !=  null)  &&  (country  !=  null))
{
	//comparison to find the Phone extension Code on based on Lead Country
	extension_code_to_add=data_set_extension_code.get(country);
	if(extension_code_to_add  !=  null)
	{
		// appending the Phone extension Code based on Lead Country
		input_phone_number=" " + phone;
		extension_to_assign=phone_number_sign + extension_code_to_add;
		phone_no_to_update=extension_to_assign + input_phone_number;
		//Comparision to check whether Extension Code is already Present in Phone Number
		
		if(!startsWith(phone,phone_no_to_update)  &&  !startsWith(phone,phone_number_sign))
		{
			update_phone_no_map.put("Phone",phone_no_to_update);
			
			// Integration task to update Phone Number with Extension Code
			update_data_in_crm = zoho.crm.updateRecord("Leads","" + input.lead_id,update_phone_no_map);
		}
	}
}
