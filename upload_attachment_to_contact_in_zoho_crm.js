$date = new DateTime();
//Get the time stamp from the variable
$current_time_long= $date->getTimestamp();
/
//Read the content from the pdf
$pdfName = 'filename';
$file_data = file_get_contents(filename);
//Declare a variable for enctype for sending the file to creator
$KLineEnd = "\r\n";
$kDoubleHypen = "--";
$kContentDisp = "Content-Disposition: form-data; name=\"file\";filename=\"";
//Make a url for upload a file in creator

//header map declaration
$header = ['ENCTYPE: multipart/form-data','Content-Type:multipart/form-data;boundary='.(string)$current_time_long];
//Encoding the fileds and makes body map variable
$param = utf8_encode($KLineEnd);
$encode_var = $kDoubleHypen.(string)$current_time_long.$KLineEnd ;
$param = $param.utf8_encode($encode_var);
$temp = $kContentDisp.$pdfName."\"".$KLineEnd.$KLineEnd ;
$param = $param.utf8_encode($temp); 
$param = $param.$file_data.utf8_encode($KLineEnd);
$temp_var = $kDoubleHypen.(string)$current_time_long.$kDoubleHypen.$KLineEnd.$KLineEnd;
$param = $param.utf8_encode($temp_var);
//curl declaration for sending the data as a post method to creator with header and body map variable with constant timeout
$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
