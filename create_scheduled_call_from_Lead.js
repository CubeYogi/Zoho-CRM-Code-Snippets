/**
Fucntion to create a Scheduled Call for a Lead
**/
//Zoho Integration Fucntion to get the lead Details based on the Lead ID
lead_details = zoho.crm.getRecordById("Leads",input.leadid.toLong());
//Get the Lead Name based on the Lead ID
lead_name =(((ifnull(lead_details.get("First Name"),"")) + " ") + ifnull(lead_details.get("Last Name"),"")) + " - Follow Up Call ";
//schedlues call after 3 days from current date time
schedule_call_time = (zoho.currenttime.addDay(3)).toString("yyyy-MM-dd 10:00:00");
// map formation to Store the Call Details
  schedule_call_mapp = map();
    // Sets Call Subject as Lead Name
    schedule_call_mapp.put("Subject",lead_name);
    // Sets Call Type as Outbound
    schedule_call_mapp.put("Call Type","Outbound");
    // Sets as Call created for a Lead
    schedule_call_mapp.put("SEMODULE","Leads");
    schedule_call_mapp.put("SEID",input.leadid);
    // Sets as Call Owner as the Lead Owner itself
    schedule_call_mapp.put("SMOWNERID",ifnull(lead_details.get("SMOWNERID"),""));
    // Sets as Call Time
    schedule_call_mapp.put("Call Start Time",schedule_call_time);
    // Sets as the Type of Call (ScheduleCall/CompletedCall)
    schedule_call_mapp.put("whichCall","ScheduleCall");
//Zoho Integration Fucntion to create schedule call in Calls
create_schedule_call_response = zoho.crm.create("Calls",schedule_call_mapp);
return "";
