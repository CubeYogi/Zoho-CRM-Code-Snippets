/* 
@summary : Search / Filter the Zoho CRM records with the date filter, which is get the today modified records for a module
@author : CubeYogi, 2018
@created : 25th Aug 2018, CubeYogi
@copyright: CubeYogi, 2018. 
*/

/* ~~~~~~~~~~~~~~~~~Step 1 : Convert the date as API formatted ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
current_time = zoho.currenttime.toString("YYYY-MM-dd"); 

/* ~~~~~~~~~~~~~~~~ Step 2 : Validate the convertted date format ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
if(current_time != null)
{
	/* ~~~~~~~~~~~~~~~~~~ Step 3 : Using the _serachRecords API get the leads module record which the records today modifications ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
      get_record_from_contacts = zoho.crm._searchRecords("Leads","(Modified Time|contains|" + current_time + ")");
}