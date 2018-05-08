song_info = zoho.crm.getRecordById("Songs",songid);       //Custom Module Name "Songs"
if(song_info != null)
{
 song_writer_details = song_info.get("Songs_Writer_Details");   //Subform Name "Songs_Writer_Details"
 if(song_info.get(song_writer_details) != "")
 {
  writer_count = song_writer_details.size();
  if(song_info.get("Total_Amount") != null)            
  {
   full_amount = song_info.get("Total_Amount");
   per_person = ifnull(full_amount,1) / ifnull(writer_count,1);
   for each  writer in song_writer_details
   {
    if(writer.get("id") != "")
    {
     datamap = Map();
     datamap.put("Share_Amount",per_person);         
     update_response = zoho.crm.update("Songs_Writer_Details",writer.get("id"),datamap);    //update the commission of each writers based on the amount of the song
    }
   }
  }
 }
}
