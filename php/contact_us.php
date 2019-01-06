<?php
require("PHPMailer_5.2.0/class.phpmailer.php");

$mail = new PHPMailer();

$mail->isSMTP();
$mail->Host = 'localhost';

$mail->From = "information@infrasignal-radio.com";
$mail->FromName = "Infrasignal-Radio.com";
$mail->AddAddress("jake.fink@infrasignal-radio.com");                  // name is optional

$mail->WordWrap = 50;                                 // set word wrap to 50 characters

$mail->Subject = "Someone is interested in Infrasignal Radio!";
$mail->Body = <<<EOT
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
?>