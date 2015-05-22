<?php
$password = 'pizza';
if($_POST['password'] != $password)
{
	quit('1');
}
$ip = $_SERVER['REMOTE_ADDR'];
$port = 41337;
if(round($_POST['port']) != 0)
{
	$port = round($_POST['port']);
}
file_put_contents('server.txt','ws://'.$ip.':'.$port);
echo '0';
?>
