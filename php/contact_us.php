<?php
require("PHPMailer_5.2.0/class.phpmailer.php");

$secret="6LdUbooUAAAAAFAvqUnsK2NNLgDjjM6WRqkUrBFK";
$response=$_POST["captcha"];

$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
$captcha_success=json_decode($verify);
if ($captcha_success->success==true) {
   file_put_contents('debug.txt', 'captcha_success is true', FILE_APPEND);
   $mail = new PHPMailer();
   $mail->isSMTP();
   $mail->Host = 'localhost';

   $mail->From = "information@infrasignal-radio.com";
   $mail->FromName = "Infrasignal-Radio.com";
   $mail->AddAddress("jake.fink@infrasignal-radio.com");
   $mail->AddAddress("brian.fink@infrasignal-radio.com");
   $mail->AddAddress("aubrey.mcbroom@infrasignal-radio.com");
   $mail->AddAddress("jessica.fink@infrasignal-radio.com");
   $mail->AddAddress("linda.fink@infrasignal-radio.com");
   $mail->WordWrap = 50;
   $mail->Subject = "Someone is interested in Infrasignal Radio!";
   $mail->Body = 
   <<<EOT
      Email: {$_POST['email']}
      Name: {$_POST['name']}
      Message: {$_POST['msg']}
EOT;

   if(!$mail->Send())
   {
      echo "Message could not be sent. <p>";
      echo "Mailer Error: " . $mail->ErrorInfo;
      exit;
   }

   echo "Message has been sent";
}

?>