/** Function to find total number of activities took place in a Lead so far**/

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* STEP 1 : the current Lead's ID is converted as string and assigned here*/
lead_identifier = input.lead_id.toString();

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* STEP 2 : Call the Integration function to get the activties (Tasks, Events, Notes, Calls) related to Leads */
related_tasks = zoho.crm.getRelatedRecords("Tasks","Leads",lead_identifier);
related_events = zoho.crm.getRelatedRecords("Events","Leads",lead_identifier);
related_calls = zoho.crm.getRelatedRecords("Calls","Leads",lead_identifier);
related_notes = zoho.crm.getRelatedRecords("Notes","Leads",lead_identifier);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* STEP 3 : find the total number of activities took place for the Lead */
total_no_of_activities =
  (  related_tasks.size() 
   + related_calls.size() 
   + related_events.size()  
   + related_notes.size() );

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* STEP 4 : Assign a Map data structure to store the count of activities*/
activity_info_map = map();
activity_info_map.put("Number of Tasks",related_tasks.size());
activity_info_map.put("Number of Events",related_events.size());
activity_info_map.put("Number of Calls",related_calls.size());
activity_info_map.put("Number of Activities",total_no_of_activities);
activity_info_map.put("Number of Notes",related_notes.size());

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* STEP 5 : Call the Integration function to update the activity count into the Lead */
lead_update_response = zoho.crm.updateRecord("Leads",lead_identifier,activity_info_map);
info lead_update_response;
