/**
Fucntion to create a Scheduled Call for a Lead
**/
//Zoho Integration Fucntion to get the lead Details based on the Lead ID
lead_details = zoho.crm.getRecordById("Leads",input.leadid.toLong());
//Get the Lead Name based on the Lead ID 
customer_name=(((ifnull(lead_details.get("First Name"),"")) + " ") + ifnull(lead_details.get("Last Name"),"")) + " - Follow Up Call ";
//schedlues call after 3 days from current date time
schedule_call_time=(zoho.currenttime.addDay(3)).toString("yyyy-MM-dd 10:00:00");
// map formation to Store the Call Detaisl
schedule_call_mapp=map();
schedule_call_mapp.put("Subject",customer_name);
schedule_call_mapp.put("Call Type","Outbound");
schedule_call_mapp.put("SEMODULE","Leads");
schedule_call_mapp.put("SMOWNERID",ifnull(lead_details.get("SMOWNERID"),""));
schedule_call_mapp.put("SEID",input.leadid);
schedule_call_mapp.put("Call Start Time",schedule_call_time);
schedule_call_mapp.put("whichCall","ScheduleCall");
create = zoho.crm.create("Calls",schedule_call_mapp);
info create;
return "";
