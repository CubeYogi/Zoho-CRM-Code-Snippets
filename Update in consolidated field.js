//getting Lead record using Lead Entry ID
lead_entry = zoho.crm.getRecordById("Leads", lead_id);
//validating Lead entry
if(!lead_entry.isempty())
{
//getting all required values from Lead entry
/****Replace your Field API name in the corresponding lines inside the .get("")*********/
name = ifnull(lead_entry.get("First_Name"), "");
age = ifnull(lead_entry.get("Age"), "");
place = ifnull(lead_entry.get("City"), "");
music_interest = ifnull(lead_entry.get("Music_Interest"), "");
//forming record summary
lead_summary = name + ", "+ age + ", from "+place + ", loves "+ music_interest;
//forming update map
lead_update_map = Map();
//Replace your multiline field API name with Lead_Summary
 lead_update_map.put("Lead Summary", lead_summary);
//updating Lead entry
update_lead = zoho.crm.updateRecord("Leads", lead_id, lead_update_map);
info update_lead;
if(!update_lead.isempty() && update_lead.containkey("status") && update_lead.get("status") == "error")
{

info "Error in updating Lead summary "+update_lead;
}
else
{
info "Lead summary updated";
}
}
else
{
info "Error in getting Lead entry "+lead_entry;
}
