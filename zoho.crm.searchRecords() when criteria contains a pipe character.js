/*** removes pipe character from criteria during zoho.crm.searchRecords()  ***/
lead_name = "|Cube | Yogi";
/** removes Pipeline character from criteria **/
/** Case 1 for | Yogi**/
lead_name = lead_name.replaceAll("\| ", "");
/** Case 2 for |Cube **/
lead_name = lead_name.replaceAll("\|", "");
if(lead_name != null && lead_name != "null" && lead_name.length() > 0)
{
/** Search Record Function **/
lead_search_response = zoho.crm._searchRecords("Leads", "(Last Name|=|" + lead_name + ")");
info lead_search_response;
}
